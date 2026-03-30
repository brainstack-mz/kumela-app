// ─────────────────────────────────────────────────────────────────────────────
// app/admin/dashboard/transacoes/page.tsx — Gestão de Transacções
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState, useMemo } from "react";
import {
  DollarSign, TrendingUp, TrendingDown,
  ArrowUpRight, ArrowDownLeft, RefreshCw, Percent,
} from "lucide-react";
import {
  SectionHeader, StatusBadge, SearchBar, FilterSelect,
  Pagination, PrimaryButton, EmptyState, AvatarInitials,
} from "@/components/ui";
import type { Transaction, TransactionType, TransactionStatus } from "@/types";

// ─────────────────────────────────────────────
// Dados mockados de transacções
// ─────────────────────────────────────────────
const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "T001", type: "sale",       amount: 450,  from: "João Cliente",    to: "João da Horta",     productName: "Tomate Fresco",    status: "completed", date: "2025-01-15" },
  { id: "T002", type: "commission", amount: 45,   from: "Plataforma",      to: "KUmela",            productName: "Comissão 10%",     status: "completed", date: "2025-01-15" },
  { id: "T003", type: "sale",       amount: 1000, from: "Lutyrano Etrice", to: "Banana & Cia",      productName: "Cachos de Banana", status: "completed", date: "2025-01-14" },
  { id: "T004", type: "commission", amount: 100,  from: "Plataforma",      to: "KUmela",            productName: "Comissão 10%",     status: "completed", date: "2025-01-14" },
  { id: "T005", type: "sale",       amount: 900,  from: "Maria Vendedora", to: "Hortaliças de Gaza", productName: "Cenouras",         status: "pending",   date: "2025-01-14" },
  { id: "T006", type: "refund",     amount: 1350, from: "KUmela",          to: "Lutyrano Etrice",   productName: "Manga Fresca",     status: "pending",   date: "2025-01-13" },
  { id: "T007", type: "sale",       amount: 5250, from: "João Cliente",    to: "Agro Comercial",    productName: "Milho Fresco",     status: "completed", date: "2025-01-12" },
  { id: "T008", type: "commission", amount: 525,  from: "Plataforma",      to: "KUmela",            productName: "Comissão 10%",     status: "completed", date: "2025-01-12" },
  { id: "T009", type: "sale",       amount: 750,  from: "João Cliente",    to: "VerdeTech",         productName: "Alface Hidropónica",status: "failed",   date: "2025-01-11" },
  { id: "T010", type: "purchase",   amount: 300,  from: "Lutyrano Etrice", to: "Agro Nampula",      productName: "Pepino Fresco",    status: "completed", date: "2025-01-10" },
];

// Ícone e cor por tipo de transacção
const typeConfig: Record<TransactionType, { icon: React.ElementType; label: string; color: string }> = {
  sale:       { icon: ArrowUpRight,   label: "Venda",      color: "bg-green-50  text-green-600  dark:bg-green-900/30  dark:text-green-400"  },
  purchase:   { icon: ArrowDownLeft,  label: "Compra",     color: "bg-blue-50   text-blue-600   dark:bg-blue-900/20   dark:text-blue-400"   },
  commission: { icon: Percent,        label: "Comissão",   color: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400" },
  refund:     { icon: RefreshCw,      label: "Reembolso",  color: "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400" },
};

const TYPE_OPTIONS = [
  { value: "all",        label: "Todos os tipos" },
  { value: "sale",       label: "Vendas"         },
  { value: "purchase",   label: "Compras"        },
  { value: "commission", label: "Comissões"      },
  { value: "refund",     label: "Reembolsos"     },
];

const STATUS_OPTIONS = [
  { value: "all",       label: "Todos os estados" },
  { value: "completed", label: "Concluídos"        },
  { value: "pending",   label: "Pendentes"          },
  { value: "failed",    label: "Falhados"           },
];

const PER_PAGE = 8;

// ─────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────
export default function AdminTransacoesPage() {
  const [search,    setSearch]    = useState("");
  const [typeFil,   setTypeFil]   = useState("all");
  const [statusFil, setStatusFil] = useState("all");
  const [page,      setPage]      = useState(1);

  // Filtrar
  const filtered = useMemo(() => {
    return MOCK_TRANSACTIONS.filter((t) => {
      const matchSearch = t.productName.toLowerCase().includes(search.toLowerCase()) ||
                          t.from.toLowerCase().includes(search.toLowerCase()) ||
                          t.to.toLowerCase().includes(search.toLowerCase());
      const matchType   = typeFil   === "all" || t.type   === typeFil;
      const matchStatus = statusFil === "all" || t.status === statusFil;
      return matchSearch && matchType && matchStatus;
    });
  }, [search, typeFil, statusFil]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Métricas gerais
  const totalSales       = MOCK_TRANSACTIONS.filter((t) => t.type === "sale"       && t.status === "completed").reduce((s, t) => s + t.amount, 0);
  const totalCommissions = MOCK_TRANSACTIONS.filter((t) => t.type === "commission" && t.status === "completed").reduce((s, t) => s + t.amount, 0);
  const totalPending     = MOCK_TRANSACTIONS.filter((t) => t.status === "pending").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">

      {/* ── Cabeçalho ── */}
      <SectionHeader
        title="Transacções"
        subtitle={`${MOCK_TRANSACTIONS.length} transacções registadas`}
      >
        <PrimaryButton icon={DollarSign} variant="gray" size="sm">
          Exportar CSV
        </PrimaryButton>
      </SectionHeader>

      {/* ── KPIs de transacções ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
              <TrendingUp size={18} aria-hidden="true" />
            </div>
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Total de Vendas</span>
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-white">
            {totalSales.toLocaleString("pt-MZ")} MZN
          </p>
          <p className="text-[11px] text-green-600 dark:text-green-400 font-bold mt-1">
            Transacções concluídas
          </p>
        </div>

        <div className="bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Percent size={18} aria-hidden="true" />
            </div>
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Comissões KUmela</span>
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-white">
            {totalCommissions.toLocaleString("pt-MZ")} MZN
          </p>
          <p className="text-[11px] text-purple-600 dark:text-purple-400 font-bold mt-1">
            10% por transacção
          </p>
        </div>

        <div className="bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 flex items-center justify-center">
              <TrendingDown size={18} aria-hidden="true" />
            </div>
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Pendentes</span>
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-white">
            {totalPending.toLocaleString("pt-MZ")} MZN
          </p>
          <p className="text-[11px] text-yellow-600 dark:text-yellow-400 font-bold mt-1">
            {MOCK_TRANSACTIONS.filter((t) => t.status === "pending").length} transacções em espera
          </p>
        </div>
      </div>

      {/* ── Filtros ── */}
      <div className="flex flex-wrap gap-3 items-center">
        <SearchBar
          value={search}
          onChange={(v) => { setSearch(v); setPage(1); }}
          placeholder="Pesquisar por produto ou participante…"
        />
        <FilterSelect
          value={typeFil}
          onChange={(v) => { setTypeFil(v); setPage(1); }}
          options={TYPE_OPTIONS}
          label="Filtrar por tipo"
        />
        <FilterSelect
          value={statusFil}
          onChange={(v) => { setStatusFil(v); setPage(1); }}
          options={STATUS_OPTIONS}
          label="Filtrar por estado"
        />
      </div>

      {/* ── Tabela ── */}
      {paginated.length === 0 ? (
        <EmptyState
          icon={DollarSign}
          title="Nenhuma transacção encontrada"
          description="Ajuste os filtros de pesquisa."
        />
      ) : (
        <div className="rounded-2xl border border-gray-100 dark:border-green-900/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#0D1F10] border-b border-gray-100 dark:border-green-900/30">
                  {["ID", "Tipo", "Produto", "De", "Para", "Valor", "Data", "Estado"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-[#0A1A0E] divide-y divide-gray-50 dark:divide-green-900/20">
                {paginated.map((t, i) => {
                  const cfg = typeConfig[t.type];
                  return (
                    <tr
                      key={t.id}
                      className={[
                        "hover:bg-green-50/40 dark:hover:bg-green-900/10 transition-colors",
                        i % 2 === 1 ? "bg-gray-50/30 dark:bg-[#0D1F10]/40" : "",
                      ].join(" ")}
                    >
                      {/* ID */}
                      <td className="px-4 py-3.5 font-mono text-xs font-bold text-gray-400 dark:text-gray-500">
                        #{t.id}
                      </td>

                      {/* Tipo */}
                      <td className="px-4 py-3.5">
                        <div className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${cfg.color}`}>
                          <cfg.icon size={11} aria-hidden="true" />
                          {cfg.label}
                        </div>
                      </td>

                      {/* Produto */}
                      <td className="px-4 py-3.5 font-semibold text-gray-700 dark:text-gray-200 text-xs">
                        {t.productName}
                      </td>

                      {/* De */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <AvatarInitials name={t.from} size="sm" color="bg-blue-500" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">{t.from}</span>
                        </div>
                      </td>

                      {/* Para */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <AvatarInitials name={t.to} size="sm" color="bg-green-600" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">{t.to}</span>
                        </div>
                      </td>

                      {/* Valor */}
                      <td className="px-4 py-3.5 font-black text-gray-900 dark:text-white text-xs whitespace-nowrap">
                        <span className={t.type === "refund" ? "text-orange-500" : "text-gray-900 dark:text-white"}>
                          {t.type === "refund" ? "-" : "+"}{t.amount.toLocaleString("pt-MZ")} MZN
                        </span>
                      </td>

                      {/* Data */}
                      <td className="px-4 py-3.5 text-xs text-gray-400 dark:text-gray-500">
                        {t.date}
                      </td>

                      {/* Estado */}
                      <td className="px-4 py-3.5">
                        <StatusBadge status={t.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
        total={filtered.length}
        perPage={PER_PAGE}
      />
    </div>
  );
}