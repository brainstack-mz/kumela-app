// ─────────────────────────────────────────────────────────────────────────────
// components/user/shared/StatCard.tsx
// Cartão de estatística simples para o dashboard do utilizador
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import React from "react";

interface StatCardProps {
  icon:       React.ElementType;
  label:      string;
  value:      string | number;
  sub?:       string;
  iconColor?: string;
  bgColor?:   string;
  onClick?:   () => void;
}

export default function StatCard({
  icon: Icon, label, value, sub,
  iconColor = "text-green-600 dark:text-green-400",
  bgColor   = "bg-green-50 dark:bg-green-900/20",
  onClick,
}: StatCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={[
        "flex items-center gap-3 p-4 rounded-2xl text-left w-full",
        "bg-white dark:bg-[#0D1F10]",
        "border border-gray-100 dark:border-green-900/30",
        onClick ? "hover:border-green-300 dark:hover:border-green-700 hover:shadow-md hover:shadow-green-600/5 cursor-pointer" : "cursor-default",
        "transition-all duration-200",
      ].join(" ")}
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${bgColor}`}>
        <Icon size={20} className={iconColor} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xl font-black text-gray-900 dark:text-white leading-none">{value}</p>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5 truncate">{label}</p>
        {sub && <p className="text-[11px] text-green-600 dark:text-green-400 font-semibold mt-0.5">{sub}</p>}
      </div>
    </button>
  );
}