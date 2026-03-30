// ─────────────────────────────────────────────────────────────────────────────
// components/ui/index.tsx — Componentes reutilizáveis do KUmela
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

// ─────────────────────────────────────────────
// KpiCard — cartão de métricas do dashboard
// ─────────────────────────────────────────────
interface KpiCardProps {
  label:       string;
  value:       string | number;
  delta?:      string;        // ex: "+12%" ou "-3"
  up?:         boolean;
  icon:        React.ElementType;
  iconColor?:  string;        // classe tailwind para cor do ícone
  onClick?:    () => void;
}

export function KpiCard({
  label, value, delta, up, icon: Icon, iconColor = "text-green-600", onClick,
}: KpiCardProps) {
  return (
    <button
      onClick={onClick}
      className={[
        "group flex flex-col gap-3 p-5 rounded-2xl text-left w-full",
        "bg-white dark:bg-[#0D1F10]",
        "border border-gray-100 dark:border-green-900/30",
        "hover:border-green-200 dark:hover:border-green-700/50",
        "hover:shadow-lg hover:shadow-green-600/5",
        "transition-all duration-200",
        onClick ? "cursor-pointer" : "cursor-default",
      ].join(" ")}
    >
      {/* Linha superior: ícone + delta */}
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center ${iconColor}`}>
          <Icon size={20} aria-hidden="true" />
        </div>
        {delta && (
          <span className={[
            "flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full",
            up
              ? "text-green-700 bg-green-50 dark:text-green-400 dark:bg-green-900/30"
              : "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20",
          ].join(" ")}>
            {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {delta}
          </span>
        )}
      </div>

      {/* Valor e label */}
      <div>
        <p className="text-2xl font-black text-gray-900 dark:text-white leading-none">
          {value}
        </p>
        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mt-1">
          {label}
        </p>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────
// StatusBadge — badge colorido de estado
// ─────────────────────────────────────────────
type BadgeVariant =
  | "active"   | "inactive" | "pending"
  | "rejected" | "delivered"| "cancelled"
  | "completed"| "failed"   | "in_delivery"
  | "confirmed";

const badgeConfig: Record<BadgeVariant, { label: string; classes: string }> = {
  active:      { label: "Activo",       classes: "bg-green-50  text-green-700  dark:bg-green-900/30  dark:text-green-400"  },
  inactive:    { label: "Inactivo",     classes: "bg-gray-100  text-gray-500   dark:bg-gray-800      dark:text-gray-400"   },
  pending:     { label: "Pendente",     classes: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400" },
  rejected:    { label: "Rejeitado",    classes: "bg-red-50    text-red-600    dark:bg-red-900/20    dark:text-red-400"    },
  delivered:   { label: "Entregue",     classes: "bg-green-50  text-green-700  dark:bg-green-900/30  dark:text-green-400"  },
  cancelled:   { label: "Cancelado",    classes: "bg-red-50    text-red-600    dark:bg-red-900/20    dark:text-red-400"    },
  completed:   { label: "Concluído",    classes: "bg-green-50  text-green-700  dark:bg-green-900/30  dark:text-green-400"  },
  failed:      { label: "Falhado",      classes: "bg-red-50    text-red-600    dark:bg-red-900/20    dark:text-red-400"    },
  in_delivery: { label: "Em entrega",   classes: "bg-blue-50   text-blue-600   dark:bg-blue-900/20   dark:text-blue-400"   },
  confirmed:   { label: "Confirmado",   classes: "bg-blue-50   text-blue-600   dark:bg-blue-900/20   dark:text-blue-400"   },
};

export function StatusBadge({ status }: { status: BadgeVariant }) {
  const cfg = badgeConfig[status] ?? badgeConfig.inactive;
  return (
    <span className={`inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full ${cfg.classes}`}>
      {cfg.label}
    </span>
  );
}

// ─────────────────────────────────────────────
// SectionHeader — cabeçalho de secção com título, subtítulo e acções
// ─────────────────────────────────────────────
interface SectionHeaderProps {
  title:    string;
  subtitle?: string;
  children?: React.ReactNode;  // botões / acções do lado direito
}

export function SectionHeader({ title, subtitle, children }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl font-black text-gray-900 dark:text-white">{title}</h1>
        {subtitle && (
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">{subtitle}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-2 flex-wrap">{children}</div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// SearchBar — barra de pesquisa reutilizável
// ─────────────────────────────────────────────
interface SearchBarProps {
  value:       string;
  onChange:    (v: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Pesquisar…" }: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={[
          "pl-9 pr-4 py-2.5 text-sm rounded-xl w-full min-w-[200px]",
          "bg-gray-50 dark:bg-[#0D1F10]",
          "border border-gray-200 dark:border-green-900/40",
          "text-gray-800 dark:text-gray-200 placeholder-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400",
          "transition-all",
        ].join(" ")}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// FilterSelect — select de filtro reutilizável
// ─────────────────────────────────────────────
interface FilterSelectProps {
  value:    string;
  onChange: (v: string) => void;
  options:  { value: string; label: string }[];
  label?:   string;
}

export function FilterSelect({ value, onChange, options, label }: FilterSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      className={[
        "px-3 py-2.5 text-sm rounded-xl",
        "bg-gray-50 dark:bg-[#0D1F10]",
        "border border-gray-200 dark:border-green-900/40",
        "text-gray-700 dark:text-gray-300",
        "focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400",
        "transition-all cursor-pointer",
      ].join(" ")}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

// ─────────────────────────────────────────────
// PrimaryButton — botão de acção principal
// ─────────────────────────────────────────────
interface PrimaryButtonProps {
  children:  React.ReactNode;
  onClick?:  () => void;
  icon?:     React.ElementType;
  disabled?: boolean;
  variant?:  "green" | "red" | "gray";
  size?:     "sm" | "md";
}

const btnVariants = {
  green: "bg-green-600 hover:bg-green-700 text-white shadow-sm shadow-green-600/20",
  red:   "bg-red-600   hover:bg-red-700   text-white shadow-sm shadow-red-600/20",
  gray:  "bg-gray-100  hover:bg-gray-200  text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200",
};

export function PrimaryButton({
  children, onClick, icon: Icon, disabled, variant = "green", size = "md",
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        "flex items-center gap-2 font-semibold rounded-xl transition-all",
        size === "sm" ? "px-3 py-2 text-xs min-h-[36px]" : "px-4 py-2.5 text-sm min-h-[44px]",
        btnVariants[variant],
        disabled && "opacity-50 cursor-not-allowed",
      ].join(" ")}
    >
      {Icon && <Icon size={size === "sm" ? 14 : 16} aria-hidden="true" />}
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────
// DataTable — tabela de dados reutilizável
// ─────────────────────────────────────────────
interface Column<T> {
  key:       string;
  header:    string;
  render:    (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns:    Column<T>[];
  data:       T[];
  keyField:   keyof T;
  emptyText?: string;
  loading?:   boolean;
}

export function DataTable<T>({
  columns, data, keyField, emptyText = "Sem resultados.", loading,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-100 dark:border-green-900/30 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-14 bg-gray-50 dark:bg-[#0D1F10] border-b border-gray-100 dark:border-green-900/20 animate-pulse" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="Nenhum resultado"
        description={emptyText}
      />
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 dark:border-green-900/30 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Cabeçalho */}
          <thead>
            <tr className="bg-gray-50 dark:bg-[#0D1F10] border-b border-gray-100 dark:border-green-900/30">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={[
                    "px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider",
                    "text-gray-400 dark:text-gray-500",
                    col.className,
                  ].join(" ")}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Corpo */}
          <tbody className="bg-white dark:bg-[#0A1A0E] divide-y divide-gray-50 dark:divide-green-900/20">
            {data.map((row, idx) => (
              <tr
                key={String(row[keyField])}
                className={[
                  "hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-colors",
                  idx % 2 === 1 ? "bg-gray-50/40 dark:bg-[#0D1F10]/40" : "",
                ].join(" ")}
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3.5 ${col.className ?? ""}`}>
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Pagination — paginação reutilizável
// ─────────────────────────────────────────────
interface PaginationProps {
  page:       number;
  totalPages: number;
  onChange:   (p: number) => void;
  total?:     number;
  perPage?:   number;
}

export function Pagination({ page, totalPages, onChange, total, perPage = 10 }: PaginationProps) {
  if (totalPages <= 1) return null;

  const from = (page - 1) * perPage + 1;
  const to   = Math.min(page * perPage, total ?? totalPages * perPage);

  return (
    <div className="flex items-center justify-between pt-4">
      {total !== undefined && (
        <p className="text-xs text-gray-400 dark:text-gray-500">
          A mostrar <span className="font-bold text-gray-600 dark:text-gray-300">{from}–{to}</span> de{" "}
          <span className="font-bold text-gray-600 dark:text-gray-300">{total}</span>
        </p>
      )}
      <div className="flex items-center gap-1 ml-auto">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          aria-label="Página anterior"
          className="p-2 rounded-lg text-gray-500 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all min-w-[36px] min-h-[36px] flex items-center justify-center"
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const p = totalPages <= 5 ? i + 1 : Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
          return (
            <button
              key={p}
              onClick={() => onChange(p)}
              aria-label={`Página ${p}`}
              aria-current={p === page ? "page" : undefined}
              className={[
                "w-9 h-9 rounded-lg text-sm font-bold transition-all",
                p === page
                  ? "bg-green-600 text-white"
                  : "text-gray-500 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700",
              ].join(" ")}
            >
              {p}
            </button>
          );
        })}

        <button
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Próxima página"
          className="p-2 rounded-lg text-gray-500 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all min-w-[36px] min-h-[36px] flex items-center justify-center"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// EmptyState — estado vazio reutilizável
// ─────────────────────────────────────────────
interface EmptyStateProps {
  icon:        React.ElementType;
  title:       string;
  description?: string;
  action?:     React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-dashed border-gray-200 dark:border-green-900/30">
      <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-4">
        <Icon size={26} className="text-green-400 dark:text-green-600" aria-hidden="true" />
      </div>
      <p className="text-base font-bold text-gray-700 dark:text-gray-300">{title}</p>
      {description && (
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 max-w-xs">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────
// ConfirmModal — modal de confirmação de acção destrutiva
// ─────────────────────────────────────────────
interface ConfirmModalProps {
  open:        boolean;
  title:       string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?:  string;
  onConfirm:   () => void;
  onCancel:    () => void;
  danger?:     boolean;
}

export function ConfirmModal({
  open, title, description,
  confirmLabel = "Confirmar", cancelLabel = "Cancelar",
  onConfirm, onCancel, danger = false,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    >
      {/* Fundo escuro */}
      <div
        onClick={onCancel}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Caixa */}
      <div className="relative z-10 bg-white dark:bg-[#0A1A0E] rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-green-100 dark:border-green-900/40 text-center">
        <h3 id="confirm-title" className="text-base font-black text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{description}</p>
        )}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl font-bold text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors min-h-[48px]"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={[
              "flex-1 py-3 rounded-xl font-bold text-sm text-white transition-all min-h-[48px]",
              danger
                ? "bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20"
                : "bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20",
            ].join(" ")}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// AvatarInitials — avatar com iniciais do nome
// ─────────────────────────────────────────────
interface AvatarProps {
  name:   string;
  size?:  "sm" | "md" | "lg";
  color?: string;
}

const sizeClasses = { sm: "w-7 h-7 text-[10px]", md: "w-9 h-9 text-sm", lg: "w-12 h-12 text-base" };

export function AvatarInitials({ name, size = "md", color = "bg-green-600" }: AvatarProps) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      aria-label={`Avatar de ${name}`}
      className={`${sizeClasses[size]} ${color} rounded-full text-white font-black flex items-center justify-center flex-shrink-0`}
    >
      {initials}
    </div>
  );
}