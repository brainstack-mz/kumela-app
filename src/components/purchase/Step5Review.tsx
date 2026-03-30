"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  Package,
  MapPin,
  Truck,
  User,
  Phone,
  X,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

interface Step5Props {
  product: any;
  purchaseData: any;
  onBack: () => void;
  onNext: (data: any) => void;
  onClose?: () => void;
}

export default function Step5Review({
  product,
  purchaseData,
  onBack,
  onNext,
  onClose,
}: Step5Props) {
  const unitPrice = (purchaseData.subtotal || 0) / (purchaseData.quantity || 1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full bg-white text-gray-900 rounded-3xl relative flex flex-col max-h-[90vh]"
    >
      {/* Header Fixo */}
      <div className="p-6 pb-2 border-b border-gray-50">
        <div className="mb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-green-600 uppercase tracking-widest">
              ETAPA 4 de 4
            </span>

            <span className="text-xs text-gray-400">Revisão Final</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full">
            <div
              className="h-1.5 bg-green-500 rounded-full transition-all duration-700"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>
        <div className="text-center ">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-full mb-3">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <h2 className="text-lg text-center font-bold text-gray-800 leading-tight">
          Revise sua Compra
        </h2>
        <p className="text-[12px] text-center text-gray-500">
          Confirme se tudo está correto antes de pagar.
        </p>
      </div>

      {/* Área de Conteúdo com Scroll */}
      <div className="flex-1 overflow-y-auto p-6 pt-4 space-y-6 custom-scrollbar">
        {/* Seção Produto */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-gray-400">
            <Package size={16} />
            <span className="text-xs font-bold uppercase tracking-tighter">
              Item do Pedido
            </span>
          </div>
          <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-white">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h4 className="text-base font-bold text-gray-800 leading-tight">
                {product.name}
              </h4>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {product.description}
              </p>
              <p className="text-[11px] text-green-600 font-bold mt-1">
                Vendido por: {product.user}
              </p>
            </div>
          </div>
        </section>

        {/* Seção Entrega e Cliente */}
        <section className="grid grid-cols-1 gap-4">
          <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-gray-400 border-b border-gray-50 pb-2">
              <User size={16} />
              <span className="text-xs font-bold uppercase tracking-tighter">
                Dados de Entrega
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                  <User size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">
                    Destinatário
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {purchaseData.name}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                  <Phone size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">
                    Contacto
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {purchaseData.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                  <MapPin size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">
                    Endereço
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {purchaseData.province}, {purchaseData.district} -{" "}
                    {purchaseData.bairro}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resumo Financeiro */}
        <section className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 text-black shadow-lg shadow-green-100">
          <div className="flex items-center gap-2 mb-4 opacity-80">
            <Truck size={16} />
            <span className="text-xs font-bold uppercase tracking-tighter">
              Resumo de Valores
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="opacity-90">
                Subtotal ({purchaseData.quantity} itens)
              </span>
              <span className="font-bold">
                {purchaseData.subtotal.toFixed(0)} MT
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="opacity-90">
                Transporte ({purchaseData.carrier})
              </span>
              <span className="font-bold">
                {purchaseData.shipping.toFixed(0)} MT
              </span>
            </div>
            <div className="pt-3 mt-3 border-t border-white/20 flex justify-between items-end">
              <span className="text-base font-bold">Total Geral</span>
              <span className="text-3xl font-black">
                {(purchaseData.total || 0).toFixed(0)} MT
              </span>
            </div>
          </div>
        </section>

        {/* Selo de Segurança */}
        <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
          <ShieldCheck className="text-emerald-600 flex-shrink-0" size={24} />
          <p className="text-xs text-emerald-800 leading-relaxed italic">
            <strong>Compra Garantida:</strong> Seu dinheiro está seguro. O
            vendedor só recebe após você confirmar a entrega.
          </p>
        </div>
      </div>

      {/* Footer Fixo com Botões */}
      <div className="p-6 border-t border-gray-50 flex gap-4 bg-white rounded-b-3xl">
        <button
          onClick={onBack}
          className="flex-1 h-14 rounded-2xl border-2 border-gray-100 text-gray-500 font-bold text-base hover:bg-gray-50 transition-all"
        >
          Voltar
        </button>
        <button
          onClick={() => onNext(purchaseData)}
          className="flex-[2] h-14 rounded-2xl bg-green-600 text-white font-bold text-base hover:bg-green-700 active:scale-[0.97] transition-all flex items-center justify-center gap-2 shadow-xl shadow-green-100"
        >
          Finalizar Pedido
          <ArrowRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}
