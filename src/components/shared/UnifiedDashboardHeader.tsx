"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import {
  Bell,
  User,
  Menu,
  Moon,
  Sun,
  Globe,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  X,
  CheckCircle2,
  Truck,
  ShoppingBag,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";

// ─────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────
interface DashboardHeaderProps {
  onMenuClick?: () => void;
  showSidebarToggle?: boolean;
}

interface Notification {
  id: string;
  type: "order" | "delivery" | "payment" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// ─────────────────────────────────────────────
// Dados de exemplo para notificações
// (em produção viriam da API)
// ─────────────────────────────────────────────
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "Nova encomenda",
    message: "João comprou 10kg de Tomate",
    time: "há 5 min",
    read: false,
  },
  {
    id: "2",
    type: "delivery",
    title: "Entrega confirmada",
    message: "Transportador aceitou a sua entrega",
    time: "há 20 min",
    read: false,
  },
  {
    id: "3",
    type: "payment",
    title: "Pagamento recebido",
    message: "500 MZN creditados na sua carteira",
    time: "há 1 hora",
    read: false,
  },
  {
    id: "4",
    type: "system",
    title: "Preço actualizado",
    message: "O preço do Milho foi revisto pelo admin",
    time: "há 3 horas",
    read: true,
  },
];

// Mapeamento de ícone por tipo de notificação
const notifIcon: Record<Notification["type"], React.ElementType> = {
  order:    ShoppingBag,
  delivery: Truck,
  payment:  DollarSign,
  system:   AlertCircle,
};

// Cor de fundo do ícone por tipo
const notifColor: Record<Notification["type"], string> = {
  order:    "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400",
  delivery: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
  payment:  "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400",
  system:   "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
};

// ─────────────────────────────────────────────
// Idiomas disponíveis
// ─────────────────────────────────────────────
const languages = [
  { code: "pt"  as const, name: "Português", short: "PT",  flag: "🇲🇿" },
  { code: "emk" as const, name: "Emakhuwa",  short: "EMK", flag: "🇲🇿" },
  { code: "en"  as const, name: "English",   short: "EN",  flag: "🇬🇧" },
] as const;

type LangCode = (typeof languages)[number]["code"];

// ─────────────────────────────────────────────
// Rota base dos áudios pré-gravados
// Substituir pelo caminho real quando disponível
// ─────────────────────────────────────────────
const AUDIO_BASE_PATH = "/audio"; // ex: /public/audio → acessível em /audio/...

// Ficheiros de áudio por idioma e contexto
// Substituir os nomes dos ficheiros pelos reais após gravação
const audioFiles: Record<LangCode, string> = {
  pt:  `${AUDIO_BASE_PATH}/pt/boas-vindas.mp3`,
  emk: `${AUDIO_BASE_PATH}/emk/boas-vindas.mp3`,
  en:  `${AUDIO_BASE_PATH}/en/welcome.mp3`,
};

// ─────────────────────────────────────────────
// Componente principal do cabeçalho
// ─────────────────────────────────────────────
export default function DashboardHeader({
  onMenuClick,
  showSidebarToggle = false,
}: DashboardHeaderProps) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  // Estados dos painéis
  const [notifOpen,      setNotifOpen]      = useState(false);
  const [profileOpen,    setProfileOpen]    = useState(false);
  const [langPickerOpen, setLangPickerOpen] = useState(false);
  const [audioEnabled,   setAudioEnabled]   = useState(false);
  const [language,       setLanguage]       = useState<LangCode>("pt");
  const [notifications,  setNotifications]  = useState(mockNotifications);

  // Referência do elemento <audio> para controlar reprodução
  const audioRef   = useRef<HTMLAudioElement | null>(null);

  // Referências para fechar dropdowns ao clicar fora
  const notifRef   = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Fechar dropdowns ao clicar fora deles
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
        setLangPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Parar áudio quando o componente é desmontado
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  // Contagem de notificações por ler
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Marcar todas como lidas
  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  // Marcar uma como lida
  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  // Idioma actual
  const currentLang = languages.find((l) => l.code === language) || languages[0];

  // Reproduzir / parar o áudio pré-gravado de boas-vindas
  const handleAudio = () => {
    if (audioEnabled) {
      // Parar reprodução
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
      setAudioEnabled(false);
      return;
    }

    // Iniciar reprodução com o ficheiro do idioma seleccionado
    const src = audioFiles[language];
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
    } else {
      audioRef.current.src = src;
    }

    audioRef.current.onended = () => setAudioEnabled(false);
    audioRef.current.onerror = () => {
      // Fallback para Web Speech API caso o ficheiro não esteja disponível
      if ("speechSynthesis" in window) {
        const msg = `Bem-vindo ao KUmela, ${user?.name || "utilizador"}.`;
        const utt = new SpeechSynthesisUtterance(msg);
        utt.lang = "pt-PT";
        utt.onend = () => setAudioEnabled(false);
        window.speechSynthesis.speak(utt);
      } else {
        setAudioEnabled(false);
      }
    };

    audioRef.current.play().catch(() => setAudioEnabled(false));
    setAudioEnabled(true);
  };

  // ─────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────
  return (
    <header
      role="banner"
      className={[
        "fixed top-0 left-0 right-0 z-40 h-16",
        "bg-white dark:bg-[#0A1A0E]",
        "border-b border-green-100 dark:border-green-900/40",
        "shadow-sm",
        "flex items-center justify-between px-4 md:px-6",
      ].join(" ")}
    >
      {/* ── Lado esquerdo: botão menu + logo ── */}
      <div className="flex items-center gap-3">

        {/* Botão de abrir/fechar sidebar */}
        {showSidebarToggle && onMenuClick && (
          <button
            onClick={onMenuClick}
            aria-label="Abrir ou fechar menu lateral"
            className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-300 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        )}

        {/* Logo — usa o favicon.ico como logotipo da KUmela */}
        <button
          onClick={() => router.push("/")}
          aria-label="Ir para a página inicial do KUmela"
          className="flex items-center gap-2.5 group"
        >
          {/* Logotipo: favicon.ico da KUmela */}
          <Image
            src="/favicon.ico"
            alt="Logotipo KUmela"
            width={36}
            height={36}
            className="rounded-xl shadow-sm group-hover:shadow-md transition-shadow"
            priority
          />

          {/* Nome e localização — visível em ecrãs sm+ */}
          <div className="hidden sm:block">
            <p className="text-base font-black text-gray-900 dark:text-white leading-none">
              KUmela
            </p>
            <p className="text-[10px] font-medium text-green-600 dark:text-green-400 leading-none mt-0.5">
              Nampula · Moçambique
            </p>
          </div>
        </button>
      </div>

      {/* ── Lado direito: acções ── */}
      <div className="flex items-center gap-1 md:gap-2">

        {/* ── Botão de áudio (acessibilidade) ── */}
        <button
          onClick={handleAudio}
          aria-label={audioEnabled ? "Parar áudio" : "Ouvir boas-vindas em voz alta"}
          title={audioEnabled ? "Parar áudio" : "Ouvir em voz alta (PT / Emakhuwa)"}
          className={[
            "relative p-2.5 rounded-xl transition-all min-w-[44px] min-h-[44px] flex items-center justify-center",
            audioEnabled
              ? "bg-green-600 text-white shadow-sm shadow-green-600/30 animate-pulse"
              : "text-gray-500 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-300",
          ].join(" ")}
        >
          {audioEnabled
            ? <Volume2 size={19} aria-hidden="true" />
            : <VolumeX size={19} aria-hidden="true" />
          }
        </button>

        {/* ── Botão de modo escuro/claro ── */}
        <button
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"}
          className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-300 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          {theme === "dark"
            ? <Sun  size={19} aria-hidden="true" />
            : <Moon size={19} aria-hidden="true" />
          }
        </button>

        {/* ── Painel de Notificações ── */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            aria-label={`Notificações — ${unreadCount} por ler`}
            aria-expanded={notifOpen}
            className="relative p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-300 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <Bell size={19} aria-hidden="true" />
            {/* Badge de contagem */}
            {unreadCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-[#0A1A0E]"
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown de notificações */}
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0D1F10] border border-green-100 dark:border-green-900/40 rounded-2xl shadow-xl z-50 overflow-hidden">
              {/* Cabeçalho do painel */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-green-100 dark:border-green-900/30">
                <div>
                  <p className="text-sm font-black text-gray-900 dark:text-white">Notificações</p>
                  {unreadCount > 0 && (
                    <p className="text-xs text-gray-400 dark:text-gray-500">{unreadCount} por ler</p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs font-semibold text-green-600 hover:text-green-700 px-2 py-1 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
                    >
                      Marcar tudo
                    </button>
                  )}
                  <button
                    onClick={() => setNotifOpen(false)}
                    aria-label="Fechar notificações"
                    className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Lista de notificações */}
              <div className="max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center">
                    <CheckCircle2 size={32} className="mx-auto text-green-300 dark:text-green-700 mb-2" aria-hidden="true" />
                    <p className="text-sm text-gray-400 dark:text-gray-500">Sem notificações</p>
                  </div>
                ) : (
                  notifications.map((notif) => {
                    const Icon = notifIcon[notif.type];
                    return (
                      <button
                        key={notif.id}
                        onClick={() => markRead(notif.id)}
                        className={[
                          "w-full flex items-start gap-3 px-4 py-3 text-left transition-colors",
                          notif.read
                            ? "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                            : "bg-green-50/60 dark:bg-green-900/10 hover:bg-green-50 dark:hover:bg-green-900/20",
                        ].join(" ")}
                      >
                        {/* Ícone colorido por tipo */}
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${notifColor[notif.type]}`}>
                          <Icon size={16} aria-hidden="true" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className={`text-xs font-bold truncate ${notif.read ? "text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-white"}`}>
                              {notif.title}
                            </p>
                            {/* Ponto verde = não lido */}
                            {!notif.read && (
                              <span aria-hidden="true" className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                            {notif.message}
                          </p>
                          <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-1">
                            {notif.time}
                          </p>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Rodapé — ver todas */}
              <div className="border-t border-green-100 dark:border-green-900/30 px-4 py-2.5">
                <button
                  onClick={() => {
                    setNotifOpen(false);
                    router.push("/admin/dashboard/notificacoes");
                  }}
                  className="w-full text-center text-xs font-semibold text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 py-1"
                >
                  Ver todas as notificações →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Dropdown de Perfil ── */}
        <div className="relative ml-1" ref={profileRef}>
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            aria-label={`Perfil de ${user?.name || "utilizador"}`}
            aria-expanded={profileOpen}
            className="flex items-center gap-2 pl-1 pr-2 py-1.5 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/30 transition-all group"
          >
            {/* Avatar com inicial do nome */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-green-700 text-white flex items-center justify-center font-black text-sm shadow-sm group-hover:shadow-md transition-all">
              {(user?.name?.charAt(0) || "U").toUpperCase()}
            </div>
            {/* Nome e role — visível em ecrãs md+ */}
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-gray-800 dark:text-white leading-none truncate max-w-[100px]">
                {user?.name || "Utilizador"}
              </p>
              <p className="text-[10px] text-green-600 dark:text-green-400 font-semibold leading-none mt-0.5 capitalize">
                {user?.role || "utilizador"}
              </p>
            </div>
          </button>

          {/* Menu dropdown do perfil */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#0D1F10] border border-green-100 dark:border-green-900/40 rounded-2xl shadow-xl z-50 overflow-hidden">

              {!langPickerOpen ? (
                /* ── Vista principal do perfil ── */
                <div>
                  {/* Cabeçalho com gradiente verde */}
                  <div className="px-4 py-4 bg-gradient-to-r from-green-600 to-green-700">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center font-black">
                        {(user?.name?.charAt(0) || "U").toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-black text-white">
                          {user?.name || "Utilizador"}
                        </p>
                        <p className="text-[11px] text-green-200 capitalize">
                          {user?.role || "utilizador"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Opções */}
                  <div className="p-1.5 space-y-0.5">

                    {/* Ir para o perfil */}
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        router.push(
                          user?.role === "admin"
                            ? "/admin/dashboard/configuracoes"
                            : "/dashboard/perfil"
                        );
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-300 transition-colors min-h-[44px]"
                    >
                      <User size={17} className="text-gray-400" aria-hidden="true" />
                      Meu Perfil
                    </button>

                    {/* Selector de idioma */}
                    <button
                      onClick={() => setLangPickerOpen(true)}
                      className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-300 transition-colors min-h-[44px]"
                    >
                      <div className="flex items-center gap-3">
                        <Globe size={17} className="text-gray-400" aria-hidden="true" />
                        Idioma
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-black bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                          {currentLang.short}
                        </span>
                        <ChevronRight size={14} className="text-gray-400" aria-hidden="true" />
                      </div>
                    </button>

                    {/* Tema claro/escuro */}
                    <button
                      onClick={() => { toggleTheme(); setProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-300 transition-colors min-h-[44px]"
                    >
                      {theme === "dark"
                        ? <Sun  size={17} className="text-gray-400" aria-hidden="true" />
                        : <Moon size={17} className="text-gray-400" aria-hidden="true" />
                      }
                      {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
                    </button>
                  </div>

                  {/* Versão */}
                  <div className="px-4 py-2 border-t border-green-100 dark:border-green-900/30">
                    <p className="text-[10px] text-gray-400 dark:text-gray-600 text-center">
                      KUmela v1.0 · Nampula, Moçambique
                    </p>
                  </div>
                </div>

              ) : (
                /* ── Vista de selecção de idioma ── */
                <div>
                  {/* Cabeçalho com botão de retorno */}
                  <div className="flex items-center px-2 py-3 border-b border-green-100 dark:border-green-900/30">
                    <button
                      onClick={() => setLangPickerOpen(false)}
                      aria-label="Voltar ao menu do perfil"
                      className="p-1.5 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-xl transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                    >
                      <ChevronLeft size={17} className="text-gray-500" aria-hidden="true" />
                    </button>
                    <span className="ml-2 text-sm font-black text-gray-800 dark:text-white">
                      Escolher Idioma
                    </span>
                  </div>

                  {/* Lista de idiomas */}
                  <div className="p-1.5 space-y-0.5">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangPickerOpen(false);
                          setProfileOpen(false);
                        }}
                        aria-pressed={language === lang.code}
                        className={[
                          "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors min-h-[48px]",
                          language === lang.code
                            ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 font-bold"
                            : "text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20",
                        ].join(" ")}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg" aria-hidden="true">{lang.flag}</span>
                          <div className="text-left">
                            <p className="text-sm font-semibold leading-none">{lang.name}</p>
                            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                              {lang.short}
                            </p>
                          </div>
                        </div>
                        {/* Indicador de seleccionado */}
                        {language === lang.code && (
                          <CheckCircle2 size={16} className="text-green-600 dark:text-green-400" aria-hidden="true" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Nota sobre Emakhuwa */}
                  <div className="px-4 pb-3">
                    <p className="text-[10px] text-gray-400 dark:text-gray-600 text-center leading-relaxed">
                      Emakhuwa: áudio disponível em clips pré-gravados
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}