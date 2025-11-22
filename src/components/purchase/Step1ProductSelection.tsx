"use client";

import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  discount?: number;
  stock: number;
  description: string;
  seller: string;
  sellerPhone: string;
  unit: string;
}

interface Step1Props {
  product: Product;
  onBack: () => void;
  onNext: () => void;
}

export default function Step1ProductSelection({ product, onBack, onNext }: Step1Props) {
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [messageData, setMessageData] = useState({ name: "", phone: "", message: "" });

  const finalPrice = product.discount 
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  const handleSendMessage = () => {
    if (!messageData.name || !messageData.phone || !messageData.message) {
      toast.error("Preencha todos os campos!");
      return;
    }
    const smsUrl = `sms:${product.sellerPhone}?body=${encodeURIComponent(
      `Olá, sou ${messageData.name} (${messageData.phone}). ${messageData.message}`
    )}`;
    window.location.href = smsUrl;
    setShowMessageForm(false);
    setMessageData({ name: "", phone: "", message: "" });
    toast.success("Mensagem preparada!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Detalhes do Produto
          </h1>
        </div>

        {/* Product Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Image */}
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h2>
                
                <div className="space-y-4 mb-6">
                  {/* Price */}
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Preço</p>
                    <div className="flex items-baseline gap-3">
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {finalPrice.toFixed(0)} MT
                      </p>
                      {product.discount && (
                        <span className="text-lg text-gray-400 line-through">
                          {product.price.toFixed(0)} MT
                        </span>
                      )}
                      <span className="text-sm text-gray-500">/{product.unit}</span>
                    </div>
                  </div>

                  {/* Stock */}
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Stock Disponível</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {product.stock} {product.unit}
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Descrição</p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {product.description}
                    </p>
                  </div>

                  {/* Seller */}
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Vendedor</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {product.seller}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Form Modal */}
              {showMessageForm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                  onClick={() => setShowMessageForm(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full"
                  >
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Enviar Mensagem
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Seu Nome"
                        value={messageData.name}
                        onChange={(e) => setMessageData({ ...messageData, name: e.target.value })}
                        className="w-full p-4 border rounded-lg text-lg"
                      />
                      <input
                        type="tel"
                        placeholder="Seu Telefone"
                        value={messageData.phone}
                        onChange={(e) => setMessageData({ ...messageData, phone: e.target.value })}
                        className="w-full p-4 border rounded-lg text-lg"
                      />
                      <textarea
                        placeholder="Sua Mensagem"
                        value={messageData.message}
                        onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
                        rows={4}
                        className="w-full p-4 border rounded-lg text-lg"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowMessageForm(false)}
                          className="flex-1 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg font-semibold"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleSendMessage}
                          className="flex-1 p-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                        >
                          Enviar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowMessageForm(true)}
                  className="w-full flex items-center justify-center gap-3 p-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
                >
                  <MessageCircle className="w-6 h-6" />
                  Enviar Mensagem
                </button>
                <button
                  onClick={onNext}
                  className="w-full flex items-center justify-center gap-3 p-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-colors"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Comprar Agora
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 p-4 bg-white dark:bg-gray-800 rounded-xl font-semibold text-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Voltar
          </button>
          <button
            onClick={onNext}
            className="flex-1 p-4 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}




