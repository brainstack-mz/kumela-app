"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  Phone,
  Lock,
  CreditCard,
  Truck,
  UserCheck,
  Eye,
  EyeOff,
  User as UserIcon,
  MapPin,
  Check,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

// Components
import LoginSlider from "@/components/login-components/LoginSlider";
import OTPInput from "@/components/shared/OTPInput";
import { Input } from "@/components/shared/Input";
import { Button } from "@/components/shared/Button";

// Data & Libs
import {
  loginUser,
  getUserByPhoneNumber,
  DASHBOARD_URLS,
  User,
} from "@/lib/users";
import { useAuth } from "@/context/AuthContext";
import { provincesData } from "@/data/provincesData";

const sliderData = [
  {
    text: "Pagamentos Simples e Seguros",
    icon: <CreditCard className="h-12 w-12 text-white" />,
    image: "/assets/imgs/slide1.jpeg",
  },
  {
    text: "Entrega em Todo Moçambique",
    icon: <Truck className="h-12 w-12 text-white" />,
    image: "/assets/imgs/slide2.jpeg",
  },
  {
    text: "Conectando Comunidades",
    icon: <UserCheck className="h-12 w-12 text-white" />,
    image: "/assets/imgs/img1.jpeg",
  },
];

export default function AuthPage() {
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<
    "initial" | "password_entry" | "otp_entry" | "registration"
  >("initial");
  const [regStep, setRegStep] = useState(1);
  const [isNewUser, setIsNewUser] = useState(false);

  const [registerData, setRegisterData] = useState({
    name: "",
    lastName: "",
    province: "Nampula",
    district: "",
    address: "",
  });

  const districts =
    provincesData.find((p) => p.name === "Nampula")?.districts || [];

  const getPurePhone = (phone: string) => {
    let pure = phone.replace(/\s/g, "").replace(/\D/g, "");
    if (pure.startsWith("258")) pure = pure.substring(3);
    return pure;
  };

  const validatePhone = (phone: string) => {
    const pure = getPurePhone(phone);
    const validPrefixes = ["82", "83", "84", "85", "86", "87"];
    return (
      pure.length === 9 &&
      validPrefixes.some((prefix) => pure.startsWith(prefix))
    );
  };

  useEffect(() => {
    if (validatePhone(phoneNumber)) {
      const pure = getPurePhone(phoneNumber);
      const user = getUserByPhoneNumber(pure);
      setIsNewUser(!user);
    } else {
      setIsNewUser(true);
    }
  }, [phoneNumber]);

  const handleOTPRequest = () => {
    if (!validatePhone(phoneNumber)) return toast.error("Número inválido");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp_entry");
      toast.success("Código enviado!");
    }, 800);
  };

  const handleFinalAuth = async () => {
    setLoading(true);
    const pure = getPurePhone(phoneNumber);
    let targetUser: User | null = null;

    if (step === "registration") {
      if (password !== confirmPassword) {
        setLoading(false);
        return toast.error("As senhas não coincidem");
      }
      targetUser = {
        numero: pure,
        password: password,
        role: "buyer",
        name: `${registerData.name} ${registerData.lastName}`,
      };
    } else if (step === "password_entry") {
      targetUser = loginUser(pure, password);
    } else {
      const existing = getUserByPhoneNumber(pure);
      if (isNewUser) {
        setLoading(false);
        return setStep("registration");
      }
      targetUser = existing;
    }

    if (targetUser) {
      authLogin(targetUser);
      router.push(
        targetUser.role === "admin"
          ? DASHBOARD_URLS.admin
          : "/seller/dashboard",
      );
    } else {
      toast.error("Erro na autenticação");
      setLoading(false);
    }
  };

  const RegistrationStepper = () => (
    <div className="relative flex items-center justify-between mb-8 px-2 max-w-xs mx-auto">
      <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-100 -z-0" />
      <motion.div 
        className="absolute top-5 left-0 h-[2px] bg-green-500 -z-0"
        initial={{ width: 0 }}
        animate={{ width: `${(regStep - 1) * 50}%` }}
      />
      {[
        { id: 1, label: "INFO" },
        { id: 2, label: "LOCAL" },
        { id: 3, label: "SENHA" },
      ].map((s) => (
        <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
          <motion.div 
            animate={{ 
              scale: regStep === s.id ? 1.1 : 1,
              backgroundColor: regStep >= s.id ? "#16a34a" : "#fff",
              borderColor: regStep >= s.id ? "#16a34a" : "#e5e7eb"
            }}
            className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold shadow-sm"
          >
            {regStep > s.id ? (
              <Check size={20} className="text-white" />
            ) : (
              <span className={regStep >= s.id ? "text-white" : "text-gray-400"}>
                {s.id}
              </span>
            )}
          </motion.div>
          <span className={`text-[10px] font-bold tracking-widest ${regStep >= s.id ? "text-green-600" : "text-gray-300"}`}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-screen w-full flex overflow-hidden bg-white sm:bg-gray-50">
      {/* Esquerda: Slider (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-teal-600 relative overflow-hidden">
        <LoginSlider slides={sliderData} />
      </div>

      {/* Direita: Auth Container */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center relative h-full p-4 sm:p-6 overflow-hidden">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white sm:rounded-3xl sm:shadow-2xl sm:border border-gray-100 p-6 sm:p-10 flex flex-col max-h-full overflow-hidden"
        >
          {/* Header */}
          <div className="text-center mb-6 shrink-0">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-1.5 bg-green-50 rounded-lg">
                <Image src="/favicon.ico" alt="Logo" width={32} height={32} />
              </div>
              <span className="text-lg font-black text-slate-800 tracking-tighter uppercase">
                KUMELA
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e293b] tracking-tight">
              {step === "registration" ? "Comece Agora" : "Seja Bem-vindo"}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 font-medium">
              {step === "registration"
                ? "Crie sua conta em menos de 1 minuto."
                : "Acesse o maior mercado agrícola de Moçambique."}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-1">
            <AnimatePresence mode="wait">
              {step === "initial" && (
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 py-2">
                  <Input type="tel" value={phoneNumber} onChange={setPhoneNumber} placeholder="Ex: 841234567" label="Número de Telefone" icon={Phone} className="h-14" />
                  <div className="space-y-3">
                    <Button onClick={handleOTPRequest} loading={loading} className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold h-14 rounded-2xl shadow-lg">
                      Entrar com OTP
                    </Button>
                    {!isNewUser && validatePhone(phoneNumber) && (
                      <Button onClick={() => setStep("password_entry")} className="w-full cursor-pointer border-2 border-slate-100 text-slate-700 font-bold h-14 rounded-2xl hover:bg-slate-50 transition-colors">
                        Entrar com Senha
                      </Button>
                    )}
                  </div>

                  {/* INFO APENAS NA PRIMEIRA TELA */}
                  <div className="pt-4 border-t border-slate-50 space-y-4">
                    <button
                      onClick={() => router.push("/")}
                      className="group w-full cursor-pointer flex items-center justify-center gap-2 py-1 text-sm font-semibold text-slate-400 hover:text-green-600 transition-all duration-300"
                    >
                      <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                      <span className="relative">
                        Voltar ao início
                        <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-green-500 transition-all duration-300 group-hover:w-full" />
                      </span>
                    </button>

                    <p className="text-slate-400 text-[10px] font-bold tracking-widest text-center">
                      &copy; {new Date().getFullYear()} • Todos os direitos reservados
                    </p>
                  </div>
                </motion.div>
              )}

              {step === "registration" && (
                <motion.div key="reg" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 py-2">
                  <RegistrationStepper />

                  {regStep === 1 && (
                    <div className="space-y-4">
                      <Input label="Nome" icon={UserIcon} value={registerData.name} onChange={(v) => setRegisterData({ ...registerData, name: v })} placeholder="João" className="h-14" />
                      <Input label="Apelido" icon={UserIcon} value={registerData.lastName} onChange={(v) => setRegisterData({ ...registerData, lastName: v })} placeholder="Sitoe" className="h-14" />
                      <div className="pt-2 space-y-3">
                        <Button onClick={() => setRegStep(2)} disabled={!registerData.name || !registerData.lastName} className="w-full bg-green-600 text-white font-bold h-14 rounded-2xl shadow-lg">
                          Continuar <ChevronRight size={18} className="ml-1" />
                        </Button>
                        <button onClick={() => setStep("initial")} className="w-full flex items-center justify-center gap-2 text-xs text-slate-400 font-medium py-2">
                          <RefreshCw size={14} /> Corrigir telefone
                        </button>
                      </div>
                    </div>
                  )}

                  {regStep === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Província (Fixo)</label>
                        <div className="relative">
                          <div className="w-full h-14 flex items-center pl-12 pr-4 border-2 border-gray-50 rounded-2xl bg-gray-50 text-slate-500 font-bold">
                            Nampula
                          </div>
                          <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-700 uppercase ml-1">Distrito</label>
                        <select 
                          value={registerData.district} 
                          onChange={(e) => setRegisterData({...registerData, district: e.target.value})}
                          className="w-full h-14 px-4 border-2 border-slate-100 rounded-2xl font-semibold focus:border-green-600 outline-none"
                        >
                          <option value="">Selecione o distrito</option>
                          {districts.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                      <Input label="Endereço Específico" icon={MapPin} value={registerData.address} onChange={(v) => setRegisterData({...registerData, address: v})} placeholder="Rua, número, bairro" className="h-14" />
                      
                      <div className="flex gap-3 pt-4">
                        <button onClick={() => setRegStep(1)} className="flex-1 h-14 rounded-2xl border-2 border-slate-100 font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                          Voltar
                        </button>
                        <Button onClick={() => setRegStep(3)} disabled={!registerData.district || !registerData.address} className="flex-[2] bg-green-600 text-white font-bold h-14 rounded-2xl shadow-lg">
                          Próximo
                        </Button>
                      </div>
                    </div>
                  )}

                  {regStep === 3 && (
                    <div className="space-y-4">
                      <div className="relative">
                        <Input type={showPassword ? "text" : "password"} label="Senha" icon={Lock} value={password} onChange={setPassword} className="h-14" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-11 text-slate-400">
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      <Input type={showPassword ? "text" : "password"} label="Confirmar Senha" icon={Lock} value={confirmPassword} onChange={setConfirmPassword} className="h-14" />
                      
                      <div className="flex gap-3 pt-4">
                        <button onClick={() => setRegStep(2)} className="flex-1 h-14 rounded-2xl border-2 border-slate-100 font-bold text-slate-500">
                          Voltar
                        </button>
                        <Button onClick={handleFinalAuth} loading={loading} disabled={!password || password !== confirmPassword} className="flex-[2] bg-green-600 text-white font-bold h-14 rounded-2xl shadow-lg">
                          Finalizar e Entrar
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {step === "otp_entry" && (
                <motion.div key="otp" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 text-center py-4">
                  <div className="bg-orange-50 p-3 rounded-xl inline-block">
                    <p className="text-xs text-orange-700 font-bold">Código enviado para +258 {phoneNumber}</p>
                  </div>
                  <OTPInput length={6} value={otp} onChange={setOtp} />
                  <div className="space-y-3">
                    <Button onClick={handleFinalAuth} loading={loading} className="w-full h-14 bg-orange-500 text-white font-bold rounded-2xl shadow-lg">Verificar e Entrar</Button>
                    <button onClick={() => setStep("initial")} className="text-sm text-slate-400 font-bold hover:underline">Corrigir número</button>
                  </div>
                </motion.div>
              )}

              {step === "password_entry" && (
                <motion.div key="pass" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 py-2">
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} value={password} onChange={setPassword} label="Sua Senha" icon={Lock} className="h-14" autoFocus />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-11 text-slate-400">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <Button onClick={handleFinalAuth} loading={loading} className="w-full h-14 bg-green-600 text-white font-bold rounded-2xl shadow-lg">Acessar Conta</Button>
                  <button onClick={() => setStep("initial")} className="w-full text-center text-sm font-bold text-slate-400">Esqueci minha senha</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}