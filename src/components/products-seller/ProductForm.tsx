// src/components/products/ProductForm.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Image as ImageIcon, Camera, ArrowRight, ArrowLeft, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

// Dados mockados
const categories = [
  "Frutas",
  "Legumes",
  "Verduras",
  "Raízes",
  "Laticínios",
  "Cereais",
];
const units = ["kg", "molho"];

export const locationData = {
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

// Animação para a entrada da página
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const showToast = (message) => {
  console.log(`[TOAST] ${message}`);
  alert(message);
};

export default function ProductForm({ initialData = null }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
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
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        category: initialData.category || "",
        description: initialData.description || "",
        price: initialData.price || "",
        unit: initialData.unit || "kg",
        quantity: initialData.quantity || "",
        location: initialData.location || "",
        discount: initialData.discount || "",
        image: initialData.image || null,
      });
      if (typeof initialData.image === 'string') {
        setImagePreviewUrl(initialData.image);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCaptureClick = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const handleCameraChange = (e) => {
    const file = e.target.files[0];
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
    if (currentStep === 1) {
      if (!formData.name || !formData.category || !formData.description) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.price || !formData.quantity || !formData.unit) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
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
    router.back(); // Redireciona para a página anterior
  };

  const formTitle = initialData ? "Editar Anúncio" : "Criar Novo Anúncio";
  const buttonText = initialData ? "Salvar Alterações" : "Publicar Anúncio";

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="max-w-xl mx-auto"
    >
      <p className="mt-2 mb-8 text-gray-600 text-center md:text-left">
        {initialData ? "Atualize as informações do seu produto." : "Registre seu produto em 3 passos simples para começar a vender."}
        <br/>
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
                    <option value="" disabled>Selecione uma categoria</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
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

          {currentStep === 2 && (
            <motion.section
              key="step2"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100"
            >
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                <PlusCircle size={24} className="text-[#4CAF50]" />
                Preço e Estoque
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Preço (MZN) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="55"
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm p-3 text-lg focus:border-[#4CAF50] focus:ring-[#4CAF50] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                    Unidade <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm p-3 text-lg focus:border-[#4CAF50] focus:ring-[#4CAF50] transition-colors"
                  >
                    {units.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantidade <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    min="1"
                    placeholder="100"
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm p-3 text-lg focus:border-[#4CAF50] focus:ring-[#4CAF50] transition-colors"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
                  Desconto (Opcional, em %)
                </label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  placeholder="Ex: 10 (para 10%)"
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm p-3 text-lg focus:border-[#4CAF50] focus:ring-[#4CAF50] transition-colors"
                />
                <p className="mt-1 text-xs text-gray-500">
                  (O preço final será calculado automaticamente.)
                </p>
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
              className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100"
            >
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                <ImageIcon size={24} className="text-[#4CAF50]" />
                Mídia e Localização
              </h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Foto do Produto <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full border-2 border-[#E8F5E9] text-sm font-semibold text-[#4CAF50] hover:border-[#C8E6C9] transition-colors"
                    >
                      <ImageIcon size={20} /> Carregar do Dispositivo
                    </button>
                    <button
                      type="button"
                      onClick={handleCaptureClick}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full border-2 border-[#E8F5E9] text-sm font-semibold text-[#4CAF50] hover:border-[#C8E6C9] transition-colors"
                    >
                      <Camera size={20} /> Tirar Foto
                    </button>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleFileChange}
                      required={!formData.image && !initialData?.image}
                      className="hidden"
                      ref={fileInputRef}
                    />
                    <input
                      type="file"
                      id="camera-image"
                      name="camera-image"
                      accept="image/*"
                      capture="environment"
                      onChange={handleCameraChange}
                      required={!formData.image && !initialData?.image}
                      className="hidden"
                      ref={cameraInputRef}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    (Obrigatório. A imagem deve ser de alta qualidade.)
                  </p>
                </div>
                {imagePreviewUrl && (
                  <div className="mt-4 relative">
                    <h4 className="block text-sm font-medium text-gray-700 mb-2">Pré-visualização:</h4>
                    <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-md">
                      <img src={imagePreviewUrl} alt="Pré-visualização do produto" className="object-cover w-full h-full" />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md text-red-500 hover:text-red-700 transition-colors"
                      >
                        <XCircle size={24} />
                      </button>
                    </div>
                  </div>
                )}
                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                    Localização (Distrito) <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm p-3 text-lg focus:border-[#4CAF50] focus:ring-[#4CAF50] transition-colors"
                  >
                    <option value="" disabled>Selecione um Distrito</option>
                    {Object.keys(locationData).map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
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
              className="flex items-center gap-2 py-3 px-6 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={20} /> Anterior
            </button>
          )}

          {currentStep < 3 && (
            <button
              type="button"
              onClick={handleNext}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full shadow-lg text-lg font-bold text-white bg-[#4CAF50] hover:bg-[#388E3C] transition-colors ${currentStep === 1 ? 'ml-auto' : ''}`}
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