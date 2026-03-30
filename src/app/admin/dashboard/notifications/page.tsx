// ─────────────────────────────────────────────────────────────────────────────
// app/admin/dashboard/notifications/page.tsx — Notificações do Admin
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState, useMemo } from "react";
import {
  Bell, ShoppingBag, Truck, DollarSign, AlertCircle,
  CheckCircle2, Trash2, MailOpen,
} from "lucide-react";
import { SectionHeader, FilterSelect, EmptyState, PrimaryButton } from "@/components/ui";
import type { AppNotification, NotificationType } from "@/types";

// ─────────────────────────────────────────────
// Dados mockados
// ─────────────────────────────────────────────
const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: "1", type: "order",    title: "Nova encomenda recebida",          message: "João comprou 10kg de Tomate Fresco — aguarda confirmação.",           time: "há 5 min",   read: false },
  { id: "2", type: "order",    title: "Produto pendente de aprovação",    message: "Lutyrano Etrice publicou 'Batata Doce' — aguarda revisão.",            time: "há 12 min",  read: false },
  { id: "3", type: "delivery", title: "Entrega confirmada",               message: "Transportador Carlos aceitou entrega #ORD002 para Monapo.",            time: "há 20 min",  read: false },
  { id: "4", type: "payment",  title: "Pagamento recebido",               message: "500 MZN creditados na carteira de João da Horta.",                    time: "há 1 hora",  read: true  },
  { id: "5", type: "system",   title: "Tabela de preços desactualizada",  message: "O preço do Milho não é actualizado há 7 dias.",                       time: "há 2 horas", read: true  },
  { id: "6", type: "order",    title: "Encomenda cancelada",              message: "Lutyrano Etrice cancelou a encomenda de Manga Fresca — reembolso pendente.", time: "há 3 horas", read: true  },
  { id: "7", type: "delivery", title: "Entrega em atraso",                message: "Entrega #ORD003 estava prevista para hoje e ainda não foi confirmada.", time: "há 4 horas", read: false },
  { id: "8", type: "payment",  title: "Comissão registada",               message: "KUmela recebeu 100 MZN de comissão — transacção T004.",               time: "há 5 horas", read: true  },
];

const typeIcon: Record<NotificationType, React.ElementType> = {
  order:    ShoppingBag,
  delivery: Truck,
  payment:  DollarSign,
  system:   AlertCircle,
};

const typeColor: Record<NotificationType, string> = {
  order:    "bg-green-50  text-green-600  dark:bg-green-900/30  dark:text-green-400",
  delivery: "bg-blue-50   text-blue-600   dark:bg-blue-900/20   dark:text-blue-400",
  payment:  "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
  system:   "bg-gray-100  text-gray-500   dark:bg-gray-800      dark:text-gray-400",
};

const TYPE_OPTIONS = [
  { value: "all",      label: "Todos os tipos" },
  { value: "order",    label: "Encomendas"     },
  { value: "delivery", label: "Entregas"       },
  { value: "payment",  label: "Pagamentos"     },
  { value: "system",   label: "Sistema"        },
];

const STATUS_OPTIONS = [
  { value: "all",    label: "Todas"       },
  { value: "unread", label: "Por ler"     },
  { value: "read",   label: "Lidas"       },
];

// ─────────────────────────────────────────────
// Página
// ─────────────────────────────────────────────
export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);
  const [typeFil,       setTypeFil]       = useState("all");
  const [statusFil,     setStatusFil]     = useState("all");

  // Filtrar
  const filtered = useMemo(() => notifications.filter((n) => {
    const matchType   = typeFil   === "all"    || n.type === typeFil;
    const matchStatus = statusFil === "all"    ||
                        (statusFil === "unread" && !n.read) ||
                        (statusFil === "read"   &&  n.read);
    return matchType && matchStatus;
  }), [notifications, typeFil, statusFil]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Marcar como lida
  const markRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  // Marcar todas como lidas
  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  // Remover uma
  const remove = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  // Limpar todas as lidas
  const clearRead = () =>
    setNotifications((prev) => prev.filter((n) => !n.read));

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">

      {/* ── Cabeçalho ── */}
      <SectionHeader
        title="Notificações"
        subtitle={unreadCount > 0 ? `${unreadCount} por ler` : "Tudo em dia"}
      >
        {unreadCount > 0 && (
          <PrimaryButton icon={MailOpen} variant="gray" size="sm" onClick={markAllRead}>
            Marcar tudo como lido
          </PrimaryButton>
        )}
        <PrimaryButton icon={Trash2} variant="gray" size="sm" onClick={clearRead}>
          Limpar lidas
        </PrimaryButton>
      </SectionHeader>

      {/* ── Filtros ── */}
      <div className="flex flex-wrap gap-3">
        <FilterSelect value={typeFil}   onChange={setTypeFil}   options={TYPE_OPTIONS}   label="Tipo" />
        <FilterSelect value={statusFil} onChange={setStatusFil} options={STATUS_OPTIONS} label="Estado" />
      </div>

      {/* ── Lista de notificações ── */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="Sem notificações"
          description="Não há notificações para os filtros seleccionados."
        />
      ) : (
        <div className="space-y-2">
          {filtered.map((notif) => {
            const Icon = typeIcon[notif.type];
            return (
              <div
                key={notif.id}
                className={[
                  "flex items-start gap-4 p-4 rounded-2xl border transition-all",
                  notif.read
                    ? "bg-white dark:bg-[#0D1F10] border-gray-100 dark:border-green-900/20"
                    : "bg-green-50/60 dark:bg-green-900/10 border-green-200 dark:border-green-800/40",
                ].join(" ")}
              >
                {/* Ícone do tipo */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColor[notif.type]}`}>
                  <Icon size={18} aria-hidden="true" />
                </div>

                {/* Conteúdo */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-bold leading-tight ${notif.read ? "text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-white"}`}>
                      {notif.title}
                    </p>
                    {/* Ponto não lido */}
                    {!notif.read && (
                      <span aria-hidden="true" className="w-2.5 h-2.5 bg-green-500 rounded-full flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    {notif.message}
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-1.5">{notif.time}</p>
                </div>

                {/* Acções */}
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  {!notif.read && (
                    <button
                      onClick={() => markRead(notif.id)}
                      aria-label="Marcar como lida"
                      title="Marcar como lida"
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/30 dark:hover:text-green-400 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                    >
                      <CheckCircle2 size={15} />
                    </button>
                  )}
                  <button
                    onClick={() => remove(notif.id)}
                    aria-label="Remover notificação"
                    title="Remover"
                    className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}