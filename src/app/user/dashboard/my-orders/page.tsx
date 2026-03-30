// ─────────────────────────────────────────────────────────────────────────────
// app/dashboard/my-orders/page.tsx — Minhas Encomendas
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import { ClipboardList } from "lucide-react";
import { SectionHeader, StatusBadge, FilterSelect, EmptyState, AvatarInitials } from "@/components/ui";
import { myOrders } from "@/data/userData";

const TABS = [
  { value: "all",     label: "Todas"        },
  { value: "buyer",   label: "Como Comprador" },
  { value: "user",  label: "Como Vendedor"  },
];

const STATUS_OPTS = [
  { value: "all",         label: "Todos os estados" },
  { value: "pending",     label: "Pendentes"         },
  { value: "confirmed",   label: "Confirmadas"       },
  { value: "in_delivery", label: "Em entrega"        },
  { value: "delivered",   label: "Entregues"         },
  { value: "cancelled",   label: "Canceladas"        },
];

export default function MyOrdersPage() {
  const myName = "Lutyrano Etrice";
  const [tab,       setTab]       = useState("all");
  const [statusFil, setStatusFil] = useState("all");

  const filtered = myOrders.filter((o) => {
    const matchTab    = tab === "all"    ||
                        (tab === "buyer"  && o.buyerName  === myName) ||
                        (tab === "user" && o.userName === myName);
    const matchStatus = statusFil === "all" || o.status === statusFil;
    return matchTab && matchStatus;
  });

  return (
<div className="p-4 md:p-6 space-y-6 w-full">
      <SectionHeader title="Minhas Encomendas" subtitle={`${filtered.length} encomendas`} />

      {/* Tabs */}
      <div className="flex bg-gray-100 dark:bg-[#0D1F10] p-1 rounded-xl gap-1 w-fit">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={[
              "px-4 py-2 rounded-lg text-xs font-bold transition-all min-h-[36px]",
              tab === t.value
                ? "bg-white dark:bg-green-800 text-green-700 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      <FilterSelect value={statusFil} onChange={setStatusFil} options={STATUS_OPTS} label="Estado" />

      {filtered.length === 0 ? (
        <EmptyState icon={ClipboardList} title="Sem encomendas" description="Ainda não há encomendas neste separador." />
      ) : (
        <div className="space-y-3">
          {filtered.map((o) => {
            const isBuyer = o.buyerName === myName;
            return (
              <div
                key={o.id}
                className="bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30 p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      isBuyer ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" : "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    }`}>
                      {isBuyer ? "COMPRADOR" : "VENDEDOR"}
                    </span>
                    <span className="font-mono text-xs text-gray-400 dark:text-gray-500">#{o.id}</span>
                  </div>
                  <StatusBadge status={o.status} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{o.productName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{o.quantity} {o.unit} · {o.district}</p>
                  </div>
                  <p className="text-base font-black text-gray-900 dark:text-white whitespace-nowrap">
                    {o.total.toLocaleString("pt-MZ")} MZN
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-gray-50 dark:border-green-900/20">
                  <AvatarInitials name={isBuyer ? o.userName : o.buyerName} size="sm" />
                  <div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">{isBuyer ? "Vendedor" : "Comprador"}</p>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {isBuyer ? o.userName : o.buyerName}
                    </p>
                  </div>
                  <span className="ml-auto text-[11px] text-gray-400 dark:text-gray-500">
                    {new Date(o.createdAt).toLocaleDateString("pt-PT")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}