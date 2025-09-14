// src/components/universal-components/AdminHeader.tsx

"use client";

import { Search, Bell, Settings, User, Menu, ChevronLeft, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

interface AdminHeaderProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

export default function AdminHeader({ onMenuClick, isSidebarOpen }: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    // Apenas corrigi este ponto e vírgula (;)
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userProfileImageUrl = "/assets/default-user-avatar.png";

  const getPageTitle = () => {
    if (pathname.startsWith("/admin/contacts")) return "Gestão de Contactos";
    if (pathname.startsWith("/admin/complaints")) return "Reclamações";
    if (pathname.startsWith("/admin/users")) return "Gestão de Usuários";
    if (pathname.startsWith("/admin/perfil")) return "Meu Perfil";
    return "Painel de Controle";
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    setDropdownOpen(false);
    logout();
    router.push("/admin/login");
  };

  const showMenuButton = user?.role === "Administrador";

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full right-0
        h-18 bg-white shadow-md flex items-center justify-between px-6
        transition-all duration-300 ease-in-out ${
          isSidebarOpen && showMenuButton
            ? "md:left-64 w-[calc(100%-16rem)]"
            : "md:left-20 w-[calc(100%-5rem)]"
        }`}
      >
        <div className="flex items-center gap-4">
          {showMenuButton && (
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isSidebarOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
            </button>
          )}
          <h1 className="text-xl font-bold text-[#3f7fff] tracking-wide hidden md:block">
            {getPageTitle()}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Barra de Pesquisa */}
          <div className="relative flex-1 max-w-sm hidden md:block">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3f7fff] transition-all"
            />
          </div>

          {/* Ícones de Ação e Perfil */}
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              <Bell size={20} />
            </button>
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              <Settings size={20} />
            </button>

            {/* Área do usuário */}
            <div className="relative" ref={dropdownRef}>
              {userProfileImageUrl ? (
                <img
                  src={userProfileImageUrl}
                  alt="Perfil do Usuário"
                  className="w-10 h-10 rounded-full cursor-pointer border border-gray-200"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-full cursor-pointer border border-gray-200 bg-gray-200 flex items-center justify-center text-gray-600"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  <User size={24} />
                </div>
              )}

              {/* Dropdown de Perfil */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-40 bg-white border border-gray-200 rounded-lg shadow-md z-50">
                  <ul>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-t-lg"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Link href="/admin/perfil" className="block">
                        Perfil
                      </Link>
                    </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600 rounded-b-lg">
                      <button
                        onClick={() => {
                          setShowLogoutModal(true);
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left"
                      >
                        Sair
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modal de Confirmação de Saída */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-80">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirmação</h3>
            <p className="text-gray-600 mb-6">Tem certeza que deseja sair?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Não
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}