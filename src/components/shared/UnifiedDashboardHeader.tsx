"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import { Search, Bell, Settings, User, Menu, LogOut, Moon, Sun, Globe, MessageCircle, ShoppingCart, Leaf } from "lucide-react";
import ChatModal from "@/components/chat/ChatModal";
import Image from "next/image";

interface UnifiedDashboardHeaderProps {
  title: string;
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
  showSidebarToggle?: boolean;
}

export default function UnifiedDashboardHeader({
  title,
  onMenuClick,
  isSidebarOpen = false,
  showSidebarToggle = false,
}: UnifiedDashboardHeaderProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, language, setLanguage } = useTheme();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const languages = [
    { code: "pt" as const, name: "PT", flag: "🇵🇹" },
    { code: "en" as const, name: "EN", flag: "🇬🇧" },
    { code: "emk" as const, name: "EMK", flag: "🇲🇿" },
  ];

  const handleLogout = () => {
    setShowLogoutModal(false);
    logout();
    router.push("/public/login");
  };

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      admin: "Administrador",
      buyer: "Cliente",
      seller: "Vendedor",
      shipper: "Transportador",
    };
    return labels[role] || role;
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 w-full h-16 bg-white dark:bg-gray-800 shadow-md flex items-center justify-between px-3 md:px-4"
      >
        {/* Lado Esquerdo - Logo KUMELA e Menu */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          {showSidebarToggle && onMenuClick && (
            <button
              onClick={onMenuClick}
              className="p-1.5 md:p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
            >
              <Menu size={20} className="md:w-6 md:h-6" />
            </button>
          )}
          
          {/* Logo KUMELA */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Leaf className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-base md:text-lg lg:text-xl font-bold text-gray-800 dark:text-white">
              KUMELA
            </span>
          </div>
          
          {/* Título do Dashboard */}
          <h1 className="text-base md:text-lg lg:text-xl font-bold text-green-600 dark:text-green-400 tracking-wide truncate hidden lg:block ml-2 md:ml-4">
            {title}
          </h1>
        </div>

        {/* Barra de Pesquisa Centralizada */}
        <div className="flex-1 flex justify-center px-2 md:px-4 max-w-2xl mx-auto">
          <div className="relative w-full max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>
        </div>

        {/* Lado Direito - Ícones e Perfil */}
        <div className="flex items-center gap-1 md:gap-2 lg:gap-4 flex-shrink-0">
          {/* Chat */}
          <button
            onClick={() => setShowChat(true)}
            className="p-1.5 md:p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
          >
            <MessageCircle size={18} className="md:w-5 md:h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Notificações */}
          <button className="p-1.5 md:p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
            <Bell size={18} className="md:w-5 md:h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Tema */}
          <button
            onClick={toggleTheme}
            className="p-1.5 md:p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === "dark" ? <Sun size={18} className="md:w-5 md:h-5" /> : <Moon size={18} className="md:w-5 md:h-5" />}
          </button>

          {/* Idioma */}
          <div className="relative">
            <button
              onClick={() => {
                setLanguageDropdownOpen(!languageDropdownOpen);
                setProfileDropdownOpen(false);
              }}
              className="flex items-center gap-1 md:gap-2 p-1.5 md:p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Globe size={18} className="md:w-5 md:h-5" />
              <span className="hidden xl:inline text-xs md:text-sm font-semibold">
                {languages.find((l) => l.code === language)?.flag} {languages.find((l) => l.code === language)?.name}
              </span>
            </button>
            {languageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLanguageDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      language === lang.code ? "bg-green-50 dark:bg-green-900/20" : ""
                    }`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Perfil do Usuário */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileDropdownOpen(!profileDropdownOpen);
                setLanguageDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 md:gap-2 p-1 md:p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">
                {user?.numero?.charAt(0) || "U"}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[100px]">
                  {user?.name || user?.numero || "Usuário"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[100px]">
                  {getRoleLabel(user?.role || "")}
                </p>
              </div>
            </button>
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name || user?.numero}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{getRoleLabel(user?.role || "")}</p>
                </div>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    const role = user?.role;
                    if (role === "seller") {
                      router.push("/seller/dashboard/profile");
                    } else if (role === "buyer") {
                      router.push("/buyer/dashboard/profile");
                    } else if (role === "shipper") {
                      router.push("/shipper/dashboard/profile");
                    } else {
                      router.push("/authenticated/profile");
                    }
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <User size={16} />
                  Perfil
                </button>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    setShowLogoutModal(true);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-red-600"
                >
                  <LogOut size={16} />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modal de Confirmação de Saída */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-80">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Confirmação</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Tem certeza que deseja sair?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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

      <ChatModal isOpen={showChat} onClose={() => setShowChat(false)} />
    </>
  );
}
