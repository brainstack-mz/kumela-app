// components/products/ProductPreviewModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, MessageCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

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
}

interface ProductPreviewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
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
  onAddToCart,
  onBuy,
}: ProductPreviewModalProps) {
  if (!product) return null;

  const finalPrice = product.discount
    ? product.price - product.price * (product.discount / 100)
    : product.price;

  const handleMessage = () => {
    const message = `Olá, estou interessado no seu produto: ${product.name}. Vi na plataforma MOZAGRO.`;
    const whatsappUrl = `https://wa.me/${product.phone}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <AnimatePresence>
<motion.div
  className="fixed inset-0 bg-black/50 z-50 top-20 flex justify-center items-center p-2 sm:p-6"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  <motion.div
    className="bg-white rounded-2xl w-full max-w-4xl lg:max-w-5xl shadow-2xl relative 
               p-6 max-h-[90vh] overflow-y-auto"
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
            <div className="relative w-full h-64 md:h-full rounded-xl overflow-hidden shadow-md">
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-2">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500 mb-4">{product.location}</p>

                <div className="flex items-baseline gap-2 mb-6">
                  <p className="text-2xl sm:text-3xl font-bold text-[#4CAF50]">
                    MZN {finalPrice.toFixed(2)}
                  </p>
                  {product.discount && (
                    <span className="text-sm sm:text-lg text-gray-400 line-through">
                      MZN {product.price.toFixed(2)}
                    </span>
                  )}
                </div>

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
                </div>
              </div>

              {/* Botões */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => onAddToCart(product)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#E8F5E9] text-[#2E7D32] font-semibold hover:bg-[#C8E6C9] transition-colors"
                >
                  <ShoppingCart size={20} /> Adicionar ao Carrinho
                </button>
                <button
                  onClick={() => onBuy(product)}
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
