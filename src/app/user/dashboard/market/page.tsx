// ─────────────────────────────────────────────────────────────────────────────
// app/dashboard/market/page.tsx — Mercado
// Explorar e comprar produtos. Inclui tabela de preços de referência.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState, useMemo } from "react";
import { BookOpen, ShoppingBag } from "lucide-react";
import { SectionHeader, EmptyState } from "@/components/ui";
import ProductCard  from "@/components/user/shared/ProductCard";
import ProductModal from "@/components/user/shared/ProductModal";
import MarketFilters from "@/components/user/market/MarketFilters";
import { productsData } from "@/data/products";
import type { Product } from "@/types";

// Tabela de preços de referência
const PRICE_TABLE = [
  { name: "Tomate",       min: 60,   max: 120,  unit: "kg",  trend: "+4%" },
  { name: "Milho",        min: 100,  max: 140,  unit: "kg",  trend: "-1%" },
  { name: "Banana Prata", min: 35,   max: 55,   unit: "kg",  trend: "+2%" },
  { name: "Feijão",       min: 150,  max: 200,  unit: "kg",  trend: "0%"  },
  { name: "Cebola",       min: 80,   max: 130,  unit: "kg",  trend: "+1%" },
];

export default function MarketPage() {
  const [search,        setSearch]        = useState("");
  const [category,      setCategory]      = useState("all");
  const [sort,          setSort]          = useState("default");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPriceTable,  setShowPriceTable]  = useState(false);
  const [orderSuccess,    setOrderSuccess]    = useState<string | null>(null);

  // Filtrar e ordenar produtos
  const filtered = useMemo(() => {
    let list = productsData.filter((p) => {
      const matchSearch   = p.name.toLowerCase().includes(search.toLowerCase()) ||
                            p.user.toLowerCase().includes(search.toLowerCase()) ||
                            p.location.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "all" || p.category === category;
      return matchSearch && matchCategory;
    });

    if (sort === "price_asc")  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price_desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "stock")      list = [...list].sort((a, b) => b.stock - a.stock);

    return list;
  }, [search, category, sort]);

  const handleOrder = (product: Product, qty: number) => {
    setOrderSuccess(`${qty} ${product.unit} de "${product.name}" encomendados! Aguarde confirmação do vendedor.`);
    setTimeout(() => setOrderSuccess(null), 4000);
  };

  return (
<div className="p-4 md:p-6 space-y-6 w-full">

      {/* ── Cabeçalho ── */}
      <SectionHeader title="Mercado" subtitle={`${filtered.length} produtos disponíveis em Nampula`}>
        <button
          onClick={() => setShowPriceTable(!showPriceTable)}
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-green-900/40 bg-white dark:bg-[#0D1F10] text-sm font-semibold text-gray-600 dark:text-gray-300 hover:border-green-300 dark:hover:border-green-700 transition-all min-h-[44px]"
        >
          <BookOpen size={15} className="text-green-600 dark:text-green-400" aria-hidden="true" />
          Preços Referência
        </button>
      </SectionHeader>

      {/* ── Toast de sucesso ── */}
      {orderSuccess && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 rounded-xl px-4 py-3">
          <p className="text-sm font-semibold text-green-700 dark:text-green-400">✓ {orderSuccess}</p>
        </div>
      )}

      {/* ── Tabela de preços de referência ── */}
      {showPriceTable && (
        <div className="bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-green-900/30">
            <p className="text-sm font-black text-gray-900 dark:text-white">💡 Preços de Referência — Nampula</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#0A1A0E]">
                  {["Produto", "Mín.", "Máx.", "Unid.", "Tendência"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-[11px] font-black uppercase tracking-wide text-gray-400 dark:text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-green-900/20">
                {PRICE_TABLE.map((p) => (
                  <tr key={p.name} className="hover:bg-gray-50/50 dark:hover:bg-green-900/10 transition-colors">
                    <td className="px-4 py-2.5 font-bold text-gray-800 dark:text-gray-200 text-xs">{p.name}</td>
                    <td className="px-4 py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-300">{p.min} MZN</td>
                    <td className="px-4 py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-300">{p.max} MZN</td>
                    <td className="px-4 py-2.5 text-xs text-gray-400 dark:text-gray-500">{p.unit}</td>
                    <td className="px-4 py-2.5">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        p.trend.startsWith("+") ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" :
                        p.trend.startsWith("-") ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400" :
                                                   "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                      }`}>{p.trend}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Filtros ── */}
      <MarketFilters
        search={search}   onSearch={(v) => setSearch(v)}
        category={category} onCategory={(v) => setCategory(v)}
        sort={sort}         onSort={(v) => setSort(v)}
      />

      {/* ── Grid de produtos ── */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Nenhum produto encontrado"
          description="Tente outros termos de pesquisa ou mude de categoria."
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onClick={() => setSelectedProduct(p)}
              showBuy
              onBuy={() => setSelectedProduct(p)}
            />
          ))}
        </div>
      )}

      {/* ── Modal de detalhe ── */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOrder={handleOrder}
      />
    </div>
  );
}