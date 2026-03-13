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
  Home,
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
  const [isSupportDropdownOpen, setIsSupportDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "shadow-md py-3" : "py-5"
      } bg-white`}
      style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Image
            src="/favicon.ico"
            alt="KUMELA Logo"
            width={42}
            height={42}
            className="rounded-full transition-transform duration-300 group-hover:scale-105"
          />
          <span className="hidden md:block font-extrabold text-xl text-green-700 tracking-tighter">
            KUMELA
          </span>
        </Link>

        {/* SEARCH BAR - Expandida no Mobile */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => updateSearch(e.target.value)}
              placeholder="Procurar produtos..."
              className="w-full h-10 md:h-11 rounded-full pl-5 pr-10 border border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
              style={{ backgroundColor: "#f3f4f6" }}
            />
            <Search
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2 md:gap-6">
          
          {/* MOBILE ONLY: DARK MODE TOGGLE (Substitui menu e carrinho) */}
          <button
            className="md:hidden p-2.5 rounded-full bg-gray-50 text-gray-700 border border-gray-100 active:scale-90 transition-all"
            aria-label="Alternar modo"
          >
            <Moon size={20} />
          </button>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-6 text-gray-700">
            {/* Início */}
            <Link href="/" className="flex items-center gap-2 hover:text-green-700 transition font-medium text-sm">
              <Home size={18} />
              <span>Início</span>
            </Link>

            {/* Apoio Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsSupportDropdownOpen(true)}
                onClick={() => setIsSupportDropdownOpen(!isSupportDropdownOpen)}
                className="flex items-center gap-1.5 hover:text-green-700 transition font-medium text-sm"
              >
                <HelpCircle size={18} />
                <span>Apoio</span>
                <ChevronDown size={14} className={isSupportDropdownOpen ? "rotate-180" : ""} />
              </button>
              
              {isSupportDropdownOpen && (
                <div 
                  onMouseLeave={() => setIsSupportDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2"
                >
                  <Link href="/#faq" className="block px-4 py-2 hover:bg-green-50 text-sm">Perguntas Frequentes</Link>
                  <Link href="/#contato" className="block px-4 py-2 hover:bg-green-50 text-sm">Contacte-nos</Link>
                </div>
              )}
            </div>

            {/* Carrinho Desktop */}
            <Link href="/carrinho" className="flex items-center gap-2 hover:text-green-700 transition font-medium text-sm">
              <div className="relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                  3
                </span>
              </div>
              <span>Carrinho</span>
            </Link>

            {/* Login/Conta Desktop */}
            <Link
              href="/public/login"
              className="flex items-center gap-3 pl-4 border-l border-gray-200 hover:text-green-700 transition"
            >
              <div className="p-2 bg-gray-50 rounded-full">
                <User size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Conta</span>
                <span className="text-sm font-bold">Entrar</span>
              </div>
            </Link>

            {/* Dark Mode Desktop */}
            <button className="p-2 rounded-full hover:bg-gray-100 transition text-gray-500">
              <Moon size={20} />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}