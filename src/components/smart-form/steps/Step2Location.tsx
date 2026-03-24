'use client';

import { MapPin, Map as MapIcon } from "lucide-react";
import { StepHeader } from "../ui/StepHeader";
import { provincesData } from "@/data/provincesData";
import { useState } from "react";
import dynamic from "next/dynamic";

const MapTouch = dynamic(() => import("../MapTouch"), { ssr: false });

// Interface para as Props do componente
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
      <div className="flex items-center border border-gray-200 rounded-2xl p-4 bg-gray-50 focus-within:ring-2 ring-green-500">
        <MapPin className="text-gray-400 mr-2" size={20} />
        <input type="text" value={provincesData[0].name} disabled className="w-full bg-transparent cursor-not-allowed font-medium" />
      </div>

      {/* Seleção de Distrito */}
      <select
        className="w-full flex items-center border border-gray-200 rounded-2xl p-4 bg-gray-50 focus-within:ring-2 ring-green-500 outline-none font-medium"
        value={formData.district}
        onChange={(e) => updateField("district", e.target.value)}
      >
        <option value="">Selecione o Distrito</option>
        {provincesData[0].districts.map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      {/* Localidade e Botão de Mapa */}
      <div className="flex gap-2">
        <div className="flex-1 flex items-center border border-gray-200 rounded-2xl p-4 bg-gray-50 focus-within:ring-2 ring-green-500">
          <input
            type="text"
            placeholder="Localidade / GPS"
            className="w-full outline-none text-sm bg-transparent font-medium"
            value={formData.locality}
            onChange={(e) => updateField("locality", e.target.value)}
          />
        </div>
        <button 
          onClick={() => setIsMapOpen(true)}
          className="p-4 bg-green-50 text-green-600 rounded-2xl hover:bg-green-100 transition-colors cursor-pointer flex items-center justify-center shadow-sm"
          title="Abrir Mapa"
        >
          <MapIcon size={20} />
        </button>
      </div>

      {/* Navegação */}
      <div className="flex gap-3 pt-2">
        <button 
          onClick={onBack} 
          className="flex-1 py-4 border border-gray-200 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
        >
          Voltar
        </button>
        <button 
          onClick={onNext} 
          disabled={!formData.district || !formData.locality} 
          className="flex-1 py-4 rounded-2xl bg-green-800 text-white font-bold disabled:opacity-50 hover:bg-green-900 active:scale-95 transition-all cursor-pointer shadow-lg shadow-green-100"
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