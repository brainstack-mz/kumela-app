'use client';

import { Layers, Hash, Coins, Info, Scale, Tag, Package } from "lucide-react";
import { StepHeader } from "../ui/StepHeader";
import { useAudioHelper } from "../hooks/useAudioHelper";

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

  const handlePriceChange = (val: string) => {
    const value = parseFloat(val);
    if (val === "" || isNaN(value)) {
      updateField("price", "");
    } else {
      updateField("price", Math.max(0, value));
    }
  };

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
      <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-2xl p-4 bg-gray-50 dark:bg-slate-800/50 focus-within:ring-2 ring-green-500 transition-colors">
        <Layers className="text-gray-400 dark:text-slate-500 mr-3" size={20} />
        <select 
          className="w-full outline-none bg-transparent cursor-pointer font-medium text-gray-700 dark:text-white transition-colors"
          value={formData.category}
          onChange={(e) => updateField("category", e.target.value)}
        >
          <option value="" className="dark:bg-slate-900">Selecione a Categoria</option>
          <option value="Verduras" className="dark:bg-slate-900">Verduras</option>
          <option value="Frutas" className="dark:bg-slate-900">Frutas</option>
          <option value="Legumes" className="dark:bg-slate-900">Legumes</option>
          <option value="Raizes" className="dark:bg-slate-900">Raizes</option>
          <option value="Cereais" className="dark:bg-slate-900">Cereais</option>
        </select>
      </div>
 
      {/* 2. Nome do Produto */}
      <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-2xl p-4 bg-gray-50 dark:bg-slate-800/50 focus-within:ring-2 ring-green-500 relative transition-colors">
        <Package className="text-gray-400 dark:text-slate-500 mr-3" size={20} />
        <input 
          type="text" 
          placeholder="Nome do Produto (ex: Tomate Fresco)"
          className="w-full outline-none bg-transparent font-medium text-gray-700 dark:text-white dark:placeholder:text-slate-500"
          value={formData.name} 
          onChange={(e) => updateField("name", e.target.value)}
          autoComplete="off"
          spellCheck="false"
        />
      </div>

      {/* 3. Stock e Unidade */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-2xl p-4 bg-gray-50 dark:bg-slate-800/50 focus-within:ring-2 ring-green-500 transition-colors">
          <Hash className="text-gray-400 dark:text-slate-500 mr-3" size={20} />
          <input 
            type="number" placeholder="Stock" min="0"
            className="w-full outline-none bg-transparent font-medium dark:text-white dark:placeholder:text-slate-500"
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
        <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-2xl p-4 bg-gray-50 dark:bg-slate-800/50 focus-within:ring-2 ring-green-500 transition-colors">
          <Scale className="text-gray-400 dark:text-slate-500 mr-3" size={20} />
          <select 
            className="w-full outline-none bg-transparent font-medium cursor-pointer text-gray-700 dark:text-white transition-colors"
            value={formData.unit}
            onChange={(e) => updateField("unit", e.target.value)}
          >
            <option value="kg" className="dark:bg-slate-900">kilograma (kg)</option>
            <option value="molho" className="dark:bg-slate-900">molho</option>
            <option value="unidade" className="dark:bg-slate-900">unidade</option>
           </select>
        </div>
      </div>

      {/* 4. Preço e Desconto */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-2xl p-4 bg-gray-50 dark:bg-slate-800/50 focus-within:ring-2 ring-green-500 transition-colors">
            <Coins className="text-gray-400 dark:text-slate-500 mr-3" size={20} />
            <input 
              type="number" placeholder="Preço"
              className="w-full outline-none bg-transparent font-medium dark:text-white dark:placeholder:text-slate-500"
              value={formData.price}
              onChange={(e) => handlePriceChange(e.target.value)}
            />
            <button 
                type="button"
                onMouseEnter={() => playOnce()} 
                onMouseLeave={() => stopAudio()} 
                onClick={onShowTable}
                className="ml-2 cursor-pointer text-blue-500 dark:text-blue-400 hover:text-blue-600 transition-all hover:scale-110"
                title="Dica de Preços"
            >
                <Info size={22} />
            </button>
        </div>

        <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-2xl p-4 bg-gray-50 dark:bg-slate-800/50 focus-within:ring-2 ring-red-400 transition-colors">
          <Tag className="text-gray-400 dark:text-slate-500 mr-3" size={20} />
          <input 
            type="number" 
            placeholder="Desc. %"
            className="w-full outline-none bg-transparent font-medium text-red-500 dark:text-red-400 dark:placeholder:text-slate-500"
            value={formData.discount}
            onChange={(e) => handleDiscountChange(e.target.value)}
          />
        </div>
      </div>

      {/* Navegação */}
      <div className="flex gap-3 pt-4">
        <button 
          onClick={onBack} 
          className="flex-1 py-4 cursor-pointer border border-gray-200 dark:border-slate-700 rounded-2xl font-bold text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 active:scale-95 transition-all"
        >
          Voltar
        </button>
        <button 
          onClick={onNext}
          disabled={!formData.category || !formData.price || !formData.stock || !formData.name}
          className="flex-1 py-4 rounded-2xl bg-green-800 dark:bg-green-700 text-white font-bold disabled:opacity-50 hover:bg-green-900 dark:hover:bg-green-600 active:scale-95 transition-all shadow-lg shadow-green-100 dark:shadow-none"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};