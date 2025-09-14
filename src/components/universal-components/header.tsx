'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, User, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { useSearch } from "@/context/SearchContext";

const colors = {
  primaryGreen: "#4CAF50",
  darkGreen: "#2E7D32",
  accentOrange: "#FF9800",
  lightBeige: "#F1F8E9",
  textDark: "#2C2C2C",
  textWhite: "#FFFFFF",
  bgWhite: "#FFFFFF",
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSupportDropdownOpen, setIsSupportDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState("PT");
  const [isScrolled, setIsScrolled] = useState(false);

  const supportRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  const { searchTerm, updateSearch } = useSearch();

  const handleScroll = () => setIsScrolled(window.scrollY > 50);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLanguageChange = (lang: string) => {
    setActiveLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  useEffect(() => {
    // Fecha dropdowns ao clicar fora
    const handleClickOutside = (e: MouseEvent) => {
      if (
        supportRef.current &&
        !supportRef.current.contains(e.target as Node) &&
        languageRef.current &&
        !languageRef.current.contains(e.target as Node)
      ) {
        setIsSupportDropdownOpen(false);
        setIsLanguageDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // Bloqueia a rolagem do corpo da página quando o menu está aberto
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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
    setIsLanguageDropdownOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "shadow-md py-2" : "py-6"
      }`}
      style={{
        backgroundColor: colors.bgWhite,
        borderBottom: "2px solid #E0E0E0",
      }}
    >
      {/* Header Principal (Desktop & Mobile) */}
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center h-12 md:h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 flex-shrink-0 cursor-pointer"
          onClick={(e) => handleAnchorClick(e, "/#hero")}
        >
          <Image
            src="/favicon.ico"
            alt="MOZAGRO Logo"
            width={210}
            height={100}
            className="w-30 h-30 md:w-30 md:h-30 rounded-full right-0"
          />
        </Link>

        {/* Barra de Pesquisa */}
        <div className="flex-grow mx-0 right-2 left-0 md:mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Procurando por..."
              value={searchTerm}
              onChange={(e) => updateSearch(e.target.value)}
              className="w-full h-11 rounded-full pl-6 pr-14 text-textDark placeholder-gray-500 border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: colors.lightBeige,
                color: colors.textDark,
                borderColor: colors.primaryGreen,
              }}
            />
            <button
              aria-label="Pesquisar"
              className="absolute right-0 top-0 h-full w-12 flex items-center justify-center text-white rounded-r-full hover:opacity-90 transition-colors"
              style={{ backgroundColor: colors.primaryGreen }}
            >
              <Search size={20} className="cursor-pointer" />
            </button>
          </div>
        </div>

        {/* Botões de Ação (Desktop) */}
        <div
          className="hidden md:flex items-center gap-8 font-medium"
          style={{ color: colors.textDark }}
        >
          <Link
            href="/"
            className="hover:text-green-700 transition-colors"
            onClick={(e) => handleAnchorClick(e, "/")}
          >
            Início
          </Link>

          {/* Apoio Dropdown */}
          <div className="relative" ref={supportRef}>
            <button
              onClick={() => {
                setIsSupportDropdownOpen(!isSupportDropdownOpen);
                setIsLanguageDropdownOpen(false);
              }}
              className="flex items-center hover:text-green-700 transition-colors cursor-pointer"
            >
              Apoio
              <ChevronDown
                size={16}
                className={`ml-1 transition-transform duration-300 ${
                  isSupportDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isSupportDropdownOpen && (
              <ul className="absolute top-full right-0 cursor-pointer mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-44 p-2 text-textDark z-50">
                <li>
                  <Link
                    href="/#faq"
                    className="block px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    onClick={(e) => handleAnchorClick(e, "/#faq")}
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#contato"
                    className="block px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    onClick={(e) => handleAnchorClick(e, "/#contato")}
                  >
                    Contacte-nos
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Idioma Dropdown */}
          <div className="relative" ref={languageRef}>
            <button
              onClick={() => {
                setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
                setIsSupportDropdownOpen(false);
              }}
              className="flex items-center gap-1 hover:text-green-700 transition-colors"
            >
              <Image
                src="/assets/moz.png"
                alt="Bandeira de Moçambique"
                width={24}
                height={16}
              />
              <span>{activeLanguage}</span>
              <ChevronDown
                size={16}
                className={`ml-1 transition-transform cursor-pointer duration-300 ${
                  isLanguageDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isLanguageDropdownOpen && (
              <ul className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-44 p-2 text-textDark z-50">
                <li>
                  <button
                    onClick={() => handleLanguageChange("PT")}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    Português (PT)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLanguageChange("EMAKHUA")}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    Emakhuwa
                  </button>
                </li>
              </ul>
            )}
          </div>

          {/* Usuário */}
          <Link
            href="/admin/login"
            className="flex items-center gap-2 hover:text-green-700 transition-colors"
          >
            <User size={24} />
            <div className="flex flex-col text-sm">
              <span>Olá,</span>
              <span className="font-bold">Entrar / Registar</span>
            </div>
          </Link>

          {/* Carrinho 
          <Link
            href="/kindness"
            className="relative flex items-center gap-2 hover:text-green-700 transition-colors"
          >
            <div className="relative">
              <ShoppingCart size={24} />
              <span
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-white text-[0.65rem] font-bold animate-bounce"
                style={{ backgroundColor: colors.accentOrange }}
              >
                3
              </span>
            </div>
            <span className="text-sm">Carrinho</span>
          </Link>
          */}
        </div>

        {/* Mobile Actions */}
        <div
          className="flex items-center gap-4 md:hidden"
          style={{ color: colors.primaryGreen }}
        >
          {/* Carrinho Mobile */}
          <Link
            href="/kindness"
            className="relative flex items-center hover:text-green-700 transition-colors"
          >
               {/* Carrinho Mobile 
            <div className="relative">
              <ShoppingCart size={24} />
              <span
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-white text-[0.65rem] font-bold animate-bounce"
                style={{ backgroundColor: colors.accentOrange }}
              >
                3
              </span>
            </div>
            */}
          </Link>
          

          {/* Botão Mobile */}
          <button onClick={toggleMobileMenu} className="hover:text-green-700">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Camada de sobreposição para o fundo */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-500"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Menu Mobile */}
      <div
        className={`fixed inset-0 bg-white transition-transform duration-500 ease-in-out transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } z-50 p-6 md:hidden overflow-y-auto`}
        style={{ color: colors.textDark }}
      >
        {/* Cabeçalho do Menu */}
        <div className="flex justify-between items-center pb-6 mb-6 border-b border-gray-200">
          <h2 className="text-3xl font-bold" style={{ color: colors.primaryGreen }}>
            Menu
          </h2>
          <button
            onClick={toggleMobileMenu}
            style={{ color: colors.primaryGreen }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Fechar menu"
          >
            <X size={32} />
          </button>
        </div>

        {/* Itens de navegação */}
        <ul className="flex flex-col gap-2 font-medium text-lg">
          <li>
            <Link
              href="/"
              className="block py-4 px-4 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={toggleMobileMenu}
            >
              Início
            </Link>
          </li>
          <li>
            <Link
              href="/#faq"
              className="block py-4 px-4 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={toggleMobileMenu}
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link
              href="/#contato"
              className="block py-4 px-4 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={toggleMobileMenu}
            >
              Contacte-nos
            </Link>
          </li>

          {/* Seletor de Idioma */}
          <li className="py-4 px-4">
            <div className="relative" ref={languageRef}>
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center w-full justify-between gap-1 text-left"
              >
                <div className="flex items-center gap-2">
                  <Image src="/assets/moz.png" alt="Bandeira de Moçambique" width={24} height={16} />
                  <span>{activeLanguage}</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isLanguageDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isLanguageDropdownOpen && (
                <ul className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-full p-2 text-sm z-50">
                  <li>
                    <button
                      onClick={() => handleLanguageChange("PT")}
                      className="w-full px-3 py-2 text-left hover:bg-gray-100 rounded-md transition-colors"
                    >
                      Português (PT)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleLanguageChange("EMAKHUA")}
                      className="w-full px-3 py-2 text-left hover:bg-gray-100 rounded-md transition-colors"
                    >
                      Emakhuwa
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </li>
        </ul>

        {/* Seção de Ações com separador */}
        <div className="flex flex-col gap-4 pt-6 mt-6 border-t border-gray-200">
          <Link
            href="/admin/login"
            className="flex items-center gap-2 py-4 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            onClick={toggleMobileMenu}
          >
            <User size={24} style={{ color: colors.textDark }} />
            <span className="font-bold text-xl">Entrar / Registar</span>
          </Link>
                {/* Seção de Ações com separador 
          <Link
            href="/kindness"
            className="flex items-center gap-2 py-4 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            onClick={toggleMobileMenu}
          >
            <ShoppingCart size={24} style={{ color: colors.textDark }} />
            <span className="text-xl">Carrinho</span>
          </Link>
          */}
        </div>
      </div>
    </header>
  );
}