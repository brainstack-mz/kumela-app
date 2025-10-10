// src/components/products/Step2PaymentForm.tsx
'use client';

import React, { useState } from "react";
// O Link do Next.js não é mais necessário aqui
import { ArrowRight } from "lucide-react";

interface Step2Props {
  district: string;
  quantity: number;
  carrier: string;
  setDistrict: (value: string) => void;
  setQuantity: (value: number) => void;
  setCarrier: (value: string) => void;
  districts: Record<string, string[]>;
  onNext: () => void;
}

const PROVINCE = "Nampula";

export default function Step2PaymentForm({
  district,
  quantity,
  carrier,
  setDistrict,
  setQuantity,
  setCarrier,
  districts,
  onNext, // A função onNext foi re-adicionada
}: Step2Props) {
  const nampulaDistricts = districts[PROVINCE] || [];
  const [errors, setErrors] = useState({ district: "", quantity: "", carrier: "" });
  
  const transportadorasDisponiveis = ["Transporte Ludy", "Transporte Lizzyman", "Transporte Mugaby"];

  const validate = () => {
    let newErrors = { district: "", quantity: "", carrier: "" };
    let isValid = true;
    if (!district) { newErrors.district = "Por favor, selecione um distrito."; isValid = false; }
    if (quantity < 1) { newErrors.quantity = "A quantidade deve ser no mínimo 1."; isValid = false; }
    if (!carrier) { newErrors.carrier = "Por favor, selecione uma transportadora."; isValid = false; }
    setErrors(newErrors);
    return isValid;
  };

  const handleNextClick = () => {
    if (validate()) {
      onNext();
    }
  };

  const isButtonDisabled = !district || quantity < 1 || !carrier;

  return (
    <div className="space-y-4">
      {/* Província (Fixa) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Província</label>
        <input type="text" value={PROVINCE} disabled className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed" />
      </div>

      {/* Distrito */}
      {nampulaDistricts.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Distrito</label>
          <select value={district} onChange={(e) => setDistrict(e.target.value)} className={`w-full p-3 border rounded-lg focus:outline-none focus:border-[#4CAF50] ${errors.district ? 'border-red-500' : 'border-gray-200'}`} >
            <option value="">Selecione o Distrito</option>
            {nampulaDistricts.map((dist) => (<option key={dist} value={dist}>{dist}</option>))}
          </select>
          {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
        </div>
      )}

      {/* Quantidade */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className={`w-full p-3 border rounded-lg focus:outline-none focus:border-[#4CAF50] ${errors.quantity ? 'border-red-500' : 'border-gray-200'}`} />
        {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
      </div>

      {/* Transportadora */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Transportadora</label>
        <select value={carrier} onChange={(e) => setCarrier(e.target.value)} className={`w-full p-3 border rounded-lg focus:outline-none focus:border-[#4CAF50] ${errors.carrier ? 'border-red-500' : 'border-gray-200'}`} >
          <option value="">Selecione a Transportadora</option>
          {transportadorasDisponiveis.map((c) => (<option key={c} value={c}>{c}</option>))}
        </select>
        {errors.carrier && <p className="text-red-500 text-sm mt-1">{errors.carrier}</p>}
      </div>

      <button
        onClick={handleNextClick}
        disabled={isButtonDisabled}
        className={`w-full mt-6 px-6 py-3 rounded-full font-semibold transition-colors duration-300 ${
          isButtonDisabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#4CAF50] text-white hover:bg-[#388E3C]'
        }`}
      >
        Próximo
      </button>
    </div>
  );
}