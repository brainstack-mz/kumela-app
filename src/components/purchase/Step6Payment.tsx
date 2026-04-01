"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle, 
  Printer, 
  Download, 
  Smartphone,
  ShieldCheck,
  ArrowLeft,
  FileText
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { StepHeader } from "@/components/smart-form/ui/StepHeader";

interface Step6Props {
  product: { name: string; price: number };
  purchaseData: {
    name: string;
    phone: string;
    quantity: number;
    subtotal: number;
    shipping: number;
    total: number;
    carrier: string;
  };
  onBack: () => void;
  onClose?: () => void;
}

const PAYMENT_METHODS = [
  { id: "mpesa", name: "M-Pesa", image: "/assets/mpesa.png", prefixes: ["84", "85"] },
  { id: "emola", name: "e-Mola", image: "/assets/emola.png", prefixes: ["86", "87"] },
];

export default function Step6Payment({ product, purchaseData, onBack, onClose }: Step6Props) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [phone, setPhone] = useState(purchaseData?.phone || "");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  // Auto-preenchimento inteligente ao selecionar método
  const handleSelectMethod = (methodId: string) => {
    setPaymentMethod(methodId);
    // Se o campo estiver vazio, traz o número do cadastro inicial
    if (!phone && purchaseData?.phone) {
      setPhone(purchaseData.phone);
    }
  };

  const selectedMethod = PAYMENT_METHODS.find(m => m.id === paymentMethod);
  const isValidPrefix = selectedMethod?.prefixes.some(p => phone.startsWith(p));
  const isPhoneComplete = phone.length === 9;
  const canSubmit = paymentMethod && isPhoneComplete && isValidPrefix;

  const handlePhoneChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 9);
    setPhone(clean);
  };

  const handleProcessPayment = () => {
    if (!canSubmit) return toast.error("Número ou operadora inválida");
    setIsProcessing(true);
    const id = toast.loading("Enviando solicitação de PIN...");

    setTimeout(() => {
      toast.success("Solicitação enviada com sucesso!", { id });
      setIsProcessing(false);
      setShowInvoice(true);
    }, 2500);
  };

  // Previne o erro "undefined" garantindo que product existe antes de renderizar a fatura
  if (showInvoice && product) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-white text-gray-900 rounded-3xl flex flex-col max-h-[75vh] relative z-[70] overflow-hidden border border-gray-100 shadow-2xl"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none rotate-[-35deg] select-none">
          <h1 className="text-5xl font-black text-gray-900 leading-none text-center">
            KUMELA MARKET<br/>ORIGINAL SECURE
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative z-10">
          <div className="flex justify-between items-start border-b border-dashed border-gray-200 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 relative">
                <Image src="/favicon.ico" alt="Logo" fill className="object-contain" />
              </div>
              <span className="font-black text-emerald-800 text-sm tracking-tight">KUMELA MARKET</span>
            </div>
            <div className="text-right">
              <span className="inline-flex px-2 py-0.5 rounded bg-amber-50 text-amber-600 text-[8px] font-black uppercase border border-amber-100">
                Pagamento Pendente
              </span>
              <p className="text-[10px] text-gray-400 mt-1 font-mono">ID: {Math.random().toString(36).toUpperCase().substring(2, 9)}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-[11px]">
              <div>
                <p className="text-gray-400 font-bold uppercase text-[9px] mb-1">Dados do Cliente</p>
                <p className="font-bold text-gray-800 uppercase">{purchaseData?.name || "Usuário Kumela"}</p>
                <p className="text-gray-500">{phone}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 font-bold uppercase text-[9px] mb-1">Data de Emissão</p>
                <p className="font-bold text-gray-800">{new Date().toLocaleDateString('pt-MZ')}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div className="flex justify-between text-[9px] font-black text-gray-400 uppercase mb-2 border-b border-gray-200 pb-1">
                <span>Descrição do Produto</span>
                <span>Subtotal</span>
              </div>
              <div className="flex justify-between text-[11px] py-1">
                {/* Correção do Erro: Adicionado Optional Chaining ?. */}
                <span className="font-medium text-gray-700">{product?.name} (x{purchaseData?.quantity || 1})</span>
                <span className="font-bold">{purchaseData?.subtotal?.toLocaleString() || "0"} MT</span>
              </div>
              <div className="flex justify-between text-[11px] py-1 border-b border-gray-100/50 pb-2">
                <span className="text-gray-500 italic">Taxa de Entrega ({purchaseData?.carrier || "Ludy"})</span>
                <span className="font-bold text-gray-700">{purchaseData?.shipping?.toLocaleString() || "0"} MT</span>
              </div>
              <div className="flex justify-between items-center pt-3">
                <span className="text-xs font-black text-gray-900 uppercase">Total a Pagar</span>
                <span className="text-xl font-black text-emerald-700">{purchaseData?.total?.toLocaleString() || "0"} MT</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
            <FileText className="text-blue-500 mt-0.5" size={16} />
            <p className="text-[10px] text-blue-800 leading-tight">
              Esta é uma <strong>factura pró-forma</strong>. A confirmação definitiva será emitida após a validação do PIN pela operadora {paymentMethod.toUpperCase()}.
            </p>
          </div>
        </div>

        <div className="p-5 bg-white border-t border-gray-100 flex gap-3 relative z-10">
          <button className="flex-1 h-12 rounded-xl bg-gray-100 flex items-center justify-center gap-2 text-[11px] font-bold text-gray-600 hover:bg-gray-200 transition-all">
            <Printer size={14} /> Imprimir
          </button>
          <button onClick={onClose} className="flex-[2] h-12 rounded-xl bg-[#065f46] text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all">
            Entendido
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full flex flex-col max-h-[70vh] h-fit relative z-[60]"
    >
      <StepHeader title="Pagamento Seguro" audioPath="/audio/Recording_5.m4a" />

      <div className="flex-1 overflow-y-auto pr-1 space-y-5 custom-scrollbar pb-2 pt-2">
        <div className="grid grid-cols-2 gap-4 px-1">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              onClick={() => handleSelectMethod(method.id)}
              className={`relative flex flex-col items-center justify-center h-20 rounded-2xl border-2 transition-all duration-300 ${
                paymentMethod === method.id
                  ? "border-emerald-600 bg-emerald-50/50 shadow-sm"
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <div className="relative w-8 h-8 mb-1">
                <Image src={method.image} alt={method.name} fill className="object-contain" />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-tighter ${paymentMethod === method.id ? 'text-emerald-800' : 'text-gray-400'}`}>
                {method.name}
              </span>
              {paymentMethod === method.id && (
                <div className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white rounded-full p-0.5 shadow-sm">
                  <CheckCircle size={12} />
                </div>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {paymentMethod && (
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 px-1">
              <div className={`flex items-center border rounded-2xl h-14 p-4 bg-gray-50 transition-all ${
                isPhoneComplete && !isValidPrefix ? 'ring-2 ring-red-500 border-transparent' : 'focus-within:ring-2 ring-emerald-600'
              }`}>
                <Smartphone className={isPhoneComplete && !isValidPrefix ? "text-red-500 mr-3" : "text-gray-400 mr-3"} size={18} />
                <input 
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className="w-full bg-transparent outline-none font-black text-gray-800 text-lg tracking-wider"
                  placeholder={paymentMethod === 'mpesa' ? "84 / 85..." : "86 / 87..."}
                />
              </div>
              {isPhoneComplete && !isValidPrefix && (
                <p className="text-[10px] text-red-600 font-bold text-center">
                  Prefixo inválido para {selectedMethod?.name}. Use {selectedMethod?.prefixes.join(" ou ")}.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
          <ShieldCheck className="text-emerald-600 flex-shrink-0" size={20} />
          <p className="text-[10px] text-emerald-800 leading-tight font-medium">
            <strong>Garantia Kumela:</strong> O valor será custodiado pelo sistema até que você confirme que recebeu o produto em segurança.
          </p>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-50 mt-auto bg-white">
        <button onClick={onBack} className="flex-1 h-14 rounded-2xl border border-gray-200 text-gray-500 font-bold hover:bg-gray-50 active:scale-95 transition-all">
          <ArrowLeft size={16} className="inline mr-1"/> Voltar
        </button>
        <button
          onClick={handleProcessPayment}
          disabled={!canSubmit || isProcessing}
          className="flex-[2] h-14 rounded-2xl bg-[#065f46] text-white font-bold hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:grayscale"
        >
          {isProcessing ? "Aguarde..." : "Pagar Agora"}
          <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}