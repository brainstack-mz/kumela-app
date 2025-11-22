//src/components/admin-components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, BarChartBig, ShoppingBag, Leaf, BookOpen, Truck, LogOut, Package, CheckCircle, Clock, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { USERS } from "@/lib/users"; 

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

const getNavItems = (role: string) => {
  const adminItems = [
    { name: "Início", href: "/admin/dashboard", icon: Home },
    { name: "Gestão de Produtos", href: "/admin/dashboard/products", icon: Package },
    { name: "Gestão de Usuários", href: "/admin/dashboard/users", icon: Users },
    { name: "Transações", href: "/admin/dashboard/transactions", icon: DollarSign },
    { name: "Tabela de Preços", href: "/admin/dashboard/price-table", icon: BookOpen },
    { name: "Relatórios", href: "/admin/dashboard/report", icon: BarChartBig },
  ];
  return role === "admin" ? adminItems : [];
};

if (!user || user.role !== "admin") {
  return null;
}


  const navItems = user ? getNavItems(user.role) : [];
  
  const isLinkActive = (href: string) => {
    if (href === "/admin/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const userNumero = user?.numero || 'Usuário';

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <>
      {isOpen && (
        <div 
          onClick={onToggle} 
          className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-35 transition-opacity duration-300"
          style={{ top: '64px' }}
        ></div>
      )}

      <aside className={`fixed top-16 left-0 h-[calc(100vh-64px)] bg-white dark:bg-gray-800 shadow-2xl z-30 transition-all duration-300
          ${isOpen ? "w-64" : "w-20"}
          ${!isOpen ? "-translate-x-full md:translate-x-0" : "translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          <nav className="p-4 flex-1 pt-4">
            <ul className="space-y-2 font-medium">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={isMobile ? onToggle : undefined}
                    className={`group relative flex items-center p-3 rounded-lg transition-all duration-200 ${
                      isLinkActive(item.href)
                        ? "bg-green-600 text-white shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <item.icon size={20} className="mr-3 flex-shrink-0" />
                    <span className={`transition-opacity duration-300 whitespace-nowrap overflow-hidden ${isOpen ? "opacity-100" : "opacity-0"}`}>
                      {item.name}
                    </span>
                    {!isOpen && (
                      <span className="absolute left-full ml-4 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {item.name}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {user && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`p-4 mt-auto border-t border-gray-300 dark:border-gray-700 transition-all duration-300 ${isOpen ? "w-full" : "w-16 flex justify-center"}`}
            >
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg">
                  {userNumero.charAt(0).toUpperCase()}
                </div>
                {isOpen && (
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white whitespace-nowrap">{userNumero}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{user.role}</p>
                  </div>
                )}
                {isOpen && (
                  <button onClick={logout} className="text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors">
                    <LogOut size={20} />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </aside>
    </>
  );
}