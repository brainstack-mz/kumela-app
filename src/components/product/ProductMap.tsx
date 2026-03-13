// src/components/product/ProductMap.tsx
"use client";
import { useState } from "react";
import { MapPin, ShieldCheck, Navigation, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

interface ProductMapProps {
  location: string;
  coordinates?: string; 
}

export function ProductMap({ location, coordinates }: ProductMapProps) {
  const [showMap, setShowMap] = useState(false);

  // Criamos a query para o Google Maps
  const mapQuery = coordinates ? coordinates : `${location}, Mozambique`;
  
  // URL de EMBED (Grátis, funciona dentro do card sem API Key)
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
  
  // URL Externa apenas para o botão de GPS
  const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  return (
    <div className="mt-10 space-y-4">
      {/* Header do Componente */}
      <div className="flex items-center justify-between px-2">
        <div className="space-y-1">
          <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Origem do Cultivo</h3>
          <p className="text-xl font-black text-gray-900">{location}</p>
        </div>
        
        <button 
          onClick={() => setShowMap(!showMap)}
          className={` cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs transition-all active:scale-95 shadow-lg ${
            showMap ? 'bg-gray-100 text-gray-600 shadow-none' : 'bg-[#0D47A1] hover:bg-[#0D471] cursor-pointer text-white   shadow-green-100'
          }`}
        >
          <Navigation size={14} />
          {showMap ? "Ocultar Mapa" : "Ver no Mapa"}
          {showMap ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Container que desliza e mostra o mapa DENTRO dele */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
        showMap ? "max-h-[450px] opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"
      }`}>
        <div className="relative w-full h-[300px] md:h-[350px] rounded-[40px] overflow-hidden border-4 border-white shadow-2xl shadow-gray-200/50 bg-[#f0f4f2]">
          
          {/* MAPA REAL: Carrega aqui dentro sem dar erro de API Key */}
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src={embedUrl}
            className="grayscale-[10%] contrast-[90%]"
          ></iframe>

          {/* Botão flutuante para quem quiser abrir o app externo */}
          <div className="absolute top-4 right-4 z-10">
            <a 
              href={externalMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg text-[10px] font-black uppercase text-gray-700 hover:bg-green-600 hover:text-white transition-all"
            >
              <ExternalLink size={14} /> Abrir GPS
            </a>
          </div>

          {/* Tag de Status */}
          <div className="absolute bottom-4 left-6 z-10">
             <div className="bg-white/80 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold text-gray-500 border border-white flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Localização Exata
             </div>
          </div>
        </div>
      </div>
      
      {/* Selo de Verificação */}
      <div className="flex flex-col items-center gap-2 pt-2">
        <p className="text-[10px] font-bold text-gray-400 flex items-center justify-center gap-2 italic">
          <ShieldCheck size={14} className="text-green-500" /> 
          Localização verificada via satélite pela Kumela
        </p>
      </div>
    </div>
  );
}