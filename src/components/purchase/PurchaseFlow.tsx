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

// Interfaces para resolver o erro de "unexpected any"
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

interface PurchaseData {
  name?: string;
  phone?: string;
  province?: string;
  district?: string;
  bairro?: string;
  quantity?: number;
  carrier?: string;
  shipping?: number;
  subtotal?: number;
  total?: number;
  userExists?: boolean;
}

interface PurchaseFlowProps {
  product: Product;
  onClose: () => void;
}

export default function PurchaseFlow({ product, onClose }: PurchaseFlowProps) {
  // Mantemos sua lógica de começar no 2 e terminar no 6
  const [step, setStep] = useState(2); 
  const [purchaseData, setPurchaseData] = useState<PurchaseData | null>(null);
  const [ setPaymentData] = useState<any>(null);

  // Ajustado para 5 passos no total conforme solicitado
  const totalSteps = 5; 

  const handleStep2Next = (data: PurchaseData) => {
    setPurchaseData(data);
    setStep(3);
  };

  const handleStep3Next = (data: PurchaseData) => {
    setPurchaseData(data);
    setStep(4);
  };

  const handleStep4Next = (data: PurchaseData) => {
    setPurchaseData(data);
    setStep(5);
  };

  const handleStep5Next = (data: PurchaseData) => {
    setPurchaseData(data);
    setStep(6);
  };

  const handleStep6Next = (data: any) => {
    setPaymentData(data);
    
    if (purchaseData && !purchaseData.userExists && purchaseData.phone) {
      const newUser = {
        numero: purchaseData.phone,
        password: "123456",
        role: "buyer" as const,
      };
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

    const orders = JSON.parse(localStorage.getItem("kumela_orders") || "[]");
    orders.push(newOrder);
    localStorage.setItem("kumela_orders", JSON.stringify(orders));

    sendNotifications(newOrder);
    toast.success("Compra finalizada!");
    
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const sendNotifications = (order: any) => {
    const transporterNotifications = JSON.parse(localStorage.getItem("transporter_notifications") || "[]");
    transporterNotifications.push({
      id: Date.now(),
      type: "new_order",
      message: `Nova encomenda de ${order.product.name}`,
      orderId: order.id,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("transporter_notifications", JSON.stringify(transporterNotifications));

    const userNotifications = JSON.parse(localStorage.getItem("user_notifications") || "[]");
    userNotifications.push({
      id: Date.now(),
      type: "new_order",
      message: `Nova venda de ${order.product.name}`,
      orderId: order.id,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("user_notifications", JSON.stringify(userNotifications));
  };

  const handleBack = () => {
    if (step > 2) setStep(step - 1);
    else onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed  inset-0 bg-black/60 z-[600] flex justify-center items-center p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          className="bg-white rounded-[32px] w-full max-w-md shadow-2xl relative p-8 overflow-hidden"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute cursor-pointer top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="mb-2 pr-10">
            <div className="flex justify-between items-center mb-2">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-[#10B981] uppercase tracking-[1.5px]">
                  KUMELA PURCHASE
                </span>
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase">
                  {/* Cálculo para exibir 1 de 5 mesmo começando no estado 2 */}
                  Passo {step - 1} de {totalSteps}
                </span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#10B981]" 
                // Ajuste visual da barra para refletir a contagem correta
                animate={{ width: `${((step - 1) / totalSteps) * 100}%` }} 
                transition={{ duration: 0.5, ease: "circOut" }}
              />
            </div>
          </div>

          <div className="relative min-h-[300px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {step === 2 && (
                  <Step2Identification
                    product={product}
                    purchaseData={purchaseData || {}}
                    onBack={handleBack}
                    onNext={handleStep2Next}
                  />
                )}
                {step === 3 && (
                  <Step3Location
                    purchaseData={purchaseData}
                    onBack={handleBack}
                    onNext={handleStep3Next}
                  />
                )}
                {step === 4 && (
                  <Step4QuantityAndCarrier
                    product={product}
                    purchaseData={purchaseData}
                    onBack={handleBack}
                    onNext={handleStep4Next}
                  />
                )}
                {step === 5 && (
                  <Step5Review
                    product={product}
                    purchaseData={purchaseData}
                    onBack={handleBack}
                    onNext={handleStep5Next}
                  />
                )}
                {step === 6 && (
                  <Step6Payment
                    product={product} // Adicionado para evitar erro de undefined na fatura
                    purchaseData={purchaseData}
                    onBack={handleBack}
                    onNext={handleStep6Next}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}