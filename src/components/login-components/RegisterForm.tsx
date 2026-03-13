"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, MapPin, Lock, Eye, EyeOff, 
  ChevronRight, Check, ArrowLeft, RefreshCw 
} from "lucide-react";
import { provincesData } from "@/data/provincesData";
import { Input } from "@/components/shared/Input";
import { Button } from "@/components/shared/Button";

export default function RegisterForm({ onFinish, onBackToPhone, loading }: any) {
  const [regStep, setRegStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "", lastName: "", province: "Nampula",
    district: "", address: "", password: "", confirmPassword: ""
  });

  const districts = provincesData.find(p => p.name === "Nampula")?.districts || [];

  const handleFinalSubmit = async () => {
    setIsFinishing(true);
    await onFinish(formData);
  };

  const Stepper = () => (
    <div className="relative flex items-center justify-between mb-6 px-2 max-w-xs mx-auto"> {/* mb-10 para mb-6 */}
      <div className="absolute top-4 left-0 w-full h-[1px] bg-gray-100 -z-0" />
      <motion.div 
        className="absolute top-4 left-0 h-[1px] bg-green-500 -z-0"
        animate={{ width: `${(regStep - 1) * 50}%` }}
      />
      {[1, 2, 3].map((s) => (
        <div key={s} className="relative z-10 flex flex-col items-center">
          <motion.div 
            animate={{ 
              scale: regStep === s ? 1.1 : 1,
              backgroundColor: regStep >= s ? "#16a34a" : "#fff",
              borderColor: regStep >= s ? "#16a34a" : "#e5e7eb"
            }}
            className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-bold shadow-sm"
          >
            {regStep > s ? <Check size={14} className="text-white" /> : <span className={regStep >= s ? "text-white" : "text-gray-400"}>{s}</span>}
          </motion.div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full flex flex-col h-full">
      <Stepper />

      <AnimatePresence mode="wait">
        {isFinishing ? (
          <motion.div key="finish" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <RefreshCw className="text-green-600 animate-spin" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Criando sua conta...</h3>
          </motion.div>
        ) : (
          <motion.div
            key={regStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4" // Reduzido de space-y-6
          >
            {regStep === 1 && (
              <div className="space-y-4"> {/* Reduzido de 5 */}
                <div className="space-y-3"> {/* Reduzido de 4 */}
                  <Input label="Nome" icon={User} value={formData.name} onChange={(v) => setFormData({...formData, name: v})} placeholder="Ex: João" />
                  <Input label="Apelido" icon={User} value={formData.lastName} onChange={(v) => setFormData({...formData, lastName: v})} placeholder="Ex: Sitoe" />
                </div>
                <div className="space-y-2"> {/* Reduzido de 3 */}
                  <Button onClick={() => setRegStep(2)} disabled={!formData.name || !formData.lastName} className="w-full bg-green-600 h-12 rounded-xl text-white font-bold text-base shadow-md">
                    Continuar <ChevronRight size={18} className="ml-1" />
                  </Button>
                  <button onClick={onBackToPhone} className="w-full flex items-center justify-center gap-2 text-[12px] text-gray-400 font-medium py-1 hover:text-orange-500 transition-colors">
                    <RefreshCw size={12} /> Corrigir telefone
                  </button>
                </div>
              </div>
            )}

            {regStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Província</label>
                    <div className="w-full h-12 flex items-center px-4 border border-gray-100 rounded-xl bg-gray-50 text-gray-500 font-bold text-sm">
                      Nampula
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-700 uppercase ml-1">Distrito *</label>
                    <select 
                      value={formData.district} 
                      onChange={(e) => setFormData({...formData, district: e.target.value})}
                      className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:border-green-500 outline-none bg-white font-medium text-sm"
                    >
                      <option value="">Selecione o distrito</option>
                      {districts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <Input label="Endereço" icon={MapPin} value={formData.address} onChange={(v) => setFormData({...formData, address: v})} placeholder="Bairro e Rua" />
                </div>
                <div className="flex gap-2"> {/* Reduzido gap de 3 */}
                  <button onClick={() => setRegStep(1)} className="w-12 h-12 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400"><ArrowLeft size={20}/></button>
                  <Button onClick={() => setRegStep(3)} disabled={!formData.district || !formData.address} className="flex-1 bg-green-600 h-12 rounded-xl text-white font-bold text-sm shadow-md">Próximo</Button>
                </div>
              </div>
            )}

            {regStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} label="Senha" icon={Lock} value={formData.password} onChange={(v) => setFormData({...formData, password: v})} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-9 text-gray-400"> {/* Top ajustado para o novo input */}
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <Input type={showPassword ? "text" : "password"} label="Confirmar Senha" icon={Lock} value={formData.confirmPassword} onChange={(v) => setFormData({...formData, confirmPassword: v})} />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setRegStep(2)} className="w-12 h-12 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400"><ArrowLeft size={20}/></button>
                  <Button onClick={handleFinalSubmit} loading={loading} disabled={!formData.password || formData.password !== formData.confirmPassword} className="flex-1 bg-orange-500 h-12 rounded-xl text-white font-bold text-sm shadow-md">Finalizar</Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}