"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, User, Phone, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserByPhoneNumber } from "@/lib/users";
import toast from "react-hot-toast";

interface Step2Props {
  product?: any;
  purchaseData: {
    phone: string;
    name: string;
  };
  onBack: () => void;
  onNext: (data: any) => void;
  onClose?: () => void; // Adicionado para o X de fechamento
}

export default function Step2Identification({ purchaseData, onNext, onClose }: Step2Props) {
  const { user } = useAuth();
  const [phone, setPhone] = useState(purchaseData.phone || "");
  const [name, setName] = useState(purchaseData.name || "");
  const [showNameField, setShowNameField] = useState(false);
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    if (user) {
      setPhone(user.numero);
      const fullUser = getUserByPhoneNumber(user.numero);
      setName((fullUser as any)?.name || user.name || `Usuário ${user.numero}`);
      setUserExists(true);
      setShowNameField(false);
    }
  }, [user]);

  const handlePhoneChange = async (value: string) => {
    const cleanPhone = value.replace(/\D/g, '').slice(0, 9);
    setPhone(cleanPhone);
    
    if (cleanPhone.length === 9) {
      setIsCheckingPhone(true);
      setTimeout(() => {
        const foundUser = getUserByPhoneNumber(cleanPhone);
        if (foundUser) {
          setName((foundUser as any).name || `Usuário ${foundUser.numero}`);
          setUserExists(true);
          setShowNameField(false);
        } else {
          setUserExists(false);
          setShowNameField(true);
          setName("");
        }
        setIsCheckingPhone(false);
      }, 400);
    } else {
      setShowNameField(false);
      setUserExists(false);
    }
  };

  const handleNext = () => {
    if (phone.length < 9) return toast.error("Número inválido");
    if (!name.trim()) return toast.error("Nome obrigatório");
    onNext({ phone, name: name.trim(), userExists });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full bg-white text-gray-900 rounded-3xl overflow-hidden relative p-5 sm:p-6"
    >
      {/* Botão de Fechar */}
      

      {/* Progress Indicator - Mais compacto */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">ETAPA 1 de 4</span>
          <span className="text-[10px] text-gray-400 font-medium">Identificação</span>
        </div>
        <div className="w-full h-1 bg-gray-100 rounded-full">
          <div className="h-1 bg-green-500 rounded-full transition-all duration-500" style={{ width: "25%" }}></div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-center mb-2">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-green-50 rounded-full mb-2">
            <User className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 leading-tight">Identificação</h2>
          <p className="text-[12px] text-gray-500">Digite seu número de telefone</p>
        </div>

        <div className="space-y-3">
            {/* Campo Telefone */}
            <div className="space-y-1">
              <label className="flex items-center text-[11px] font-bold text-gray-500 uppercase ml-1">
                <Phone className="w-3 h-3 mr-1.5" /> Número de Telefone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                disabled={!!user}
                placeholder="84xxxxxxx"
                className="w-full h-11 px-4 text-base border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-green-500 outline-none transition-all disabled:opacity-60"
              />
              {isCheckingPhone && <p className="text-[10px] text-gray-400 ml-1 animate-pulse">Verificando número...</p>}
            </div>

            {/* Campo Nome com Animação Compacta */}
            <AnimatePresence>
              {(showNameField || (!user && !userExists && phone.length >= 9)) && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-1"
                >
                  <label className="flex items-center text-[11px] font-bold text-gray-500 uppercase ml-1">
                    <User className="w-3 h-3 mr-1.5" /> Nome Completo
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full h-11 px-4 text-base border border-gray-200 rounded-xl bg-white focus:border-green-500 outline-none transition-all"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nome bloqueado para usuário existente */}
            {userExists && !showNameField && (
              <div className="space-y-1">
                <label className="flex items-center text-[11px] font-bold text-gray-500 uppercase ml-1">
                  <User className="w-3 h-3 mr-1.5" /> Nome do Cliente
                </label>
                <div className="w-full h-11 px-4 flex items-center border border-gray-100 rounded-xl bg-gray-50 text-gray-400 text-sm font-medium">
                  {name}
                </div>
                <p className="text-[10px] text-green-600 font-medium ml-1">✓ Usuário encontrado</p>
              </div>
            )}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6">
        <button
          onClick={handleNext}
          disabled={phone.length < 9 || !name || isCheckingPhone}
          className="w-full h-12 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:grayscale cursor-pointer shadow-md shadow-green-100"
        >
          Próximo
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}