// ─────────────────────────────────────────────────────────────────────────────
// components/admin/users/CreateUserModal.tsx
// Formulário para o admin criar um novo utilizador no sistema.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import { X, Check, Eye, EyeOff } from "lucide-react";
import { provincesData } from "@/data/provincesData";

interface CreateUserForm {
  name:     string;
  numero:   string;
  password: string;
  role:     string;
  province: string;
  district: string;
}

const EMPTY_FORM: CreateUserForm = {
  name: "", numero: "", password: "", role: "buyer", province: "Nampula", district: "Nampula",
};

const ROLES = [
  { value: "buyer",   label: "Comprador"      },
  { value: "user",  label: "Agricultor"     },
  { value: "shipper", label: "Transportador"  },
];

interface CreateUserModalProps {
  open:     boolean;
  onClose:  () => void;
  onCreate: (user: CreateUserForm) => void;
}

export default function CreateUserModal({ open, onClose, onCreate }: CreateUserModalProps) {
  const [form,     setForm]     = useState<CreateUserForm>(EMPTY_FORM);
  const [showPass, setShowPass] = useState(false);
  const [errors,   setErrors]   = useState<Partial<CreateUserForm>>({});

  const districts = provincesData.find((p) => p.name === form.province)?.districts ?? [];

  const f = (field: keyof CreateUserForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validate = (): boolean => {
    const e: Partial<CreateUserForm> = {};
    if (!form.name.trim())                    e.name     = "Nome obrigatório";
    if (form.numero.length < 9)               e.numero   = "Mínimo 9 dígitos";
    if (form.password.length < 4)             e.password = "Mínimo 4 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onCreate(form);
    setForm(EMPTY_FORM);
    setErrors({});
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative z-10 bg-white dark:bg-[#0A1A0E] rounded-2xl p-6 w-full max-w-md shadow-2xl border border-green-100 dark:border-green-900/40 max-h-[90vh] overflow-y-auto">

        {/* Título */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-black text-gray-900 dark:text-white text-base">Criar Novo Utilizador</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4">

          {/* Nome completo */}
          <div>
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
              Nome Completo *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => f("name", e.target.value)}
              placeholder="ex: João da Horta"
              className="w-full px-3 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-[#0D1F10] border border-gray-200 dark:border-green-900/40 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition-all"
            />
            {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
              Número de Telefone * <span className="font-normal text-gray-400">(sem +258)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">+258</span>
              <input
                type="tel"
                value={form.numero}
                onChange={(e) => f("numero", e.target.value.replace(/\D/g, "").slice(0, 9))}
                placeholder="841234567"
                className="w-full pl-12 pr-3 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-[#0D1F10] border border-gray-200 dark:border-green-900/40 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition-all"
              />
            </div>
            {errors.numero && <p className="text-red-500 text-[11px] mt-1">{errors.numero}</p>}
          </div>

          {/* Senha */}
          <div>
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
              Senha Provisória *
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={(e) => f("password", e.target.value)}
                placeholder="Mínimo 4 caracteres"
                className="w-full px-3 pr-10 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-[#0D1F10] border border-gray-200 dark:border-green-900/40 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-[11px] mt-1">{errors.password}</p>}
          </div>

          {/* Tipo de utilizador */}
          <div>
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
              Tipo de Utilizador *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => f("role", r.value)}
                  className={[
                    "py-2.5 rounded-xl text-xs font-bold border-2 transition-all min-h-[44px]",
                    form.role === r.value
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                      : "border-gray-200 dark:border-green-900/30 text-gray-500 dark:text-gray-400 hover:border-green-300",
                  ].join(" ")}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Distrito */}
          <div>
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
              Distrito
            </label>
            <select
              value={form.district}
              onChange={(e) => f("district", e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-[#0D1F10] border border-gray-200 dark:border-green-900/40 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all"
            >
              {districts.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* Nota de privacidade */}
        <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-4 text-center">
          O utilizador receberá uma notificação para alterar a senha no primeiro acesso.
        </p>

        {/* Botões */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-bold text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors min-h-[48px]"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 rounded-xl font-bold text-sm bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all min-h-[48px] flex items-center justify-center gap-2"
          >
            <Check size={16} aria-hidden="true" />
            Criar Utilizador
          </button>
        </div>
      </div>
    </div>
  );
}