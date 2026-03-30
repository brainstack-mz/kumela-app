// ─────────────────────────────────────────────────────────────────────────────
// app/dashboard/my-products/page.tsx — Meus Produtos
// Utilizador vê, gere e publica os seus próprios anúncios.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Plus, Package, Timer, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import { SectionHeader, EmptyState, ConfirmModal } from "@/components/ui";
import NewProductForm from "@/components/user/products/NewProductForm";
import { productsData } from "@/data/products";

// Enriquecer produtos com data de publicação e estado
const MY_PRODUCTS_INITIAL = productsData.slice(0, 6).map((p, i) => ({
  ...p,
  active:    i !== 1,
  createdAt: new Date(Date.now() - i * 3600 * 1000 * (i + 1)).toISOString(),
}));

type MyProduct = (typeof MY_PRODUCTS_INITIAL)[0];

// Calcular se ainda pode editar (limite de 10h)
const canEdit = (createdAt: string) =>
  Date.now() - new Date(createdAt).getTime() <= 10 * 3600 * 1000;

// Formatar tempo restante
const timeLeft = (createdAt: string) => {
  const diff  = 10 * 3600 * 1000 - (Date.now() - new Date(createdAt).getTime());
  if (diff <= 0) return null;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return `${h}h ${m}m restantes para editar`;
};

export default function MyProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts]   = useState(MY_PRODUCTS_INITIAL);
  const [showForm, setShowForm]   = useState(searchParams.get("new") === "1");
  const [deleteId, setDeleteId]   = useState<number | null>(null);

  const toggleActive = (id: number) =>
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, active: !p.active } : p));

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  // Adicionar novo produto
  const handleNewProduct = (data: any) => {
    const newP = {
      id:          Date.now(),
      name:        data.name,
      image:       data.images[0] ?? "/assets/imgs/tomate.jpeg",
      images:      data.images,
      price:       Number(data.price),
      discount:    data.discount ? Number(data.discount) : undefined,
      location:    data.district,
      description: data.description,
      user:      "Eu",
      phone:       "258870570364",
      category:    data.category,
      quantity:    Number(data.quantity),
      stock:       Number(data.quantity),
      unit:        data.unit,
      active:      true,
      createdAt:   new Date().toISOString(),
    };
    setProducts((prev) => [newP, ...prev]);
  };

  const active   = products.filter((p) => p.active).length;
  const inactive = products.filter((p) => !p.active).length;

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-7xl mx-auto">

      {/* ── Cabeçalho ── */}
      <SectionHeader
        title="Meus Produtos"
        subtitle={`${products.length} anúncios · ${active} activos · ${inactive} inactivos`}
      >
        <button
          onClick={() => setShowForm(true)}
          aria-label="Publicar novo anúncio"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-700 shadow-sm shadow-green-600/20 transition-all min-h-[44px]"
        >
          <Plus size={16} aria-hidden="true" />
          Publicar Anúncio
        </button>
      </SectionHeader>

      {/* ── Resumo ── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total",    value: products.length, color: "text-gray-900 dark:text-white",        bg: "bg-white dark:bg-[#0D1F10]"         },
          { label: "Activos",  value: active,          color: "text-green-700 dark:text-green-400",   bg: "bg-green-50 dark:bg-green-900/10"   },
          { label: "Inactivos",value: inactive,         color: "text-gray-500 dark:text-gray-400",    bg: "bg-gray-100 dark:bg-[#0D1F10]"      },
        ].map((c) => (
          <div key={c.label} className={`${c.bg} rounded-xl p-3 border border-gray-100 dark:border-green-900/30`}>
            <p className={`text-xl font-black ${c.color}`}>{c.value}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">{c.label}</p>
          </div>
        ))}
      </div>

      {/* ── Lista de produtos ── */}
      {products.length === 0 ? (
        <EmptyState
          icon={Package}
          title="Ainda sem anúncios"
          description="Publique o seu primeiro produto e comece a vender."
          action={
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition-all min-h-[48px]"
            >
              <Plus size={16} /> Publicar Primeiro Anúncio
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => {
            const editable  = canEdit(p.createdAt);
            const remaining = timeLeft(p.createdAt);

            return (
              <div
                key={p.id}
                className={[
                  "bg-white dark:bg-[#0D1F10] rounded-2xl border overflow-hidden",
                  "transition-all duration-200",
                  p.active
                    ? "border-gray-100 dark:border-green-900/30"
                    : "border-gray-100 dark:border-green-900/20 opacity-60",
                ].join(" ")}
              >
                {/* Imagem */}
                <div className="relative w-full h-36 bg-gray-100 dark:bg-gray-800">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Desconto */}
                  {p.discount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                      -{p.discount}%
                    </span>
                  )}
                  {/* Estado activo/inactivo */}
                  <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    p.active ? "bg-green-500 text-white" : "bg-gray-400 text-white"
                  }`}>
                    {p.active ? "Activo" : "Inactivo"}
                  </span>
                </div>

                {/* Conteúdo */}
                <div className="p-3.5 space-y-2">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{p.name}</h3>
                  <p className="text-sm font-black text-gray-900 dark:text-white">
                    {p.price.toLocaleString("pt-MZ")} MZN
                    <span className="text-xs font-normal text-gray-400 ml-1">/{p.unit}</span>
                  </p>

                  {/* Timer de edição */}
                  <div className="flex items-center gap-1.5">
                    <Timer
                      size={12}
                      className={editable ? "text-blue-500" : "text-gray-400"}
                      aria-hidden="true"
                    />
                    <span className={`text-[11px] font-semibold ${editable ? "text-blue-500" : "text-gray-400 dark:text-gray-500"}`}>
                      {editable ? remaining : "Edição expirada (10h)"}
                    </span>
                  </div>

                  {/* Stock */}
                  <p className={`text-[11px] font-bold ${
                    p.stock > 20 ? "text-green-600 dark:text-green-400" :
                    p.stock > 5  ? "text-yellow-600 dark:text-yellow-400" :
                                   "text-red-500"
                  }`}>
                    Stock: {p.stock} {p.unit}
                  </p>

                  {/* Acções */}
                  <div className="flex items-center gap-2 pt-1">
                    {/* Toggle activo/inactivo */}
                    <button
                      onClick={() => toggleActive(p.id)}
                      aria-label={p.active ? "Desactivar anúncio" : "Activar anúncio"}
                      className={[
                        "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors min-h-[32px]",
                        p.active
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                          : "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30",
                      ].join(" ")}
                    >
                      {p.active
                        ? <ToggleRight size={13} aria-hidden="true" />
                        : <ToggleLeft  size={13} aria-hidden="true" />
                      }
                      {p.active ? "Inactivar" : "Activar"}
                    </button>

                    {/* Remover */}
                    <button
                      onClick={() => setDeleteId(p.id)}
                      aria-label={`Remover ${p.name}`}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors min-h-[32px]"
                    >
                      <Trash2 size={13} aria-hidden="true" /> Remover
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Formulário de novo produto (5 passos) ── */}
      {showForm && (
        <NewProductForm
          onClose={() => setShowForm(false)}
          onSubmit={handleNewProduct}
        />
      )}

      {/* ── Confirmação de remoção ── */}
      <ConfirmModal
        open={deleteId !== null}
        title="Remover anúncio?"
        description="Este produto será removido do mercado definitivamente."
        confirmLabel="Remover"
        danger
        onConfirm={() => deleteId && handleDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}