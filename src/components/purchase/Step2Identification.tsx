"use client";

import { useState } from "react";
import { ArrowRight, User as UserIcon, Phone, Lock } from "lucide-react";
import { getUserByPhoneNumber, type User as UserType } from "@/lib/users";
import { StepHeader } from "@/components/smart-form/ui/StepHeader";
import toast from "react-hot-toast";

interface Step2Props {
  product?: any;
  purchaseData: {
    phone: string;
    name: string;
  };
  onBack: () => void;
  onNext: (data: { phone: string; name: string; userExists: boolean }) => void;
  onClose?: () => void;
}

export default function Step2Identification({ purchaseData, onNext }: Step2Props) {
  const [phone, setPhone] = useState<string>(purchaseData.phone || "");
  const [name, setName] = useState<string>(purchaseData.name || "");
  const [isCheckingPhone, setIsCheckingPhone] = useState<boolean>(false);
  const [userExists, setUserExists] = useState<boolean>(false);

  // Validação de prefixos de Moçambique
  const isValidPhone = /^(82|83|84|85|86|87)\d{7}$/.test(phone);

  const handlePhoneChange = (value: string) => {
    const cleanPhone = value.replace(/\D/g, '').slice(0, 9);
    setPhone(cleanPhone);
    
    if (cleanPhone.length === 9) {
      setIsCheckingPhone(true);
      
      // Simulação de busca no banco local
      setTimeout(() => {
        const foundUser = getUserByPhoneNumber(cleanPhone) as UserType | null;
        
        if (foundUser) {
          setName(foundUser.name || "");
          setUserExists(true);
          toast.success("Usuário reconhecido");
        } else {
          setUserExists(false);
          setName(""); 
        }
        setIsCheckingPhone(false);
      }, 400);
    } else {
      setUserExists(false);
    }
  };

  const handleNext = () => {
    if (!isValidPhone) return toast.error("Número de telefone inválido");
    if (!name.trim() || name.length < 3) return toast.error("Insira o nome completo");
    
    onNext({ 
      phone, 
      name: name.trim(), 
      userExists 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header com Instruções de Voz - Importado corretamente */}
      <StepHeader 
        title="Identificação" 
        audioPath="/audio/Recording_5.m4a" 
      />

      <div className="space-y-4">
        {/* Campo Telefone */}
        <div className="flex items-center border border-gray-200 rounded-2xl p-4 bg-gray-50 focus-within:ring-2 ring-green-500 transition-all">
          <Phone className="text-gray-400 mr-3" size={20} />
          <input
            type="tel"
            placeholder="Número de Telefone"
            className="w-full outline-none bg-transparent font-medium text-gray-900"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
          />
        </div>

        {/* Campo Nome - Estilo Kumela Form */}
        <div className={`flex items-center border rounded-2xl p-4 transition-all ${
          userExists ? 'bg-gray-100 border-transparent' : 'bg-gray-50 border-gray-200 focus-within:ring-2 ring-green-500'
        }`}>
          {userExists ? (
            <Lock className="text-green-500 mr-3" size={20} />
          ) : (
            <UserIcon className="text-gray-400 mr-3" size={20} />
          )}
          <input
            type="text"
            placeholder="Seu Nome"
            disabled={userExists}
            className="w-full outline-none bg-transparent font-medium disabled:text-gray-500 text-gray-900"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </div>

        {isCheckingPhone && (
          <p className="text-[10px] text-green-600 text-center animate-pulse font-bold uppercase tracking-wider">
            Verificando...
          </p>
        )}
      </div>

      {/* Botão de Ação Principal */}
      <div className="pt-2">
        <button
          onClick={handleNext}
          disabled={!isValidPhone || !name || isCheckingPhone}
          className="w-full py-4 rounded-2xl bg-green-800 text-white font-bold flex justify-center items-center gap-2 disabled:opacity-50 hover:bg-green-900 shadow-lg shadow-green-100 active:scale-95 transition-all"
        >
          Continuar <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}