"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import type { ConfirmPayload } from "@/components/smart-form/MapTouch";

const MapTouch = dynamic(() => import("@/components/smart-form/MapTouch"), { ssr: false });

interface Step3Props {
  purchaseData: any;
  onBack: () => void;
  onNext: (data: any) => void;
}

const PROVINCE = "Nampula";
const DISTRICTS = [
  "Nampula", "Angoche", "Eráti", "Ilha de Moçambique", "Lalaua", "Larde", "Liúpo",
  "Malema", "Meconta", "Mecubúri", "Memba", "Mogincual", "Mogovolas",
  "Moma", "Monapo", "Mossuril", "Muecate", "Murrupula", "Nacala-Porto",
  "Nacala-a-Velha", "Nacarôa", "Rapale", "Ribáuè"
];

export default function Step3Location({ purchaseData, onBack, onNext }: Step3Props) {
  const [district, setDistrict] = useState(purchaseData.district || "");
  const [bairro, setBairro] = useState(purchaseData.bairro || "");
  const [showMap, setShowMap] = useState(false);
  const [locationCoords, setLocationCoords] = useState<{ lat: number; lng: number } | null>(
    purchaseData.locationCoords || null
  );

  // Pega localização atual automaticamente ao carregar
  useEffect(() => {
    if (navigator.geolocation && !locationCoords) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationCoords({ lat: latitude, lng: longitude });
          setBairro(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        },
        () => {
          // Silenciosamente falha se não tiver permissão
        }
      );
    }
  }, []);

  const handleMapConfirm = (payload: ConfirmPayload) => {
    setLocationCoords({ lat: payload.lat, lng: payload.lng });
    if (payload.displayName) {
      setBairro(payload.displayName);
    } else if (payload.district) {
      setBairro(payload.district);
    }
    setShowMap(false);
  };

  const handleNext = () => {
    if (!district) {
      toast.error("Selecione um distrito!");
      return;
    }
    if (!bairro) {
      toast.error("Digite ou selecione o bairro!");
      return;
    }

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
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full"
      >
        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">ETAPA 3 de 5</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Localização</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div className="h-2 bg-green-600 rounded-full" style={{ width: "60%" }}></div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-3">
              <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              Localização
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Selecione o distrito e bairro de entrega
            </p>
          </div>

          <div className="space-y-4">
            {/* Província Fixa */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Província
              </label>
              <input
                type="text"
                value={PROVINCE}
                disabled
                className="w-full p-3 text-base border-2 rounded-xl bg-gray-100 dark:bg-gray-700 opacity-50 cursor-not-allowed"
              />
            </div>

            {/* Distrito */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Distrito
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full p-3 text-base border-2 rounded-xl bg-white dark:bg-gray-700 focus:outline-none focus:border-green-500"
              >
                <option value="">Selecione o Distrito</option>
                {DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Bairro */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bairro
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  placeholder="Digite o bairro"
                  className="flex-1 p-3 text-base border-2 rounded-xl bg-white dark:bg-gray-700 focus:outline-none focus:border-green-500"
                />
                <button
                  onClick={() => {
                    // Primeiro tenta pegar a localização atual
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          const { latitude, longitude } = position.coords;
                          setLocationCoords({ lat: latitude, lng: longitude });
                          setBairro(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
                          setShowMap(true);
                        },
                        () => {
                          // Se falhar, abre o mapa normalmente
                          setShowMap(true);
                        }
                      );
                    } else {
                      setShowMap(true);
                    }
                  }}
                  className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span className="hidden sm:inline">GPS</span>
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Clique em GPS para usar sua localização atual ou escolher no mapa
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onBack}
            className="flex-1 px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Voltar
          </button>
          <button
            onClick={handleNext}
            disabled={!district || !bairro}
            className="flex-1 px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Modal do Mapa */}
      {showMap && (
        <MapTouch
          initialCoords={locationCoords}
          onConfirm={handleMapConfirm}
          onClose={() => setShowMap(false)}
          title="Selecione sua localização no mapa"
        />
      )}
    </>
  );
}
