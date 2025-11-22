"use client";

import { motion } from "framer-motion";
import { Lock, CreditCard, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

interface Step6Props {
  purchaseData: any;
  onBack: () => void;
  onNext: (paymentData: any) => void;
}

const PAYMENT_METHODS = [
  { id: "mpesa", name: "M-Pesa", icon: "📱" },
  { id: "momo", name: "E-Mola", icon: "💳" },
];

export default function Step6Payment({ purchaseData, onBack, onNext }: Step6Props) {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentNumber, setPaymentNumber] = useState(user?.numero || "");
  const [password, setPassword] = useState("");

  const validatePaymentNumber = (method: string, number: string): boolean => {
    // Remove espaços e caracteres não numéricos
    const cleanNumber = number.replace(/\D/g, '');
    
    // Remove prefixo +258 se existir
    const numberWithoutPrefix = cleanNumber.startsWith('258') 
      ? cleanNumber.slice(3) 
      : cleanNumber;
    
    // Verifica se tem 9 dígitos
    if (numberWithoutPrefix.length !== 9) {
      return false;
    }

    const firstTwo = numberWithoutPrefix.slice(0, 2);
    
    if (method === "mpesa") {
      // Mpesa: inicia com 84 ou 85
      return firstTwo === "84" || firstTwo === "85";
    } else if (method === "momo") {
      // Momo: inicia com 87 ou 86
      return firstTwo === "87" || firstTwo === "86";
    }
    
    return false;
  };

  const formatPaymentNumber = (value: string): string => {
    // Remove tudo exceto números
    let clean = value.replace(/\D/g, '');
    
    // Se começar com +258, remove
    if (clean.startsWith('258')) {
      clean = clean.slice(3);
    }
    
    // Limita a 9 dígitos
    clean = clean.slice(0, 9);
    
    // Adiciona prefixo +258 se não tiver
    if (clean.length > 0 && !value.includes('+258')) {
      return `+258${clean}`;
    }
    
    return value;
  };

  const handlePay = () => {
    if (!paymentMethod) {
      toast.error("Selecione um método de pagamento!");
      return;
    }
    
    const cleanNumber = paymentNumber.replace(/\D/g, '');
    const numberWithoutPrefix = cleanNumber.startsWith('258') 
      ? cleanNumber.slice(3) 
      : cleanNumber;
    
    if (!validatePaymentNumber(paymentMethod, paymentNumber)) {
      if (paymentMethod === "mpesa") {
        toast.error("Número M-Pesa inválido! Deve começar com 84 ou 85 e ter 9 dígitos (ex: +258841234567)");
      } else {
        toast.error("Número E-Mola inválido! Deve começar com 87 ou 86 e ter 9 dígitos (ex: +258871234567)");
      }
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
      paymentNumber: `+258${numberWithoutPrefix}`,
      status: "pending", // Escrow - pending until delivery confirmation
    });
  };

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
          <span className="text-sm font-semibold text-green-600 dark:text-green-400">ETAPA 6 de 6</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">Método de Pagamento</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div className="h-2 bg-green-600 rounded-full" style={{ width: "100%" }}></div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Escrow Message */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 flex items-start gap-2">
          <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-700 dark:text-gray-300">
            Seu dinheiro fica seguro. Só será entregue ao vendedor após confirmação da entrega.
          </p>
        </div>

        {/* Total Amount */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total a Pagar</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {purchaseData.total.toFixed(0)} MT
          </p>
        </div>

        {/* Payment Methods */}
        <div>
          <h2 className="text-base font-bold mb-3 text-gray-900 dark:text-white">
            Método de Pagamento
          </h2>
          <div className="space-y-2">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`w-full p-3 border-2 rounded-xl text-left transition-all ${
                  paymentMethod === method.id
                    ? "border-green-600 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{method.icon}</span>
                  <span className="text-base font-bold text-gray-900 dark:text-white">
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
            className="space-y-3"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Número da Carteira
              </label>
              <input
                type="tel"
                value={paymentNumber}
                onChange={(e) => setPaymentNumber(formatPaymentNumber(e.target.value))}
                placeholder={paymentMethod === "mpesa" ? "+258841234567" : "+258871234567"}
                className="w-full p-3 text-base border-2 rounded-xl bg-white dark:bg-gray-700 focus:outline-none focus:border-green-500"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {paymentMethod === "mpesa" 
                  ? "M-Pesa: inicia com 84 ou 85 (ex: +258841234567)" 
                  : "E-Mola: inicia com 87 ou 86 (ex: +258871234567)"}
              </p>
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
                className="w-full p-3 text-base border-2 rounded-xl bg-white dark:bg-gray-700 focus:outline-none focus:border-green-500"
              />
            </div>
          </motion.div>
        )}

        {/* Final Message */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3 flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-700 dark:text-gray-300">
            Após receber o produto, acesse sua conta para confirmar o recebimento e liberar o pagamento ao vendedor.
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
          onClick={handlePay}
          disabled={!paymentMethod || !paymentNumber || !password}
          className="flex-1 px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CreditCard className="w-5 h-5" />
          Finalizar Compra
        </button>
      </div>
    </motion.div>
  );
}

