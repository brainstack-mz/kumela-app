// ─────────────────────────────────────────────────────────────────────────────
// app/admin/dashboard/settings/page.tsx — Configurações do Sistema
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import {
  Settings, Globe, Bell, Shield, Database,
  Check, Save, Volume2,
} from "lucide-react";
import { SectionHeader, PrimaryButton } from "@/components/ui";

// ─────────────────────────────────────────────
// Estado inicial das configurações
// ─────────────────────────────────────────────
const defaultSettings = {
  // Plataforma
  platformName:    "KUmela",
  platformRegion:  "Nampula",
  commissionRate:  10,        // percentagem de comissão por venda

  // Notificações
  notifOrders:     true,
  notifDeliveries: true,
  notifPayments:   true,
  notifSystem:     true,

  // Acesso e segurança
  allowNewUsers:   true,
  requireApproval: true,      // produtos precisam de aprovação antes de publicar

  // Idioma e áudio
  defaultLanguage: "pt",
  audioEnabled:    true,
  audioLanguages:  ["pt", "emk"],
};

type Settings = typeof defaultSettings;

// ─────────────────────────────────────────────
// Sub-componente: Toggle switch reutilizável
// ─────────────────────────────────────────────
function Toggle({
  label, description, value, onChange,
}: { label: string; description?: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-gray-50 dark:border-green-900/20 last:border-0">
      <div className="flex-1 pr-4">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{label}</p>
        {description && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{description}</p>
        )}
      </div>
      <button
        role="switch"
        aria-checked={value}
        aria-label={label}
        onClick={() => onChange(!value)}
        className={[
          "relative w-11 h-6 rounded-full transition-colors flex-shrink-0",
          value ? "bg-green-600" : "bg-gray-200 dark:bg-gray-700",
        ].join(" ")}
      >
        <span className={[
          "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform",
          value ? "translate-x-5" : "translate-x-0",
        ].join(" ")} />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// Sub-componente: Secção de configurações
// ─────────────────────────────────────────────
function SettingsSection({
  icon: Icon, title, children,
}: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-green-900/30">
        <div className="w-8 h-8 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
          <Icon size={16} aria-hidden="true" />
        </div>
        <p className="text-sm font-black text-gray-900 dark:text-white">{title}</p>
      </div>
      <div className="px-5">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Página
// ─────────────────────────────────────────────
export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saved,    setSaved]    = useState(false);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    // Em produção: chamada à API
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-3xl mx-auto">

      {/* ── Cabeçalho ── */}
      <SectionHeader
        title="Configurações"
        subtitle="Ajustes gerais da plataforma KUmela"
      >
        <PrimaryButton
          icon={saved ? Check : Save}
          size="sm"
          onClick={handleSave}
          variant={saved ? "gray" : "green"}
        >
          {saved ? "Guardado!" : "Guardar Alterações"}
        </PrimaryButton>
      </SectionHeader>

      {/* ── Configurações da plataforma ── */}
      <SettingsSection icon={Settings} title="Plataforma">
        <div className="py-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
                Nome da Plataforma
              </label>
              <input
                type="text"
                value={settings.platformName}
                onChange={(e) => update("platformName", e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-[#0A1A0E] border border-gray-200 dark:border-green-900/40 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
                Região de Operação
              </label>
              <input
                type="text"
                value={settings.platformRegion}
                onChange={(e) => update("platformRegion", e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-[#0A1A0E] border border-gray-200 dark:border-green-900/40 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
              Taxa de Comissão por Venda: <span className="text-green-600 dark:text-green-400">{settings.commissionRate}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={30}
              value={settings.commissionRate}
              onChange={(e) => update("commissionRate", Number(e.target.value))}
              className="w-full accent-green-600"
            />
            <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 mt-1">
              <span>0%</span><span>15%</span><span>30%</span>
            </div>
          </div>
        </div>
      </SettingsSection>

      {/* ── Notificações ── */}
      <SettingsSection icon={Bell} title="Notificações">
        <Toggle label="Novas Encomendas"    description="Notificar quando um comprador fizer uma encomenda" value={settings.notifOrders}     onChange={(v) => update("notifOrders",     v)} />
        <Toggle label="Actualizações de Entrega" description="Notificar sobre estados de entregas"          value={settings.notifDeliveries} onChange={(v) => update("notifDeliveries", v)} />
        <Toggle label="Pagamentos"          description="Notificar quando um pagamento for processado"      value={settings.notifPayments}   onChange={(v) => update("notifPayments",   v)} />
        <Toggle label="Alertas do Sistema"  description="Notificações sobre erros ou eventos do sistema"   value={settings.notifSystem}     onChange={(v) => update("notifSystem",     v)} />
      </SettingsSection>

      {/* ── Acesso e segurança ── */}
      <SettingsSection icon={Shield} title="Acesso e Segurança">
        <Toggle label="Permitir Novos Registos"  description="Se desactivado, nenhum utilizador novo poderá registar-se" value={settings.allowNewUsers}   onChange={(v) => update("allowNewUsers",   v)} />
        <Toggle label="Aprovação de Produtos"     description="Produtos publicados pelos agricultores precisam de aprovação do admin antes de aparecer no mercado" value={settings.requireApproval} onChange={(v) => update("requireApproval", v)} />
      </SettingsSection>

      {/* ── Idioma e áudio ── */}
      <SettingsSection icon={Volume2} title="Idioma e Áudio">
        <div className="py-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-2">
              Idioma Principal
            </label>
            <div className="flex gap-2">
              {[
                { code: "pt",  label: "Português 🇲🇿" },
                { code: "emk", label: "Emakhuwa 🇲🇿"  },
                { code: "en",  label: "English 🇬🇧"    },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => update("defaultLanguage", lang.code)}
                  className={[
                    "px-4 py-2.5 rounded-xl text-xs font-bold border-2 transition-all min-h-[44px]",
                    settings.defaultLanguage === lang.code
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                      : "border-gray-200 dark:border-green-900/30 text-gray-500 dark:text-gray-400 hover:border-green-300",
                  ].join(" ")}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
          <Toggle
            label="Áudio de Acessibilidade"
            description="Permitir leitura em voz alta nas telas (PT + Emakhuwa)"
            value={settings.audioEnabled}
            onChange={(v) => update("audioEnabled", v)}
          />
        </div>
      </SettingsSection>

      {/* ── Info da plataforma ── */}
      <SettingsSection icon={Database} title="Informação do Sistema">
        <div className="py-4 space-y-2">
          {[
            { label: "Versão",          value: "KUmela v1.0"                 },
            { label: "Região",          value: "Nampula, Moçambique"          },
            { label: "Base de dados",   value: "Dados locais (mock)"          },
            { label: "Canais",          value: "Web · WhatsApp · USSD (planeado)" },
            { label: "Conformidade",    value: "LGPD-MZ · Aviso de privacidade activo" },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-green-900/20 last:border-0">
              <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">{row.label}</span>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{row.value}</span>
            </div>
          ))}
        </div>
      </SettingsSection>

      {/* Botão de guardar no rodapé */}
      <div className="flex justify-end">
        <PrimaryButton
          icon={saved ? Check : Save}
          onClick={handleSave}
          variant={saved ? "gray" : "green"}
        >
          {saved ? "Guardado com sucesso!" : "Guardar Todas as Alterações"}
        </PrimaryButton>
      </div>
    </div>
  );
}