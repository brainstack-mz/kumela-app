"use client";

import { motion } from "framer-motion";
import { ArrowRight, Truck, Hash, ChevronDown } from "lucide-react"; 
import { useState } from "react";
import toast from "react-hot-toast";
import { StepHeader } from "@/components/smart-form/ui/StepHeader";

interface Step3Props {
  product: {
    price: number;
    discount?: number;
    stock: number;
    unit: string;
  };
  purchaseData: {
    quantity?: number;
    carrier?: string;
  };
  onBack: () => void;
  onNext: (data: any) => void;
}

const CARRIERS = [
  { name: "Transporte Ludy", time: "2-3 dias", price: 50 },
  { name: "Transporte Lizzyman", time: "3-4 dias", price: 75 },
  { name: "Transporte Mugaby", time: "2-5 dias", price: 60 },
];

export default function Step3QuantityAndCarrier({ product, purchaseData, onBack, onNext }: Step3Props) {
  const [quantity, setQuantity] = useState<number>(purchaseData.quantity || 1);
  const [carrier, setCarrier] = useState<string>(purchaseData.carrier || "");

  const unitPrice = product.discount 
    ? product.price - (product.price * product.discount / 100)
    : product.price;
  
  const subtotal = unitPrice * quantity;
  const selectedCarrier = CARRIERS.find(c => c.name === carrier);
  const shipping = selectedCarrier?.price || 0;
  const total = subtotal + shipping;

  const handleNext = () => {
    if (quantity < 1 || quantity > product.stock) {
      toast.error(`Quantidade inválida (Máx: ${product.stock})`);
      return;
    }
    if (!carrier) {
      toast.error("Selecione uma transportadora");
      return;
    }

    onNext({
      quantity,
      carrier,
      subtotal,
      shipping,
      total,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full space-y-6"
    >
      {/* Header com Áudio unificado */}
      <StepHeader 
        title="Logística" 
        audioPath="/audio/Recording_5.m4a" 
      />

     

        <div className="space-y-1">
          {/* Campo Quantidade */}
          <div className="space-y-1">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[11px] h-10 font-bold text-gray-500 uppercase flex items-center gap-1.5">
                <Hash size={12} /> Quantidade ({product.unit})
              </label>
              <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                Stock: {product.stock}
              </span>
            </div>
            <div className="flex items-center border border-gray-200 rounded-2xl p-4 bg-gray-50 focus-within:ring-2 ring-green-500 transition-all h-10">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                className="w-full outline-none bg-transparent font-bold text-gray-900 text-lg"
                min={1}
                max={product.stock}
              />
            </div>
          </div>

          {/* Seleção de Transportadora */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Transportadora</label>
            <div className="relative border border-gray-200 rounded-2xl bg-gray-50 focus-within:ring-2 ring-green-500 transition-all h-10">
              <select
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                className="w-full h-full px-4 appearance-none bg-transparent outline-none font-medium text-gray-900 text-sm"
              >
                <option value="">Selecione o transportador</option>
                {CARRIERS.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} (+{c.price} MT)
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>
        

        {/* Resumo de Preços */}
        <div className="bg-emerald-50 rounded-2xl p-5 space-y-3 border border-emerald-100 shadow-sm">
          <div className="flex justify-between text-[12px] text-emerald-800 font-medium">
            <span>Subtotal ({quantity}x):</span>
            <span className="font-bold">{subtotal.toLocaleString()} MT</span>
          </div>
          <div className="flex justify-between text-[12px] text-emerald-800 font-medium">
            <span>Custo de Entrega:</span>
            <span className="font-bold">{shipping.toLocaleString()} MT</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-emerald-200/50">
            <span className="text-sm font-bold text-emerald-900 uppercase tracking-tight">Total a Pagar:</span>
            <span className="text-xl font-black text-emerald-600">{total.toLocaleString()} MT</span>
          </div>
        </div>
      </div>

      {/* Navegação Responsiva */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 h-14 rounded-2xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all active:scale-95"
        >
          Voltar
        </button>
        <button
          onClick={handleNext}
          disabled={!carrier || quantity < 1}
          className="flex-[2] h-14 rounded-2xl bg-green-800 text-white font-bold hover:bg-green-900 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-green-100"
        >
          Próximo
          <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}