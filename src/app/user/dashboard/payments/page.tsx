// ─────────────────────────────────────────────────────────────────────────────
// app/dashboard/payments/page.tsx — Pagamentos
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import { CreditCard, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, RefreshCw } from "lucide-react";
import { SectionHeader, StatusBadge, FilterSelect } from "@/components/ui";
import { myTransactions } from "@/data/userData";

const TYPE_OPTS = [
  { value: "all",      label: "Todas"      },
  { value: "sale",     label: "Vendas"     },
  { value: "purchase", label: "Compras"    },
  { value: "refund",   label: "Reembolsos" },
];

export default function PaymentsPage() {
  const [typeFil, setTypeFil] = useState("all");

  const filtered = myTransactions.filter((t) => typeFil === "all" || t.type === typeFil);

  const income  = myTransactions.filter((t) => t.type === "sale"     && t.status === "completed").reduce((s, t) => s + t.amount, 0);
  const expense = myTransactions.filter((t) => t.type === "purchase" && t.status === "completed").reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;

  const typeIcon = { sale: ArrowUpRight, purchase: ArrowDownLeft, commission: ArrowUpRight, refund: RefreshCw };
  const typeColor: Record<string, string> = {
    sale:       "bg-green-50  text-green-600  dark:bg-green-900/30  dark:text-green-400",
    purchase:   "bg-red-50    text-red-500    dark:bg-red-900/20    dark:text-red-400",
    commission: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
    refund:     "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
  };

  return (
<div className="p-4 md:p-6 space-y-6 w-full">
      <SectionHeader title="Pagamentos" subtitle="Histórico financeiro e carteira" />

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Saldo",    value: balance, icon: CreditCard,   color: balance >= 0 ? "text-green-700 dark:text-green-400" : "text-red-600", bg: "bg-white dark:bg-[#0D1F10]" },
          { label: "Receita",  value: income,  icon: TrendingUp,   color: "text-green-700 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/10" },
          { label: "Despesas", value: expense, icon: TrendingDown, color: "text-red-600 dark:text-red-400",     bg: "bg-red-50 dark:bg-red-900/10"    },
        ].map((k) => (
          <div key={k.label} className={`${k.bg} rounded-xl p-3.5 border border-gray-100 dark:border-green-900/30`}>
            <k.icon size={16} className={`${k.color} mb-1.5`} aria-hidden="true" />
            <p className={`text-lg font-black ${k.color} leading-none`}>
              {(k.value / 1000).toFixed(1)}k
            </p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">MZN · {k.label}</p>
          </div>
        ))}
      </div>

      <FilterSelect value={typeFil} onChange={setTypeFil} options={TYPE_OPTS} label="Tipo" />

      {/* Lista de transacções */}
      <div className="space-y-2">
        {filtered.map((t) => {
          const Icon = typeIcon[t.type] ?? ArrowUpRight;
          const isIncome = t.type === "sale" || t.type === "refund";
          return (
            <div
              key={t.id}
              className="flex items-center gap-3 p-4 bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColor[t.type]}`}>
                <Icon size={18} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">{t.productName}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{t.from} → {t.to} · {t.date}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`text-base font-black ${isIncome ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                  {isIncome ? "+" : "-"}{t.amount.toLocaleString("pt-MZ")} MZN
                </p>
                <StatusBadge status={t.status} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}