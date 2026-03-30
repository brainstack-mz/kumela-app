// ─────────────────────────────────────────────────────────────────────────────
// app/admin/dashboard/reports/page.tsx — Relatórios e Indicadores de Impacto
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import {
  BarChartBig, TrendingUp, TrendingDown, Users,
  Package, DollarSign, Truck, Download, FileText,
} from "lucide-react";
import { SectionHeader, PrimaryButton } from "@/components/ui";

// ─────────────────────────────────────────────
// Dados mockados de relatório
// ─────────────────────────────────────────────
const salesByMonth = [
  { month: "Jul", value: 35000, orders: 28 },
  { month: "Ago", value: 42000, orders: 34 },
  { month: "Set", value: 58000, orders: 47 },
  { month: "Out", value: 51000, orders: 41 },
  { month: "Nov", value: 73000, orders: 62 },
  { month: "Dez", value: 89000, orders: 78 },
  { month: "Jan", value: 87000, orders: 74 },
];

const topProducts = [
  { name: "Milho Fresco",         category: "Cereais",  sales: 5250, qty: 139, pct: 18 },
  { name: "Cachos de Banana",     category: "Frutas",   sales: 1000, qty: 100, pct: 14 },
  { name: "Arroz Branco",         category: "Cereais",  sales: 900,  qty: 230, pct: 12 },
  { name: "Manga Fresca",         category: "Frutas",   sales: 810,  qty: 183, pct: 10 },
  { name: "Tomate Fresco Orgânico",category: "Verduras", sales: 450,  qty: 25,  pct: 8  },
];

const byDistrict = [
  { district: "Nampula",     total: 12, pct: 48 },
  { district: "Monapo",      total: 5,  pct: 20 },
  { district: "Nacala-Porto",total: 4,  pct: 16 },
  { district: "Malema",      total: 2,  pct: 8  },
  { district: "Meconta",     total: 2,  pct: 8  },
];

const impactIndicators = [
  { icon: Users,    label: "Agricultores Ligados",     value: "1",   unit: "",      delta: "+1 este mês",    up: true  },
  { icon: Package,  label: "Produtos Publicados",      value: "20",  unit: "",      delta: "+4 este mês",    up: true  },
  { icon: DollarSign,label: "Receita Total (MZN)",     value: "87k", unit: "",      delta: "+21% vs. Dez",   up: true  },
  { icon: Truck,    label: "Entregas Realizadas",      value: "74",  unit: "",      delta: "-3 em atraso",   up: false },
];

const maxSales = Math.max(...salesByMonth.map((s) => s.value));

type Period = "7d" | "30d" | "6m" | "12m";

// ─────────────────────────────────────────────
// Utilitário: exportar relatório CSV
// ─────────────────────────────────────────────
function exportReportCSV() {
  const headers = ["Mês", "Vendas (MZN)", "Encomendas"];
  const rows    = salesByMonth.map((s) => [s.month, s.value, s.orders]);
  const csv = [headers, ...rows].map((r) => r.join(";")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url; link.download = "relatorio_kumela.csv"; link.click();
  URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────────
// Página
// ─────────────────────────────────────────────
export default function AdminReportsPage() {
  const [period, setPeriod] = useState<Period>("6m");

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">

      {/* ── Cabeçalho ── */}
      <SectionHeader
        title="Relatórios"
        subtitle="Indicadores de desempenho e impacto do sistema KUmela"
      >
        <PrimaryButton icon={Download} variant="gray" size="sm" onClick={exportReportCSV}>
          Exportar CSV
        </PrimaryButton>
        <PrimaryButton icon={FileText} variant="gray" size="sm" onClick={() => window.print()}>
          Imprimir PDF
        </PrimaryButton>
      </SectionHeader>

      {/* ── Selector de período ── */}
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#0D1F10] p-1 rounded-xl w-fit">
        {([["7d", "7 dias"], ["30d", "30 dias"], ["6m", "6 meses"], ["12m", "12 meses"]] as [Period, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setPeriod(key)}
            className={[
              "px-4 py-2 rounded-lg text-xs font-bold transition-all min-h-[36px]",
              period === key
                ? "bg-white dark:bg-green-800 text-green-700 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200",
            ].join(" ")}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Indicadores de impacto ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {impactIndicators.map((ind) => (
          <div
            key={ind.label}
            className="bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                <ind.icon size={20} aria-hidden="true" />
              </div>
              <span className={[
                "flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full",
                ind.up
                  ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-50  text-red-600   dark:bg-red-900/20   dark:text-red-400",
              ].join(" ")}>
                {ind.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {ind.delta}
              </span>
            </div>
            <p className="text-2xl font-black text-gray-900 dark:text-white">{ind.value}</p>
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mt-1">{ind.label}</p>
          </div>
        ))}
      </div>

      {/* ── Gráfico de vendas + distribuição geográfica ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Gráfico de barras — vendas mensais */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30 p-5">
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-sm font-black text-gray-900 dark:text-white">Evolução de Vendas</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Receita mensal em MZN</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400">
              <TrendingUp size={14} aria-hidden="true" />
              +18% vs. período anterior
            </div>
          </div>

          {/* Barras */}
          <div className="flex items-end gap-2 h-44 mt-5">
            {salesByMonth.map((s, i) => {
              const h    = Math.round((s.value / maxSales) * 100);
              const last = i === salesByMonth.length - 1;
              return (
                <div key={s.month} className="flex-1 flex flex-col items-center gap-1.5 group">
                  {/* Tooltip ao hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center">
                    <p className="text-[10px] font-black text-gray-700 dark:text-gray-200 whitespace-nowrap">
                      {(s.value / 1000).toFixed(0)}k MZN
                    </p>
                    <p className="text-[9px] text-gray-400">{s.orders} enc.</p>
                  </div>
                  <div className="w-full relative" style={{ height: `${h}%` }}>
                    <div className={[
                      "absolute inset-0 rounded-lg transition-all group-hover:brightness-110",
                      last ? "bg-green-600 shadow-lg shadow-green-600/30" : "bg-green-100 dark:bg-green-900/40",
                    ].join(" ")} />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">{s.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Distribuição geográfica por distrito */}
        <div className="bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30 p-5">
          <p className="text-sm font-black text-gray-900 dark:text-white mb-1">Por Distrito</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Nampula — produtos publicados</p>
          {byDistrict.map((d) => (
            <div key={d.district} className="flex items-center gap-3 mb-3.5">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 w-24 flex-shrink-0 truncate">
                {d.district}
              </span>
              <div className="flex-1 h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-green-500 dark:bg-green-600 transition-all"
                  style={{ width: `${d.pct}%` }}
                />
              </div>
              <span className="text-xs font-black text-gray-600 dark:text-gray-300 w-4 text-right">
                {d.total}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Produtos mais vendidos ── */}
      <div className="bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-green-900/30">
          <p className="text-sm font-black text-gray-900 dark:text-white">Top 5 Produtos</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Por volume de vendas</p>
        </div>
        <div className="p-5 space-y-4">
          {topProducts.map((p, i) => (
            <div key={p.name} className="flex items-center gap-4">
              {/* Posição */}
              <div className={[
                "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0",
                i === 0 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                i === 1 ? "bg-gray-100  text-gray-500  dark:bg-gray-800   dark:text-gray-400" :
                i === 2 ? "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400" :
                          "bg-green-50  text-green-600 dark:bg-green-900/20 dark:text-green-400",
              ].join(" ")}>
                {i + 1}
              </div>

              {/* Nome + barra */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">{p.name}</p>
                  <span className="text-xs font-black text-gray-900 dark:text-white ml-2 whitespace-nowrap">
                    {p.sales.toLocaleString("pt-MZ")} MZN
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-green-500 dark:bg-green-600"
                    style={{ width: `${p.pct * 4}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">{p.category}</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">{p.qty} un.</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Resumo de impacto social ── */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <BarChartBig size={22} aria-hidden="true" />
          <p className="font-black text-base">Impacto Social — KUmela Nampula</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "1",    label: "Agricultor conectado"   },
            { value: "20",   label: "Produtos no mercado"    },
            { value: "74",   label: "Entregas realizadas"    },
            { value: "~15%", label: "Redução de desperdício" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-black text-white">{stat.value}</p>
              <p className="text-xs text-green-200 mt-1 leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}