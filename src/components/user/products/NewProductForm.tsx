// ─────────────────────────────────────────────────────────────────────────────
// components/user/products/NewProductForm.tsx
// Formulário de 5 passos para o agricultor publicar um novo anúncio
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import { Camera, Check, ChevronRight, ChevronLeft, X } from "lucide-react";
import { provincesData } from "@/data/provincesData";
import type { ProductCategory } from "@/types";

const CATEGORIES: ProductCategory[] = ["Verduras", "Legumes", "Frutas", "Raízes", "Cereais", "Laticínios"];
const UNITS = ["kg", "molho", "lit", "unid", "saco"];

interface NewProductFormData {
  images:      string[];
  name:        string;
  category:    ProductCategory;
  description: string;
  price:       string;
  discount:    string;
  quantity:    string;
  unit:        string;
  district:    string;
}

const EMPTY: NewProductFormData = {
  images: [], name: "", category: "Verduras",
  description: "", price: "", discount: "",
  quantity: "", unit: "kg", district: "Nampula",
};

// Labels e subtítulos de cada passo
const STEPS = [
  { num: 1, label: "Foto",        sub: "Adicione fotos do produto" },
  { num: 2, label: "Informações", sub: "Nome e categoria"          },
  { num: 3, label: "Preço",       sub: "Defina o seu preço"        },
  { num: 4, label: "Stock",       sub: "Quantidade disponível"     },
  { num: 5, label: "Localização", sub: "Onde está o produto"       },
];

interface NewProductFormProps {
  onClose:  () => void;
  onSubmit: (data: NewProductFormData) => void;
}

export default function NewProductForm({ onClose, onSubmit }: NewProductFormProps) {
  const [step, setStep]   = useState(1);
  const [form, setForm]   = useState<NewProductFormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof NewProductFormData, string>>>({});

  const districts = provincesData[0]?.districts ?? [];

  const f = <K extends keyof NewProductFormData>(key: K, value: NewProductFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Validação por passo
  const validateStep = (s: number): boolean => {
    const e: typeof errors = {};
    if (s === 1 && form.images.length === 0)            e.images      = "Adicione pelo menos 1 foto";
    if (s === 2 && !form.name.trim())                   e.name        = "Nome é obrigatório";
    if (s === 2 && !form.description.trim())            e.description = "Descrição é obrigatória";
    if (s === 3 && (!form.price || Number(form.price) <= 0)) e.price   = "Preço inválido";
    if (s === 4 && (!form.quantity || Number(form.quantity) <= 0)) e.quantity = "Quantidade inválida";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep((s) => Math.min(5, s + 1)); };
  const back = () => { setStep((s) => Math.max(1, s - 1)); setErrors({}); };

  const handleSubmit = () => {
    if (validateStep(5)) { onSubmit(form); onClose(); }
  };

  // Simular upload de foto
  const addPhoto = () => {
    const placeholders = [
      "/assets/imgs/tomate.jpeg", "/assets/imgs/banana.jpeg",
      "/assets/imgs/milho.jpeg",  "/assets/imgs/manga.jpeg",
    ];
    if (form.images.length < 4) {
      f("images", [...form.images, placeholders[form.images.length]]);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative z-10 bg-white dark:bg-[#0A1A0E] w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl border border-gray-100 dark:border-green-900/40 overflow-hidden max-h-[92vh] flex flex-col">

        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-green-900/30 flex-shrink-0">
          <div>
            <p className="text-base font-black text-gray-900 dark:text-white">
              Publicar Anúncio
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Passo {step} de 5 — {STEPS[step - 1].sub}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Indicador de progresso */}
        <div className="flex gap-1 px-5 pt-4 pb-1 flex-shrink-0">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className={[
                "flex-1 h-1.5 rounded-full transition-all",
                step >= s.num
                  ? "bg-green-600"
                  : "bg-gray-200 dark:bg-gray-700",
              ].join(" ")}
            />
          ))}
        </div>

        {/* Conteúdo do passo */}
        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">

          {/* ── Passo 1: Fotos ── */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                📸 Fotos do Produto <span className="text-xs font-normal text-gray-400">(máx. 4)</span>
              </p>
              <div className="grid grid-cols-2 gap-3">
                {form.images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img src={img} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => f("images", form.images.filter((_, j) => j !== i))}
                      className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
                {form.images.length < 4 && (
                  <button
                    onClick={addPhoto}
                    className="aspect-square rounded-xl border-2 border-dashed border-gray-300 dark:border-green-900/40 flex flex-col items-center justify-center gap-2 text-gray-400 dark:text-gray-500 hover:border-green-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  >
                    <Camera size={24} aria-hidden="true" />
                    <span className="text-xs font-semibold">Adicionar foto</span>
                  </button>
                )}
              </div>
              {errors.images && <p className="text-red-500 text-xs">{errors.images}</p>}
            </div>
          )}

          {/* ── Passo 2: Informações ── */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">Nome do Produto *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => f("name", e.target.value)}
                  placeholder="ex: Tomate Fresco Orgânico"
                  className="w-full px-3 py-3 text-sm rounded-xl bg-gray-50 dark:bg-[#0D1F10] border border-gray-200 dark:border-green-900/40 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition-all"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">Categoria *</label>
                <div className="grid grid-cols-3 gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => f("category", c)}
                      className={[
                        "py-2.5 rounded-xl text-xs font-bold border-2 transition-all min-h-[44px]",
                        form.category === c
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                          : "border-gray-200 dark:border-green-900/30 text-gray-500 dark:text-gray-400 hover:border-green-300",
                      ].join(" ")}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">Descrição *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => f("description", e.target.value)}
                  placeholder="Descreva o produto brevemente…"
                  rows={3}
                  className="w-full px-3 py-3 text-sm rounded-xl bg-gray-50 dark:bg-[#0D1F10] border border-gray-200 dark:border-green-900/40 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition-all resize-none"
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>
            </div>
          )}

          {/* ── Passo 3: Preço ── */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
                  Preço (MZN) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">MZN</span>
                  <input
                    type="number"
                    min={0}
                    value={form.price}
                    onChange={(e) => f("price", e.target.value)}
                    placeholder="0"
                    className="w-full pl-14 pr-3 py-3 text-sm rounded-xl bg-gray-50 dark:bg-[#0D1F10] border border-gray-200 dark:border-green-900/40 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition-all"
                  />
                </div>
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
                  Desconto (%) <span className="font-normal text-gray-400">— opcional</span>
                </label>
                <input
                  type="number"
                  min={0}
                  max={90}
                  value={form.discount}
                  onChange={(e) => f("discount", e.target.value)}
                  placeholder="ex: 10"
                  className="w-full px-3 py-3 text-sm rounded-xl bg-gray-50 dark:bg-[#0D1F10] border border-gray-200 dark:border-green-900/40 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition-all"
                />
              </div>

              {/* Pré-visualização do preço */}
              {form.price && (
                <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800/40">
                  <p className="text-xs text-green-600 dark:text-green-400 font-semibold mb-1">Pré-visualização</p>
                  <p className="text-xl font-black text-gray-900 dark:text-white">
                    {form.discount
                      ? Math.round(Number(form.price) * (1 - Number(form.discount) / 100)).toLocaleString("pt-MZ")
                      : Number(form.price).toLocaleString("pt-MZ")} MZN
                    {form.discount && (
                      <span className="text-sm text-gray-400 line-through ml-2">{Number(form.price).toLocaleString("pt-MZ")}</span>
                    )}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── Passo 4: Stock ── */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
                  Quantidade disponível *
                </label>
                <input
                  type="number"
                  min={1}
                  value={form.quantity}
                  onChange={(e) => f("quantity", e.target.value)}
                  placeholder="ex: 50"
                  className="w-full px-3 py-3 text-sm rounded-xl bg-gray-50 dark:bg-[#0D1F10] border border-gray-200 dark:border-green-900/40 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition-all"
                />
                {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">Unidade *</label>
                <div className="grid grid-cols-3 gap-2">
                  {UNITS.map((u) => (
                    <button
                      key={u}
                      onClick={() => f("unit", u)}
                      className={[
                        "py-3 rounded-xl text-sm font-bold border-2 transition-all min-h-[48px]",
                        form.unit === u
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                          : "border-gray-200 dark:border-green-900/30 text-gray-500 dark:text-gray-400 hover:border-green-300",
                      ].join(" ")}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Passo 5: Localização ── */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">Distrito *</label>
                <select
                  value={form.district}
                  onChange={(e) => f("district", e.target.value)}
                  className="w-full px-3 py-3 text-sm rounded-xl bg-gray-50 dark:bg-[#0D1F10] border border-gray-200 dark:border-green-900/40 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all"
                >
                  {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {/* Resumo final */}
              <div className="bg-gray-50 dark:bg-[#0D1F10] rounded-xl p-4 border border-gray-100 dark:border-green-900/30 space-y-2">
                <p className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Resumo do Anúncio
                </p>
                {[
                  { label: "Nome",       value: form.name || "—"                 },
                  { label: "Categoria",  value: form.category                    },
                  { label: "Preço",      value: `${form.price || 0} MZN/${form.unit}` },
                  { label: "Quantidade", value: `${form.quantity || 0} ${form.unit}`  },
                  { label: "Local",      value: form.district                    },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between">
                    <span className="text-xs text-gray-400 dark:text-gray-500">{row.label}</span>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Rodapé com navegação */}
        <div className="flex gap-3 px-5 py-4 border-t border-gray-100 dark:border-green-900/30 flex-shrink-0">
          {step > 1 && (
            <button
              onClick={back}
              className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors min-h-[48px]"
            >
              <ChevronLeft size={16} /> Voltar
            </button>
          )}
          <button
            onClick={step === 5 ? handleSubmit : next}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all min-h-[48px]"
          >
            {step === 5 ? (
              <><Check size={16} aria-hidden="true" /> Publicar Anúncio</>
            ) : (
              <>Próximo <ChevronRight size={16} aria-hidden="true" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}