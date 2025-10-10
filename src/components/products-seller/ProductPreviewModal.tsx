// components/products/ProductPreviewModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ArrowRight } from "lucide-react";  
import Image from "next/image";
import { useRouter } from "next/navigation";
import { USERS } from "@/lib/users";  

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  discount?: number;
  location: string;
  description: string;
  seller: string;
  phone: string;
  category: string;
  quantity: number; 
  unit: string;
}

interface ProductPreviewModalProps {
  product: Product | null;
  onClose: () => void;
  onBuy: (product: Product) => void;
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export default function ProductPreviewModal({
  product,
  onClose,
  onBuy,
}: ProductPreviewModalProps) {
  const router = useRouter();

  if (!product) return null;

  const finalPrice = product.discount
    ? product.price - product.price * (product.discount / 100)
    : product.price;

   const handleMessage = () => {
    const message = `Olá, estou interessado no seu produto: ${product.name}. Vi na plataforma MOZAGRO.`;
    const smsUrl = `sms:${product.phone}?body=${encodeURIComponent(message)}`;
    window.location.href = smsUrl;
  };

   const handleBuyClick = () => {
    // Exemplo: verificar se o usuário está logado
    const isUserLoggedIn = USERS.length > 0; // Verifica se há algum usuário no mock

    if (isUserLoggedIn) {
      // Se estiver logado, continua com a compra
      onBuy(product);
    } else {
      // Se não estiver logado, redireciona para a tela de registro
      router.push("/public/login");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-2 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl w-full max-w-4xl lg:max-w-5xl shadow-2xl relative 
                     p-4 sm:p-6 max-h-[90vh] overflow-y-auto" // Reduzindo o padding em mobile
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 z-20 right-4 text-red-500 hover:text-gray-800 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Conteúdo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
            {/* Imagem */}
            <div className="relative w-full h-48 md:h-full rounded-xl overflow-hidden shadow-md">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Informações */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight mb-1">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500 mb-4">{product.location}</p>

                {/* Preço e Unidade */}
                <div className="flex items-baseline gap-10 mb-6">
                  {/* Desconto no lado esquerdo */}
                  
                  {/* Preço Final com Unidade em Subscrito */}
                  <p className="text-2xl sm:text-3xl font-bold text-[#4CAF50] flex items-baseline">
                    <span>{finalPrice.toFixed(0)} Meticais</span>
                    <sub className="text-sm font-normal ml-1">
                      /{product.unit}
                    </sub>
                  </p>

                  {product.discount && (
                    <span className="text-sm sm:text-lg text-red-400 line-through">
                      {product.price.toFixed(0)} Meticais
                    </span>
                  )}
                </div>

                {/* Descrição e detalhes */}
                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                  <span className="font-semibold text-gray-800">
                    Descrição:
                  </span>{" "}
                  {product.description}
                </p>

                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <strong>Vendedor:</strong> {product.seller}
                  </p>
                  <p>
                    <strong>Categoria:</strong> {product.category}
                  </p>
                  <p>
                    <strong>Quantidade Disponível:</strong> {product.quantity} {product.unit}
                  </p>
                </div>
              </div>

              {/* Botões */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={handleBuyClick}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#4CAF50] text-white font-semibold hover:bg-[#388E3C] transition-colors"
                >
                  Comprar <ArrowRight size={20} />
                </button>
                <button
                  onClick={handleMessage}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[#2E7D32] font-semibold border-2 border-[#E8F5E9] hover:border-[#C8E6C9] transition-colors"
                >
                  <MessageCircle size={20} /> Enviar Mensagem
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}