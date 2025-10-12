"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapPickerProps {
  onSelect: (coords: { lat: number; lng: number }, localityName?: string) => void;
  onCancel: () => void;
}

const MapPicker: React.FC<MapPickerProps> = ({ onSelect, onCancel }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([-25.9655, 32.5832], 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    let marker: L.Marker | null = null;

    map.on("click", async (e: any) => {
      const { lat, lng } = e.latlng;
      if (marker) map.removeLayer(marker);
      marker = L.marker([lat, lng]).addTo(map);

      let localityName = "";
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();
        localityName = data?.address?.village || data?.address?.suburb || data?.address?.town || "";
      } catch {
        localityName = "";
      }

      onSelect({ lat, lng }, localityName);
    });

    map.locate({ setView: true, maxZoom: 14 });

    return () => { map.remove(); };
  }, [onSelect]);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      <div className="flex justify-between items-center p-3 border-b bg-green-600 text-white font-semibold">
        <span>📍 Escolher Localidade no Mapa</span>
        <button
          onClick={onCancel}
          className="px-3 py-1 bg-white text-green-700 rounded-lg font-medium"
        >
          Fechar
        </button>
      </div>
      <div ref={mapRef} className="flex-1 w-full" />
      <p className="text-center text-gray-600 text-sm py-2">
        Toque no mapa para selecionar uma localidade
      </p>
    </div>
  );
};

export default MapPicker;
