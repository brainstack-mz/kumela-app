"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  ShoppingBag,
  Package,
  ClipboardList,
  Truck,
  MessageCircle,
  CreditCard,
  Star,
  User as UserIcon,
  LayoutDashboard,
  Users,
  DollarSign,
  BookOpen,
  BarChartBig,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────
interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number; // número de notificações no item
}

// ─────────────────────────────────────────────
// Rotas do Admin
// ─────────────────────────────────────────────
const adminNavItems: NavItem[] = [
  { name: "Painel Geral", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Produtos", href: "/admin/dashboard/products", icon: Package },
  { name: "Utilizadores", href: "/admin/dashboard/users", icon: Users },
  {
    name: "Transações",
    href: "/admin/dashboard/transactions",
    icon: DollarSign,
  },
  {
    name: "Preços Mercado",
    href: "/admin/dashboard/market-prices",
    icon: BookOpen,
  },
  { name: "Relatórios", href: "/admin/dashboard/reports", icon: BarChartBig },
  {
    name: "Notificações",
    href: "/admin/dashboard/notifications",
    icon: Bell,
    badge: 3,
  },
  {
    name: "Mensagens",
    href: "/user/dashboard/messages",
    icon: MessageCircle,
    badge: 5,
  },
  { name: "Perfil", href: "/user/dashboard/profile", icon: UserIcon },

  { name: "Configurações", href: "/admin/dashboard/settings", icon: Settings },

];

// ─────────────────────────────────────────────
// Rotas do Utilizador Geral (agricultor/comprador/transportador)
// ─────────────────────────────────────────────
const userNavItems: NavItem[] = [
  { name: "Início", href: "/user/dashboard", icon: Home },
  { name: "Comprar", href: "/user/dashboard/market", icon: ShoppingBag },
  { name: "Meus Produtos", href: "/user/dashboard/my-products", icon: Package },
  {
    name: "Minhas Encomendas",
    href: "/user/dashboard/my-orders",
    icon: ClipboardList,
    badge: 2,
  },
  { name: "Entregas", href: "/user/dashboard/deliveries", icon: Truck },
  {
    name: "Mensagens",
    href: "/user/dashboard/messages",
    icon: MessageCircle,
    badge: 5,
  },
  { name: "Pagamentos", href: "/user/dashboard/payments", icon: CreditCard },
  { name: "Avaliações", href: "/user/dashboard/reviews", icon: Star },
  { name: "Perfil", href: "/user/dashboard/profile", icon: UserIcon },
];

// ─────────────────────────────────────────────
// Label de acessibilidade por role
// ─────────────────────────────────────────────
const roleLabel: Record<string, string> = {
  admin: "Administrador",
  user: "Agricultor",
  buyer: "Comprador",
  transporter: "Transportador",
};

// ─────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────
export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Detectar tamanho do ecrã
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!user) return null;

  // Seleccionar menu consoante o role
  const navItems = user.role === "admin" ? adminNavItems : userNavItems;

  // ─────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────
  return (
    <>
      {/* Overlay escuro em mobile quando o menu está aberto */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 mt-16 cursor-pointer"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar principal ── */}
      <aside
        aria-label="Menu de navegação principal"
        className={[
          // Posição e dimensões
          "fixed top-16 left-0 h-[calc(100vh-64px)] z-50",
          "bg-white dark:bg-[#0A1A0E]",
          "border-r border-green-100 dark:border-green-900/40",
          "shadow-[4px_0_24px_rgba(0,0,0,0.06)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.4)]",
          "transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "w-64" : "w-[72px]",
          // Esconder fora do ecrã em mobile quando fechado
          !isOpen && isMobile ? "-translate-x-full" : "translate-x-0",
        ].join(" ")}
      >
        <div className="flex flex-col h-full">
          {/* ── Navegação principal ── */}
          <nav
            role="navigation"
            aria-label="Itens do menu"
            className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2.5 space-y-0.5 scrollbar-thin scrollbar-thumb-green-200 dark:scrollbar-thumb-green-900"
          >
            {navItems.map((item) => {
  // 1. Verificamos se o item atual é o link de "Início" (Dashboard principal)
  const isHomeLink = item.href === "/user/dashboard" || item.href === "/admin/dashboard";

  // 2. Lógica de Ativação:
  // - Se for o link de Início, ele SÓ fica ativo se o caminho for EXATAMENTE igual (Exact Match).
  // - Se for qualquer outro link, ele usa o startsWith para incluir sub-rotas.
  const isActive = isHomeLink 
    ? pathname === item.href 
    : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
      href={item.href}
                  onClick={isMobile ? onToggle : undefined}
                  aria-label={item.name}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "group relative flex items-center rounded-xl transition-all duration-200",
                    "min-h-[48px] px-3", // mínimo 48px — acessibilidade
                    isActive
                      ? "bg-green-600 text-white shadow-md shadow-green-600/25"
                      : "text-gray-500 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-300",
                  ].join(" ")}
                >
                  {/* Ícone */}
                  <item.icon
                    size={20}
                    className="flex-shrink-0"
                    aria-hidden="true"
                  />

                  {/* Badge no ícone (quando sidebar fechado) */}
                  {!isOpen && item.badge && item.badge > 0 && (
                    <span
                      aria-label={`${item.badge} notificações`}
                      className="absolute top-2 left-7 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Nome do item — animado */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        transition={{ duration: 0.15 }}
                        className="ml-3 text-sm font-semibold whitespace-nowrap flex-1"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Badge no texto (quando sidebar aberto) */}
                  {isOpen && item.badge && item.badge > 0 && (
                    <span
                      aria-label={`${item.badge} notificações`}
                      className={[
                        "ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center",
                        isActive
                          ? "bg-white/25 text-white"
                          : "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
                      ].join(" ")}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Tooltip quando sidebar fechado (desktop) */}
                  {!isOpen && !isMobile && (
                    <div
                      role="tooltip"
                      className={[
                        "absolute left-full ml-3 z-[70]",
                        "px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap",
                        "bg-green-800 dark:bg-green-700 text-white",
                        "shadow-lg opacity-0 pointer-events-none",
                        "group-hover:opacity-100 transition-opacity duration-150",
                        "flex items-center gap-2",
                      ].join(" ")}
                    >
                      {item.name}
                      {item.badge && item.badge > 0 ? (
                        <span className="bg-red-500 text-white text-[9px] font-bold px-1 rounded-full">
                          {item.badge}
                        </span>
                      ) : null}
                      {/* Seta do tooltip */}
                      <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-green-800 dark:border-r-green-700" />
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Rodapé: logout + perfil ── */}
          <div className="p-2.5 border-t border-green-100 dark:border-green-900/40">
            {/* Botão Sair */}
            <button
              onClick={() => setShowLogoutConfirm(true)}
              aria-label="Sair da conta"
              className={[
                "group relative w-full flex items-center min-h-[48px] px-3 mb-2 rounded-xl",
                "text-red-500 dark:text-red-400",
                "hover:bg-red-50 dark:hover:bg-red-900/20",
                "transition-all duration-200",
              ].join(" ")}
            >
              <LogOut size={20} className="flex-shrink-0" aria-hidden="true" />

              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.15 }}
                    className="ml-3 text-sm font-semibold whitespace-nowrap"
                  >
                    Sair da Conta
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Tooltip de sair */}
              {!isOpen && !isMobile && (
                <div className="absolute left-full ml-3 z-[70] px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap bg-red-600 text-white shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
                  Sair
                  <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-red-600" />
                </div>
              )}
            </button>

            {/* Cartão de perfil do utilizador */}
            <div
              className={[
                "flex items-center gap-3 p-2.5 rounded-xl",
                "bg-green-50 dark:bg-green-900/20",
                "border border-green-100 dark:border-green-900/40",
                !isOpen && "justify-center",
              ].join(" ")}
            >
              {/* Avatar com inicial */}
              <div
                aria-label={`Avatar de ${user.name || "utilizador"}`}
                className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-black text-sm flex-shrink-0 shadow-sm"
              >
                {(
                  user.name?.charAt(0) ||
                  user.numero?.charAt(0) ||
                  "U"
                ).toUpperCase()}
              </div>

              {/* Nome e role — apenas com sidebar aberto */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.15 }}
                    className="flex-1 min-w-0"
                  >
                    <p className="text-sm font-bold truncate text-gray-900 dark:text-white leading-tight">
                      {user.name || "Utilizador"}
                    </p>
                    <p className="text-[10px] uppercase text-green-600 dark:text-green-400 font-extrabold tracking-wider">
                      {roleLabel[user.role] || user.role}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Modal de confirmação de logout ── */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            {/* Fundo escuro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Caixa de diálogo */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 8 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white dark:bg-[#0A1A0E] rounded-2xl p-6 w-full max-w-[300px] relative z-10 shadow-2xl text-center border border-green-100 dark:border-green-900/40"
            >
              {/* Ícone de aviso */}
              <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <LogOut size={26} aria-hidden="true" />
              </div>

              <h3
                id="logout-title"
                className="text-lg font-black text-gray-900 dark:text-white mb-1"
              >
                Deseja sair?
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Vai sair da sua conta KUmela.
              </p>

              {/* Botões de acção */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors min-h-[48px]"
                >
                  Voltar
                </button>
                <button
                  onClick={() => {
                    logout();
                    router.push("/public/login");
                  }}
                  className="flex-1 py-3 rounded-xl font-bold text-sm bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all min-h-[48px]"
                >
                  Sair
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
