"use client";

import React from "react";
import {
  CheckCircle2,
  ShieldCheck,
  Edit3,
  MapPin,
  Package,
  Phone,
  Image as ImageIcon,
} from "lucide-react";
import { StepHeader } from "../ui/StepHeader";
import Image from "next/image"; // Componente de otimização do Next.js

// Interface completa baseada em todos os passos anteriores
interface Step5Props {
  formData: {
    name: string;
    phone: string;
    locality: string;
    district: string;
    category: string;
    stock: string | number;
    unit: string;
    price: string | number;
    discount?: string | number;
    images: string[];
    description: string;
  };
  onConfirm: () => void;
  onEditStep: (step: number) => void;
}

export const Step5Review = ({
  formData,
  onConfirm,
  onEditStep,
}: Step5Props) => {
  // Garantimos que os valores sejam números para o cálculo
  const price =
    typeof formData.price === "string"
      ? parseFloat(formData.price || "0")
      : formData.price;
  const discount =
    typeof formData.discount === "string"
      ? parseFloat(formData.discount || "0")
      : formData.discount || 0;

  const finalPrice = discount > 0 ? price - price * (discount / 100) : price;

  return (
    <div className="space-y-4 pb-4 font-sans">
      <StepHeader
        title="Revisar e Publicar"
        audioPath="/audio/Recording_7.m4a"
      />

      <div className="space-y-3">
        {/* Seção 1: Vendedor e Localização */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative">
          <button
            onClick={() => onEditStep(1)}
            className="absolute top-4 right-4 text-blue-500 hover:bg-blue-50 p-2 rounded-full transition-colors cursor-pointer"
          >
            <Edit3 size={18} />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-100 p-2 rounded-xl text-green-600">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">
                Vendedor
              </p>
              <p className="text-sm font-bold text-gray-700">
                {formData.name || "Não informado"}
              </p>
              <p className="text-xs text-gray-500">{formData.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <MapPin size={16} className="text-red-500 shrink-0" />
            <span className="text-xs text-gray-600 font-medium truncate">
              {formData.locality}, {formData.district}
            </span>
          </div>
        </div>

        {/* Seção 2: Detalhes do Produto */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative">
          <button
            onClick={() => onEditStep(3)}
            className="absolute top-4 right-4 text-blue-500 hover:bg-blue-50 p-2 rounded-full transition-colors cursor-pointer"
          >
            <Edit3 size={18} />
          </button>

          <div className="flex items-start gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
              <Package size={20} />
            </div>
            <div className="flex-1 pr-8">
              <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">
                {formData.category}
              </p>
              <h3 className="font-extrabold text-gray-800 text-lg leading-tight">
                {formData.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {formData.stock} {formData.unit} disponível
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-green-50 p-3 rounded-xl border border-green-100">
            <div>
              <p className="text-[10px] font-bold text-green-700 uppercase">
                Preço Final
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-green-600">
                  {finalPrice.toLocaleString("pt-MZ")} MZN
                </span>
                {discount > 0 && (
                  <span className="text-xs text-red-400 line-through">
                    {price.toLocaleString("pt-MZ")} MZN
                  </span>
                )}
              </div>
            </div>
            {discount > 0 && (
              <div className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                -{discount}%
              </div>
            )}
          </div>
        </div>

        {/* Seção 3: Imagens e Descrição */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative">
          <button
            onClick={() => onEditStep(4)}
            className="absolute top-4 right-4 text-blue-500 hover:bg-blue-50 p-2 rounded-full transition-colors cursor-pointer"
          >
            <Edit3 size={18} />
          </button>

          <div className="flex items-center gap-2 mb-3 text-gray-400">
            <ImageIcon size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">
              Fotos e Descrição
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {formData.images?.map((img: string, i: number) => (
              <div key={i} className="relative shrink-0">
                <Image
                  src={img}
                  alt={`Preview ${i}`}
                  width={64}  
                  height={64}  
                  className="rounded-xl object-cover border-2 border-white shadow-sm"
                  unoptimized // IMPORTANTE: Se as imagens forem blob:URLs (Blob), adicione isso
                />{" "}
                {i === 0 && (
                  <span className="absolute top-0 left-0 bg-green-500 text-[6px] text-white px-1 rounded-br-lg font-bold uppercase">
                    CAPA
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* O erro de any aqui foi resolvido pela interface Step5Props */}
          <p className="text-sm text-gray-600 italic line-clamp-3 bg-gray-50 p-3 rounded-xl border border-dashed border-gray-300">
            &quot;{formData.description || "Sem descrição..."}&quot;{" "}
          </p>
        </div>
      </div>

      {/* Botão de Finalização */}
      <div className="pt-6">
        <div className="flex items-center justify-center gap-2 mb-4 text-[#10B981] bg-green-50 py-2 rounded-full w-max mx-auto px-4">
          <ShieldCheck size={14} strokeWidth={3} />
          <span className="text-[10px] font-black uppercase tracking-wider">
            Publicação 100% Segura
          </span>
        </div>

        <button
          onClick={onConfirm}
          className="
            relative overflow-hidden w-full py-4 rounded-2xl cursor-pointer
            bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857]
            text-white font-black text-base
            shadow-[0_10px_25px_-5px_rgba(16,185,129,0.4)]
            hover:shadow-[0_15px_30px_-5px_rgba(16,185,129,0.5)]
            hover:-translate-y-0.5 active:scale-[0.97]
            transition-all duration-300
            flex items-center justify-center gap-3 group
          "
        >
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg]" />

          <CheckCircle2
            size={22}
            strokeWidth={2.5}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="tracking-tight">CONFIRMAR E PUBLICAR</span>
        </button>

        <div className="flex flex-col items-center gap-2 mt-4">
          <p className="text-center text-[9px] text-gray-400 px-6 leading-relaxed">
            Ao publicar, você concorda com os{" "}
            <span className="text-green-600 font-bold underline cursor-pointer">
              termos de venda
            </span>{" "}
            da plataforma Kumela.
          </p>
        </div>
      </div>
    </div>
  );
};
