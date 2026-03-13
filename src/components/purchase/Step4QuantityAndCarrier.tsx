"use client";

import { motion } from "framer-motion";
import { ArrowRight, X, Truck, Hash, ChevronDown } from "lucide-react"; 
import { useState } from "react";
import toast from "react-hot-toast";

interface Step4Props {
  product: any;
  purchaseData: any;
  onBack: () => void;
  onNext: (data: any) => void;
  onClose?: () => void;
}

const CARRIERS = [
  { name: "Transporte Ludy", time: "2-3 dias", price: 50 },
  { name: "Transporte Lizzyman", time: "3-4 dias", price: 75 },
  { name: "Transporte Mugaby", time: "2-5 dias", price: 60 },
];

export default function Step3QuantityAndCarrier({ product, purchaseData, onBack, onNext, onClose }: Step4Props) {
  const [quantity, setQuantity] = useState(purchaseData.quantity || 1);
  const [carrier, setCarrier] = useState(purchaseData.carrier || "");

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
      ...purchaseData,
      quantity,
      carrier,
      subtotal,
      shipping,
      total,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full bg-white text-gray-900 rounded-3xl overflow-hidden relative p-5 sm:p-6"
    >
   
      {/* Progress Indicator */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">ETAPA 3 de 4</span>
          <span className="text-[10px] text-gray-400 font-medium">Logística</span>
        </div>
        <div className="w-full h-1 bg-gray-100 rounded-full">
          <div className="h-1 bg-green-500 rounded-full transition-all duration-500" style={{ width: "75%" }}></div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-center mb-2">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-green-50 rounded-full mb-2">
            <Truck className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 leading-tight">Envio e Quantidade</h2>
          <p className="text-[12px] text-gray-500">Quanto e como deseja receber?</p>
        </div>

        <div className="space-y-3">
          {/* Campo Quantidade */}
          <div className="space-y-1">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase flex items-center gap-1.5">
                <Hash size={12} /> Quantidade ({product.unit})
              </label>
              <span className="text-[13px] text-green-900">Stock: {product.stock}</span>
            </div>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
              className="w-full h-11 px-4 text-base font-bold border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-green-500 outline-none transition-all"
              min={1}
              max={product.stock}
            />
          </div>

          {/* Seleção de Transportadora */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Transportadora</label>
            <div className="relative">
              <select
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                className="w-full h-11 px-4 appearance-none text-sm border border-gray-200 rounded-xl bg-white focus:border-green-500 outline-none transition-all pr-10"
              >
                <option value="">Selecione quem entrega</option>
                {CARRIERS.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} (+{c.price} MT)
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        {/* Resumo de Preços (Preview) */}
        <div className="bg-emerald-50 rounded-2xl p-4 space-y-2 border border-emerald-100">
          <div className="flex justify-between text-[11px] text-emerald-800">
            <span>Subtotal ({quantity}x):</span>
            <span className="font-bold">{subtotal.toFixed(0)} MT</span>
          </div>
          <div className="flex justify-between text-[11px] text-emerald-800">
            <span>Custo de Entrega:</span>
            <span className="font-bold">{shipping.toFixed(0)} MT</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-emerald-200/50">
            <span className="text-sm font-bold text-emerald-900">Total a Pagar:</span>
            <span className="text-lg font-black text-emerald-600">{total.toFixed(0)} MT</span>
          </div>
        </div>
      </div>

      {/* Navegação */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 h-12 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all"
        >
          Voltar
        </button>
        <button
          onClick={handleNext}
          disabled={!carrier || quantity < 1}
          className="flex-[2] h-12 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-40 shadow-md shadow-green-100"
        >
          Próximo
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}