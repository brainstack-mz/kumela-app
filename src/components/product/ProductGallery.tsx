// src/components/product/ProductGallery.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

export function ProductGallery({ images }: { images: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Grid Reduzido: h-[300px] no mobile e [400px] no desktop para não "empurrar" o conteúdo */}
      <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[280px] md:h-[400px]">
        {/* Imagem Principal */}
        <div 
          onClick={() => setSelectedIndex(0)}
          className="col-span-4 md:col-span-3 row-span-2 relative group overflow-hidden rounded-[32px] cursor-pointer bg-gray-50 border-2 border-white shadow-lg"
        >
          <Image 
            src={images[0]} 
            alt="Destaque" 
            fill 
            className="object-cover transform group-hover:scale-105 transition-transform duration-1000" 
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/90 backdrop-blur p-2 rounded-xl shadow-lg">
              <Maximize2 size={18} className="text-gray-700" />
            </div>
          </div>
        </div>

        {/* Laterais (Desktop) */}
        <div className="hidden md:flex flex-col gap-3 col-span-1 row-span-2">
          {images.slice(1, 3).map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedIndex(idx + 1)}
              className="h-1/2 relative group overflow-hidden rounded-[24px] cursor-pointer border-2 border-white shadow-md"
            >
              <Image src={img} alt="Galeria" fill className="object-cover group-hover:scale-110 transition-all duration-700" />
            </div>
          ))}
          {images.length > 3 && (
            <div 
              onClick={() => setSelectedIndex(3)}
              className="relative h-1/2 rounded-[24px] bg-gray-900 overflow-hidden cursor-pointer group"
            >
              <Image src={images[3]} alt="Mais" fill className="object-cover opacity-40 group-hover:scale-110 transition-all" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-black text-lg">+{images.length - 3}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Miniaturas Mobile */}
      <div className="flex gap-2 md:hidden overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            onClick={() => setSelectedIndex(idx)}
            className={`min-w-[80px] aspect-square rounded-xl overflow-hidden border-2 transition-all ${
              selectedIndex === idx ? "border-green-600 scale-95" : "border-white shadow-sm"
            } relative`}
          >
            <Image src={img} alt="Thumb" fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* Lightbox Slider (O carrossel ao clicar) */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 bg-white/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Botão Fechar */}
          <button className="absolute top-6 right-6 z-[110] p-3 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-all">
            <X size={24} />
          </button>

          {/* Navegação */}
          <div className="absolute inset-x-4 md:inset-x-10 flex items-center justify-between z-[105] pointer-events-none">
            <button 
              onClick={prevImage}
              className="p-4 bg-white/80 backdrop-blur rounded-full shadow-xl pointer-events-auto hover:bg-green-600 hover:text-white transition-all"
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onClick={nextImage}
              className="p-4 bg-white/80 backdrop-blur rounded-full shadow-xl pointer-events-auto hover:bg-green-600 hover:text-white transition-all"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Imagem em Exibição */}
          <div className="relative w-full max-w-4xl h-[70vh] pointer-events-none">
            <Image 
              src={images[selectedIndex]} 
              alt="Zoom" 
              fill 
              className="object-contain" 
            />
            {/* Contador */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-1 rounded-full text-xs font-black">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}