// ─────────────────────────────────────────────────────────────────────────────
// components/user/shared/ProductCard.tsx
// Card de produto reutilizável — usado no Mercado e em Meus Produtos
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import Image from "next/image";
import { MapPin, ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/types";

interface ProductCardProps {
  product:    Product;
  onClick:    () => void;
  showBuy?:   boolean;   // exibe botão de comprar (Mercado)
  showEdit?:  boolean;   // exibe botão de editar (Meus Produtos)
  onBuy?:     () => void;
  onEdit?:    () => void;
}

export default function ProductCard({
  product, onClick, showBuy, showEdit, onBuy, onEdit,
}: ProductCardProps) {
  // Calcular preço com desconto
  const finalPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  // Indicador de stock
  const stockLevel =
    product.stock > 50 ? "high" :
    product.stock > 10 ? "mid"  : "low";

  const stockColor = {
    high: "text-green-600 dark:text-green-400",
    mid:  "text-yellow-600 dark:text-yellow-400",
    low:  "text-red-600 dark:text-red-400",
  }[stockLevel];

  return (
    <div
      onClick={onClick}
      className={[
        "group bg-white dark:bg-[#0D1F10]",
        "rounded-2xl border border-gray-100 dark:border-green-900/30",
        "hover:border-green-300 dark:hover:border-green-700",
        "hover:shadow-lg hover:shadow-green-600/5",
        "transition-all duration-200 cursor-pointer overflow-hidden",
        "flex flex-col",
      ].join(" ")}
    >
      {/* Imagem do produto */}
      <div className="relative w-full h-40 overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { (e.target as HTMLImageElement).src = "/assets/imgs/placeholder.png"; }}
        />

        {/* Badge de desconto */}
        {product.discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
            -{product.discount}%
          </span>
        )}

        {/* Badge de stock baixo */}
        {product.stock <= 10 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
            Últimas unidades
          </span>
        )}
      </div>

      {/* Conteúdo do card */}
      <div className="p-3.5 flex flex-col flex-1 gap-2">

        {/* Categoria */}
        <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wide">
          {product.category}
        </span>

        {/* Nome */}
        <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight line-clamp-2">
          {product.name}
        </h3>

        {/* Preço */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-black text-gray-900 dark:text-white">
            {finalPrice.toLocaleString("pt-MZ")} MZN
          </span>
          <span className="text-[11px] text-gray-400 dark:text-gray-500">/{product.unit}</span>
          {product.discount && (
            <span className="text-[11px] text-gray-400 dark:text-gray-500 line-through ml-1">
              {product.price} MZN
            </span>
          )}
        </div>

        {/* Vendedor + localização */}
        <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400">
          <MapPin size={11} className="flex-shrink-0" aria-hidden="true" />
          <span className="truncate">{product.location}</span>
          <span className="mx-1 text-gray-300 dark:text-gray-600">·</span>
          <span className="truncate">{product.user}</span>
        </div>

        {/* Stock */}
        <p className={`text-[11px] font-bold ${stockColor}`}>
          {product.stock} {product.unit} disponíveis
        </p>

        {/* Botões de acção */}
        {(showBuy || showEdit) && (
          <div className="flex gap-2 mt-auto pt-1" onClick={(e) => e.stopPropagation()}>
            {showBuy && onBuy && (
              <button
                onClick={onBuy}
                aria-label={`Comprar ${product.name}`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-green-600 text-white text-xs font-bold hover:bg-green-700 transition-colors min-h-[40px]"
              >
                <ShoppingCart size={14} aria-hidden="true" />
                Comprar
              </button>
            )}
            {showEdit && onEdit && (
              <button
                onClick={onEdit}
                aria-label={`Editar ${product.name}`}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-green-900/40 text-gray-600 dark:text-gray-300 text-xs font-bold hover:bg-gray-50 dark:hover:bg-green-900/20 transition-colors min-h-[40px]"
              >
                Editar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}