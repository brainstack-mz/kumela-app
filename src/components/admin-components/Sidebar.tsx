"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Home, Users, BarChartBig, ShoppingBag, BookOpen, 
  LogOut, Package, DollarSign, LayoutDashboard, 
  Truck, Settings, User as UserIcon
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getNavItems = (role: string) => {
    const baseMenu = role === "admin" ? [
      { name: "Painel Admin", href: "/admin/dashboard", icon: LayoutDashboard },
      { name: "Produtos", href: "/admin/dashboard/products", icon: Package },
      { name: "Usuários", href: "/admin/dashboard/users", icon: Users },
      { name: "Transações", href: "/admin/dashboard/transactions", icon: DollarSign },
      { name: "Preços Mercado", href: "/admin/dashboard/price-table", icon: BookOpen },
      { name: "Relatórios", href: "/admin/dashboard/report", icon: BarChartBig },
    ] : [
      { name: "Início", href: "/seller/dashboard", icon: Home },
      { name: "Comprar", href: "/seller/marketplace", icon: ShoppingBag },
      { name: "Meus Produtos", href: "/seller/products", icon: Package },
      { name: "Minhas Vendas", href: "/seller/sales", icon: DollarSign },
      { name: "Entregas", href: "/seller/shipping", icon: Truck },
      { name: "Perfil", href: "/seller/dashboard/profile", icon: UserIcon },
    ];

    // Adiciona Settings para todos
    return [...baseMenu, { name: "Configurações", href: `/${role === 'admin' ? 'admin' : 'seller'}/settings`, icon: Settings }];
  };

  const navItems = user ? getNavItems(user.role) : [];

  if (!user) return null;

  return (
    <>
      {/* Overlay Mobile */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onToggle} 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 mt-16 cursor-pointer"
          />
        )}
      </AnimatePresence>

      <aside 
        className={`fixed top-16 left-0 h-[calc(100vh-64px)] bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 shadow-2xl z-50 transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? "w-64" : "w-20"}
          ${!isOpen && isMobile ? "-translate-x-full" : "translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Navegação Principal - Sem scroll horizontal */}
          <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1 custom-scrollbar">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={isMobile ? onToggle : undefined}
                  className={`flex items-center p-3 rounded-xl transition-all duration-200 cursor-pointer group relative ${
                    active 
                      ? "bg-green-600 text-white shadow-md" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <item.icon size={22} className="flex-shrink-0" />
                  <span className={`ml-3 text-sm font-bold transition-all duration-300 whitespace-nowrap ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none lg:hidden"}`}>
                    {item.name}
                  </span>
                  
                  {/* Tooltip quando fechada */}
                  {!isOpen && !isMobile && (
                    <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-[11px] font-bold rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl z-[60] whitespace-nowrap">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Rodapé: Sair e Perfil */}
          <div className="p-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-900/20">
            
            {/* Botão Sair - Estilo Refinado */}
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full flex items-center p-3 mb-2 rounded-xl text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-all group relative"
            >
              <LogOut size={22} className="flex-shrink-0" />
              <span className={`ml-3 text-sm font-bold transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 lg:hidden"}`}>
                Sair da Conta
              </span>
              {!isOpen && !isMobile && (
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-red-600 text-white text-[11px] font-bold rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl whitespace-nowrap">
                  Sair
                </div>
              )}
            </button>

            {/* Perfil Miniatura */}
            <div className={`flex items-center gap-3 p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 ${!isOpen ? "justify-center" : ""}`}>
              <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
                {user.name?.charAt(0) || user.numero?.charAt(0)}
              </div>
              {isOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate text-gray-900 dark:text-white leading-tight">
                    {user.name || "Usuário"}
                  </p>
                  <p className="text-[10px] uppercase text-green-600 font-extrabold tracking-tighter">
                    {user.role}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Modal de Confirmação (Interativo) */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-xs relative z-10 shadow-2xl text-center border dark:border-gray-800"
            >
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Deseja sair?</h3>
              <div className="flex gap-2 mt-6">
                <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">Voltar</button>
                <button onClick={() => { logout(); router.push("/public/login"); }} className="flex-1 py-2.5 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 cursor-pointer shadow-lg shadow-red-600/20 transition-all">Sair</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}