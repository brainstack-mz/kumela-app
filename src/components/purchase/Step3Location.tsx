"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Navigation, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { StepHeader } from "@/components/smart-form/ui/StepHeader";
import type { ConfirmPayload } from "@/components/smart-form/MapTouch";

const MapTouch = dynamic(() => import("@/components/smart-form/MapTouch"), { ssr: false });

interface LocationCoords {
  lat: number;
  lng: number;
}

interface Step3Props {
  purchaseData: {
    district?: string;
    bairro?: string;
    locationCoords?: LocationCoords;
  };
  onBack: () => void;
  onNext: (data: {
    district: string;
    bairro: string;
    locationCoords: LocationCoords | null;
    province: string;
  }) => void;
  onClose?: () => void;
}

const PROVINCE = "Nampula";
const DISTRICTS = [
  "Nampula", "Angoche", "Eráti", "Ilha de Moçambique", "Lalaua", "Larde", "Liúpo",
  "Malema", "Meconta", "Mecubúri", "Memba", "Mogincual", "Mogovolas",
  "Moma", "Monapo", "Mossuril", "Muecate", "Murrupula", "Nacala-Porto",
  "Nacala-a-Velha", "Nacarôa", "Rapale", "Ribáuè"
];

export default function Step3Location({ purchaseData, onBack, onNext }: Step3Props) {
  const [district, setDistrict] = useState<string>(purchaseData.district || "");
  const [bairro, setBairro] = useState<string>(purchaseData.bairro || "");
  const [showMap, setShowMap] = useState<boolean>(false);
  const [locationCoords, setLocationCoords] = useState<LocationCoords | null>(
    purchaseData.locationCoords || null
  );

  useEffect(() => {
    if (navigator.geolocation && !locationCoords) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude 
          });
        },
        () => {
          console.log("Geolocalização não permitida.");
        }
      );
    }
  }, [locationCoords]);

  const handleMapConfirm = (payload: ConfirmPayload) => {
    setLocationCoords({ lat: payload.lat, lng: payload.lng });
    if (payload.displayName || payload.district) {
      setBairro(payload.displayName || payload.district || "");
    }
    setShowMap(false);
  };

  const handleNext = () => {
    if (!district) return toast.error("Selecione um distrito");
    if (!bairro) return toast.error("Informe o bairro");

    onNext({
      district,
      bairro,
      locationCoords,
      province: PROVINCE,
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full bg-white text-gray-900"
      >
        {/* Header com Áudio seguindo o padrão Kumela */}
        <StepHeader 
          title="Localização" 
          audioPath="/audio/location_instructions.m4a" 
        />

        <div className="space-y-5">
        

          <div className="space-y-1">
            {/* Província (Visual apenas conforme imagem) */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Província</label>
              <div className="w-full h-10 px-4 flex items-center border border-gray-100 rounded-2xl bg-gray-50 text-gray-500 font-semibold">
                {PROVINCE} 
              </div>
            </div>

            {/* Distrito */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Distrito</label>
              <div className="relative border border-gray-200 rounded-2xl bg-gray-50 focus-within:ring-2 ring-green-500 transition-all">
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full h-10 px-4 appearance-none bg-transparent outline-none font-medium text-gray-900"
                >
                  <option value="">Selecione o Distrito</option>
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>

            {/* Bairro / Rua com Botão de Mapa */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Bairro / Rua</label>
              <div className="flex gap-2">
                <div className="flex-1 h-10 flex items-center border border-gray-200 rounded-2xl p-4 bg-gray-50 focus-within:ring-2 ring-green-500 transition-all">
                  <input
                    type="text"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    placeholder="Ex: Bairro Central"
                    className="w-full outline-none bg-transparent font-medium"
                  />
                </div>
                <button
                  onClick={() => setShowMap(true)}
                  className="w-10 h-10 flex items-center justify-center bg-green-50 text-green-600 rounded-2xl border border-green-100 hover:bg-green-100 transition-all shadow-sm shrink-0"
                >
                  <Navigation size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Navegação unificados com o design Kumela */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 h-14 rounded-2xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all active:scale-95"
          >
            Voltar
          </button>
          <button
            onClick={handleNext}
            disabled={!district || !bairro}
            className="flex-[2] h-14 rounded-2xl bg-[#10B981] text-white font-bold hover:bg-green-600 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-green-100"
          >
            Próximo
            <ArrowRight size={20} />
          </button>
        </div>
      </motion.div>

      {showMap && (
        <MapTouch
          initialCoords={locationCoords}
          onConfirm={handleMapConfirm}
          onClose={() => setShowMap(false)}
          title="Sua localização"
        />
      )}
    </>
  );
}