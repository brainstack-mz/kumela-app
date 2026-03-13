"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, X, Navigation, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import type { ConfirmPayload } from "@/components/smart-form/MapTouch";

const MapTouch = dynamic(() => import("@/components/smart-form/MapTouch"), { ssr: false });

interface Step3Props {
  purchaseData: any;
  onBack: () => void;
  onNext: (data: any) => void;
  onClose?: () => void;
}

const PROVINCE = "Nampula";
const DISTRICTS = [
  "Nampula", "Angoche", "Eráti", "Ilha de Moçambique", "Lalaua", "Larde", "Liúpo",
  "Malema", "Meconta", "Mecubúri", "Memba", "Mogincual", "Mogovolas",
  "Moma", "Monapo", "Mossuril", "Muecate", "Murrupula", "Nacala-Porto",
  "Nacala-a-Velha", "Nacarôa", "Rapale", "Ribáuè"
];

export default function Step2Location({ purchaseData, onBack, onNext, onClose }: Step3Props) {
  const [district, setDistrict] = useState(purchaseData.district || "");
  const [bairro, setBairro] = useState(purchaseData.bairro || "");
  const [showMap, setShowMap] = useState(false);
  const [locationCoords, setLocationCoords] = useState<{ lat: number; lng: number } | null>(
    purchaseData.locationCoords || null
  );

  useEffect(() => {
    if (navigator.geolocation && !locationCoords) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationCoords({ lat: latitude, lng: longitude });
        },
        () => {}
      );
    }
  }, []);

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
      ...purchaseData,
      province: PROVINCE,
      district,
      bairro,
      locationCoords,
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-white text-gray-900 rounded-3xl overflow-hidden relative p-5 sm:p-6"
      >

        {/* Progress Indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">ETAPA 2 de 4</span>
            <span className="text-[10px] text-gray-400 font-medium">Localização</span>
          </div>
          <div className="w-full h-1 bg-gray-100 rounded-full">
            <div className="h-1 bg-green-500 rounded-full transition-all duration-500" style={{ width: "50%" }}></div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-center mb-2">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-green-50 rounded-full mb-2">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-800 leading-tight">Localização</h2>
            <p className="text-[12px] text-gray-500">Onde devemos entregar?</p>
          </div>

          <div className="space-y-3">
            {/* Província (Fixo) */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Província</label>
              <div className="w-full h-11 px-4 flex items-center border border-gray-100 rounded-xl bg-gray-50 text-gray-500 text-sm font-medium">
                {PROVINCE} 
              </div>
            </div>

            {/* Distrito */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Distrito</label>
              <div className="relative">
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full h-11 px-4 appearance-none text-sm border border-gray-200 rounded-xl bg-white focus:border-green-500 outline-none transition-all pr-10"
                >
                  <option value="">Selecione o Distrito</option>
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Bairro / Endereço */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Bairro / Rua</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  placeholder="Ex: Bairro Central"
                  className="flex-1 h-11 px-4 text-sm border border-gray-200 rounded-xl bg-white focus:border-green-500 outline-none transition-all"
                />
                <button
                  onClick={() => setShowMap(true)}
                  className="w-11 h-11 flex items-center justify-center bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors border border-green-100 shadow-sm"
                  title="Abrir Mapa"
                >
                  <Navigation size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 h-12 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all"
          >
            Voltar
          </button>
          <button
            onClick={handleNext}
            disabled={!district || !bairro}
            className="flex-[1.5] h-12 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-40 shadow-md shadow-green-100"
          >
            Próximo
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Modal do Mapa */}
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