'use client';

import { Layers, Hash, Coins, Info, Scale, Tag, Package } from "lucide-react";
import { StepHeader } from "../ui/StepHeader";
import { useAudioHelper } from "../hooks/useAudioHelper";

// Interface para acabar com o erro de 'any'
interface Step3Props {
  formData: {
    category: string;
    name: string;
    stock: string | number;
    unit: string;
    price: string | number;
    discount?: string | number;
    quantity: string | number;
  };
  updateField: (field: string, value: string | number) => void;
  onNext: () => void;
  onBack: () => void;
  onShowTable: () => void;
}

export const Step3Product = ({ formData, updateField, onNext, onBack, onShowTable }: Step3Props) => {
  const { playOnce, stopAudio } = useAudioHelper("/audio/price.mp3");

  // Validação de Preço (Bloqueia negativos)
  const handlePriceChange = (val: string) => {
    const value = parseFloat(val);
    if (val === "" || isNaN(value)) {
      updateField("price", "");
    } else {
      updateField("price", Math.max(0, value));
    }
  };

  // Validação de Desconto (0-100%)
  const handleDiscountChange = (val: string) => {
    const value = parseFloat(val);
    if (val === "" || isNaN(value)) {
      updateField("discount", "");
    } else {
      const clampedValue = Math.min(100, Math.max(0, value));
      updateField("discount", clampedValue);
    }
  };

  return (
    <div className="space-y-4">
      <StepHeader title="Detalhes do Produto" audioPath="/audio/Recording_7.m4a" />
      
      {/* 1. Categoria */}
      <div className="flex items-center border border-gray-200 rounded-2xl p-4 bg-gray-50 focus-within:ring-2 ring-green-500">
        <Layers className="text-gray-400 mr-3" size={20} />
        <select 
          className="w-full outline-none bg-transparent cursor-pointer font-medium text-gray-700"
          value={formData.category}
          onChange={(e) => updateField("category", e.target.value)}
        >
          <option value="">Selecione a Categoria</option>
          <option value="Verduras">Verduras</option>
          <option value="Frutas">Frutas</option>
          <option value="Legumes">Legumes</option>
          <option value="Raizes">Raizes</option>
          <option value="Cereais">Cereais</option>
        </select>
      </div>
 
      {/* 2. Nome do Produto (Proteção contra Autofill indesejado) */}
      <div className="flex items-center border border-gray-200 rounded-2xl p-4 bg-gray-50 focus-within:ring-2 ring-green-500 relative">
        <Package className="text-gray-400 mr-3" size={20} />
        <input 
          type="text" 
          placeholder="Nome do Produto (ex: Tomate Fresco)"
          className="w-full outline-none bg-transparent font-medium text-gray-700"
          value={formData.name} 
          onChange={(e) => updateField("name", e.target.value)}
          autoComplete="off"
          spellCheck="false"
        />
      </div>

      {/* 3. Stock e Unidade */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center border border-gray-200 rounded-2xl p-4 bg-gray-50 focus-within:ring-2 ring-green-500">
          <Hash className="text-gray-400 mr-3" size={20} />
          <input 
            type="number" placeholder="Stock" min="0"
            className="w-full outline-none bg-transparent font-medium"
            value={formData.stock}
            onChange={(e) => {
                const val = e.target.value;
                const num = parseFloat(val);
                const finalVal = (num < 0) ? 0 : val;
                updateField("stock", finalVal);
                updateField("quantity", finalVal);
            }}
          />
        </div>
        <div className="flex items-center border border-gray-200 rounded-2xl p-4 bg-gray-50 focus-within:ring-2 ring-green-500">
          <Scale className="text-gray-400 mr-3" size={20} />
          <select 
            className="w-full outline-none bg-transparent font-medium cursor-pointer text-gray-700"
            value={formData.unit}
            onChange={(e) => updateField("unit", e.target.value)}
          >
            <option value="kg">kilograma (kg)</option>
            <option value="molho">molho</option>
            <option value="unidade">unidade</option>
           </select>
        </div>
      </div>

      {/* 4. Preço e Desconto */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center border border-gray-200 rounded-2xl p-4 bg-gray-50 focus-within:ring-2 ring-green-500">
            <Coins className="text-gray-400 mr-3" size={20} />
            <input 
              type="number" placeholder="Preço"
              className="w-full outline-none bg-transparent font-medium"
              value={formData.price}
              onChange={(e) => handlePriceChange(e.target.value)}
            />
            <button 
                type="button"
                onMouseEnter={() => playOnce()} 
                onMouseLeave={() => stopAudio()} 
                onClick={onShowTable}
                className="ml-2 cursor-pointer text-blue-500 hover:text-blue-600 transition-all hover:scale-110"
                title="Dica de Preços"
            >
                <Info size={22} />
            </button>
        </div>

        <div className="flex items-center border border-gray-200 rounded-2xl p-4 bg-gray-50 focus-within:ring-2 ring-red-400">
          <Tag className="text-gray-400 mr-3" size={20} />
          <input 
            type="number" 
            placeholder="Desc. %"
            className="w-full outline-none bg-transparent font-medium text-red-500"
            value={formData.discount}
            onChange={(e) => handleDiscountChange(e.target.value)}
          />
        </div>
      </div>

      {/* Navegação */}
      <div className="flex gap-3 pt-4">
        <button 
          onClick={onBack} 
          className="flex-1 py-4 cursor-pointer border border-gray-200 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 active:scale-95 transition-all"
        >
          Voltar
        </button>
        <button 
          onClick={onNext}
          disabled={!formData.category || !formData.price || !formData.stock || !formData.name}
          className="flex-1 py-4 rounded-2xl bg-green-800 text-white font-bold disabled:opacity-50 hover:bg-green-900 active:scale-95 transition-all shadow-lg shadow-green-100"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};