"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Image from "next/image";

interface Step3Props {
  product: any;
  purchaseData: any;
  onBack: () => void;
  onNext: () => void;
}

export default function Step3Review({ product, purchaseData, onBack, onNext }: Step3Props) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Revisão do Pedido
          </h1>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">PASSO 5 de 7</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Revisão</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div className="h-2 bg-green-600 rounded-full" style={{ width: "71.4%" }}></div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6"
        >
          {/* Product Summary */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Produto
            </h2>
            <div className="flex gap-4">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {product.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {product.description}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Vendedor: {product.seller}
                </p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Quantidade:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {purchaseData.quantity} {product.unit}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {purchaseData.subtotal.toFixed(0)} MT
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Transporte:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {purchaseData.shipping.toFixed(0)} MT
              </span>
            </div>
            <div className="flex justify-between pt-4 border-t-2 border-gray-200 dark:border-gray-700">
              <span className="text-xl font-bold text-gray-900 dark:text-white">Total Geral:</span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {purchaseData.total.toFixed(0)} MT
              </span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Seus Dados
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Nome:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {purchaseData.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Número:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {purchaseData.phone}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Distrito:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {purchaseData.district}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Transportadora:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {purchaseData.carrier}
                </span>
              </div>
            </div>
          </div>

          {/* Security Message */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Seu pagamento ficará seguro até a confirmação da entrega. Você pode revisar todos os detalhes acima antes de finalizar.
            </p>
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
            className="flex-1 p-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            Finalizar Pedido
            <CheckCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

