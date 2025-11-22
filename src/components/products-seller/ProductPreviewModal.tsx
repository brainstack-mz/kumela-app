// components/products/ProductPreviewModal.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import PurchaseFlow from "@/components/purchase/PurchaseFlow";

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
  onBuy?: (product: Product) => void;
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
  const { user } = useAuth();
  const [showPurchaseFlow, setShowPurchaseFlow] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [messageData, setMessageData] = useState({ name: "", phone: "", message: "" });

  // 🔥 Quando o modal abre → escurece o resto da página
  useEffect(() => {
    if (product && !showPurchaseFlow && !showMessageForm) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [product, showPurchaseFlow, showMessageForm]);

  if (!product) return null;

  const finalPrice = product.discount
    ? product.price - product.price * (product.discount / 100)
    : product.price;

  const handleSendMessage = () => {
    if (!messageData.name || !messageData.phone || !messageData.message) {
      alert("Preencha todos os campos!");
      return;
    }
    const message = `Olá, sou ${messageData.name} (${messageData.phone}). ${messageData.message}`;
    const smsUrl = `sms:${product.phone}?body=${encodeURIComponent(message)}`;
    window.location.href = smsUrl;
    setShowMessageForm(false);
    setMessageData({ name: "", phone: "", message: "" });
  };

  const handleBuyClick = () => {
    setShowPurchaseFlow(true);
  };

  return (
    <>
      <AnimatePresence>
        {!showPurchaseFlow && !showMessageForm && (
          <motion.div
            key="product-modal"
            className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl w-full max-w-2xl lg:max-w-3xl shadow-2xl relative 
                         p-4 sm:p-6 overflow-y-auto mx-2"
              style={{ maxHeight: "calc(100vh - 100px)" }}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão fechar */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-red-500 hover:text-white transition shadow-lg"
              >
                <X size={20} />
              </button>

              {/* Conteúdo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Imagem */}
                <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-md">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>

                {/* Infos */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold mb-1">{product.name}</h2>
                    <p className="text-sm text-gray-500 mb-3">{product.location}</p>

                    <div className="flex items-baseline gap-10 mb-4">
                      <p className="text-3xl font-bold text-green-600 flex items-baseline">
                        <span>{finalPrice.toFixed(0)} Meticais</span>
                        <sub className="text-sm ml-1">/{product.unit}</sub>
                      </p>

                      {product.discount && (
                        <span className="text-lg text-red-400 line-through">
                          {product.price.toFixed(0)} Meticais
                        </span>
                      )}
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      <span className="font-semibold">Descrição:</span> {product.description}
                    </p>

                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>Vendedor:</strong> {product.seller}</p>
                      <p><strong>Categoria:</strong> {product.category}</p>
                      <p>
                        <strong>Quantidade disponível:</strong> {product.quantity} {product.unit}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button
                      onClick={handleBuyClick}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition shadow-lg"
                    >
                      Comprar Agora <ArrowRight size={20} />
                    </button>

                    <button
                      onClick={() => setShowMessageForm(true)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-green-100 text-green-700 font-bold hover:bg-green-50 transition"
                    >
                      <MessageCircle size={20} /> Enviar Mensagem
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal de Mensagens */}
        {showMessageForm && (
          <motion.div
            key="message-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
            onClick={() => setShowMessageForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-xl font-bold mb-4">Enviar Mensagem</h3>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Seu Nome"
                  value={messageData.name}
                  onChange={(e) => setMessageData({ ...messageData, name: e.target.value })}
                  className="w-full p-4 border-2 rounded-xl"
                />

                <input
                  type="tel"
                  placeholder="Seu Telefone"
                  value={messageData.phone}
                  onChange={(e) => setMessageData({ ...messageData, phone: e.target.value })}
                  className="w-full p-4 border-2 rounded-xl"
                />

                <textarea
                  placeholder="Sua Mensagem"
                  rows={4}
                  value={messageData.message}
                  onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
                  className="w-full p-4 border-2 rounded-xl"
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowMessageForm(false)}
                    className="flex-1 p-4 bg-gray-200 rounded-xl font-bold hover:bg-gray-300"
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={handleSendMessage}
                    className="flex-1 p-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showPurchaseFlow && (
        <PurchaseFlow
          product={{
            ...product,
            stock: product.quantity,
            sellerPhone: product.phone,
          }}
          onClose={() => setShowPurchaseFlow(false)}
        />
      )}
    </>
  );
}
