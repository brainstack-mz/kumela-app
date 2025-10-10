"use client";

import React from "react";

interface Step1Props {
  fullName: string;
  phoneNumber: string;
  setFullName: (value: string) => void;
  setPhoneNumber: (value: string) => void;
  onNext: () => void;
}

export default function Step1CustomerForm({
  fullName,
  phoneNumber,
  setFullName,
  setPhoneNumber,
  onNext,
}: Step1Props) {
  const validatePhone = () => {
    let num = phoneNumber.trim();

    // Remove prefixo +258 se existir
    if (num.startsWith("+258")) {
      num = num.slice(4);
    }

    // Validação: 9 dígitos
    const regex = /^(82|83|84|85|86|87)\d{7}$/;
    return regex.test(num);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome Completo
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Digite seu nome completo"
          className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#4CAF50]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Número de Telefone (+258)
        </label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Ex: 84xxxxxxx"
          className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#4CAF50]"
        />
        {!validatePhone() && phoneNumber.length > 0 && (
          <p className="text-red-500 text-sm mt-1">
            O número deve ter 9 dígitos e começar com 82, 83, 84, 85, 86 ou 87.
          </p>
        )}
      </div>

      <button
        onClick={onNext}
        className="w-full mt-6 px-6 py-3 rounded-full bg-[#4CAF50] text-white font-semibold hover:bg-[#388E3C] transition-colors"
      >
        Continuar
      </button>
    </div>
  );
}
