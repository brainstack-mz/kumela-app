"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Lock, CreditCard } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

interface Step4Props {
  purchaseData: any;
  onBack: () => void;
  onNext: (paymentData: any) => void;
}

const PAYMENT_METHODS = [
  { id: "mpesa", name: "M-Pesa", icon: "📱" },
  { id: "emola", name: "E-Mola", icon: "💳" },
];

export default function Step4Payment({ purchaseData, onBack, onNext }: Step4Props) {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentNumber, setPaymentNumber] = useState(user?.numero || "");
  const [password, setPassword] = useState("");

  const handlePay = () => {
    if (!paymentMethod) {
      toast.error("Selecione um método de pagamento!");
      return;
    }
    if (!paymentNumber || paymentNumber.length < 9) {
      toast.error("Digite um número de carteira válido!");
      return;
    }
    if (!password) {
      toast.error("Digite sua senha!");
      return;
    }

    // Simulate payment processing
    toast.success("Pagamento processado! Valor retido em escrow.");
    
    onNext({
      paymentMethod,
      paymentNumber,
      status: "pending", // Escrow - pending until delivery confirmation
    });
  };

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
            Pagamento Seguro
          </h1>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">PASSO 6 de 7</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Pagamento</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div className="h-2 bg-green-600 rounded-full" style={{ width: "85.7%" }}></div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6"
        >
          {/* Escrow Message */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 flex items-start gap-3">
            <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Seu dinheiro fica seguro. Só será entregue ao vendedor após confirmação da entrega.
            </p>
          </div>

          {/* Total Amount */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total a Pagar</p>
            <p className="text-4xl font-bold text-green-600 dark:text-green-400">
              {purchaseData.total.toFixed(0)} MT
            </p>
          </div>

          {/* Payment Methods */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Método de Pagamento
            </h2>
            <div className="space-y-3">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                    paymentMethod === method.id
                      ? "border-green-600 bg-green-50 dark:bg-green-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{method.icon}</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {method.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          {paymentMethod && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Número da Carteira
                </label>
                <input
                  type="tel"
                  value={paymentNumber}
                  onChange={(e) => setPaymentNumber(e.target.value)}
                  placeholder="84xxxxxxx"
                  className="w-full p-4 text-lg border rounded-xl bg-white dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full p-4 text-lg border rounded-xl bg-white dark:bg-gray-700"
                />
              </div>
            </motion.div>
          )}
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
            onClick={handlePay}
            disabled={!paymentMethod || !paymentNumber || !password}
            className="flex-1 p-4 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CreditCard className="w-5 h-5" />
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}

