"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
  X,
  Home,
  HelpCircle,
  Moon, // Mantive apenas Moon para o ícone sem função
} from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import KindnessPage from "@/components/shared/kindness";

const colors = {
  primaryGreen: "#2E7D32",
  accentOrange: "#FF9800",
  lightBeige: "#F7FBF5",
  textDark: "#1f2937",
  bgWhite: "#FFFFFF",
};

export default function Header() {
  const { searchTerm, updateSearch } = useSearch();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSupportDropdownOpen, setIsSupportDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showKindness, setShowKindness] = useState(false);

  const supportRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  // Removida toda a lógica de isDark, localStorage e media query de dark mode.
  useEffect(() => {
    // Lógica para controle de scroll e isScrolled
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);

    // Lógica para fechar menus com tecla Escape
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsSupportDropdownOpen(false);
        setShowKindness(false);
      }
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    // Lógica para fechar menus ao clicar fora
    const handleClickOutside = (e: MouseEvent) => {
      if (supportRef.current && !supportRef.current.contains(e.target as Node)) {
        setIsSupportDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Bloqueia scroll do corpo quando menu móvel está aberto
    if (isMobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((s) => !s);
    setIsSupportDropdownOpen(false);
  };

  const handleAnchorClick = (e: any, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth",
        });
      }
    }
    setIsMobileMenuOpen(false);
    setIsSupportDropdownOpen(false);
  };

  // Função toggleDark removida, pois não é mais necessária.

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "shadow-md py-4" : "py-6"
      } bg-white`} 
      style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
    >
      {/* HEADER CONTAINER */}
      <div className="container mx-auto px-4 lg:px-8 flex items-center gap-3 md:gap-8">
        {/* LOGO */}
        <Link href="/" onClick={(e) => handleAnchorClick(e, "/#hero")} className="flex items-center gap-3">
          <Image src="/favicon.ico" alt="MOZAGRO Logo" width={44} height={44} className="rounded-full" />
          <span className="hidden md:block font-extrabold text-lg text-green-700">MOZAGRO</span> {/* Removido dark:text-green-300 */}
        </Link>

        {/* SEARCH BAR */}
        <div className="flex-1 px-2 md:px-6">
          <div className="relative">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => updateSearch(e.target.value)}
              placeholder="Procurando por..."
              className="w-full h-9 md:h-11 rounded-full pl-4 pr-10 border focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-[--lightbeige]" // Removido dark:bg-gray-800 e dark:text-white
              style={{ backgroundColor: colors.lightBeige, borderColor: "rgba(0,0,0,0.06)" }}
            />
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" /> {/* Removido dark:text-gray-300 */}
          </div>
        </div>

        {/* MOBILE CART BUTTON */}
        <button
          onClick={() => setShowKindness(true)}
          className="relative p-2 rounded-full hover:bg-gray-100 transition md:hidden" // Removido dark:hover:bg-gray-800
          aria-label="Carrinho"
        >
          <ShoppingCart size={22} />
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold rounded-full" style={{ backgroundColor: colors.accentOrange, color: "#fff" }}>
            3
          </span>
        </button>

        {/* MOBILE MENU BUTTON */}
        <button aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen} className="md:hidden p-2 rounded-md hover:bg-gray-100 transition" onClick={toggleMobileMenu} title="Abrir menu"> {/* Removido dark:hover:bg-gray-800 */}
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 hover:text-green-700 transition text-sm">
            <Home size={18} />
            <span className="hidden lg:inline">Início</span>
          </Link>
          {/* Apoio */}
          <div className="relative" ref={supportRef}>
            <button onClick={() => setIsSupportDropdownOpen((s) => !s)} className="flex items-center gap-2 text-sm hover:text-green-700 transition">
              <HelpCircle size={18} />
              <span className="hidden lg:inline">Apoio</span>
              <ChevronDown size={14} className={`${isSupportDropdownOpen ? "rotate-180" : ""} transition`} />
            </button>
            {isSupportDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-md shadow-lg py-1 z-50"> {/* Removido dark styles */}
                <li><Link href="/#faq" onClick={(e) => handleAnchorClick(e, "/#faq")} className="block px-3 py-2 text-sm hover:bg-gray-50">FAQ</Link></li> {/* Removido dark styles */}
                <li><Link href="/#contato" onClick={(e) => handleAnchorClick(e, "/#contato")} className="block px-3 py-2 text-sm hover:bg-gray-50">Contacte-nos</Link></li> {/* Removido dark styles */}
              </ul>
            )}
          </div>

          {/* Carrinho Desktop */}
          <button onClick={() => setShowKindness(true)} className="flex items-center gap-2 hover:text-green-700 transition text-sm">
            <div className="relative">
              <ShoppingCart size={18} />
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold rounded-full" style={{ backgroundColor: colors.accentOrange, color: "#fff" }}>3</span>
            </div>
            <span className="hidden lg:inline">Carrinho</span>
          </button>

          {/* Login */}
          <Link href="/public/login" className="flex items-center gap-2 hover:text-green-700 transition" title="Entrar / Registar">
            <User size={18} />
            <div className="hidden lg:flex flex-col text-xs leading-none">
              <span className="text-[0.8rem]">Olá,</span>
              <span className="font-semibold text-sm">Entrar / Registar</span>
            </div>
          </Link>

          {/* Dark Mode Icon (Sem Função) */}
          <button 
            className="p-2 rounded-md hover:bg-gray-100 transition" 
            title="Funcionalidade em desenvolvimento"
            // onClick foi removido
          >
            <Moon size={18} /> {/* Ícone da lua, sem lógica de Sun/Moon */}
          </button>
        </nav>
      </div>

      {/* MOBILE MENU */}
      <div ref={mobileMenuRef} className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="absolute inset-0 bg-black/40" onClick={toggleMobileMenu} />
        <aside className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white shadow-xl p-6 overflow-y-auto"> {/* Removido dark:bg-gray-900 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Image src="/favicon.ico" alt="logo" width={40} height={40} />
              <span className="font-bold text-lg text-green-700">MOZAGRO</span> {/* Removido dark:text-green-300 */}
            </div>
            <button onClick={toggleMobileMenu} className="p-2 rounded-md hover:bg-gray-100">×</button> {/* Removido dark:hover:bg-gray-800 */}
          </div>
          <ul className="flex flex-col gap-3">
            <li><Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50" onClick={(e) => handleAnchorClick(e, "/#hero")}><Home size={20} /> <span>Início</span></Link></li> {/* Removido dark:hover:bg-gray-800 */}
            <li><Link href="/#faq" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50" onClick={(e) => handleAnchorClick(e, "/#faq")}><HelpCircle size={20} /> <span>Apoio</span></Link></li> {/* Removido dark:hover:bg-gray-800 */}
            <li><button onClick={() => setShowKindness(true)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"><ShoppingCart size={20} /> <span>Carrinho <span className="ml-2 inline-block px-2 py-0.5 text-xs rounded-full" style={{ backgroundColor: colors.accentOrange, color: "#fff" }}>3</span></span></button></li> {/* Removido dark:hover:bg-gray-800 */}
            <li><Link href="/public/login" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"><User size={20} /> <span>Entrar / Registar</span></Link></li> {/* Removido dark:hover:bg-gray-800 */}
          </ul>
          <div className="mt-6">
            {/* Dark Mode Icon no menu mobile (Sem Função) */}
            <button 
                className="w-full flex items-center justify-center gap-3 py-2 rounded-md border border-gray-100 hover:bg-gray-50"
                title="Funcionalidade em desenvolvimento"
                // onClick foi removido
            >
              <Moon size={16} /> Modo escuro
            </button>
          </div>
        </aside>
      </div>

      {/* KINDNESS MODAL */}
      {showKindness && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative"> {/* Removido dark:bg-gray-900 */}
            <button onClick={() => setShowKindness(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">×</button>
            <KindnessPage />
          </div>
        </div>
      )}
    </header>
  );
}