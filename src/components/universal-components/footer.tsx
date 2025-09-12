"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#F8F9F4] text-gray-800 gap-3 py-2 top-0">
      {/* Background with dynamic geometric shapes */}
      <div className="absolute inset-0 z-0 opacity-50">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor: '#A4C639', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#8BC34A', stopOpacity: 1}} />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#CDDC39', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#9CCC65', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          <circle cx="20%" cy="10%" r="50" fill="url(#gradient1)" className="animate-pulse duration-5000" />
          <polygon points="50,10 60,30 40,30" className="rotate-45 animate-spin-slow" fill="url(#gradient2)" style={{transformOrigin: '50% 50%'}} />
          <path d="M 80 50 C 95 60, 85 70, 70 70 C 55 70, 65 60, 80 50 Z" className="animate-float" fill="#8BC34A" />
          <rect x="70%" y="80%" width="80" height="80" fill="url(#gradient2)" className="animate-fade-in" />
          <path d="M 30 70 Q 50 90, 70 70 L 70 80 Q 50 100, 30 80 L 30 70 Z" fill="url(#gradient1)" className="animate-breathe" />
        </svg>
      </div>
      
      <div className="container mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Informações da Empresa */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-4 mb-6">
              <img
                src="/favicon.ico"
                alt="Logotipo"
                className="h-16 w-16 rounded-full"
              />
              <div className="flex flex-col justify-center">
                <h2 className="text-xl font-bold text-gray-800">
                  MOZAGRO
                </h2>
                <p className="text-[0.7rem] text-gray-600 max-w-[183px] whitespace-nowrap overflow-hidden text-ellipsis">
                  Sua colheita, agora conectada
                </p>
              </div>
            </Link>
            <p className="text-gray-600 font-light text-sm sm:text-base text-justify">
              Conectando agricultores e consumidores em Moçambique. A MOZAGRO é sua plataforma para uma gestão de produtos agrícolas transparente e eficiente, construindo um mercado melhor, juntos.
            </p>
            <p className="text-gray-600 font-light text-sm sm:text-base text-justify">
              Acreditamos que a colaboração entre agricultores e a comunidade é o caminho para uma agricultura mais forte, limpa e conectada. Juntos, transformamos o campo em um lugar melhor para todos.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Links Rápidos
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/#produts"
                  className="hover:text-green-800  transition-colors duration-300"
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="hover:text-green-800  transition-colors duration-300"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/#Hero"
                  className="hover:text-green-800  transition-colors duration-300"
                >
                  Sobre a MOZAGRO
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="hover:text-green-800  transition-colors duration-300"
                >
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>

          {/* Contatos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Contatos</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#8BC34A]" />
                <Link
                  href="mailto:contato@mozagro.co.mz"
                  className="hover:text-green-800 transition-colors duration-300"
                >
                  contato@mozagro.co.mz
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#8BC34A]" />
                <a
                  href="tel:+258 82 123 4567"
                  className="hover:text-gray-900 transition-colors duration-300"
                >
                  +258 82 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#8BC34A]" />
                <a
                  href="tel:+258 87 987 6543"
                  className="hover:text-gray-900 transition-colors duration-300"
                >
                  +258 87 987 6543
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-[#8BC34A]" />
                <address className="not-italic">Nampula, Moçambique</address>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 flex flex-col md:flex-row justify-center md:justify-between items-center text-center text-gray-600 text-xs">
          <p>© 2025 MOZAGRO. Desenvolvido por LI-DevTech. Todos os direitos reservados.</p>
          <div className="flex justify-center md:justify-end gap-4 mt-12 md:mt-0">
            <Link href="/termos-de-uso" className="hover:text-green-800 underline font-semibold transition-colors duration-300">
              Termos de Uso
            </Link>
            <Link href="/politicas-de-privacidade" className="hover:text-green-800 underline font-semibold transition-colors duration-300">
              Políticas de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}