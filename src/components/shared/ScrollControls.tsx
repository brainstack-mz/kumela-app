'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, ShoppingCart, User, MoreVertical, Eye, EyeOff, 
  Volume2, VolumeX, ArrowUp, Globe, Headset,
  LucideIcon // Importação necessária para a tipagem
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

// Definição dos tipos aceitos para as línguas
type Language = "pt" | "em-MZ";

const audioFiles: Record<Language, string> = {
  "pt": "/audio/Recording_7.m4a",
  "em-MZ": "/audio/Recording_5.m4a",
};

const ScrollControls = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount } = useCart();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTextEnlarged, setIsTextEnlarged] = useState(false);
  const [language, setLanguage] = useState<Language>("pt");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    
    const savedLang = localStorage.getItem("kumela-lang") as Language;
    if (savedLang) setLanguage(savedLang);

    const handleLangChange = () => {
      const newLang = localStorage.getItem("kumela-lang") as Language;
      setLanguage(newLang || "pt");
      setIsPlaying(false);
      if (audioRef.current) audioRef.current.pause();
    };

    window.addEventListener("languageChange", handleLangChange);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("languageChange", handleLangChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = isTextEnlarged ? "1.15rem" : "";
    if (isTextEnlarged) document.body.classList.add("text-enlarged");
    else document.body.classList.remove("text-enlarged");
  }, [isTextEnlarged]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.src = audioFiles[language];
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as Language;
    setLanguage(lang);
    localStorage.setItem("kumela-lang", lang);
    window.dispatchEvent(new Event("languageChange"));
    setIsPlaying(false);
    if (audioRef.current) audioRef.current.pause();
    setIsMenuOpen(false);
  };

  const navItemClass = (path: string) => `
    flex flex-col items-center justify-center flex-1 gap-1 transition-all duration-300 active:scale-95
    ${pathname === path ? "text-green-700 scale-105" : "text-slate-400"}
  `;

  return (
    <>
      <audio ref={audioRef} src={audioFiles[language]} preload="auto" onEnded={() => setIsPlaying(false)} />

      {/* --- CONTROLES FLUTUANTES DESKTOP --- */}
      <div className="hidden md:flex flex-col gap-3 fixed bottom-10 right-10 z-[60]">
        <motion.button
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={toggleAudio}
          className={`p-4 rounded-2xl shadow-2xl border transition-all ${
            isPlaying ? "bg-green-600 text-white border-green-500" : "bg-white text-gray-700 border-gray-100 hover:bg-gray-50"
          }`}
        >
          {isPlaying ? <VolumeX size={24} strokeWidth={2.5} /> : <Volume2 size={24} strokeWidth={2.5} />}
        </motion.button>

        <AnimatePresence>
          {isScrolled && isHomePage && (
            <motion.button
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-green-700 p-4 border border-gray-100 rounded-2xl shadow-2xl hover:bg-green-700 hover:text-white transition-all flex items-center justify-center"
            >
              <ArrowUp size={24} strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* --- MOBILE NAV BAR --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 pb-safe shadow-lg">
        <div className="flex justify-around items-center h-16 px-2 relative">
          
          <button onClick={() => router.push("/")} className={navItemClass("/")}>
            <Home size={20} strokeWidth={pathname === "/" ? 2.5 : 2} />
            <span className="text-[10px] font-bold">Início</span>
          </button>

          <button onClick={() => router.push("/cart")} className={navItemClass("/cart")}>
            <div className="relative">
              <ShoppingCart size={20} strokeWidth={pathname === "/cart" ? 2.5 : 2} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[8px] font-black px-1 rounded-full border border-white">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold">Carrinho</span>
          </button>

          <button onClick={() => router.push("/public/login")} className={navItemClass("/public/login")}>
            <User size={20} strokeWidth={pathname === "/public/login" ? 2.5 : 2} />
            <span className="text-[10px] font-bold">Conta</span>
          </button>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${navItemClass("")} ${isMenuOpen ? "text-green-700" : ""}`}>
            <MoreVertical size={20} />
            <span className="text-[10px] font-bold">Mais</span>
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                  onClick={() => setIsMenuOpen(false)} 
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10" 
                />
                <motion.div 
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} 
                  className="absolute bottom-20 right-4 w-60 bg-white dark:bg-slate-800 rounded-[24px] shadow-2xl border border-slate-100 dark:border-slate-700 p-2 z-70"
                >
                  <div className="relative mb-2 p-1">
                    <Globe size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <select 
                      value={language} 
                      onChange={handleLanguageChange} 
                      className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl py-2.5 pl-9 pr-4 text-xs font-bold appearance-none outline-none dark:text-white"
                    >
                      <option value="pt">Português</option>
                      <option value="em-MZ">Macua (EM)</option>
                    </select>
                  </div>

                  <div className="h-[1px] bg-slate-50 dark:bg-slate-700 my-1" />

                  <OptionBtn 
                    icon={isPlaying ? VolumeX : Volume2} 
                    label={isPlaying ? "Parar Áudio" : "Ouvir Página"} 
                    onClick={toggleAudio} 
                    active={isPlaying} 
                  />
                  <OptionBtn 
                    icon={isTextEnlarged ? EyeOff : Eye} 
                    label="Texto Grande" 
                    onClick={() => setIsTextEnlarged(!isTextEnlarged)} 
                    active={isTextEnlarged} 
                  />
                  <OptionBtn 
                    icon={Headset} 
                    label="Apoio" 
                    onClick={() => { router.push("/#faq"); setIsMenuOpen(false); }} 
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

// Interface para as props do botão, removendo o 'any'
interface OptionBtnProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  active?: boolean;
}

const OptionBtn = ({ icon: Icon, label, onClick, active = false }: OptionBtnProps) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
      active ? "bg-green-50 dark:bg-green-900/20 text-green-700" : "hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
    }`}
  >
    <div className={`p-2 rounded-lg ${active ? "bg-white dark:bg-slate-800 shadow-sm" : "bg-slate-100 dark:bg-slate-900 text-slate-500"}`}>
      <Icon size={16} />
    </div>
    <span className="text-xs font-bold">{label}</span>
  </button>
);

export default ScrollControls;