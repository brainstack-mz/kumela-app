// ─────────────────────────────────────────────────────────────────────────────
// app/dashboard/reviews/page.tsx — Avaliações
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { SectionHeader } from "@/components/ui";
import { myReviews } from "@/data/userData";

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [tab, setTab] = useState<"received" | "given">("received");

  const filtered = myReviews.filter((r) => r.type === tab);
  const avgRating = myReviews.filter((r) => r.type === "received").reduce((s, r) => s + r.rating, 0) /
                    (myReviews.filter((r) => r.type === "received").length || 1);

  return (
<div className="p-4 md:p-6 space-y-6 w-full">
      <SectionHeader title="Avaliações" subtitle="O que dizem sobre si e as suas opiniões" />

      {/* Nota média */}
      <div className="bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30 p-5 flex items-center gap-5">
        <div className="text-center">
          <p className="text-4xl font-black text-gray-900 dark:text-white">{avgRating.toFixed(1)}</p>
          <StarRating rating={Math.round(avgRating)} size={16} />
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{myReviews.filter((r) => r.type === "received").length} avaliações</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map((s) => {
            const count = myReviews.filter((r) => r.type === "received" && r.rating === s).length;
            const pct   = (count / (myReviews.filter((r) => r.type === "received").length || 1)) * 100;
            return (
              <div key={s} className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 w-3">{s}</span>
                <Star size={10} className="text-yellow-400 fill-yellow-400 flex-shrink-0" />
                <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[11px] text-gray-400 dark:text-gray-500 w-3 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 dark:bg-[#0D1F10] p-1 rounded-xl gap-1 w-fit">
        {[{ value: "received", label: "Recebidas" }, { value: "given", label: "Dadas" }].map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value as any)}
            className={[
              "px-4 py-2 rounded-lg text-xs font-bold transition-all min-h-[36px]",
              tab === t.value
                ? "bg-white dark:bg-green-800 text-green-700 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400",
            ].join(" ")}
          >
            {t.label} ({myReviews.filter((r) => r.type === t.value).length})
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {filtered.map((r) => (
          <div key={r.id} className="bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                {tab === "received" ? r.authorName : r.targetName}
              </p>
              <StarRating rating={r.rating} />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Produto: <span className="font-semibold text-gray-700 dark:text-gray-300">{r.productName}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">"{r.comment}"</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500">{r.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}