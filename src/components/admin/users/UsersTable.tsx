// ─────────────────────────────────────────────────────────────────────────────
// components/admin/users/UsersTable.tsx
// Tabela de utilizadores com todas as acções do admin.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { Eye, UserX, UserCheck, KeyRound } from "lucide-react";
import { StatusBadge, AvatarInitials } from "@/components/ui";

export type UserExtended = {
  numero:    string;
  password:  string;
  role:      string;
  name?:     string;
  province?: string;
  district?: string;
  active:    boolean;
  createdAt: string;
};

const roleLabels: Record<string, string> = {
  user:  "Agricultor",
  buyer:   "Comprador",
  shipper: "Transportador",
  admin:   "Admin",
};

const roleColors: Record<string, string> = {
  user:  "bg-green-50  text-green-700  dark:bg-green-900/30  dark:text-green-400",
  buyer:   "bg-blue-50   text-blue-700   dark:bg-blue-900/20   dark:text-blue-400",
  shipper: "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
};

interface UsersTableProps {
  users:        UserExtended[];
  onView:       (user: UserExtended) => void;
  onSuspend:    (numero: string) => void;
  onActivate:   (numero: string) => void;
  onResetPass:  (numero: string) => void;
}

export default function UsersTable({
  users, onView, onSuspend, onActivate, onResetPass,
}: UsersTableProps) {
  if (users.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-100 dark:border-green-900/30 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-[#0D1F10] border-b border-gray-100 dark:border-green-900/30">
              {["Utilizador", "Telefone", "Tipo", "Localização", "Registo", "Estado", "Acções"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#0A1A0E] divide-y divide-gray-50 dark:divide-green-900/20">
            {users.map((u, i) => (
              <tr
                key={u.numero}
                className={[
                  "hover:bg-green-50/40 dark:hover:bg-green-900/10 transition-colors",
                  !u.active  ? "opacity-60" : "",
                  i % 2 === 1 ? "bg-gray-50/30 dark:bg-[#0D1F10]/40" : "",
                ].join(" ")}
              >
                {/* Avatar + nome */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <AvatarInitials
                      name={u.name ?? u.numero}
                      size="md"
                      color={u.active ? "bg-green-600" : "bg-gray-400"}
                    />
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-200 text-xs leading-tight">
                        {u.name ?? "Sem nome"}
                      </p>
                      {!u.active && (
                        <span className="text-[10px] font-bold text-red-500">Suspenso</span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Telefone */}
                <td className="px-4 py-3.5 font-mono text-xs text-gray-600 dark:text-gray-300">
                  +258 {u.numero}
                </td>

                {/* Tipo */}
                <td className="px-4 py-3.5">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${roleColors[u.role] ?? ""}`}>
                    {roleLabels[u.role] ?? u.role}
                  </span>
                </td>

                {/* Localização */}
                <td className="px-4 py-3.5 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  📍 {u.district ?? "—"}, {u.province ?? "—"}
                </td>

                {/* Data de registo */}
                <td className="px-4 py-3.5 text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                  {u.createdAt}
                </td>

                {/* Estado */}
                <td className="px-4 py-3.5">
                  <StatusBadge status={u.active ? "active" : "inactive"} />
                </td>

                {/* Acções */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    {/* Ver perfil */}
                    <button
                      onClick={() => onView(u)}
                      aria-label={`Ver perfil de ${u.name}`}
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                    >
                      <Eye size={14} />
                    </button>

                    {/* Reset de senha */}
                    <button
                      onClick={() => onResetPass(u.numero)}
                      aria-label={`Resetar senha de ${u.name}`}
                      title="Resetar senha"
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-900/20 dark:hover:text-purple-400 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                    >
                      <KeyRound size={14} />
                    </button>

                    {/* Suspender / Activar */}
                    {u.active ? (
                      <button
                        onClick={() => onSuspend(u.numero)}
                        aria-label={`Suspender ${u.name}`}
                        className="p-1.5 rounded-lg text-gray-400 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-900/20 dark:hover:text-orange-400 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                      >
                        <UserX size={14} />
                      </button>
                    ) : (
                      <button
                        onClick={() => onActivate(u.numero)}
                        aria-label={`Activar ${u.name}`}
                        className="p-1.5 rounded-lg text-gray-400 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                      >
                        <UserCheck size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}