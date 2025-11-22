"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react"; 
import { useState } from "react";
import toast from "react-hot-toast";

interface Step4Props {
  product: any;
  purchaseData: any;
  onBack: () => void;
  onNext: (data: any) => void;
}

const CARRIERS = [
  { name: "Transporte Ludy", time: "2-3 dias", price: 50 },
  { name: "Transporte Lizzyman", time: "3-4 dias", price: 75 },
  { name: "Transporte Mugaby", time: "2-5 dias", price: 60 },
];

export default function Step4QuantityAndCarrier({ product, purchaseData, onBack, onNext }: Step4Props) {
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
      toast.error(`Quantidade deve ser entre 1 e ${product.stock}!`);
      return;
    }
    if (!carrier) {
      toast.error("Selecione uma transportadora!");
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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full"
    >
      {/* Progress Indicator - Espaçamento ajustado para mb-5 */}
      <div className="mb-5"> 
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-green-600 dark:text-green-400">ETAPA 4 de 6</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">Quantidade e Transporte</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div className="h-2 bg-green-600 rounded-full" style={{ width: "66.6%" }}></div>
        </div>
      </div>

      {/* Conteúdo Principal - Espaçamento reduzido para space-y-5 */}
      <div className="space-y-5"> 
        
        {/* Quantidade - space-y-3 */}
        <div className="space-y-3">
          <div>
            {/* Asterisco * removido */}
            <label htmlFor="quantity-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> {/* Reduzido mb-2 para mb-1 */}
              Quantidade ({product.unit})
            </label>
            <input
              id="quantity-input"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
              className="w-full py-3 px-4 text-lg font-semibold border-2 rounded-xl focus:outline-none focus:border-green-500 bg-white dark:bg-gray-700 dark:text-white text-center" // Reduzido p-4 para py-3
              min={1}
              max={product.stock}
              placeholder="Digite a quantidade"
            />
          </div>
          
          <p className="text-center text-xs text-gray-500 dark:text-gray-400"> {/* Reduzido text-sm para text-xs */}
            Stock disponível: **{product.stock}** {product.unit}
          </p>
        </div>

        {/* Transportadora - space-y-3 */}
        <div className="space-y-3">
          <div>
            {/* Asterisco * removido */}
            <label htmlFor="carrier-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> {/* Reduzido mb-2 para mb-1 */}
              Selecione a Transportadora
            </label>
            <select
              id="carrier-select"
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
              className="w-full py-3 px-4 text-base border-2 rounded-xl bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:border-green-500" // Reduzido p-4 para py-3
            >
              <option value="">Selecione a Transportadora</option>
              {CARRIERS.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name} - {c.time} - {c.price} MT
                </option>
              ))}
            </select>
            {carrier && selectedCarrier && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Tempo estimado: **{selectedCarrier.time}** | Custo: **{selectedCarrier.price} MT**
              </p>
            )}
          </div>
        </div>

        {/* Total Preview - Mantido p-4, mas com margem superior reduzida */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 shadow-lg">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300 font-semibold text-sm">Subtotal ({quantity} {product.unit}):</span>
              <span className="font-bold text-md">{subtotal.toFixed(0)} MT</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300 font-semibold text-sm">Transporte:</span>
              <span className="font-bold text-md">{shipping.toFixed(0)} MT</span>
            </div>
            {/* Ajustei o padding superior aqui para manter o espaço */}
            <div className="flex justify-between items-center pt-2 border-t-2 border-green-200 dark:border-green-800">
              <span className="font-bold text-lg text-gray-900 dark:text-white">Total Geral:</span>
              <span className="font-bold text-xl text-green-600 dark:text-green-400">
                {total.toFixed(0)} MT
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Margem superior reduzida para mt-5 e gap-3 */}
      <div className="mt-5 flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onBack}
          className="flex-1 px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-md"
        >
          <ArrowLeft className="w-5 h-5 inline mr-2" /> Voltar
        </button>
        <button
          onClick={handleNext}
          disabled={!carrier || quantity < 1}
          className="flex-1 px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/50"
        >
          Próximo
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}