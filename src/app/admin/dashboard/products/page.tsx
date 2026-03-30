// ─────────────────────────────────────────────────────────────────────────────
// app/admin/dashboard/products/page.tsx — Gestão de Produtos
// Admin só pode ver, filtrar, aprovar, rejeitar e remover.
// NÃO pode adicionar — produtos são criados pelos vendedores/agricultores.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState, useMemo } from "react";
import { Package } from "lucide-react";
import {
  SectionHeader, SearchBar, FilterSelect,
  Pagination, ConfirmModal, EmptyState,
} from "@/components/ui";
import ProductsTable      from "@/components/admin/products/ProductsTable";
import ProductDetailModal from "@/components/admin/products/ProductDetailModal";
import { productsData } from "@/data/products";
import type { Product, ProductStatus } from "@/types";

// ─────────────────────────────────────────────
// Enriquecer dados com status simulado
// ─────────────────────────────────────────────
const PRODUCTS_INITIAL: Product[] = productsData.map((p, i) => ({
  ...p,
  status:    (["active", "active", "pending", "active", "rejected"][i % 5] as ProductStatus),
  createdAt: new Date(Date.now() - i * 86400000 * 2).toISOString(),
}));

const CATEGORIES = ["Todas", "Verduras", "Legumes", "Frutas", "Raízes", "Cereais", "Laticínios"];

const STATUS_FILTERS = [
  { value: "all",      label: "Todos os estados" },
  { value: "active",   label: "Activos"          },
  { value: "pending",  label: "Pendentes"         },
  { value: "rejected", label: "Rejeitados"        },
];

const PER_PAGE = 10;

// ─────────────────────────────────────────────
// Página
// ─────────────────────────────────────────────
export default function AdminProductsPage() {
  const [products,   setProducts]   = useState<Product[]>(PRODUCTS_INITIAL);
  const [search,     setSearch]     = useState("");
  const [category,   setCategory]   = useState("Todas");
  const [statusFil,  setStatusFil]  = useState("all");
  const [page,       setPage]       = useState(1);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [confirmId,  setConfirmId]  = useState<{ id: number; action: "approve" | "reject" | "delete" } | null>(null);

  // Filtrar produtos
  const filtered = useMemo(() => products.filter((p) => {
    const matchSearch   = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.user.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category  === "Todas" || p.category === category;
    const matchStatus   = statusFil === "all"   || p.status   === statusFil;
    return matchSearch && matchCategory && matchStatus;
  }), [products, search, category, statusFil]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Acções do admin sobre os produtos
  const applyAction = (id: number, action: "approve" | "reject" | "delete") => {
    setProducts((prev) =>
      action === "delete"
        ? prev.filter((p) => p.id !== id)
        : prev.map((p) =>
            p.id === id
              ? { ...p, status: action === "approve" ? "active" : "rejected" }
              : p
          )
    );
    setConfirmId(null);
  };

  // Contadores para os cartões de resumo
  const counts = {
    total:    products.length,
    active:   products.filter((p) => p.status === "active").length,
    pending:  products.filter((p) => p.status === "pending").length,
    rejected: products.filter((p) => p.status === "rejected").length,
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">

      {/* ── Cabeçalho — sem botão de adicionar ── */}
      <SectionHeader
        title="Produtos"
        subtitle="Gere os produtos publicados pelos agricultores na plataforma"
      >
        {counts.pending > 0 && (
          <span className="text-xs font-bold bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 px-3 py-1.5 rounded-full border border-yellow-200 dark:border-yellow-800/40 animate-pulse">
            ⚠️ {counts.pending} pendente{counts.pending > 1 ? "s" : ""} de aprovação
          </span>
        )}
      </SectionHeader>

      {/* ── Cartões de resumo rápido ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total",      value: counts.total,    color: "text-gray-900 dark:text-white",           bg: "bg-white dark:bg-[#0D1F10]"         },
          { label: "Activos",    value: counts.active,   color: "text-green-700 dark:text-green-400",      bg: "bg-green-50 dark:bg-green-900/20"   },
          { label: "Pendentes",  value: counts.pending,  color: "text-yellow-700 dark:text-yellow-400",    bg: "bg-yellow-50 dark:bg-yellow-900/10" },
          { label: "Rejeitados", value: counts.rejected, color: "text-red-600 dark:text-red-400",          bg: "bg-red-50 dark:bg-red-900/10"       },
        ].map((c) => (
          <div
            key={c.label}
            className={`${c.bg} rounded-xl p-4 border border-gray-100 dark:border-green-900/30 transition-all`}
          >
            <p className={`text-2xl font-black ${c.color}`}>{c.value}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* ── Filtros ── */}
      <div className="flex flex-wrap gap-3 items-center">
        <SearchBar
          value={search}
          onChange={(v) => { setSearch(v); setPage(1); }}
          placeholder="Pesquisar produto ou vendedor…"
        />
        <FilterSelect
          value={category}
          onChange={(v) => { setCategory(v); setPage(1); }}
          options={CATEGORIES.map((c) => ({ value: c, label: c }))}
          label="Categoria"
        />
        <FilterSelect
          value={statusFil}
          onChange={(v) => { setStatusFil(v); setPage(1); }}
          options={STATUS_FILTERS}
          label="Estado"
        />
      </div>

      {/* ── Tabela de produtos ── */}
      {paginated.length === 0 ? (
        <EmptyState
          icon={Package}
          title="Nenhum produto encontrado"
          description="Ajuste os filtros para ver outros resultados."
        />
      ) : (
        <ProductsTable
          products={paginated}
          onView={setViewProduct}
          onApprove={(id) => setConfirmId({ id, action: "approve" })}
          onReject={(id)  => setConfirmId({ id, action: "reject"  })}
          onDelete={(id)  => setConfirmId({ id, action: "delete"  })}
        />
      )}

      {/* ── Paginação ── */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
        total={filtered.length}
        perPage={PER_PAGE}
      />

      {/* ── Modal de detalhe do produto ── */}
      <ProductDetailModal
        product={viewProduct}
        onClose={() => setViewProduct(null)}
        onApprove={(id) => { applyAction(id, "approve"); setViewProduct(null); }}
        onReject={(id)  => { applyAction(id, "reject");  setViewProduct(null); }}
      />

      {/* ── Modal de confirmação de acção destrutiva ── */}
      <ConfirmModal
        open={confirmId !== null}
        title={
          confirmId?.action === "approve" ? "Aprovar publicação?" :
          confirmId?.action === "reject"  ? "Rejeitar publicação?" :
                                            "Remover produto?"
        }
        description={
          confirmId?.action === "delete"
            ? "Esta acção não pode ser desfeita. O produto será removido permanentemente."
            : confirmId?.action === "reject"
            ? "O agricultor será notificado que a publicação foi rejeitada."
            : undefined
        }
        confirmLabel={
          confirmId?.action === "approve" ? "Aprovar"  :
          confirmId?.action === "reject"  ? "Rejeitar" : "Remover"
        }
        danger={confirmId?.action !== "approve"}
        onConfirm={() => confirmId && applyAction(confirmId.id, confirmId.action)}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  );
}