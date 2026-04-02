'use client';

import { MapPin, Map as MapIcon } from "lucide-react";
import { StepHeader } from "../ui/StepHeader";
import { provincesData } from "@/data/provincesData";
import { useState } from "react";
import dynamic from "next/dynamic";

const MapTouch = dynamic(() => import("../MapTouch"), { ssr: false });

interface Step2Props {
  formData: {
    district: string;
    locality: string;
    lat?: number;
    lng?: number;
  };
  updateField: (field: string, value: string | number) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2Location = ({ formData, updateField, onNext, onBack }: Step2Props) => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <div className="space-y-4">
      <StepHeader title="Localização" audioPath="/audio/Recording_7.m4a" />

      {/* Província Fixa */}
      <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-2xl p-4 bg-gray-50 dark:bg-slate-800/50 focus-within:ring-2 ring-green-500 transition-colors">
        <MapPin className="text-gray-400 dark:text-slate-500 mr-2" size={20} />
        <input 
          type="text" 
          value={provincesData[0].name} 
          disabled 
          className="w-full bg-transparent cursor-not-allowed font-medium dark:text-slate-300" 
        />
      </div>

      {/* Seleção de Distrito */}
      <select
        className="w-full flex items-center border border-gray-200 dark:border-slate-700 rounded-2xl p-4 bg-gray-50 dark:bg-slate-800/50 focus-within:ring-2 ring-green-500 outline-none font-medium dark:text-white transition-colors"
        value={formData.district}
        onChange={(e) => updateField("district", e.target.value)}
      >
        <option value="" className="dark:bg-slate-900">Selecione o Distrito</option>
        {provincesData[0].districts.map(d => (
          <option key={d} value={d} className="dark:bg-slate-900">{d}</option>
        ))}
      </select>

      {/* Localidade e Botão de Mapa */}
      <div className="flex gap-2">
        <div className="flex-1 flex items-center border border-gray-200 dark:border-slate-700 rounded-2xl p-4 bg-gray-50 dark:bg-slate-800/50 focus-within:ring-2 ring-green-500 transition-colors">
          <input
            type="text"
            placeholder="Localidade / GPS"
            className="w-full outline-none text-sm bg-transparent font-medium dark:text-white dark:placeholder:text-slate-500"
            value={formData.locality}
            onChange={(e) => updateField("locality", e.target.value)}
          />
        </div>
        <button 
          onClick={() => setIsMapOpen(true)}
          className="p-4 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-2xl hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors cursor-pointer flex items-center justify-center shadow-sm"
          title="Abrir Mapa"
        >
          <MapIcon size={20} />
        </button>
      </div>

      {/* Navegação */}
      <div className="flex gap-3 pt-2">
        <button 
          onClick={onBack} 
          className="flex-1 py-4 border border-gray-200 dark:border-slate-700 rounded-2xl font-bold text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
        >
          Voltar
        </button>
        <button 
          onClick={onNext} 
          disabled={!formData.district || !formData.locality} 
          className="flex-1 py-4 rounded-2xl bg-green-800 dark:bg-green-700 text-white font-bold disabled:opacity-50 hover:bg-green-900 dark:hover:bg-green-600 active:scale-95 transition-all cursor-pointer shadow-lg shadow-green-100 dark:shadow-none"
        >
          Continuar
        </button>
      </div>

      {/* Modal do Mapa */}
      {isMapOpen && (
        <MapTouch 
          onClose={() => setIsMapOpen(false)}
          onConfirm={(payload: { displayName?: string; lat: number; lng: number }) => {
            updateField("locality", payload.displayName || `${payload.lat}, ${payload.lng}`);
            updateField("lat", payload.lat);
            updateField("lng", payload.lng);
            setIsMapOpen(false);
          }}
        />
      )}
    </div>
  );
};