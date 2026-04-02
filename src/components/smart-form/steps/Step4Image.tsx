"use client";

import React from "react";
import Image from "next/image";
import { Upload, X, FileText } from "lucide-react";
import { StepHeader } from "../ui/StepHeader";

interface Step4Props {
  formData: {
    images: string[];
    description: string;
    imageURL?: string;
  };
  updateField: (field: string, value: string | string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step4Image = ({
  formData,
  updateField,
  onNext,
  onBack,
}: Step4Props) => {
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImages = filesArray.map((file) => URL.createObjectURL(file));
      const combined = [...(formData.images || []), ...newImages].slice(0, 5);

      updateField("images", combined);
      if (combined.length > 0) updateField("imageURL", combined[0]);
    }
  };

  const removeImage = (index: number) => {
    const filtered = (formData.images || []).filter(
      (img: string, i: number) => i !== index,
    );
    updateField("images", filtered);
    updateField("imageURL", filtered[0] || "");
  };

  return (
    <div className="space-y-4">
      <StepHeader
        title="Aparência e Descrição"
        audioPath="/audio/Recording_7.m4a"
      />

      {/* Descrição do Produto - Altura reduzida e adaptável */}
      <div className="border border-gray-200 dark:border-slate-700 rounded-2xl p-4 bg-gray-50 dark:bg-slate-800/50 focus-within:ring-2 ring-green-500 transition-all">
        <div className="flex items-center mb-2 text-gray-400 dark:text-slate-500">
          <FileText size={18} className="mr-2" />
          <span className="text-sm font-medium">Descrição</span>
        </div>
        <textarea
          placeholder="Conte detalhes (ex: Tomates orgânicos...)"
          className="w-full h-20 min-h-[80px] outline-none bg-transparent font-medium text-gray-700 dark:text-slate-200 resize-y"
          value={formData.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
        />
      </div>

      {/* Grid de Fotos */}
      <div className="grid grid-cols-3 gap-3">
        {formData.images?.map((img: string, idx: number) => (
          <div
            key={idx}
            className="relative h-24 bg-gray-200 dark:bg-slate-800 rounded-2xl overflow-hidden group border border-gray-100 dark:border-slate-700 shadow-sm"
          >
            <Image
              src={img}
              alt={`Preview ${idx}`}
              fill
              sizes="(max-width: 768px) 33vw, 25vw"
              className="object-cover rounded-2xl transition-all"
              unoptimized
            />
            <button
              onClick={() => removeImage(idx)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors cursor-pointer z-10"
            >
              <X size={14} />
            </button>
            {idx === 0 && (
              <div className="absolute bottom-0 w-full bg-[#2E7D32]/90 text-white text-[8px] py-1 text-center font-black tracking-widest uppercase">
                CAPA
              </div>
            )}
          </div>
        ))}

        {(formData.images?.length || 0) < 5 && (
          <label className="h-24 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-green-50 dark:hover:bg-green-500/5 hover:border-[#2E7D32] transition-all text-gray-400 dark:text-slate-500 group">
            <Upload
              size={24}
              className="group-hover:text-[#2E7D32] transition-colors"
            />
            <span className="text-[10px] font-bold mt-1 uppercase group-hover:text-[#2E7D32]">
              Add Foto
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImages}
            />
          </label>
        )}
      </div>

      <p className="text-center text-[11px] text-gray-400 dark:text-slate-500 font-medium">
        Adicione até 5 fotos reais. A primeira será a foto de capa.
      </p>

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
          disabled={!formData.images || formData.images.length === 0 || !formData.description}
          className="flex-1 py-4 rounded-2xl bg-[#2E7D32] text-white font-bold disabled:opacity-50 shadow-lg shadow-green-100 dark:shadow-none active:scale-95 transition-all cursor-pointer"
        >
          Revisar Anúncio
        </button>
      </div>
    </div>
  );
};