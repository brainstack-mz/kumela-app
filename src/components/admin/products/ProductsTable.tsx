// ─────────────────────────────────────────────────────────────────────────────
// components/admin/products/ProductsTable.tsx
// Tabela de produtos com acções do admin (ver, aprovar, rejeitar, remover).
// O admin NÃO pode adicionar produtos — só gerir os existentes.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import Image from "next/image";
import { CheckCircle2, XCircle, Eye, Trash2 } from "lucide-react";
import { StatusBadge } from "@/components/ui";
import type { Product } from "@/types";

interface ProductsTableProps {
  products: Product[];
  onApprove: (id: number) => void;
  onReject:  (id: number) => void;
  onDelete:  (id: number) => void;
  onView:    (product: Product) => void;
}

export default function ProductsTable({
  products, onApprove, onReject, onDelete, onView,
}: ProductsTableProps) {
  if (products.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-100 dark:border-green-900/30 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-[#0D1F10] border-b border-gray-100 dark:border-green-900/30">
              {["Produto", "Categoria", "Vendedor", "Preço", "Stock", "Local", "Estado", "Acções"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#0A1A0E] divide-y divide-gray-50 dark:divide-green-900/20">
            {products.map((p, i) => (
              <tr
                key={p.id}
                className={[
                  "hover:bg-green-50/40 dark:hover:bg-green-900/10 transition-colors",
                  i % 2 === 1 ? "bg-gray-50/30 dark:bg-[#0D1F10]/40" : "",
                ].join(" ")}
              >
                {/* Foto + nome */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = "/assets/imgs/placeholder.png"; }}
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-200 text-xs leading-tight max-w-[140px] truncate">
                        {p.name}
                      </p>
                      {p.discount && (
                        <span className="text-[10px] font-bold text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-1.5 py-0.5 rounded">
                          -{p.discount}%
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Categoria */}
                <td className="px-4 py-3.5">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg whitespace-nowrap">
                    {p.category}
                  </span>
                </td>

                {/* Vendedor */}
                <td className="px-4 py-3.5 text-xs text-gray-600 dark:text-gray-300 font-medium max-w-[120px] truncate">
                  {p.user}
                </td>

                {/* Preço */}
                <td className="px-4 py-3.5 font-black text-gray-900 dark:text-white text-xs whitespace-nowrap">
                  {p.price.toLocaleString("pt-MZ")} MZN
                  <span className="text-gray-400 font-normal">/{p.unit}</span>
                </td>

                {/* Stock com cor indicativa */}
                <td className="px-4 py-3.5">
                  <span className={[
                    "text-xs font-bold",
                    p.stock > 50 ? "text-green-600 dark:text-green-400"  :
                    p.stock > 10 ? "text-yellow-600 dark:text-yellow-400" :
                                   "text-red-600 dark:text-red-400",
                  ].join(" ")}>
                    {p.stock} {p.unit}
                  </span>
                </td>

                {/* Localização */}
                <td className="px-4 py-3.5 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  📍 {p.location}
                </td>

                {/* Estado */}
                <td className="px-4 py-3.5">
                  <StatusBadge status={p.status ?? "inactive"} />
                </td>

                {/* Acções — admin não adiciona, só gere */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    {/* Ver detalhes */}
                    <button
                      onClick={() => onView(p)}
                      aria-label={`Ver detalhes de ${p.name}`}
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                    >
                      <Eye size={14} />
                    </button>

                    {/* Aprovar — só visível se pendente */}
                    {p.status === "pending" && (
                      <button
                        onClick={() => onApprove(p.id)}
                        aria-label={`Aprovar ${p.name}`}
                        className="p-1.5 rounded-lg text-gray-400 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                      >
                        <CheckCircle2 size={14} />
                      </button>
                    )}

                    {/* Rejeitar — pendente ou activo */}
                    {(p.status === "pending" || p.status === "active") && (
                      <button
                        onClick={() => onReject(p.id)}
                        aria-label={`Rejeitar ${p.name}`}
                        className="p-1.5 rounded-lg text-gray-400 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-900/20 dark:hover:text-orange-400 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                      >
                        <XCircle size={14} />
                      </button>
                    )}

                    {/* Remover definitivamente */}
                    <button
                      onClick={() => onDelete(p.id)}
                      aria-label={`Remover ${p.name}`}
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}