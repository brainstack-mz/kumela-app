import { Phone, User as UserIcon, ArrowRight, Lock } from "lucide-react";
import { StepHeader } from "../ui/StepHeader";
import { getUserByPhoneNumber, User } from "@/lib/users";

interface Step1PersonalProps {
  formData: {
    phone: string;
    name: string;
    isRegistered: boolean;
  };
  updateField: (field: string, value: string | boolean) => void;
  onNext: () => void;
}

export const Step1Personal = ({ formData, updateField, onNext }: Step1PersonalProps) => {
  
  const handlePhoneChange = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 9);
    updateField("phone", clean);

    if (clean.length === 9) {
      const user: User | null = getUserByPhoneNumber(clean);
      if (user) {
        updateField("name", user.name || "");
        updateField("isRegistered", true);
      } else {
        updateField("isRegistered", false);
      }
    }
  };

  const isValidPhone = /^(82|83|84|85|86|87)\d{7}$/.test(formData.phone);

  return (
    <div className="space-y-4">
      <StepHeader title="Dados Pessoais" audioPath="/audio/Recording_5.m4a" />

      {/* Input de Telefone - Estilo Slate adaptável */}
      <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-2xl p-4 bg-gray-50 dark:bg-slate-800/50 focus-within:ring-2 ring-green-500 transition-all">
        <Phone className="text-gray-400 dark:text-slate-500 mr-3" size={20} />
        <input
          type="tel"
          placeholder="Número de Telefone"
          className="w-full outline-none bg-transparent font-medium dark:text-white dark:placeholder:text-slate-500"
          value={formData.phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
        />
      </div>

      {/* Input de Nome - Estilo bloqueado/editável adaptável */}
      <div className={`flex items-center border rounded-2xl p-4 transition-all ${
        formData.isRegistered 
          ? 'bg-gray-100 dark:bg-slate-800 border-transparent' 
          : 'bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 focus-within:ring-2 ring-green-500'
      }`}>
        {formData.isRegistered ? (
          <Lock className="text-green-500 dark:text-green-400 mr-3" size={20} />
        ) : (
          <UserIcon className="text-gray-400 dark:text-slate-500 mr-3" size={20} />
        )}
        <input
          type="text"
          placeholder="Seu Nome"
          disabled={formData.isRegistered}
          className="w-full outline-none bg-transparent font-medium dark:text-white dark:placeholder:text-slate-500 disabled:text-gray-500 dark:disabled:text-slate-400"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          autoComplete="off"
        />
      </div>

      <button
        onClick={onNext}
        disabled={!isValidPhone || !formData.name}
        className="w-full py-4 rounded-2xl bg-green-800 dark:bg-green-600 text-white font-bold flex justify-center items-center gap-2 disabled:opacity-50 hover:bg-green-900 dark:hover:bg-green-700 shadow-lg shadow-green-100 dark:shadow-none active:scale-95 transition-all mt-2"
      >
        Continuar <ArrowRight size={18} />
      </button>
    </div>
  );
};