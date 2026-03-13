// src/app/produtos/[id]/page.tsx
"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Tag,
  Box,
  User,
  Scale,
} from "lucide-react";
import PurchaseFlow from "@/components/purchase/PurchaseFlow";
import { productsData } from "@/data/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductMap } from "@/components/product/ProductMap";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [showPurchase, setShowPurchase] = useState(false);

  const product = productsData.find((p) => p.id === Number(id));

  if (!product) return null;

  const finalPrice = product.discount
    ? product.price - product.price * (product.discount / 100)
    : product.price;

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-gray-900 font-sans pb-20">
      {/* 1. TOP BAR REFINADA */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 group transition-all"
          >
            <div className="p-2 group-hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-900">
              Produtos
            </span>
          </button>

          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em]">
              Kumela Market
            </span>
            <span className="text-[9px] text-gray-400 font-medium tracking-tight">
              Qualidade Garantida
            </span>
          </div>

          <div className="w-8 h-8 flex items-center justify-center bg-green-50 rounded-full text-green-600">
            <ShieldCheck size={18} />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LADO ESQUERDO: GALERIA E INFO TÉCNICA */}
          <div className="lg:col-span-7 space-y-8">
            <ProductGallery images={product.images || [product.image]} />

            {/* Bloco de Detalhes Técnicos (Grid Suave) */}
            <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6">
              <DetailItem
                icon={<Tag size={18} />}
                label="Categoria"
                value={product.category}
              />
              <DetailItem
                icon={<Scale size={18} />}
                label="Unidade"
                value={product.unit}
              />
              <DetailItem
                icon={<Box size={18} />}
                label="Estoque"
                value={`${product.quantity} disp.`}
              />
              <DetailItem
                icon={<User size={18} />}
                label="Produtor"
                value={product.seller}
              />
            </div>

            <div className="hidden lg:block space-y-6">
              <div className="p-6 bg-white rounded-[2.5rem] border border-gray-100">
                <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">
                  Descrição do Cultivo
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>
              <ProductMap location={product.location} />
            </div>
          </div>

          {/* LADO DIREITO: CARD DE PREÇO E COMPRA */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-600 font-bold text-xs bg-green-50 w-fit px-3 py-1 rounded-full">
                  <CheckCircle2 size={14} />
                  <span>Produto Disponível</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin size={16} />
                  <span className="text-sm font-medium">
                    {product.location}, Moçambique
                  </span>
                </div>
              </div>

              {/* Card de Compra */}
              <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40">
                <div className="flex items-baseline gap-2 mb-8">
                  {/* Preço Atual (Final) */}
                  <span className="text-4xl font-black text-gray-900">
                    {finalPrice.toFixed(0)}
                  </span>
                  <span className="text-lg font-bold text-gray-400 uppercase">
                    MT
                  </span>

                  {/* Preço Anterior (Vermelho com traço) */}
                  {product.discount && (
                    <div className="ml-3 flex items-center gap-1">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                        antes
                      </span>
                      <span className="text-xl font-black text-red-600 line-through decoration-red-600 decoration-2">
                        {product.price.toFixed(0)} MT
                      </span>
                    </div>
                  )}
                </div>

                {!showPurchase ? (
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setShowPurchase(true)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white h-16 rounded-2xl font-black text-base transition-all active:scale-[0.97] shadow-lg shadow-green-100"
                    >
                      Comprar Agora
                    </button>
                    <button className="w-full bg-slate-50 border border-slate-100 text-gray-700 h-16 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-100 transition-all">
                      <MessageCircle size={18} className="text-green-600" />
                      Falar com Vendedor
                    </button>
                  </div>
                ) : (
  <div className="bg-white -mx-6 -mb-6 p-6 rounded-b-[2.5rem] border-t border-gray-50 animate-in fade-in slide-in-from-bottom-2 duration-500">
    <div className="flex justify-between items-center mb-6">
      <div className="flex flex-col">
        <h4 className="font-black text-gray-900 text-xs uppercase tracking-widest">
          Checkout
        </h4>
        <div className="w-6 h-1 bg-green-500 rounded-full mt-1"></div>
      </div>
      <button
        onClick={() => setShowPurchase(false)}
        className="text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors"
      >
        Fechar ×
      </button>
    </div>
    <PurchaseFlow
      product={{
        ...product,
        stock: product.quantity,
        sellerPhone: product.phone,
      }}
      onClose={() => setShowPurchase(false)}
    />
  </div>
                )}
              </div>

              {/* Detalhes Extra Mobile */}
              <div className="lg:hidden space-y-6">
                <div className="p-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3">
                    Descrição
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
                <ProductMap location={product.location} />
              </div>

              <div className="flex items-center justify-center gap-2 text-gray-400 opacity-60">
                <ShieldCheck size={14} />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                  Compra Segura Kumela
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de Suporte para Itens Técnicos
function DetailItem({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-green-600 bg-green-50 w-fit p-2 rounded-xl mb-1">
        {icon}
      </div>
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter leading-none">
        {label}
      </span>
      <span className="text-sm font-bold text-gray-800 truncate">{value}</span>
    </div>
  );
}
