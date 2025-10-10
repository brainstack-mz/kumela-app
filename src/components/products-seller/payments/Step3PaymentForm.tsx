// src/components/products/Step3PaymentForm.tsx
'use client';

import React from "react";

interface Step3Props {
  paymentMethod: string;
  paymentNumber: string;
  setPaymentMethod: (value: string) => void;
  setPaymentNumber: (value: string) => void;
  totalAmount: number;
  paymentMethods: { name: string }[];
  onConfirm: () => void;
  onBack: () => void; // Propriedade de função para voltar ao passo anterior
}

export default function Step3PaymentForm({
  paymentMethod,
  paymentNumber,
  setPaymentMethod,
  setPaymentNumber,
  totalAmount,
  paymentMethods,
  onConfirm,
  onBack,
}: Step3Props) {
  // Validação simples para habilitar/desabilitar o botão de confirmação
  const isConfirmDisabled = !paymentMethod || !paymentNumber;

  return (
    <div className="space-y-4">
      {/* Método de pagamento */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Método de Pagamento
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#4CAF50]"
        >
          <option value="">Selecione o método de pagamento</option>
          {paymentMethods.map((method) => (
            <option key={method.name} value={method.name}>
              {method.name}
            </option>
          ))}
        </select>
      </div>

      {/* Número de Pagamento */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Número de Pagamento
        </label>
        <input
          type="tel"
          value={paymentNumber}
          onChange={(e) => setPaymentNumber(e.target.value)}
          placeholder="Ex: 84xxxxxxx"
          className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#4CAF50]"
        />
      </div>

      {/* Total */}
      <div className="mt-4 text-lg font-bold text-gray-900">
        Total: MZN {totalAmount.toFixed(2)}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={onBack}
          className="w-1/2 px-6 py-3 rounded-full bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300"
        >
          Voltar
        </button>
        <button
          onClick={onConfirm}
          disabled={isConfirmDisabled}
          className={`w-1/2 px-6 py-3 rounded-full font-semibold transition-colors duration-300 ${
            isConfirmDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#4CAF50] text-white hover:bg-[#388E3C]'
          }`}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}