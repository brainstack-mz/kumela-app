// components/smart-form/MapTouch.tsx
"use client";

/**
 * MapTouch.tsx
 * -------------------------------------------------------------
 * Componente modal de mapa interativo (Leaflet + OpenStreetMap)
 * - Usuário toca no mapa → define marcador
 * - Faz reverse-geocoding automático (Nominatim)
 * - Retorna { lat, lng, displayName, province, district }
 * - Compatível com Next.js, Cordova e PWA
 * -------------------------------------------------------------
 */

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Imports dinâmicos (evitam SSR issues no Next.js)
const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });

let useMapEvents: any = null;
if (typeof window !== "undefined") {
  // require dinamicamente apenas no browser
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const rl = require("react-leaflet");
  useMapEvents = rl.useMapEvents;
}

// Tipagem para payload devolvido ao formulário
export type ConfirmPayload = {
  lat: number;
  lng: number;
  displayName?: string;
  province?: string;
  district?: string;
};

// Props do componente principal
interface MapTouchProps {
  initialCoords?: { lat: number; lng: number } | null;
  onConfirm: (payload: ConfirmPayload) => void;
  onClose: () => void;
  title?: string;
}

const MarkerWithEvents: React.FC<{
  position: { lat: number; lng: number } | null;
  setPosition: (p: { lat: number; lng: number } | null) => void;
}> = ({ position, setPosition }) => {
  const map = (useMapEvents as any)({
    click(e: any) {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  useEffect(() => {
    if (position && map) {
      map.setView([position.lat, position.lng], map.getZoom(), { animate: true });
    }
  }, [position, map]);

  if (!position) return null;
  return <Marker position={[position.lat, position.lng]} />;
};

const MapTouch: React.FC<MapTouchProps> = ({
  initialCoords = null,
  onConfirm,
  onClose,
  title = "Escolher localidade no mapa",
}) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(initialCoords);
  const [displayName, setDisplayName] = useState<string | undefined>();
  const [province, setProvince] = useState<string | undefined>();
  const [district, setDistrict] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Corrige ícone padrão do Leaflet (evita "iconUrl not set")
  useEffect(() => {
    const icon = L.icon({
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    L.Marker.prototype.options.icon = icon;
  }, []);

  // Faz reverse-geocoding automático ao marcar posição
  useEffect(() => {
    const reverse = async () => {
      if (!position) {
        setDisplayName(undefined);
        setProvince(undefined);
        setDistrict(undefined);
        setError(null);
        return;
      }

      if (!navigator.onLine) {
        setError("Offline: não é possível obter nome automaticamente.");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.lat}&lon=${position.lng}&zoom=16&addressdetails=1`;
        const res = await fetch(url, { headers: { Accept: "application/json" } });
        const data = await res.json();

        if (mountedRef.current) {
          const { address } = data;
          setDisplayName(data.display_name);
          setProvince(address?.state || address?.region || undefined);
          setDistrict(address?.county || address?.city_district || address?.city || undefined);
        }
      } catch (err) {
        if (mountedRef.current) setError("Não foi possível obter o nome automaticamente.");
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    };

    reverse();
  }, [position]);

  const handleConfirm = () => {
    if (!position) {
      alert("Por favor, toque no mapa para marcar a posição desejada.");
      return;
    }
    onConfirm({ lat: position.lat, lng: position.lng, displayName, province, district });
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between p-3 border-b">
        <div>
          <strong className="text-lg">{title}</strong>
          <p className="text-sm text-gray-500">Toque no mapa para marcar</p>
        </div>
        <button
          onClick={onClose}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
        >
          Fechar
        </button>
      </div>

      {/* Corpo: mapa */}
      <div style={{ flex: 1 }}>
        {typeof window === "undefined" ? (
          <div className="flex items-center justify-center h-full">
            Carregando mapa...
          </div>
        ) : (
          <MapContainer
            center={initialCoords ? [initialCoords.lat, initialCoords.lng] : [-25.9692, 32.5732]}
            zoom={initialCoords ? 13 : 6}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerWithEvents position={position} setPosition={setPosition} />
          </MapContainer>
        )}
      </div>

      {/* Rodapé */}
      <div className="p-3 border-t bg-white">
        {position ? (
          <div className="text-sm text-gray-700 mb-2">
            <div><strong>Coordenadas:</strong> {position.lat.toFixed(5)}, {position.lng.toFixed(5)}</div>
            <div><strong>Província:</strong> {province || "—"}</div>
            <div><strong>Distrito:</strong> {district || "—"}</div>
            <div>
              <strong>Localidade:</strong>{" "}
              {loading ? "Obtendo nome..." : (displayName ?? <em className="text-gray-400">Nome não disponível</em>)}
            </div>
            {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
          </div>
        ) : (
          <p className="text-sm text-gray-600 mb-2">
            Toque no mapa para adicionar um marcador.
          </p>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => {
              if (!navigator.geolocation) return alert("Geolocalização não suportada.");
              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                },
                () => alert("Não foi possível obter localização."),
                { enableHighAccuracy: true, timeout: 8000 }
              );
            }}
            className="flex-1 py-2 rounded bg-gray-100 hover:bg-gray-200"
          >
            Usar minha localização
          </button>
          <button
            onClick={() => {
              setPosition(null);
              setDisplayName(undefined);
              setProvince(undefined);
              setDistrict(undefined);
              setError(null);
            }}
            className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200"
          >
            Limpar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-green-600 text-white font-semibold"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapTouch;
