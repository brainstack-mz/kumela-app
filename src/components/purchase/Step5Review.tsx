"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Package,
  MapPin,
  Truck,
  User,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { StepHeader } from "@/components/smart-form/ui/StepHeader";

interface Product {
  name: string;
  image: string;
  description: string;
  user: string;
}

interface PurchaseData {
  name: string;
  phone: string;
  province: string;
  district: string;
  bairro: string;
  quantity: number;
  subtotal: number;
  shipping: number;
  carrier: string;
  total: number;
}

interface Step5Props {
  product: Product;
  purchaseData: PurchaseData;
  onBack: () => void;
  onNext: (data: PurchaseData) => void;
}

export default function Step5Review({
  product,
  purchaseData,
  onBack,
  onNext,
}: Step5Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      // z-[60] garante que fique a frente do Header do Kumela Market
      // max-h-[65vh] impede que o componente fique alto demais em telas pequenas
      className="w-full flex flex-col max-h-[65vh] h-fit relative z-[60]" 
    >
      <StepHeader 
        title="Revisão Final" 
        audioPath="/audio/Recording_5.m4a" 
      />

      {/* Área de Conteúdo com Scroll */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar pb-2">
        <p className="text-[12px] text-center text-gray-500 font-medium">
          Confirme os dados antes de finalizar
        </p>

        {/* Produto */}
        <div className="flex gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-gray-800 truncate">
              {product.name}
            </h4>
            <p className="text-[10px] text-green-600 font-bold">
              Vendido por: {product.user || "Horta Zambézia"}
            </p>
          </div>
        </div>

        {/* Detalhes do Destino - Correção da Exibição */}
        <div className="p-4 bg-white rounded-2xl border border-gray-100 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 border-b border-gray-50 pb-2">
            <User size={13} className="text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Detalhes do Destino
            </span>
          </div>
          
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <Phone size={14} className="text-green-600" />
              <p className="text-xs font-semibold text-gray-700">
                {purchaseData.phone || "Número não informado"}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={14} className="text-green-600 mt-0.5" />
              <div className="text-xs font-medium text-gray-600 leading-tight">
                {/* Fallbacks para garantir que algo apareça mesmo se purchaseData estiver incompleto */}
                <p>{purchaseData.province || "Nampula"}, {purchaseData.district || "Distrito"}</p>
                <p className="text-gray-400 text-[11px]">{purchaseData.bairro || "Endereço não especificado"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resumo Financeiro */}
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-2">
          <div className="flex justify-between text-[11px] text-emerald-800 font-medium">
            <span className="flex items-center gap-1.5"><Package size={12}/> Subtotal ({purchaseData.quantity}x):</span>
            <span className="font-bold">{purchaseData.subtotal?.toLocaleString() || "0"} MT</span>
          </div>
          <div className="flex justify-between text-[11px] text-emerald-800 font-medium">
            <span className="flex items-center gap-1.5"><Truck size={12}/> {purchaseData.carrier || "Transporte"}:</span>
            <span className="font-bold">{purchaseData.shipping?.toLocaleString() || "0"} MT</span>
          </div>
          <div className="pt-2 border-t border-emerald-200/50 flex justify-between items-center">
            <span className="text-[10px] font-black text-emerald-900 uppercase">Total</span>
            <span className="text-xl font-black text-emerald-600">
              {purchaseData.total?.toLocaleString() || "0"} MT
            </span>
          </div>
        </div>

               {/* Selo de Segurança */}
        <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-green-100">
          <ShieldCheck className="text-green-600 flex-shrink-0" size={20} />
          <p className="text-[10px] text-gray-500 leading-tight font-medium">
            <strong className="text-green-700">Pagamento Seguro:</strong> O valor fica retido até que você receba o produto em mãos.
          </p>
        </div>
      </div>

      {/* Botões */}
      <div className="flex gap-3 pt-3 border-t border-gray-50 bg-white">
        <button
          onClick={onBack}
          className="flex-1 h-12 rounded-xl border border-gray-200 text-gray-500 font-bold text-sm hover:bg-gray-50 transition-all"
        >
          Voltar
        </button>
        <button
          onClick={() => onNext(purchaseData)}
          className="flex-[2] h-12 rounded-xl bg-[#065f46] text-white font-bold text-sm hover:bg-emerald-900 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          Confirmar Pedido
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}