"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, ArrowRight, Package, MapPin, Truck, User, Phone } from "lucide-react";
import Image from "next/image";

interface Step5Props {
  product: any;
  purchaseData: any;
  onBack: () => void;
  onNext: (data: any) => void;
}

export default function Step5Review({ product, purchaseData, onBack, onNext }: Step5Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full"
    >
      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-green-600 dark:text-green-400">ETAPA 5 de 6</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">Revisão da Compra</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div className="h-2 bg-green-600 rounded-full" style={{ width: "83.3%" }}></div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full mb-3">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Revise sua Compra
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Verifique todos os detalhes antes de confirmar
          </p>
        </div>

        {/* Product Summary */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Produto</h3>
          </div>
          <div className="flex gap-4">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 border-gray-200 dark:border-gray-600">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                {product.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                {product.description}
              </p>
              <div className="space-y-1 text-xs">
                <p className="text-gray-500 dark:text-gray-400">
                  <strong>Vendedor:</strong> {product.seller}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  <strong>Categoria:</strong> {product.category || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-3">
            <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Detalhes do Pedido</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Quantidade:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {purchaseData.quantity} {product.unit}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Preço Unitário:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {((purchaseData.subtotal || 0) / (purchaseData.quantity || 1)).toFixed(0)} MT
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Subtotal:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {(purchaseData.subtotal || 0).toFixed(0)} MT
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Transporte:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {(purchaseData.shipping || 0).toFixed(0)} MT
              </span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t-2 border-blue-200 dark:border-blue-800">
              <span className="text-lg font-bold text-gray-900 dark:text-white">Total Geral:</span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {(purchaseData.total || 0).toFixed(0)} MT
              </span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Seus Dados</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <div className="flex-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Nome Completo</span>
                <p className="font-semibold text-gray-900 dark:text-white">{purchaseData.name || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <div className="flex-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Telefone</span>
                <p className="font-semibold text-gray-900 dark:text-white">{purchaseData.phone || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <div className="flex-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Localização</span>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {purchaseData.province || "Nampula"}, {purchaseData.district || "N/A"}
                  {purchaseData.bairro && ` - ${purchaseData.bairro}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gray-500" />
              <div className="flex-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Transportadora</span>
                <p className="font-semibold text-gray-900 dark:text-white">{purchaseData.carrier || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Message */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-700 dark:text-gray-300">
            Seu pagamento ficará seguro até a confirmação da entrega. Você pode revisar todos os detalhes acima antes de finalizar.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onBack}
          className="flex-1 px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Voltar
        </button>
        <button
          onClick={() => onNext(purchaseData)}
          className="flex-1 px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          Confirmar e Continuar
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}


