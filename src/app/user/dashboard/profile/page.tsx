// ─────────────────────────────────────────────────────────────────────────────
// app/dashboard/profile/page.tsx — Perfil do Utilizador
// Editar dados pessoais, localização, língua preferida e tipo de conta
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Check, Save, Globe, Truck, ShieldCheck } from "lucide-react";
import { SectionHeader, PrimaryButton } from "@/components/ui";
import { provincesData } from "@/data/provincesData";

const LANGS = [
  { code: "pt",  label: "Português",  flag: "🇲🇿" },
  { code: "emk", label: "Emakhuwa",   flag: "🇲🇿" },
  { code: "en",  label: "English",    flag: "🇬🇧" },
];

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-green-900/30">
        <div className="w-8 h-8 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
          <Icon size={16} aria-hidden="true" />
        </div>
        <p className="text-sm font-black text-gray-900 dark:text-white">{title}</p>
      </div>
      <div className="px-5 py-4 space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-[#0A1A0E] border border-gray-200 dark:border-green-900/40 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition-all";

export default function ProfilePage() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name:      user?.name ?? "",
    numero:    user?.numero ?? "",
    province:  user?.province ?? "Nampula",
    district:  user?.district ?? "Nampula",
    language:  "pt",
    isTransporter: false,
    bio:       "",
  });
  const [saved, setSaved] = useState(false);

  const f = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const districts = provincesData.find((p) => p.name === form.province)?.districts ?? [];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
<div className="p-4 md:p-6 space-y-6 w-full">
      <SectionHeader title="Perfil" subtitle="Os seus dados pessoais e preferências">
        <PrimaryButton icon={saved ? Check : Save} size="sm" onClick={handleSave} variant={saved ? "gray" : "green"}>
          {saved ? "Guardado!" : "Guardar"}
        </PrimaryButton>
      </SectionHeader>

      {/* Avatar */}
      <div className="flex items-center gap-4 bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30 p-4">
        <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center font-black text-2xl flex-shrink-0">
          {(form.name || "U").charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-base font-black text-gray-900 dark:text-white">{form.name || "Utilizador"}</p>
          <p className="text-xs text-green-600 dark:text-green-400 font-semibold capitalize">{user?.role ?? "utilizador"}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">+258 {form.numero}</p>
        </div>
      </div>

      {/* Dados pessoais */}
      <Section title="Dados Pessoais" icon={ShieldCheck}>
        <Field label="Nome Completo">
          <input type="text" value={form.name} onChange={(e) => f("name", e.target.value)} placeholder="O seu nome" className={inputCls} />
        </Field>
        <Field label="Número de Telefone">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">+258</span>
            <input type="tel" value={form.numero} readOnly className={`${inputCls} pl-12 opacity-60 cursor-not-allowed`} />
          </div>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">O número de telefone não pode ser alterado.</p>
        </Field>
        <Field label="Sobre mim">
          <textarea
            value={form.bio}
            onChange={(e) => f("bio", e.target.value)}
            placeholder="Breve descrição sobre si…"
            rows={2}
            className={`${inputCls} resize-none`}
          />
        </Field>
      </Section>

      {/* Localização */}
      <Section title="Localização" icon={Globe}>
        <Field label="Distrito">
          <select value={form.district} onChange={(e) => f("district", e.target.value)} className={inputCls}>
            {districts.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </Field>
        <Field label="Província">
          <input type="text" value={form.province} readOnly className={`${inputCls} opacity-60 cursor-not-allowed`} />
        </Field>
      </Section>

      {/* Idioma */}
      <Section title="Idioma Preferido" icon={Globe}>
        <div className="grid grid-cols-3 gap-2">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => f("language", l.code)}
              className={[
                "py-3 rounded-xl text-xs font-bold border-2 transition-all min-h-[52px] flex flex-col items-center gap-1",
                form.language === l.code
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                  : "border-gray-200 dark:border-green-900/30 text-gray-500 dark:text-gray-400 hover:border-green-300",
              ].join(" ")}
            >
              <span className="text-lg" aria-hidden="true">{l.flag}</span>
              {l.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Transportador */}
      <Section title="Tipo de Conta" icon={Truck}>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Registar como Transportador</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Apareça disponível para outras pessoas solicitarem entregas.</p>
          </div>
          <button
            role="switch"
            aria-checked={form.isTransporter}
            onClick={() => f("isTransporter", !form.isTransporter)}
            className={`relative w-11 h-6 rounded-full transition-colors ${form.isTransporter ? "bg-green-600" : "bg-gray-200 dark:bg-gray-700"}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${form.isTransporter ? "translate-x-5" : "translate-x-0"}`} />
          </button>
        </div>
        {form.isTransporter && (
          <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/40 rounded-xl px-4 py-3">
            <p className="text-xs font-semibold text-green-700 dark:text-green-400">
              ✓ Está registado como transportador. Outros utilizadores podem solicitar as suas entregas.
            </p>
          </div>
        )}
      </Section>

      {/* Aviso de privacidade */}
      <div className="bg-gray-50 dark:bg-[#0D1F10] rounded-xl px-4 py-3 border border-gray-100 dark:border-green-900/30">
        <p className="text-[11px] text-gray-400 dark:text-gray-500 text-center leading-relaxed">
          🔒 Os seus dados são protegidos conforme a política de privacidade do KUmela.
          Apenas recolhemos o necessário: nome, telefone e localização.
        </p>
      </div>

      <div className="flex justify-end pb-4">
        <PrimaryButton icon={saved ? Check : Save} onClick={handleSave} variant={saved ? "gray" : "green"}>
          {saved ? "Guardado com sucesso!" : "Guardar Alterações"}
        </PrimaryButton>
      </div>
    </div>
  );
}