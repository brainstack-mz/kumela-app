// ─────────────────────────────────────────────────────────────────────────────
// components/user/shared/ProductModal.tsx
// Modal de detalhe do produto — aberto ao clicar num card
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import Image from "next/image";
import { X, MapPin, Phone, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOrder: (product: Product, qty: number) => void;
}

export default function ProductModal({ product, onClose, onOrder }: ProductModalProps) {
  const [qty,     setQty]     = useState(1);
  const [imgIdx,  setImgIdx]  = useState(0);

  if (!product) return null;

  const finalPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const images = product.images ?? [product.image];
  const total  = finalPrice * qty;

  const whatsappLink = `https://wa.me/${product.phone}?text=${encodeURIComponent(
    `Olá ${product.user}! Tenho interesse em ${product.name} — ${qty} ${product.unit}.`
  )}`;

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Fundo escuro */}
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 bg-white dark:bg-[#0A1A0E] w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl border border-gray-100 dark:border-green-900/40 overflow-hidden max-h-[92vh] flex flex-col">

        {/* Galeria de imagens */}
        <div className="relative w-full h-52 bg-gray-100 dark:bg-gray-800 flex-shrink-0">
          <Image
            src={images[imgIdx] ?? product.image}
            alt={product.name}
            fill
            className="object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = "/assets/imgs/placeholder.png"; }}
          />

          {/* Fechar */}
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            <X size={18} />
          </button>

          {/* Badge desconto */}
          {product.discount && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}

          {/* Navegação de imagens */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
                aria-label="Imagem anterior"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setImgIdx((i) => (i + 1) % images.length)}
                aria-label="Próxima imagem"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center"
              >
                <ChevronRight size={16} />
              </button>
              {/* Dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIdx ? "bg-white w-3" : "bg-white/50"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Conteúdo */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4">

          {/* Categoria + nome */}
          <div>
            <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wide">
              {product.category}
            </span>
            <h2 className="text-lg font-black text-gray-900 dark:text-white mt-0.5 leading-tight">
              {product.name}
            </h2>
          </div>

          {/* Preço */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900 dark:text-white">
              {finalPrice.toLocaleString("pt-MZ")} MZN
            </span>
            <span className="text-sm text-gray-400 dark:text-gray-500">/{product.unit}</span>
            {product.discount && (
              <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                {product.price} MZN
              </span>
            )}
          </div>

          {/* Infos */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <MapPin size={13} className="text-green-600 dark:text-green-400" />
              {product.location}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Stock: <span className={`font-bold ${product.stock > 10 ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>{product.stock} {product.unit}</span>
            </div>
          </div>

          {/* Descrição */}
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {product.description}
          </p>

          {/* Vendedor */}
          <div className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-green-900/20">
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500">Vendedor</p>
              <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{product.user}</p>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors min-h-[40px]"
            >
              <Phone size={13} aria-hidden="true" />
              WhatsApp
            </a>
          </div>

          {/* Selector de quantidade */}
          <div className="flex items-center justify-between bg-gray-50 dark:bg-[#0D1F10] rounded-xl px-4 py-3">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Quantidade ({product.unit})</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Diminuir quantidade"
                className="w-9 h-9 rounded-xl border border-gray-200 dark:border-green-900/40 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-green-900/20 font-bold transition-colors"
              >
                −
              </button>
              <span className="text-base font-black text-gray-900 dark:text-white w-8 text-center">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                aria-label="Aumentar quantidade"
                className="w-9 h-9 rounded-xl border border-gray-200 dark:border-green-900/40 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-green-900/20 font-bold transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Rodapé — total + botão de encomendar */}
        <div className="p-4 border-t border-gray-100 dark:border-green-900/30 flex items-center gap-3 flex-shrink-0">
          <div className="flex-1">
            <p className="text-[11px] text-gray-400 dark:text-gray-500">Total</p>
            <p className="text-lg font-black text-gray-900 dark:text-white">
              {total.toLocaleString("pt-MZ")} MZN
            </p>
          </div>
          <button
            onClick={() => { onOrder(product, qty); onClose(); }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all min-h-[48px]"
          >
            <ShoppingCart size={16} aria-hidden="true" />
            Encomendar
          </button>
        </div>
      </div>
    </div>
  );
}