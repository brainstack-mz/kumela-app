"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Step2Identification from "./Step2Identification";
import Step3Location from "./Step3Location";
import Step4QuantityAndCarrier from "./Step4QuantityAndCarrier";
import Step5Review from "./Step5Review";
import Step6Payment from "./Step6Payment";
import { USERS } from "@/lib/users";
import toast from "react-hot-toast";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  discount?: number;
  stock: number;
  description: string;
  user: string;
  userPhone: string;
  unit: string;
}

interface PurchaseFlowProps {
  product: Product;
  onClose: () => void;
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export default function PurchaseFlow({ product, onClose }: PurchaseFlowProps) {
  const [step, setStep] = useState(2); // Começa na ETAPA 2 (Identificação)
  const [purchaseData, setPurchaseData] = useState<any>(null);
  const [paymentData, setPaymentData] = useState<any>(null);

  const handleStep2Next = (data: any) => {
    setPurchaseData(data);
    setStep(3);
  };

  const handleStep3Next = (data: any) => {
    setPurchaseData(data);
    setStep(4);
  };

  const handleStep4Next = (data: any) => {
    setPurchaseData(data);
    setStep(5); // Vai para revisão
  };

  const handleStep5Next = (data: any) => {
    setPurchaseData(data);
    setStep(6); // Vai para pagamento
  };

  const handleStep6Next = (data: any) => {
    setPaymentData(data);
    
    // Criar conta automaticamente se usuário não existe
    if (purchaseData && !purchaseData.userExists) {
      const newUser = {
        numero: purchaseData.phone,
        password: "123456", // Senha padrão
        role: "buyer" as const,
      };
      // Adicionar ao mock (em produção seria API)
      if (!USERS.find(u => u.numero === newUser.numero)) {
        USERS.push(newUser);
      }
    }

    const newOrder = {
      id: Date.now(),
      product,
      purchaseData,
      paymentData: data,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const orders = JSON.parse(localStorage.getItem("kumela_orders") || "[]");
    orders.push(newOrder);
    localStorage.setItem("kumela_orders", JSON.stringify(orders));

    // Enviar notificações para transportador e vendedor
    sendNotifications(newOrder);

    toast.success("Compra finalizada! Verifique sua conta para confirmar após receber o produto.");
    
    // Após um delay, fecha o modal
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const sendNotifications = (order: any) => {
    // Notificar transportador
    const transporterNotifications = JSON.parse(localStorage.getItem("transporter_notifications") || "[]");
    transporterNotifications.push({
      id: Date.now(),
      type: "new_order",
      message: `Nova encomenda de ${order.product.name}`,
      orderId: order.id,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("transporter_notifications", JSON.stringify(transporterNotifications));

    // Notificar vendedor
    const userNotifications = JSON.parse(localStorage.getItem("user_notifications") || "[]");
    userNotifications.push({
      id: Date.now(),
      type: "new_order",
      message: `Nova venda de ${order.product.name} - ${order.purchaseData.quantity} ${order.product.unit}`,
      orderId: order.id,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("user_notifications", JSON.stringify(userNotifications));
  };

  const handleBack = () => {
    if (step > 2) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="purchase-flow-modal"
        className="fixed inset-0 bg-black/50 z-[60] flex justify-center items-center p-2 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
        style={{ paddingTop: '80px', paddingBottom: '20px' }}
      >
        <motion.div
          className="  bg-white rounded-2xl w-full max-w-xl lg:max-w-2xl shadow-2xl relative 
                     p-4 sm:p-6 overflow-y-auto mx-2"
          style={{ maxHeight: 'calc(100vh - 100px)' }}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 z-20 right-4 text-red-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Conteúdo dos Steps */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {step === 2 && (
                <Step2Identification
                  key="step2"
                  product={product}
                  purchaseData={purchaseData || {}}
                  onBack={handleBack}
                  onNext={handleStep2Next}
                />
              )}
              {step === 3 && purchaseData && (
                <Step3Location
                  key="step3"
                  purchaseData={purchaseData}
                  onBack={handleBack}
                  onNext={handleStep3Next}
                />
              )}
              {step === 4 && purchaseData && (
                <Step4QuantityAndCarrier
                  key="step4"
                  product={product}
                  purchaseData={purchaseData}
                  onBack={handleBack}
                  onNext={handleStep4Next}
                />
              )}
              {step === 5 && purchaseData && (
                <Step5Review
                  key="step5"
                  product={product}
                  purchaseData={purchaseData}
                  onBack={handleBack}
                  onNext={handleStep5Next}
                />
              )}
              {step === 6 && purchaseData && (
                <Step6Payment
                  key="step6"
                  purchaseData={purchaseData}
                  onBack={handleBack}
                  onNext={handleStep6Next}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
