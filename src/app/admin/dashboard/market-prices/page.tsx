// ─────────────────────────────────────────────────────────────────────────────
// app/admin/dashboard/precos/page.tsx — Tabela de Preços de Mercado
// (versão melhorada e completa do PriceTable existente)
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState, useMemo } from "react";
import {
  BookOpen, Plus, Pencil, Trash2, TrendingUp, TrendingDown, Minus, Check, X,
} from "lucide-react";
import {
  SectionHeader, SearchBar, FilterSelect,
  PrimaryButton, ConfirmModal, EmptyState,
} from "@/components/ui";
import { provincesData } from "@/data/provincesData";
import type { PriceItem, ProductCategory } from "@/types";

// ─────────────────────────────────────────────
// Dados mockados da tabela de preços
// ─────────────────────────────────────────────
const INITIAL_PRICES: PriceItem[] = [
  { id: 1,  name: "Tomate",          category: "Verduras",   minPrice: 60,   maxPrice: 120,  unit: "kg",    trend: "+4.0%",  updatedAt: "2025-01-15", province: "Nampula", district: "Nampula" },
  { id: 2,  name: "Banana Prata",    category: "Frutas",     minPrice: 35,   maxPrice: 55,   unit: "kg",    trend: "+2.5%",  updatedAt: "2025-01-15", province: "Nampula", district: "Nampula" },
  { id: 3,  name: "Milho Seco",      category: "Cereais",    minPrice: 100,  maxPrice: 140,  unit: "kg",    trend: "-1.2%",  updatedAt: "2025-01-14", province: "Nampula", district: "Nacala" },
  { id: 4,  name: "Feijão",          category: "Legumes",    minPrice: 150,  maxPrice: 200,  unit: "kg",    trend: "0.0%",   updatedAt: "2025-01-14", province: "Nampula", district: "Monapo" },
  { id: 5,  name: "Cebola",          category: "Verduras",   minPrice: 80,   maxPrice: 130,  unit: "kg",    trend: "+1.8%",  updatedAt: "2025-01-13", province: "Nampula", district: "Nampula" },
  { id: 6,  name: "Batata-doce",     category: "Raízes",     minPrice: 50,   maxPrice: 90,   unit: "kg",    trend: "-0.5%",  updatedAt: "2025-01-13", province: "Nampula", district: "Malema" },
  { id: 7,  name: "Arroz",           category: "Cereais",    minPrice: 1100, maxPrice: 1400, unit: "kg",    trend: "+0.3%",  updatedAt: "2025-01-12", province: "Nampula", district: "Nampula" },
  { id: 8,  name: "Abacate",         category: "Frutas",     minPrice: 180,  maxPrice: 260,  unit: "kg",    trend: "0.0%",   updatedAt: "2025-01-12", province: "Nampula", district: "Nacala" },
  { id: 9,  name: "Mandioca",        category: "Raízes",     minPrice: 70,   maxPrice: 110,  unit: "kg",    trend: "+1.0%",  updatedAt: "2025-01-11", province: "Nampula", district: "Monapo" },
  { id: 10, name: "Leite",           category: "Laticínios", minPrice: 55,   maxPrice: 75,   unit: "lit",   trend: "-0.8%",  updatedAt: "2025-01-10", province: "Nampula", district: "Nampula" },
];

// Formulário vazio
const EMPTY_FORM: Omit<PriceItem, "id"> = {
  name: "", category: "Verduras", minPrice: 0, maxPrice: 0,
  unit: "kg", trend: "0.0%", updatedAt: new Date().toISOString().split("T")[0],
  province: "Nampula", district: "Nampula",
};

const CATEGORIES: ProductCategory[] = ["Verduras", "Legumes", "Frutas", "Raízes", "Cereais", "Laticínios"];
const UNITS = ["kg", "molho", "lit", "unid", "saco"];
const CATEGORY_OPTIONS = [
  { value: "all", label: "Todas as categorias" },
  ...CATEGORIES.map((c) => ({ value: c, label: c })),
];

// ─────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────
export default function AdminPrecosPage() {
  const [prices,     setPrices]     = useState<PriceItem[]>(INITIAL_PRICES);
  const [search,     setSearch]     = useState("");
  const [catFil,     setCatFil]     = useState("all");
  const [editId,     setEditId]     = useState<number | null>(null);
  const [deleteId,   setDeleteId]   = useState<number | null>(null);
  const [showForm,   setShowForm]   = useState(false);
  const [form,       setForm]       = useState<Omit<PriceItem, "id">>(EMPTY_FORM);

  const districts = provincesData.find((p) => p.name === form.province)?.districts ?? [];

  // Filtrar
  const filtered = useMemo(() => {
    return prices.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.district.toLowerCase().includes(search.toLowerCase());
      const matchCat    = catFil === "all" || p.category === catFil;
      return matchSearch && matchCat;
    });
  }, [prices, search, catFil]);

  // Guardar — criar ou editar
  const handleSave = () => {
    if (!form.name || form.minPrice <= 0 || form.maxPrice <= 0) return;

    if (editId !== null) {
      // Actualizar existente
      setPrices((prev) =>
        prev.map((p) => p.id === editId ? { ...form, id: editId } : p)
      );
    } else {
      // Criar novo
      const nextId = Math.max(...prices.map((p) => p.id), 0) + 1;
      setPrices((prev) => [...prev, { ...form, id: nextId }]);
    }
    setShowForm(false);
    setEditId(null);
    setForm(EMPTY_FORM);
  };

  // Abrir edição
  const handleEdit = (item: PriceItem) => {
    const { id, ...rest } = item;
    setForm(rest);
    setEditId(id);
    setShowForm(true);
  };

  // Remover
  const handleDelete = (id: number) => {
    setPrices((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  // Renderizar seta de tendência
  const TrendBadge = ({ trend }: { trend: string }) => {
    const isUp   = trend.startsWith("+") && trend !== "+0.0%";
    const isDown = trend.startsWith("-");
    return (
      <span className={[
        "inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full",
        isUp   ? "text-green-700 bg-green-50 dark:text-green-400 dark:bg-green-900/20"   :
        isDown ? "text-red-600  bg-red-50   dark:text-red-400   dark:bg-red-900/20"     :
                 "text-gray-500 bg-gray-100 dark:text-gray-400  dark:bg-gray-800",
      ].join(" ")}>
        {isUp ? <TrendingUp size={10} /> : isDown ? <TrendingDown size={10} /> : <Minus size={10} />}
        {trend}
      </span>
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">

      {/* ── Cabeçalho ── */}
      <SectionHeader
        title="Preços do Mercado"
        subtitle={`${prices.length} produtos com referência de preço`}
      >
        <PrimaryButton
          icon={Plus}
          size="sm"
          onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY_FORM); }}
        >
          Novo Preço
        </PrimaryButton>
      </SectionHeader>

      {/* ── Nota informativa ── */}
      <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/40 rounded-xl px-4 py-3">
        <p className="text-xs font-semibold text-green-700 dark:text-green-400">
          💡 Os preços de referência são visíveis por todos os utilizadores no Mercado.
          Actualize regularmente para garantir transparência.
        </p>
      </div>

      {/* ── Filtros ── */}
      <div className="flex flex-wrap gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Pesquisar produto ou distrito…"
        />
        <FilterSelect
          value={catFil}
          onChange={setCatFil}
          options={CATEGORY_OPTIONS}
          label="Filtrar por categoria"
        />
      </div>

      {/* ── Tabela de preços ── */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="Nenhum preço encontrado"
          description="Adicione referências de preço para os produtos."
          action={
            <PrimaryButton icon={Plus} size="sm" onClick={() => setShowForm(true)}>
              Adicionar Preço
            </PrimaryButton>
          }
        />
      ) : (
        <div className="rounded-2xl border border-gray-100 dark:border-green-900/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#0D1F10] border-b border-gray-100 dark:border-green-900/30">
                  {["Produto", "Categoria", "Mín. (MZN)", "Máx. (MZN)", "Unidade", "Tendência", "Distrito", "Actualizado", "Acções"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-[#0A1A0E] divide-y divide-gray-50 dark:divide-green-900/20">
                {filtered.map((item, i) => (
                  <tr
                    key={item.id}
                    className={[
                      "hover:bg-green-50/40 dark:hover:bg-green-900/10 transition-colors",
                      i % 2 === 1 ? "bg-gray-50/30 dark:bg-[#0D1F10]/40" : "",
                    ].join(" ")}
                  >
                    <td className="px-4 py-3.5 font-bold text-gray-800 dark:text-gray-200 text-xs">{item.name}</td>
                    <td className="px-4 py-3.5">
                      <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-gray-700 dark:text-gray-300 text-xs">
                      {item.minPrice.toLocaleString("pt-MZ")}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-gray-700 dark:text-gray-300 text-xs">
                      {item.maxPrice.toLocaleString("pt-MZ")}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-500 dark:text-gray-400">{item.unit}</td>
                    <td className="px-4 py-3.5"><TrendBadge trend={item.trend} /></td>
                    <td className="px-4 py-3.5 text-xs text-gray-500 dark:text-gray-400">📍 {item.district}</td>
                    <td className="px-4 py-3.5 text-xs text-gray-400 dark:text-gray-500">{item.updatedAt}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleEdit(item)}
                          aria-label={`Editar ${item.name}`}
                          className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => setDeleteId(item.id)}
                          aria-label={`Remover ${item.name}`}
                          className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Modal de criar / editar preço ── */}
      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div onClick={() => setShowForm(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 bg-white dark:bg-[#0A1A0E] rounded-2xl p-6 w-full max-w-md shadow-2xl border border-green-100 dark:border-green-900/40 max-h-[90vh] overflow-y-auto">

            {/* Título */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-gray-900 dark:text-white">
                {editId !== null ? "Editar Preço" : "Novo Preço de Referência"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Formulário */}
            <div className="space-y-4">

              {/* Nome do produto */}
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
                  Nome do Produto *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="ex: Tomate"
                  className="w-full px-3 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-[#0D1F10] border border-gray-200 dark:border-green-900/40 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition-all"
                />
              </div>

              {/* Categoria + Unidade */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">Categoria *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })}
                    className="w-full px-3 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-[#0D1F10] border border-gray-200 dark:border-green-900/40 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all"
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">Unidade *</label>
                  <select
                    value={form.unit}
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-[#0D1F10] border border-gray-200 dark:border-green-900/40 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all"
                  >
                    {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              {/* Preços mín. e máx. */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">Preço Mínimo (MZN) *</label>
                  <input
                    type="number"
                    min={0}
                    value={form.minPrice}
                    onChange={(e) => setForm({ ...form, minPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-[#0D1F10] border border-gray-200 dark:border-green-900/40 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">Preço Máximo (MZN) *</label>
                  <input
                    type="number"
                    min={0}
                    value={form.maxPrice}
                    onChange={(e) => setForm({ ...form, maxPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-[#0D1F10] border border-gray-200 dark:border-green-900/40 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all"
                  />
                </div>
              </div>

              {/* Tendência */}
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
                  Tendência (ex: +2.5%, -1.0%, 0.0%)
                </label>
                <input
                  type="text"
                  value={form.trend}
                  onChange={(e) => setForm({ ...form, trend: e.target.value })}
                  placeholder="+2.5%"
                  className="w-full px-3 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-[#0D1F10] border border-gray-200 dark:border-green-900/40 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all"
                />
              </div>

              {/* Distrito */}
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">Distrito</label>
                <select
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-[#0D1F10] border border-gray-200 dark:border-green-900/40 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all"
                >
                  {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 rounded-xl font-bold text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors min-h-[48px]"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-3 rounded-xl font-bold text-sm bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all min-h-[48px] flex items-center justify-center gap-2"
              >
                <Check size={16} />
                {editId !== null ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal de confirmação de remoção ── */}
      <ConfirmModal
        open={deleteId !== null}
        title="Remover referência de preço?"
        description="Esta acção não pode ser desfeita. O preço deixará de ser visível no Mercado."
        confirmLabel="Remover"
        danger
        onConfirm={() => deleteId !== null && handleDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}