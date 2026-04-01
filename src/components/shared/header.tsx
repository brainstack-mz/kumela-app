"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  HelpCircle,
  Moon,
  Sun,
  MessageCircle,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "@/context/SearchContext";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { searchTerm, updateSearch } = useSearch();
  const { cartCount } = useCart();
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState("pt");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Inicialização do Tema e Idioma
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    
    // Idioma
    const savedLang = localStorage.getItem("kumela-lang") || "pt";
    setLang(savedLang);

    // Dark Mode
    const savedTheme = localStorage.getItem("kumela-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("kumela-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("kumela-theme", "light");
    }
  };

  const changeLanguage = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem("kumela-lang", newLang);
    window.dispatchEvent(new Event("languageChange"));
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? "shadow-md py-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md" 
          : "py-5 bg-white dark:bg-slate-900"
      }`}
      style={{ borderBottom: isDarkMode ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.06)" }}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Image src="/favicon.ico" alt="Logo" width={42} height={42} className="rounded-full transition-transform group-hover:scale-105" />
          <span className="hidden md:block font-black text-2xl text-green-700 dark:text-green-500 tracking-tighter">KUMELA</span>
        </Link>

        {/* SEARCH */}
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => updateSearch(e.target.value)}
              placeholder="O que você procura hoje?"
              className="w-full h-11 rounded-2xl pl-5 pr-10 bg-gray-100 dark:bg-slate-800 border-2 border-transparent focus:bg-white dark:focus:bg-slate-700 focus:border-green-600 transition-all text-sm outline-none dark:text-white"
            />
            <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          
          {/* IDIOMAS (DESKTOP) */}
          <div className="hidden lg:flex items-center bg-gray-50 dark:bg-slate-800 p-1 rounded-xl border border-gray-100 dark:border-slate-700">
            <button 
              onClick={() => changeLanguage("pt")}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${lang === 'pt' ? 'bg-white dark:bg-slate-700 shadow-sm text-green-700 dark:text-green-400' : 'text-gray-400 hover:text-gray-600'}`}
            >PT</button>
            <button 
              onClick={() => changeLanguage("em-MZ")}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${lang === 'em-MZ' ? 'bg-white dark:bg-slate-700 shadow-sm text-green-700 dark:text-green-400' : 'text-gray-400 hover:text-gray-600'}`}
            >EM</button>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {/* APOIO */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsSupportOpen(true)}
                className="flex items-center gap-1.5 text-gray-700 dark:text-slate-300 hover:text-green-700 dark:hover:text-green-500 transition font-bold text-sm py-2"
              >
                <HelpCircle size={18} />
                <span>Apoio</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isSupportOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {isSupportOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    onMouseLeave={() => setIsSupportOpen(false)}
                    className="absolute right-0 mt-1 w-64 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-2xl p-2 z-50"
                  >
                    <div className="px-3 py-2 mb-1 border-b dark:border-slate-700">
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Central de Ajuda</p>
                    </div>
                    <Link href="/#faq" className="flex items-center gap-3 px-3 py-2.5 hover:bg-green-50 dark:hover:bg-slate-700 rounded-xl transition group">
                      <div className="p-2 bg-gray-50 dark:bg-slate-900 rounded-lg"><FileText size={16} className="text-gray-500" /></div>
                      <span className="text-sm font-bold text-gray-700 dark:text-slate-200">Perguntas Frequentes</span>
                    </Link>
                    <Link href="/#contato" className="flex items-center gap-3 px-3 py-2.5 hover:bg-green-50 dark:hover:bg-slate-700 rounded-xl transition group">
                      <div className="p-2 bg-gray-50 dark:bg-slate-900 rounded-lg"><MessageCircle size={16} className="text-gray-500" /></div>
                      <span className="text-sm font-bold text-gray-700 dark:text-slate-200">Falar com Suporte</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/cart" className="flex items-center gap-2 text-gray-700 dark:text-slate-300 hover:text-green-700 dark:hover:text-green-500 font-bold text-sm">
              <div className="relative p-1">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">{cartCount}</span>
                )}
              </div>
            </Link>

            <Link href="/public/login" className="flex items-center gap-3 pl-4 border-l border-gray-100 dark:border-slate-700 group">
              <div className="p-2 bg-gray-50 dark:bg-slate-800 rounded-full group-hover:bg-green-50 dark:group-hover:bg-slate-700 transition">
                <User size={20} className="dark:text-slate-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Conta</span>
                <span className="text-sm font-bold dark:text-slate-200 text-slate-700">Entrar</span>
              </div>
            </Link>

            {/* TOGGLE DARK MODE DESKTOP */}
            <button 
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
            >
              {isDarkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />}
            </button>
          </nav>

          {/* TOGGLE DARK MODE MOBILE */}
          <button 
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-500 transition md:hidden"
          >
            {isDarkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}