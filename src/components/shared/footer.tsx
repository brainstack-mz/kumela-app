"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-background text-foreground border-t border-border py-12 transition-colors duration-500">
      {/* Background com formas geométricas - Opacidade reduzida no dark para não brilhar muito */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-5 pointer-events-none">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#A4C639", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#8BC34A", stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#CDDC39", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#9CCC65", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <circle cx="20%" cy="10%" r="50" fill="url(#gradient1)" className="animate-pulse" />
          <polygon points="50,10 60,30 40,30" className="animate-spin-slow" fill="url(#gradient2)" style={{ transformOrigin: "50% 50%" }} />
          <path d="M 80 50 C 95 60, 85 70, 70 70 C 55 70, 65 60, 80 50 Z" className="animate-float" fill="#8BC34A" />
          <rect x="70%" y="80%" width="80" height="80" fill="url(#gradient2)" />
        </svg>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Informações da Empresa */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-4 mb-6">
   <Image
    src="/favicon.ico"
    alt="Logotipo KUMELA"
    width={64}
    height={64}
    className="rounded-full shadow-md object-contain"
    priority
  />
               <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-[#2E7D32] dark:text-green-500">KUMELA</h2>
                <p className="text-xs text-muted-foreground tracking-wide uppercase">
                  Sua colheita, agora conectada
                </p>
              </div>
            </Link>
            <div className="space-y-4 max-w-xl text-muted-foreground font-light text-sm sm:text-base text-justify leading-relaxed">
              <p>
                Conectando agricultores e consumidores em Moçambique. A KUMELA é
                sua plataforma para uma gestão de produtos agrícolas transparente
                e eficiente, construindo um mercado melhor, juntos.
              </p>
              <p>
                Acreditamos que a colaboração entre agricultores e a comunidade é
                o caminho para uma agricultura mais forte, limpa e conectada.
              </p>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-foreground border-b border-green-500/30 pb-2 w-fit">
              Links Rápidos
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="/#faq" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/#Hero" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  Sobre a KUMELA
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  Fale Conosco
                </Link>
              </li>
              <li>
                <Link href="/termos-de-uso" className="text-green-700 dark:text-green-500 hover:underline">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/politicas-de-privacidade" className="text-green-700 dark:text-green-500 hover:underline">
                  Políticas de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Contatos */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-foreground border-b border-green-500/30 pb-2 w-fit">
              Contatos
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                  <Mail size={18} className="text-[#8BC34A]" />
                </div>
                <Link href="mailto:contato@kumela.org" className="text-muted-foreground group-hover:text-foreground transition-colors">
                  contato@kumela.org
                </Link>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                  <Phone size={18} className="text-[#8BC34A]" />
                </div>
                <a href="tel:+258821234567" className="text-muted-foreground group-hover:text-foreground transition-colors">
                  +258 82 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                  <MapPin size={18} className="text-[#8BC34A]" />
                </div>
                <span className="text-muted-foreground">Nampula, Moçambique</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Direitos Autorais */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-xs gap-4">
          <p>© 2026 KUMELA. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por <span className="font-bold text-[#2E7D32] dark:text-green-500">BrainStack</span>
          </p>
        </div>
      </div>
    </footer>
  );
}