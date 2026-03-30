// ─────────────────────────────────────────────────────────────────────────────
// components/admin/products/ProductDetailModal.tsx
// Modal que o admin abre ao clicar em "Ver" num produto.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import Image from "next/image";
import { X, MapPin, User, Package, Tag, Phone } from "lucide-react";
import { StatusBadge } from "@/components/ui";
import type { Product } from "@/types";

interface ProductDetailModalProps {
  product:  Product | null;
  onClose:  () => void;
  onApprove?: (id: number) => void;
  onReject?:  (id: number) => void;
}

export default function ProductDetailModal({
  product, onClose, onApprove, onReject,
}: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Fundo escuro */}
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Caixa do modal */}
      <div className="relative z-10 bg-white dark:bg-[#0A1A0E] rounded-2xl w-full max-w-md shadow-2xl border border-green-100 dark:border-green-900/40 overflow-hidden max-h-[90vh] flex flex-col">

        {/* Imagem do produto */}
        <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 flex-shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = "/assets/imgs/placeholder.png"; }}
          />
          {/* Botão fechar sobreposto */}
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            <X size={16} />
          </button>
          {/* Badge de desconto */}
          {product.discount && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Conteúdo */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4">

          {/* Nome + estado */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-black text-gray-900 dark:text-white leading-tight">
              {product.name}
            </h3>
            <StatusBadge status={product.status ?? "inactive"} />
          </div>

          {/* Preço */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl px-4 py-3">
            <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-0.5">Preço</p>
            <p className="text-xl font-black text-gray-900 dark:text-white">
              {product.price.toLocaleString("pt-MZ")} MZN
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/{product.unit}</span>
            </p>
          </div>

          {/* Detalhes em linha */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Package, label: "Categoria",  value: product.category },
              { icon: Tag,     label: "Stock",       value: `${product.stock} ${product.unit}` },
              { icon: MapPin,  label: "Localização", value: product.location },
              { icon: User,    label: "Vendedor",    value: product.user   },
              { icon: Phone,   label: "Contacto",    value: `+${product.phone}` },
            ].map((row) => (
              <div key={row.label} className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <row.icon size={13} className="text-gray-500 dark:text-gray-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">{row.label}</p>
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-tight">{row.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Descrição */}
          <div>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1">Descrição</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Botões de acção na parte inferior */}
        <div className="p-4 border-t border-gray-100 dark:border-green-900/30 flex gap-3 flex-shrink-0">
          {product.status === "pending" && onApprove && (
            <button
              onClick={() => { onApprove(product.id); onClose(); }}
              className="flex-1 py-3 rounded-xl font-bold text-sm bg-green-600 text-white hover:bg-green-700 transition-all min-h-[48px]"
            >
              ✓ Aprovar
            </button>
          )}
          {(product.status === "pending" || product.status === "active") && onReject && (
            <button
              onClick={() => { onReject(product.id); onClose(); }}
              className="flex-1 py-3 rounded-xl font-bold text-sm bg-orange-50 text-orange-600 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/30 transition-all min-h-[48px]"
            >
              ✕ Rejeitar
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-bold text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors min-h-[48px]"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}