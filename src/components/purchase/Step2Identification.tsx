"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, User, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserByPhoneNumber } from "@/lib/users";
import toast from "react-hot-toast";

interface Step2Props {
  product: any;
  purchaseData: {
    phone: string;
    name: string;
  };
  onBack: () => void;
  onNext: (data: any) => void;
}

export default function Step2Identification({ product, purchaseData, onBack, onNext }: Step2Props) {
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
    setPhone(value);
    const cleanPhone = value.replace(/\D/g, '');
    
    if (cleanPhone.length >= 9) {
      setIsCheckingPhone(true);
      setTimeout(() => {
        const foundUser = getUserByPhoneNumber(cleanPhone);
        if (foundUser) {
          setName((foundUser as any).name || `Usuário ${foundUser.numero}`);
          setUserExists(true);
          setShowNameField(false);
          toast.success("Usuário encontrado! Nome preenchido automaticamente.");
        } else {
          setUserExists(false);
          setShowNameField(true);
          setName("");
        }
        setIsCheckingPhone(false);
      }, 500);
    } else {
      setShowNameField(false);
      setUserExists(false);
    }
  };

  const handleNext = () => {
    if (!phone || phone.length < 9) {
      toast.error("Digite um número de telefone válido!");
      return;
    }
    if (!name || name.trim() === "") {
      toast.error("Digite seu nome completo!");
      return;
    }

    onNext({
      phone: phone.replace(/\D/g, ''),
      name: name.trim(),
      userExists,
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
          <span className="text-sm font-semibold text-green-600 dark:text-green-400">ETAPA 2 de 5</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">Identificação</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div className="h-2 bg-green-600 rounded-full" style={{ width: "40%" }}></div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full mb-3">
            <User className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            Identificação
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {user ? "Seus dados estão bloqueados" : "Digite seu número de telefone"}
          </p>
        </div>

        <div className="space-y-4">
            {/* Campo Telefone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Número de Telefone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                disabled={!!user}
                placeholder="84xxxxxxx"
                className="w-full p-4 text-lg border-2 rounded-xl bg-gray-50 dark:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-green-500"
              />
              {isCheckingPhone && (
                <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                  <span className="animate-spin">⏳</span> Verificando...
                </p>
              )}
              {userExists && !user && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center gap-2">
                  ✓ Usuário encontrado! Nome preenchido automaticamente.
                </p>
              )}
            </div>

            {/* Campo Nome - só aparece se número não existe ou se não está logado e número não existe */}
            {(showNameField || (!user && !userExists && phone.length >= 9)) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full p-4 text-lg border-2 rounded-xl bg-white dark:bg-gray-700 focus:outline-none focus:border-green-500"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Uma conta será criada automaticamente com este número e nome
                </p>
              </motion.div>
            )}

            {/* Nome bloqueado se usuário existe */}
            {userExists && !showNameField && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={name}
                  disabled
                  className="w-full p-4 text-lg border-2 rounded-xl bg-gray-100 dark:bg-gray-700 opacity-50 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Nome bloqueado - usuário já cadastrado
                </p>
              </div>
            )}
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
          onClick={handleNext}
          disabled={!phone || phone.length < 9 || !name}
          className="flex-1 px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próximo
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}

