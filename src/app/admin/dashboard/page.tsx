// ─────────────────────────────────────────────────────────────────────────────
// app/admin/dashboard/page.tsx — Painel Geral do Admin
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Package, Users, DollarSign, Truck,
  ShoppingBag, TrendingUp, AlertTriangle,
  CheckCircle2, Clock, ArrowRight,
} from "lucide-react";
import {
  KpiCard, SectionHeader, StatusBadge, AvatarInitials, PrimaryButton,
} from "@/components/ui";
import { productsData } from "@/data/products";
import { USERS } from "@/lib/users";
import type { Order, Transaction } from "@/types";

// ─────────────────────────────────────────────
// Dados mockados para o painel geral
// ─────────────────────────────────────────────
const recentOrders: Order[] = [
  { id: "ORD001", productId: 1, productName: "Tomate Fresco",  buyerName: "João Cliente",     userName: "João da Horta",    quantity: 10, unit: "kg",    total: 450,  status: "pending",     district: "Nampula",  createdAt: "2025-01-15T10:30:00Z" },
  { id: "ORD002", productId: 7, productName: "Cachos de Banana", buyerName: "Lutyrano Etrice", userName: "Banana & Cia",    quantity: 5,  unit: "kg",    total: 1000, status: "delivered",   district: "Monapo",   createdAt: "2025-01-15T09:00:00Z" },
  { id: "ORD003", productId: 4, productName: "Cenouras",       buyerName: "Maria Vendedora",  userName: "Hortaliças Gaza", quantity: 20, unit: "kg",    total: 900,  status: "in_delivery", district: "Nacala",   createdAt: "2025-01-14T16:00:00Z" },
  { id: "ORD004", productId: 18, productName: "Milho Fresco",  buyerName: "João Cliente",     userName: "Agro Comercial",  quantity: 50, unit: "kg",    total: 5250, status: "confirmed",   district: "Meconta",  createdAt: "2025-01-14T14:00:00Z" },
  { id: "ORD005", productId: 9, productName: "Manga Fresca",   buyerName: "Lutyrano Etrice",  userName: "Manga de Ouro",   quantity: 15, unit: "kg",    total: 1350, status: "cancelled",   district: "Mossuril", createdAt: "2025-01-13T11:00:00Z" },
];

const recentTransactions: Transaction[] = [
  { id: "T001", type: "sale",       amount: 450,  from: "João Cliente",    to: "João da Horta",   productName: "Tomate Fresco",   status: "completed", date: "2025-01-15" },
  { id: "T002", type: "commission", amount: 45,   from: "Plataforma",      to: "KUmela",          productName: "Comissão 10%",    status: "completed", date: "2025-01-15" },
  { id: "T003", type: "sale",       amount: 1000, from: "Lutyrano Etrice", to: "Banana & Cia",    productName: "Cachos de Banana",status: "completed", date: "2025-01-14" },
  { id: "T004", type: "refund",     amount: 1350, from: "KUmela",          to: "Lutyrano Etrice", productName: "Manga Fresca",    status: "pending",   date: "2025-01-13" },
];

// Dados do gráfico de vendas por mês (últimos 6 meses)
const salesChart = [
  { month: "Ago", value: 42000 },
  { month: "Set", value: 58000 },
  { month: "Out", value: 51000 },
  { month: "Nov", value: 73000 },
  { month: "Dez", value: 89000 },
  { month: "Jan", value: 87000 },
];

const maxChartValue = Math.max(...salesChart.map((s) => s.value));

// Alertas pendentes do sistema
const alerts = [
  { id: 1, type: "warning", message: "3 produtos pendentes de aprovação",    href: "/admin/dashboard/produtos"      },
  { id: 2, type: "info",    message: "2 entregas em atraso hoje",             href: "/admin/dashboard/transacoes"    },
  { id: 3, type: "success", message: "Tabela de preços actualizada ontem",    href: "/admin/dashboard/precos"        },
];

// ─────────────────────────────────────────────
// Componente da página
// ─────────────────────────────────────────────
export default function AdminDashboardPage() {
  const router = useRouter();

  // KPIs calculados a partir dos dados mockados
  const totalProducts  = productsData.length;
  const totalUsers     = USERS.filter((u) => u.role !== "admin").length;
  const totalRevenue   = recentTransactions.filter((t) => t.type === "sale").reduce((s, t) => s + t.amount, 0);
  const pendingOrders  = recentOrders.filter((o) => o.status === "pending").length;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">

      {/* ── Cabeçalho da página ── */}
      <SectionHeader
        title="Painel Geral"
        subtitle="Visão geral do sistema KUmela — Nampula"
      >
        <PrimaryButton
          icon={ArrowRight}
          onClick={() => router.push("/admin/dashboard/relatorios")}
          size="sm"
        >
          Ver Relatórios
        </PrimaryButton>
      </SectionHeader>

      {/* ── Alertas do sistema ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {alerts.map((a) => (
          <button
            key={a.id}
            onClick={() => router.push(a.href)}
            className={[
              "flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all",
              "border hover:shadow-md",
              a.type === "warning" ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-800/40" :
              a.type === "success" ? "bg-green-50  border-green-200  dark:bg-green-900/10  dark:border-green-800/40"  :
                                     "bg-blue-50   border-blue-200   dark:bg-blue-900/10   dark:border-blue-800/40",
            ].join(" ")}
          >
            {a.type === "warning" ? <AlertTriangle size={16} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0" /> :
             a.type === "success" ? <CheckCircle2  size={16} className="text-green-600  dark:text-green-400  flex-shrink-0" /> :
                                    <Clock         size={16} className="text-blue-600   dark:text-blue-400   flex-shrink-0" />}
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{a.message}</span>
            <ArrowRight size={12} className="ml-auto text-gray-400 flex-shrink-0" />
          </button>
        ))}
      </div>

      {/* ── KPIs ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          label="Produtos Activos"
          value={totalProducts}
          delta="+4"
          up={true}
          icon={Package}
          onClick={() => router.push("/admin/dashboard/produtos")}
        />
        <KpiCard
          label="Utilizadores"
          value={totalUsers}
          delta="+2"
          up={true}
          icon={Users}
          onClick={() => router.push("/admin/dashboard/utilizadores")}
        />
        <KpiCard
          label="Receita (MZN)"
          value={`${(totalRevenue / 1000).toFixed(1)}k`}
          delta="+21%"
          up={true}
          icon={DollarSign}
          onClick={() => router.push("/admin/dashboard/transacoes")}
        />
        <KpiCard
          label="Encomendas Pendentes"
          value={pendingOrders}
          delta="-1"
          up={false}
          icon={ShoppingBag}
        />
      </div>

      {/* ── Gráfico + Encomendas recentes ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Gráfico de vendas mensais */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-sm font-black text-gray-900 dark:text-white">Vendas Mensais</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Últimos 6 meses (MZN)</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400">
              <TrendingUp size={14} />
              +18% vs. período anterior
            </div>
          </div>

          {/* Barras do gráfico */}
          <div className="flex items-end gap-3 h-36">
            {salesChart.map((s, i) => {
              const heightPct = Math.round((s.value / maxChartValue) * 100);
              const isLast = i === salesChart.length - 1;
              return (
                <div key={s.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">
                    {(s.value / 1000).toFixed(0)}k
                  </span>
                  <div className="w-full rounded-t-lg relative" style={{ height: `${heightPct}%` }}>
                    <div
                      className={[
                        "absolute inset-0 rounded-lg transition-all",
                        isLast
                          ? "bg-green-600 shadow-lg shadow-green-600/30"
                          : "bg-green-100 dark:bg-green-900/40",
                      ].join(" ")}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">
                    {s.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Distribuição por categoria */}
        <div className="bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30 p-5">
          <p className="text-sm font-black text-gray-900 dark:text-white mb-4">Por Categoria</p>
          {[
            { label: "Verduras",  value: 75, color: "bg-green-500" },
            { label: "Frutas",    value: 60, color: "bg-yellow-400" },
            { label: "Cereais",   value: 45, color: "bg-amber-500" },
            { label: "Raízes",    value: 40, color: "bg-orange-400" },
            { label: "Legumes",   value: 30, color: "bg-lime-500" },
            { label: "Laticínios",value: 15, color: "bg-blue-400" },
          ].map((cat) => (
            <div key={cat.label} className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 w-20 flex-shrink-0">
                {cat.label}
              </span>
              <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${cat.color}`}
                  style={{ width: `${cat.value}%` }}
                />
              </div>
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400 w-6 text-right">
                {cat.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Encomendas recentes ── */}
      <div className="bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-green-900/30">
          <p className="text-sm font-black text-gray-900 dark:text-white">Encomendas Recentes</p>
          <button
            onClick={() => router.push("/admin/dashboard/transacoes")}
            className="text-xs font-semibold text-green-600 hover:text-green-700 dark:text-green-400 flex items-center gap-1"
          >
            Ver todas <ArrowRight size={12} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50 dark:border-green-900/20">
                {["Encomenda", "Produto", "Comprador", "Total", "Distrito", "Estado"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-green-900/20">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-green-50/40 dark:hover:bg-green-900/10 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs font-bold text-gray-500 dark:text-gray-400">
                    #{order.id}
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-gray-800 dark:text-gray-200">
                    {order.productName}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <AvatarInitials name={order.buyerName} size="sm" />
                      <span className="text-gray-700 dark:text-gray-300 text-xs">{order.buyerName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-black text-gray-900 dark:text-white">
                    {order.total.toLocaleString("pt-MZ")} MZN
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-500 dark:text-gray-400">
                    {order.district}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Transacções recentes ── */}
      <div className="bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-green-900/30">
          <p className="text-sm font-black text-gray-900 dark:text-white">Últimas Transacções</p>
          <button
            onClick={() => router.push("/admin/dashboard/transacoes")}
            className="text-xs font-semibold text-green-600 hover:text-green-700 dark:text-green-400 flex items-center gap-1"
          >
            Ver todas <ArrowRight size={12} />
          </button>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-green-900/20">
          {recentTransactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-green-50/40 dark:hover:bg-green-900/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className={[
                  "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                  t.type === "sale"       ? "bg-green-50  dark:bg-green-900/30 text-green-600  dark:text-green-400"  :
                  t.type === "commission" ? "bg-blue-50   dark:bg-blue-900/20  text-blue-600   dark:text-blue-400"   :
                  t.type === "refund"     ? "bg-orange-50 dark:bg-orange-900/20 text-orange-500 dark:text-orange-400" :
                                            "bg-gray-100  dark:bg-gray-800      text-gray-500",
                ].join(" ")}>
                  <DollarSign size={16} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{t.productName}</p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">{t.from} → {t.to}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-black ${t.type === "refund" ? "text-orange-500" : "text-gray-900 dark:text-white"}`}>
                  {t.type === "refund" ? "-" : "+"}{t.amount.toLocaleString("pt-MZ")} MZN
                </p>
                <StatusBadge status={t.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}