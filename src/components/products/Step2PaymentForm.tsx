"use client";

import React from "react";

interface Step2Props {
  location: string;
  district: string;
  quantity: number;
  carrier: string;
  paymentMethod: string;
  paymentNumber: string;
  setLocation: (value: string) => void;
  setDistrict: (value: string) => void;
  setQuantity: (value: number) => void;
  setCarrier: (value: string) => void;
  setPaymentMethod: (value: string) => void;
  setPaymentNumber: (value: string) => void;
  totalAmount: number;
  mozambiqueProvinces: string[];
  districts: Record<string, string[]>;
  carriers: string[];
  paymentMethods: { name: string }[];
  onConfirm: () => void;
}

export default function Step2PaymentForm({
  location,
  district,
  quantity,
  carrier,
  paymentMethod,
  paymentNumber,
  setLocation,
  setDistrict,
  setQuantity,
  setCarrier,
  setPaymentMethod,
  setPaymentNumber,
  totalAmount,
  mozambiqueProvinces,
  districts,
  carriers,
  paymentMethods,
  onConfirm,
}: Step2Props) {
  return (
    <div className="space-y-4">
      {/* Província */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Província
        </label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#4CAF50]"
        >
          <option value="">Selecione a Província</option>
          {mozambiqueProvinces.map((prov) => (
            <option key={prov} value={prov}>
              {prov}
            </option>
          ))}
        </select>
      </div>

      {/* Distrito */}
      {location && districts[location] && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Distrito
          </label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#4CAF50]"
          >
            <option value="">Selecione o Distrito</option>
            {districts[location].map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Transportadora */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Transportadora
        </label>
        <select
          value={carrier}
          onChange={(e) => setCarrier(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#4CAF50]"
        >
          <option value="">Selecione a Transportadora</option>
          {carriers.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Quantidade */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quantidade
        </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, parseInt(e.target.value) || 1))
          }
          className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#4CAF50]"
        />
      </div>

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

      <button
        onClick={onConfirm}
        className="w-full mt-6 px-6 py-3 rounded-full bg-[#4CAF50] text-white font-semibold hover:bg-[#388E3C]"
      >
        Confirmar Pagamento
      </button>
    </div>
  );
}
