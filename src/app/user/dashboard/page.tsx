// ─────────────────────────────────────────────────────────────────────────────
// app/dashboard/page.tsx — Início (Painel Pessoal do Utilizador)
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Package, ShoppingBag, Truck, CreditCard,
  ArrowRight, Volume2, Star, MessageCircle,
} from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/ui";
import { myOrders, myTransactions, myDeliveries } from "@/data/userData";

// Dicas rápidas de boas práticas
const tips = [
  { id: 1, icon: "📦", title: "Conservar bem",  text: "Guarde os produtos em local fresco e seco para manter a qualidade." },
  { id: 2, icon: "💰", title: "Preço justo",    text: "Consulte a tabela de preços do mercado antes de anunciar." },
  { id: 3, icon: "📸", title: "Boa foto",       text: "Use fotos claras e reais do produto para atrair mais compradores." },
];

export default function DashboardHomePage() {
  const { user } = useAuth();
  const router   = useRouter();

  const pendingOrders = myOrders.filter((o) => o.status === "pending").length;
  const myProducts    = 6; // simulado
  const wallet        = myTransactions
    .filter((t) => t.type === "sale" && t.status === "completed")
    .reduce((s, t) => s + t.amount, 0);
  const activeDelivery = myDeliveries.filter((d) => d.status === "in_transit").length;

  const greeting = (() => {
    const h = new Date().getHours();
    return h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite";
  })();

  return (
<div className="p-4 md:p-6 space-y-6 w-full">
      {/* ── Saudação ── */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            {greeting}
          </p>
          <h1 className="text-xl font-black text-gray-900 dark:text-white mt-0.5">
            {user?.name ?? "Utilizador"} 👋
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Aqui está o resumo da sua actividade hoje.
          </p>
        </div>
        {/* Botão de áudio — acessibilidade */}
        <button
          aria-label="Ouvir resumo em voz alta"
          className="flex-shrink-0 w-11 h-11 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
        >
          <Volume2 size={18} aria-hidden="true" />
        </button>
      </div>

      {/* ── Cartões de resumo ── */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={Package}
          label="Meus Produtos"
          value={myProducts}
          sub="activos no mercado"
          onClick={() => router.push("/dashboard/my-products")}
        />
        <StatCard
          icon={ShoppingBag}
          label="Encomendas Pendentes"
          value={pendingOrders}
          sub={pendingOrders > 0 ? "aguarda confirmação" : "tudo em dia"}
          onClick={() => router.push("/dashboard/my-orders")}
        />
        <StatCard
          icon={CreditCard}
          label="Carteira (MZN)"
          value={`${(wallet / 1000).toFixed(1)}k`}
          sub="saldo disponível"
          iconColor="text-yellow-600 dark:text-yellow-400"
          bgColor="bg-yellow-50 dark:bg-yellow-900/20"
          onClick={() => router.push("/dashboard/payments")}
        />
        <StatCard
          icon={Truck}
          label="Entregas Activas"
          value={activeDelivery}
          sub="em trânsito"
          iconColor="text-blue-600 dark:text-blue-400"
          bgColor="bg-blue-50 dark:bg-blue-900/20"
          onClick={() => router.push("/dashboard/deliveries")}
        />
      </div>

      {/* ── Acções rápidas — 5 passos ── */}
      <div className="bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30 p-4">
        <p className="text-sm font-black text-gray-900 dark:text-white mb-4">Acções Rápidas</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { icon: "📦", label: "Anunciar Produto", href: "/dashboard/my-products?new=1",  color: "bg-green-50 dark:bg-green-900/20"  },
            { icon: "🛒", label: "Ver Mercado",       href: "/dashboard/market",              color: "bg-blue-50 dark:bg-blue-900/10"   },
            { icon: "🚚", label: "Solicitar Entrega", href: "/dashboard/deliveries",          color: "bg-orange-50 dark:bg-orange-900/10" },
            { icon: "💳", label: "Ver Pagamentos",    href: "/dashboard/payments",            color: "bg-yellow-50 dark:bg-yellow-900/10" },
          ].map((a) => (
            <button
              key={a.label}
              onClick={() => router.push(a.href)}
              className={`${a.color} flex flex-col items-center gap-2 py-4 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 hover:opacity-80 transition-opacity min-h-[80px]`}
            >
              <span className="text-2xl" aria-hidden="true">{a.icon}</span>
              <span className="text-center leading-tight">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Últimas encomendas ── */}
      <div className="bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30">
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 dark:border-green-900/30">
          <p className="text-sm font-black text-gray-900 dark:text-white">Últimas Encomendas</p>
          <button
            onClick={() => router.push("/dashboard/my-orders")}
            className="text-xs font-semibold text-green-600 hover:text-green-700 dark:text-green-400 flex items-center gap-1"
          >
            Ver todas <ArrowRight size={12} />
          </button>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-green-900/20">
          {myOrders.slice(0, 3).map((o) => (
            <div key={o.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50/50 dark:hover:bg-green-900/10 transition-colors">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{o.productName}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{o.quantity} {o.unit} · {o.district}</p>
              </div>
              <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                <span className="text-sm font-black text-gray-900 dark:text-white whitespace-nowrap">
                  {o.total.toLocaleString("pt-MZ")} MZN
                </span>
                <StatusBadge status={o.status} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Dicas rápidas (áudio disponível) ── */}
      <div>
        <p className="text-sm font-black text-gray-900 dark:text-white mb-3">
          Dicas de Boas Práticas
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl" aria-hidden="true">{tip.icon}</span>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{tip.title}</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{tip.text}</p>
              {/* Botão de áudio da dica */}
              <button
                aria-label={`Ouvir dica: ${tip.title}`}
                className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-green-600 dark:text-green-400 hover:underline"
              >
                <Volume2 size={12} aria-hidden="true" /> Ouvir dica
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Atalhos de comunicação ── */}
      <div className="flex gap-3">
        <button
          onClick={() => router.push("/dashboard/messages")}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-gray-100 dark:border-green-900/30 bg-white dark:bg-[#0D1F10] text-sm font-bold text-gray-700 dark:text-gray-200 hover:border-green-300 dark:hover:border-green-700 transition-all min-h-[52px]"
        >
          <MessageCircle size={18} className="text-green-600 dark:text-green-400" aria-hidden="true" />
          Mensagens
        </button>
        <button
          onClick={() => router.push("/dashboard/reviews")}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-gray-100 dark:border-green-900/30 bg-white dark:bg-[#0D1F10] text-sm font-bold text-gray-700 dark:text-gray-200 hover:border-green-300 dark:hover:border-green-700 transition-all min-h-[52px]"
        >
          <Star size={18} className="text-yellow-500" aria-hidden="true" />
          Avaliações
        </button>
      </div>
    </div>
  );
}