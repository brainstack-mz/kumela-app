"use client";

import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Image as ImageIcon,
  Camera,
  ArrowRight,
  ArrowLeft,
  X,
} from "lucide-react";

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

interface ProductData {
  name: string;
  category: string;
  description: string;
  price: string;
  unit: string;
  quantity: string;
  location: string;
  discount: string;
  image: File | null;
}

interface NewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function NewProductModal({ isOpen, onClose, onSuccess }: NewProductModalProps) {
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

    console.log("Novo Anúncio:", formData);
    alert("Anúncio criado com sucesso!");
    
    // Reset form
    setFormData({
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
    setImagePreviewUrl(null);
    setCurrentStep(1);
    
    if (onSuccess) onSuccess();
    onClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData({
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
    setImagePreviewUrl(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl relative p-6 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 100px)" }}
          variants={fadeIn}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-700 rounded-full hover:bg-red-500 hover:text-white transition"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Criar Novo Anúncio</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Registre seu produto em 3 passos simples. <span className="font-semibold">Etapa {currentStep} de 3.</span>
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
                  className="space-y-6"
                >
                  <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                    <PlusCircle size={24} className="text-green-600" />
                    Detalhes do Produto
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nome do Produto <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Ex: Tomate Fresco Orgânico"
                        className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-3 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Categoria <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-3 focus:border-green-500 focus:ring-green-500"
                      >
                        <option value="">Selecione uma categoria</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Descrição <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        required
                        placeholder="Descreva seu produto..."
                        className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-3 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </motion.section>
              )}

              {currentStep === 2 && (
                <motion.section
                  key="step2"
                  variants={fadeIn}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Preço e Quantidade</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Preço (MT) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          required
                          min="0"
                          className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-3 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Unidade <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="unit"
                          value={formData.unit}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-3 focus:border-green-500 focus:ring-green-500"
                        >
                          {units.map((u) => (
                            <option key={u} value={u}>
                              {u}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Quantidade Disponível <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        min="0"
                        className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-3 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Desconto (%)
                      </label>
                      <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-3 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </motion.section>
              )}

              {currentStep === 3 && (
                <motion.section
                  key="step3"
                  variants={fadeIn}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Localização e Imagem</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Distrito <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-3 focus:border-green-500 focus:ring-green-500"
                      >
                        <option value="">Selecione um distrito</option>
                        {Object.keys(locationData).map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Imagem do Produto <span className="text-red-500">*</span>
                      </label>
                      {!imagePreviewUrl ? (
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex-1 flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <ImageIcon size={24} />
                            Escolher Arquivo
                          </button>
                          <button
                            type="button"
                            onClick={() => cameraInputRef.current?.click()}
                            className="flex-1 flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <Camera size={24} />
                            Tirar Foto
                          </button>
                        </div>
                      ) : (
                        <div className="relative">
                          <img src={imagePreviewUrl} alt="Preview" className="w-full h-64 object-cover rounded-xl" />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <input
                        ref={cameraInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleCameraChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-2 py-3 px-6 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <ArrowLeft size={20} /> Anterior
                </button>
              )}

              {currentStep < 3 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full shadow-lg text-lg font-bold text-white bg-green-600 hover:bg-green-700 ${
                    currentStep === 1 ? "ml-auto" : ""
                  }`}
                >
                  Próximo <ArrowRight size={20} />
                </button>
              )}

              {currentStep === 3 && (
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full shadow-lg text-lg font-bold text-white bg-green-600 hover:bg-green-700"
                >
                  Publicar Anúncio
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
