// ─────────────────────────────────────────────────────────────────────────────
// components/user/market/MarketFilters.tsx
// Barra de filtros do mercado com pesquisa por voz
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { Mic, MicOff, X } from "lucide-react";
import { useState } from "react";
import { SearchBar, FilterSelect } from "@/components/ui";

const CATEGORIES = [
  { value: "all", label: "Todas" }, { value: "Verduras", label: "Verduras" },
  { value: "Legumes", label: "Legumes" }, { value: "Frutas", label: "Frutas" },
  { value: "Raízes", label: "Raízes" }, { value: "Cereais", label: "Cereais" },
  { value: "Laticínios", label: "Laticínios" },
];

const SORT_OPTIONS = [
  { value: "default",    label: "Relevância" },
  { value: "price_asc",  label: "Preço ↑"    },
  { value: "price_desc", label: "Preço ↓"    },
  { value: "stock",      label: "Mais stock" },
];

interface MarketFiltersProps {
  search:    string;
  category:  string;
  sort:      string;
  onSearch:  (v: string) => void;
  onCategory:(v: string) => void;
  onSort:    (v: string) => void;
}

export default function MarketFilters({
  search, category, sort, onSearch, onCategory, onSort,
}: MarketFiltersProps) {
  const [listening, setListening] = useState(false);

  // Pesquisa por voz via Web Speech API
  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) return;

    if (listening) { setListening(false); return; }

    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = "pt-PT";
    rec.onresult = (e: any) => {
      onSearch(e.results[0][0].transcript);
      setListening(false);
    };
    rec.onerror = () => setListening(false);
    rec.onend   = () => setListening(false);
    rec.start();
    setListening(true);
  };

  return (
    <div className="space-y-3">
      {/* Pesquisa + voz */}
      <div className="flex gap-2">
        <div className="flex-1">
          <SearchBar
            value={search}
            onChange={onSearch}
            placeholder="Pesquisar produto…"
          />
        </div>
        <button
          onClick={handleVoiceSearch}
          aria-label={listening ? "Parar pesquisa por voz" : "Pesquisar por voz"}
          className={[
            "w-11 h-11 flex-shrink-0 rounded-xl flex items-center justify-center transition-all",
            listening
              ? "bg-green-600 text-white animate-pulse"
              : "bg-gray-100 dark:bg-[#0D1F10] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-green-900/40 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400",
          ].join(" ")}
        >
          {listening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        <FilterSelect value={category} onChange={onCategory} options={CATEGORIES} label="Categoria" />
        <FilterSelect value={sort}     onChange={onSort}     options={SORT_OPTIONS} label="Ordenar por" />
        {(search || category !== "all") && (
          <button
            onClick={() => { onSearch(""); onCategory("all"); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors min-h-[40px]"
          >
            <X size={13} /> Limpar filtros
          </button>
        )}
      </div>

      {/* Chips de categoria rápida */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {["all", "Verduras", "Legumes", "Frutas", "Raízes", "Cereais", "Laticínios"].map((c) => (
          <button
            key={c}
            onClick={() => onCategory(c)}
            className={[
              "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all",
              category === c
                ? "bg-green-600 text-white shadow-sm shadow-green-600/20"
                : "bg-gray-100 dark:bg-[#0D1F10] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-green-900/30 hover:border-green-300",
            ].join(" ")}
          >
            {c === "all" ? "Todos" : c}
          </button>
        ))}
      </div>
    </div>
  );
}