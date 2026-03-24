"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PartyPopper, ShieldCheck } from "lucide-react";

// Importação dos Componentes
import { Step1Personal } from "./steps/Step1Personal";
import { StepAuth } from "./steps/StepAuth"; // Seu novo componente
import { Step2Location } from "./steps/Step2Location";
import { Step3Product } from "./steps/Step3Product";
import { Step4Image } from "./steps/Step4Image";
import { Step5Review } from "./steps/Step5Review";
import PriceTable from "@/data/priceTable";

// Lib para checar o usuário
import { getUserByPhoneNumber } from "@/lib/users";

export default function SmartForm({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false); // Controla a tela de OTP/Senha
  const [showTable, setShowTable] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    isRegistered: false,
    district: "",
    locality: "",
    category: "",
    stock: "",
    price: "",
    unit: "kg",
    images: [] as string[],
    description: "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Lógica para decidir se vai para OTP ou Direto para Localização
  const handlePhase1Next = () => {
    const user = getUserByPhoneNumber(formData.phone);
    
    if (user) {
      // Usuário existe -> Precisa validar identidade
      setIsVerifying(true);
      // Já atualizamos o nome com o que está no sistema para poupar trabalho ao usuário
      updateField("name", user.name);
      updateField("isRegistered", true);
    } else {
      // Usuário novo -> Segue o fluxo normal
      setPhase(2);
    }
  };

  const handleAuthSuccess = () => {
    setIsVerifying(false);
    setPhase(2); // Vai para o passo de Localização
  };

  const handleFinalConfirm = () => {
    setIsSuccess(true);
    setTimeout(() => onClose(), 3500);
  };

  if (showTable) return (
    <div className="fixed inset-0 z-[100] bg-white flex justify-center items-center p-4">
       <div className="w-full max-w-2xl h-[90vh] bg-white rounded-[32px] shadow-2xl overflow-hidden relative border border-gray-100">
          <PriceTable onClose={() => setShowTable(false)} />
       </div>
    </div>
  );

  return (
    <div className="relative max-w-md mx-auto bg-white rounded-[32px] p-8 shadow-2xl border-[#10B981] min-h-[400px] flex flex-col justify-center">
      
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div 
            key="success-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center p-4"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 12 }}
              className="bg-green-100 p-6 rounded-full text-green-600 mb-6 shadow-lg"
            >
              <PartyPopper size={48} strokeWidth={2} />
            </motion.div>
            <h3 className="text-2xl font-black text-gray-800">Anúncio Publicado!</h3>
            <p className="text-gray-500 mt-3 text-sm px-4">
              Excelente! Seu produto já está sendo processado e estará visível em breve.
            </p>
            <div className="mt-8 flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-full border border-green-100">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Plataforma Kumela Segura</span>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="form-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            {/* Barra de Progresso - Escondida durante verificação para focar no OTP */}
            {!isVerifying && (
              <div className="mb-8 pr-10">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-[#10B981] uppercase tracking-[1.5px]">KUMELA FORM</span>
                    <span className="text-[11px] font-bold text-[#94A3B8] uppercase">Passo {phase} de 5</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <motion.div className="h-full bg-[#10B981]" animate={{ width: `${(phase / 5) * 100}%` }} />
                </div>
              </div>
            )}

            {/* Renderização Condicional dos Passos */}
            <motion.div>
              {isVerifying ? (
                <StepAuth 
                  phoneNumber={formData.phone} 
                  onSuccess={handleAuthSuccess} 
                  onBack={() => setIsVerifying(false)} 
                />
              ) : (
                <>
                  {phase === 1 && (
                    <Step1Personal 
                      formData={formData} 
                      updateField={updateField} 
                      onNext={handlePhase1Next} 
                    />
                  )}
                  {phase === 2 && (
                    <Step2Location 
                      formData={formData} 
                      updateField={updateField} 
                      onNext={() => setPhase(3)} 
                      onBack={() => setPhase(1)} 
                    />
                  )}
                  {phase === 3 && (
                    <Step3Product 
                      formData={formData} 
                      updateField={updateField} 
                      onNext={() => setPhase(4)} 
                      onBack={() => setPhase(2)} 
                      onShowTable={() => setShowTable(true)} 
                    />
                  )}
                  {phase === 4 && (
                    <Step4Image 
                      formData={formData} 
                      updateField={updateField} 
                      onNext={() => setPhase(5)} 
                      onBack={() => setPhase(3)} 
                    />
                  )}
                  {phase === 5 && (
                    <Step5Review 
                      formData={formData} 
                      onEditStep={(s: number) => setPhase(s)} 
                      onConfirm={handleFinalConfirm} 
                    />
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}