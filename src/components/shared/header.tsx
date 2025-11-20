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
  Moon,
} from "lucide-react";
import { useSearch } from "@/context/SearchContext";

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

  const supportRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Lógica para controle de scroll e isScrolled
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);

    // Lógica para fechar menus com tecla Escape
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsSupportDropdownOpen(false);
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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "shadow-md py-4" : "py-6"
      } bg-white`} 
      style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
    >
      {/* HEADER CONTAINER */}
      <div className="container mx-auto px-4 lg:px-8 flex items-center gap-3 md:gap-8">
        
        {/* LOGO - O ÍCONE AGORA É O PONTO CENTRAL DO LINK */}
        <Link 
          href="/" 
          onClick={(e) => handleAnchorClick(e, "/#hero")} 
          className="flex items-center gap-3 group"
        >
          {/* O Ícone (favicon) é sempre visível e clicável, levando ao início */}
          <Image 
            src="/favicon.ico" 
            alt="KUMELA Logo" 
            width={50} 
            height={50} 
            className="rounded-full transition-transform duration-300 group-hover:scale-105" 
          />
          {/* Texto KUMELA aparece apenas em desktop */}
          <span className="hidden md:block font-extrabold text-lg text-green-700">KUMELA</span>
        </Link>

        {/* SEARCH BAR */}
        <div className="flex-1 px-2 md:px-6">
          <div className="relative">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => updateSearch(e.target.value)}
              placeholder="Procurando por..."
              className="w-full h-9 md:h-11 rounded-full pl-4 pr-10 border focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              style={{ backgroundColor: colors.lightBeige, borderColor: "rgba(0,0,0,0.06)" }}
            />
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* MOBILE CART BUTTON (ÍCONE BEM VISÍVEL) */}
        <Link
          href="/carrinho"
          className="relative p-2 rounded-full hover:bg-gray-100 transition md:hidden"
          aria-label="Carrinho"
        >
          <ShoppingCart size={24} className="text-gray-700" /> {/* Aumentado para 24 para mais visibilidade */}
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold rounded-full" style={{ backgroundColor: colors.accentOrange, color: "#fff" }}>
            3
          </span>
        </Link>

        {/* MOBILE MENU BUTTON (ÍCONE BEM VISÍVEL) */}
        <button aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen} className="md:hidden p-2 rounded-md hover:bg-gray-100 transition" onClick={toggleMobileMenu} title="Abrir menu">
          {isMobileMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />} {/* Aumentado para 24 para mais visibilidade */}
        </button>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700">
          
          {/* Início (ÍCONE E TEXTO) */}
          <Link href="/" onClick={(e) => handleAnchorClick(e, "/#hero")} className="flex items-center gap-2 hover:text-green-700 transition text-sm">
            <Home size={18} />
            <span>Início</span> {/* Removido hidden lg:inline para manter o texto visível em todas as telas desktop */}
          </Link>
          
          {/* Apoio (ÍCONE E TEXTO) */}
          <div className="relative" ref={supportRef}>
            <button onClick={() => setIsSupportDropdownOpen((s) => !s)} className="flex items-center gap-2 text-sm hover:text-green-700 transition">
              <HelpCircle size={18} />
              <span>Apoio</span> {/* Removido hidden lg:inline */}
              <ChevronDown size={14} className={`${isSupportDropdownOpen ? "rotate-180" : ""} transition`} />
            </button>
            {isSupportDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-md shadow-lg py-1 z-50">
                <li><Link href="/#faq" onClick={(e) => handleAnchorClick(e, "/#faq")} className="block px-3 py-2 text-sm hover:bg-gray-50">FAQ</Link></li>
                <li><Link href="/#contato" onClick={(e) => handleAnchorClick(e, "/#contato")} className="block px-3 py-2 text-sm hover:bg-gray-50">Contacte-nos</Link></li>
              </ul>
            )}
          </div>

          {/* Carrinho Desktop (ÍCONE E TEXTO) */}
          <Link href="/carrinho" className="flex items-center gap-2 hover:text-green-700 transition text-sm">
            <div className="relative">
              <ShoppingCart size={18} />
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold rounded-full" style={{ backgroundColor: colors.accentOrange, color: "#fff" }}>3</span>
            </div>
            <span>Carrinho</span> {/* Removido hidden lg:inline */}
          </Link>

          {/* Login (ÍCONE E TEXTO MAIS DETALHADO) */}
          <Link href="/public/login" className="flex items-center gap-2 hover:text-green-700 transition" title="Entrar / Registar">
            <User size={18} />
            <div className="hidden lg:flex flex-col text-xs leading-none">
              <span className="text-[0.8rem]">Olá,</span>
              <span className="font-semibold text-sm">Entrar / Registar</span>
            </div>
          </Link>

          {/* Dark Mode Icon (SOMENTE ÍCONE E BEM VISÍVEL) */}
          <button 
            className="p-2 rounded-md hover:bg-gray-100 transition" 
            title="Funcionalidade em desenvolvimento"
          >
            <Moon size={20} className="text-gray-700" /> {/* Aumentado para 20 para mais visibilidade */}
          </button>
        </nav>
      </div>

      {/* MOBILE MENU */}
      <div ref={mobileMenuRef} className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="absolute inset-0 bg-black/40" onClick={toggleMobileMenu} />
        <aside className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white shadow-xl p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Image src="/favicon.ico" alt="logo" width={40} height={40} />
              <span className="font-bold text-lg text-green-700">KUMELA</span> {/* Nome alterado para KUMELA */}
            </div>
            <button onClick={toggleMobileMenu} className="p-2 rounded-md hover:bg-gray-100">×</button>
          </div>
          {/* Links do Menu Mobile (ÍCONE E TEXTO) */}
          <ul className="flex flex-col gap-3">
            <li><Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50" onClick={(e) => handleAnchorClick(e, "/#hero")}><Home size={20} /> <span>Início</span></Link></li>
            <li><Link href="/#faq" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50" onClick={(e) => handleAnchorClick(e, "/#faq")}><HelpCircle size={20} /> <span>Apoio</span></Link></li>
            <li><Link href="/carrinho" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"><ShoppingCart size={20} /> <span>Carrinho <span className="ml-2 inline-block px-2 py-0.5 text-xs rounded-full" style={{ backgroundColor: colors.accentOrange, color: "#fff" }}>3</span></span></Link></li>
            <li><Link href="/public/login" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"><User size={20} /> <span>Entrar / Registar</span></Link></li>
          </ul>
          <div className="mt-6">
            {/* Dark Mode Icon no menu mobile (ÍCONE E TEXTO) */}
            <button 
                className="w-full flex items-center justify-center gap-3 py-2 rounded-md border border-gray-100 hover:bg-gray-50 text-gray-700"
                title="Funcionalidade em desenvolvimento"
            >
              <Moon size={18} /> Modo escuro
            </button>
          </div>
        </aside>
      </div>
    </header>
  );
}