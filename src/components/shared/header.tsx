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
import { motion, AnimatePresence } from "framer-motion"; // Importado para animação
import { useSearch } from "@/context/SearchContext";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { searchTerm, updateSearch } = useSearch();
  const { cartCount } = useCart(); 
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
        isScrolled ? "shadow-md py-2 bg-white/95 backdrop-blur-sm" : "py-3 bg-white"
      }`}
      style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Image
            src="/favicon.ico"
            alt="KUMELA Logo"
            width={38}
            height={38}
            className="rounded-full transition-transform duration-300 group-hover:scale-105"
          />
          <span className="hidden md:block font-black text-xl text-green-700 tracking-tighter">
            KUMELA
          </span>
        </Link>

        {/* SEARCH BAR */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => updateSearch(e.target.value)}
              placeholder="Procurar produtos..."
              className="w-full h-10 rounded-full pl-5 pr-10 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-green-600 transition-all text-sm outline-none"
            />
            <Search
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 md:gap-6">
          
          <button
            className="md:hidden p-2.5 rounded-full bg-gray-50 text-gray-700 active:scale-90 transition-all"
            aria-label="Alternar modo"
          >
            <Moon size={20} />
          </button>

          <nav className="hidden md:flex items-center gap-6 text-gray-700">
            <Link href="/" className="flex items-center gap-2 hover:text-green-700 transition font-bold text-sm">
              <Home size={18} />
              <span>Início</span>
            </Link>

            <div className="relative">
              <button
                onMouseEnter={() => setIsSupportDropdownOpen(true)}
                className="flex items-center gap-1.5 hover:text-green-700 transition font-bold text-sm"
              >
                <HelpCircle size={18} />
                <span>Apoio</span>
                <ChevronDown size={14} className={isSupportDropdownOpen ? "rotate-180" : ""} />
              </button>
              
              {isSupportDropdownOpen && (
                <div 
                  onMouseLeave={() => setIsSupportDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50"
                >
                  <Link href="/#faq" className="block px-4 py-2 hover:bg-green-50 text-sm font-medium">FAQ</Link>
                  <Link href="/#contato" className="block px-4 py-2 hover:bg-green-50 text-sm font-medium">Contacto</Link>
                </div>
              )}
            </div>

            {/* Carrinho Desktop Atualizado */}
            <Link href="/cart" className="flex items-center gap-2 hover:text-green-700 transition font-bold text-sm">
              <div className="relative p-1">
                <ShoppingCart size={22} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span>Carrinho</span>
            </Link>

            <Link
              href="/public/login"
              className="flex items-center gap-3 pl-4 border-l border-gray-200 hover:text-green-700 transition"
            >
              <div className="p-2 bg-gray-50 rounded-full">
                <User size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Conta</span>
                <span className="text-sm font-bold">Entrar</span>
              </div>
            </Link>

            <button className="p-2 rounded-full hover:bg-gray-100 transition text-gray-500">
              <Moon size={20} />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}