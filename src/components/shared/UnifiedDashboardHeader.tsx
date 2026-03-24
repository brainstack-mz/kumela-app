"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import { Bell, User, Menu, Moon, Sun, Globe, MessageCircle, ChevronRight, ChevronLeft } from "lucide-react";
import ChatModal from "@/components/chat/ChatModal";
import Image from "next/image";

interface UnifiedDashboardHeaderProps {
  onMenuClick?: () => void;
  showSidebarToggle?: boolean;
}

export default function UnifiedDashboardHeader({
  onMenuClick,
  showSidebarToggle = false,
}: UnifiedDashboardHeaderProps) {
  const { user } = useAuth();
  const { theme, toggleTheme, language, setLanguage } = useTheme();
  const router = useRouter();
  const [showChat, setShowChat] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  const languages = [
    { code: "pt" as const, name: "Português", short: "PT", flag: "🇵🇹" },
    { code: "en" as const, name: "English", short: "EN", flag: "🇬🇧" },
    { code: "emk" as const, name: "Emakhuwa", short: "EMK", flag: "🇲🇿" },
  ];

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 w-full h-16 bg-white dark:bg-gray-800 shadow-md flex items-center justify-between px-3 md:px-6">
        
        {/* Lado Esquerdo */}
        <div className="flex items-center gap-2 md:gap-4">
          {showSidebarToggle && onMenuClick && (
            <button
              onClick={onMenuClick}
              className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <Menu size={22} />
            </button>
          )}
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
            <Image
              src="/favicon.ico"
              alt="Logotipo"
              width={40}
              height={40}
              className="h-8 w-8 md:h-10 md:w-10 rounded-full"
            />
            <span className="hidden sm:inline text-lg font-bold text-gray-800 dark:text-white">
              KUMELA
            </span>
          </div>
        </div>

        {/* Lado Direito */}
        <div className="flex items-center gap-1 md:gap-3">
          
          {/* Chat */}
          <button
            onClick={() => setShowChat(true)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer relative"
          >
            <MessageCircle size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
          </button>

          {/* Notificações */}
          <button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
          </button>

          {/* Tema */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Perfil e Dropdown */}
          <div className="relative ml-1">
            <button
              onClick={() => {
                setProfileDropdownOpen(!profileDropdownOpen);
                setShowLanguagePicker(false);
              }}
              className="flex items-center cursor-pointer rounded-full focus:outline-none"
            >
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm shadow-sm hover:brightness-110 transition-all">
                {user?.name?.charAt(0) || "A"}
              </div>
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">
                {!showLanguagePicker ? (
                  /* Menu Principal do Perfil */
                  <div className="animate-in fade-in slide-in-from-right-2 duration-200">
                    <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20">
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                        {user?.name || "Admin User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {user?.role || "Admin"}
                      </p>
                    </div>
                    
                    <div className="p-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          router.push(`/${user?.role || 'authenticated'}/dashboard/profile`);
                        }}
                        className="w-full text-left px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors flex items-center gap-3 text-sm text-gray-700 dark:text-gray-200"
                      >
                        <User size={18} className="text-gray-400" />
                        Meu Perfil
                      </button>

                      <button
                        onClick={() => setShowLanguagePicker(true)}
                        className="w-full text-left px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors flex items-center justify-between text-sm text-gray-700 dark:text-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <Globe size={18} className="text-gray-400" />
                          Idioma
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-bold bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-500 uppercase">
                            {currentLang.short}
                          </span>
                          <ChevronRight size={14} className="text-gray-400" />
                        </div>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Menu de Seleção de Idioma */
                  <div className="animate-in fade-in slide-in-from-left-2 duration-200">
                    <div className="flex items-center px-2 py-3 border-b border-gray-100 dark:border-gray-700">
                      <button 
                        onClick={() => setShowLanguagePicker(false)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full cursor-pointer transition-colors"
                      >
                        <ChevronLeft size={18} className="text-gray-500" />
                      </button>
                      <span className="ml-2 text-sm font-bold text-gray-700 dark:text-gray-200">Selecionar Idioma</span>
                    </div>
                    <div className="p-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setShowLanguagePicker(false);
                            setProfileDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors flex items-center justify-between text-sm ${
                            language === lang.code ? "text-green-600 font-medium bg-green-50 dark:bg-green-900/10" : "text-gray-700 dark:text-gray-200"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span>{lang.flag}</span>
                            {lang.name}
                          </div>
                          {language === lang.code && <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <ChatModal isOpen={showChat} onClose={() => setShowChat(false)} />
    </>
  );
}