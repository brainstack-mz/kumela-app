// components/smart-form/steps/StepAuth.tsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Phone, ArrowLeft, KeyRound, Volume2 } from "lucide-react";
import OTPInput from "@/components/shared/OTPInput";
import { Input } from "@/components/shared/Input";
import { Button } from "@/components/shared/Button";

interface StepAuthProps {
  phoneNumber: string;
  onSuccess: () => void;
  onBack: () => void;
}

export function StepAuth({ phoneNumber, onSuccess, onBack }: StepAuthProps) {
  const [authMode, setAuthMode] = useState<"otp" | "password">("otp");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const playAudio = () => {
    const audio = new Audio("/audio/auth_instructions.m4a"); 
    audio.play();
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
            Verifique sua Identidade
          </h3>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
            Instruções de voz disponíveis
          </p>
        </div>
        {/* Botão de Áudio Adaptado */}
        <button 
          onClick={playAudio}
          className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-slate-100 dark:border-slate-700 shadow-sm shrink-0 active:scale-90"
        >
          <Volume2 size={20} />
        </button>
      </div>

      {/* Card de Aviso Adaptado */}
      <div className="bg-orange-50/50 dark:bg-slate-800/50 p-3 rounded-xl border border-orange-100/50 dark:border-slate-700 text-center">
        <p className="text-[13px] text-orange-700 dark:text-orange-500 font-bold">
          {authMode === "otp" 
            ? `Código enviado para +258 ${phoneNumber}` 
            : "Use sua senha cadastrada"}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {authMode === "otp" ? (
          <motion.div key="otp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <OTPInput length={5} value={otp} onChange={setOtp} />
            
            <div className="space-y-3 pt-2">
              <Button 
                onClick={handleVerify} 
                loading={loading} 
                disabled={otp.length < 5} 
                className="w-full bg-[#10B981] h-14 rounded-2xl font-bold text-white shadow-lg border-none"
              >
                Confirmar Código
              </Button>
              <button 
                onClick={() => setAuthMode("password")} 
                className="w-full text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center justify-center gap-2 hover:text-slate-600 dark:hover:text-slate-300 transition-colors py-2"
              >
                <KeyRound size={14} /> Entrar com senha
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="pass" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            <Input type="password" label="Sua Senha" icon={Lock} value={password} onChange={setPassword} placeholder="••••••" className="h-14" />
            <div className="space-y-3 pt-2">
              <Button onClick={handleVerify} loading={loading} disabled={!password} className="w-full bg-[#10B981] h-14 rounded-2xl font-bold text-white shadow-lg border-none">
                Acessar e Continuar
              </Button>
              <button 
                onClick={() => setAuthMode("otp")} 
                className="w-full text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center justify-center gap-2 hover:text-slate-600 dark:hover:text-slate-300 transition-colors py-2"
              >
                <Phone size={14} /> Usar código SMS
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={onBack} 
        className="w-full py-2 flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500 text-sm font-semibold hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
      >
        <ArrowLeft size={16} /> Voltar e corrigir número
      </button>
    </motion.div>
  );
}