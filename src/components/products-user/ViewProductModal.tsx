"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Package, DollarSign, MapPin, Tag, Calendar } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types/dashboard";

interface ViewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export default function ViewProductModal({ isOpen, onClose, product }: ViewProductModalProps) {
  if (!isOpen || !product) return null;

  const finalPrice = product.discount
    ? product.price - product.price * (product.discount / 100)
    : product.price;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl relative p-6 overflow-y-auto max-h-[90vh]"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-700 rounded-full hover:bg-red-500 hover:text-white transition z-10"
          >
            <X size={20} />
          </button>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{product.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{product.category}</p>
            </div>

            {product.image && (
              <div className="relative w-full h-64 rounded-xl overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Package className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Estoque</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{product.stock} {product.unit}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <DollarSign className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Preço</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {product.price} MT
                    {product.discount && product.discount > 0 && (
                      <span className="ml-2 text-green-600">
                        ({product.discount}% off - {finalPrice.toFixed(0)} MT)
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Localização</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{product.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Tag className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className={`font-semibold ${
                    product.status === "active" ? "text-green-600" : "text-gray-600"
                  }`}>
                    {product.status === "active" ? "Ativo" : product.status === "expired" ? "Expirado" : "Pendente"}
                  </p>
                </div>
              </div>
            </div>

            {product.description && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Descrição</h3>
                <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Criado em: {new Date(product.createdAt).toLocaleDateString("pt-BR")}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
