// ─────────────────────────────────────────────────────────────────────────────
// components/admin/users/UserProfileModal.tsx
// Modal de perfil completo do utilizador — aberto ao clicar em "Ver".
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { UserX, UserCheck, KeyRound } from "lucide-react";
import { AvatarInitials, StatusBadge } from "@/components/ui";
import type { UserExtended } from "./UsersTable";

const roleLabels: Record<string, string> = {
  user:  "Agricultor",
  buyer:   "Comprador",
  shipper: "Transportador",
  admin:   "Admin",
};

interface UserProfileModalProps {
  user:         UserExtended | null;
  onClose:      () => void;
  onSuspend:    (numero: string) => void;
  onActivate:   (numero: string) => void;
  onResetPass:  (numero: string) => void;
}

export default function UserProfileModal({
  user, onClose, onSuspend, onActivate, onResetPass,
}: UserProfileModalProps) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Fundo escuro */}
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Caixa */}
      <div className="relative z-10 bg-white dark:bg-[#0A1A0E] rounded-2xl w-full max-w-sm shadow-2xl border border-green-100 dark:border-green-900/40 overflow-hidden">

        {/* Cabeçalho com gradiente verde */}
        <div className="px-6 pt-6 pb-5 bg-gradient-to-r from-green-600 to-green-700 flex items-center gap-4">
          <AvatarInitials
            name={user.name ?? user.numero}
            size="lg"
            color="bg-white/20"
          />
          <div className="flex-1 min-w-0">
            <p className="font-black text-white text-base truncate">
              {user.name ?? "Sem nome"}
            </p>
            <p className="text-xs text-green-200">{roleLabels[user.role] ?? user.role}</p>
          </div>
          <StatusBadge status={user.active ? "active" : "inactive"} />
        </div>

        {/* Detalhes do perfil */}
        <div className="px-6 py-4 space-y-3">
          {[
            { label: "Telefone",   value: `+258 ${user.numero}` },
            { label: "Província",  value: user.province ?? "—"  },
            { label: "Distrito",   value: user.district ?? "—"  },
            { label: "Registo",    value: user.createdAt        },
          ].map((row) => (
            <div
              key={row.label}
              className="flex justify-between items-center py-2.5 border-b border-gray-50 dark:border-green-900/20"
            >
              <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">{row.label}</span>
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Acções */}
        <div className="px-6 pb-5 pt-1 grid grid-cols-3 gap-2">
          {/* Reset de senha */}
          <button
            onClick={() => { onResetPass(user.numero); onClose(); }}
            className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors min-h-[64px]"
          >
            <KeyRound size={18} aria-hidden="true" />
            <span className="text-[10px] font-bold text-center leading-tight">Reset<br/>Senha</span>
          </button>

          {/* Suspender / Activar */}
          {user.active ? (
            <button
              onClick={() => { onSuspend(user.numero); onClose(); }}
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors min-h-[64px]"
            >
              <UserX size={18} aria-hidden="true" />
              <span className="text-[10px] font-bold">Suspender</span>
            </button>
          ) : (
            <button
              onClick={() => { onActivate(user.numero); onClose(); }}
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors min-h-[64px]"
            >
              <UserCheck size={18} aria-hidden="true" />
              <span className="text-[10px] font-bold">Activar</span>
            </button>
          )}

          {/* Fechar */}
          <button
            onClick={onClose}
            className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors min-h-[64px]"
          >
            <span className="text-lg font-black">✕</span>
            <span className="text-[10px] font-bold">Fechar</span>
          </button>
        </div>
      </div>
    </div>
  );
}