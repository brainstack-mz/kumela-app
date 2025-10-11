"use client";

import React, { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Image as ImageIcon,
  Camera,
  ArrowRight,
  ArrowLeft,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Dados mockados
const categories = ["Frutas", "Legumes", "Verduras", "Raízes", "Laticínios", "Cereais"];
const units = ["kg", "molho"];

export const locationData: Record<string, object> = {
  Moma: {},
  Angoche: {},
  Larde: {},
  Liupo: {},
  Mogovolas: {},
  Murrupula: {},
  Mugincual: {},
  Mossuril: {},
  Meconta: {},
  Monapo: {},
  Nacala: {},
  Muecate: {},
  Nacaroa: {},
  Memba: {},
  Erati: {},
  Mecuburi: {},
  Lalaua: {},
  Ribaue: {},
  Malema: {},
  "Ilha De Mocambique": {},
};

// Animação
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Toast temporário
const showToast = (message: string) => {
  console.log(`[TOAST] ${message}`);
  alert(message);
};

// Tipos do formulário
interface ProductData {
  name: string;
  category: string;
  description: string;
  price: string;
  unit: string;
  quantity: string;
  location: string;
  discount: string;
  image: File | string | null;
}

interface ProductFormProps {
  initialData?: Partial<ProductData> | null;
}

export default function ProductForm({ initialData = null }: ProductFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<ProductData>({
    name: "",
    category: "",
    description: "",
    price: "",
    unit: "kg",
    quantity: "",
    location: "",
    discount: "",
    image: null,
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));

      if (typeof initialData.image === "string") {
        setImagePreviewUrl(initialData.image);
      }
    }
  }, [initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCameraChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCaptureClick = () => {
    cameraInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const handleNext = () => {
    if (currentStep === 1 && (!formData.name || !formData.category || !formData.description)) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    if (currentStep === 2 && (!formData.price || !formData.quantity || !formData.unit)) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.image || !formData.location) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (initialData) {
      console.log("Anúncio Editado:", formData);
      showToast("Anúncio atualizado com sucesso! Redirecionando...");
    } else {
      console.log("Novo Anúncio:", formData);
      showToast("Anúncio criado com sucesso! Redirecionando...");
    }

    router.back();
  };

  const formTitle = initialData ? "Editar Anúncio" : "Criar Novo Anúncio";
  const buttonText = initialData ? "Salvar Alterações" : "Publicar Anúncio";

  return (
    <motion.div variants={fadeIn} initial="initial" animate="animate" className="max-w-xl mx-auto">
      <p className="mt-2 mb-8 text-gray-600 text-center md:text-left">
        {initialData
          ? "Atualize as informações do seu produto."
          : "Registre seu produto em 3 passos simples para começar a vender."}
        <br />
        <span className="font-semibold text-gray-800">Etapa {currentStep} de 3.</span>
      </p>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.section
              key="step1"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100"
            >
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                <PlusCircle size={24} className="text-[#4CAF50]" />
                Detalhes do Produto
              </h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome do Produto <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Tomate Fresco Orgânico"
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm p-3 text-lg focus:border-[#4CAF50] focus:ring-[#4CAF50] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Categoria <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm p-3 text-lg focus:border-[#4CAF50] focus:ring-[#4CAF50] transition-colors"
                  >
                    <option value="" disabled>
                      Selecione uma categoria
                    </option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Descrição do Produto <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                    placeholder="Descreva seu produto de forma clara para os compradores."
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm p-3 text-lg focus:border-[#4CAF50] focus:ring-[#4CAF50] transition-colors"
                  />
                </div>
              </div>
            </motion.section>
          )}

          {/* Etapas 2 e 3 permanecem iguais ao seu código original */}
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-2 py-3 px-6 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={20} /> Anterior
            </button>
          )}

          {currentStep < 3 && (
            <button
              type="button"
              onClick={handleNext}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full shadow-lg text-lg font-bold text-white bg-[#4CAF50] hover:bg-[#388E3C] transition-colors ${
                currentStep === 1 ? "ml-auto" : ""
              }`}
            >
              Próximo <ArrowRight size={20} />
            </button>
          )}

          {currentStep === 3 && (
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full shadow-lg text-lg font-bold text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              {buttonText}
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
}
