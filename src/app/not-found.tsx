"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NotFound() {
  const pathname = usePathname();

  let backLink = "/";
  let label = "Voltar para o Início";

  if (pathname?.startsWith("/admin")) {
    backLink = "/admin/dashboard";
    label = "Voltar ao Painel Admin";
  } else if (pathname?.startsWith("/user")) {
    backLink = "/user/dashboard";
    label = "Voltar ao Painel Vendedor";
  } else if (pathname?.includes("/dashboard")) {
    backLink = "/dashboard";
    label = "Voltar ao meu Painel";
  }

  return (
    <div className="fixed inset-0 z-[999] min-h-screen bg-white dark:bg-[#0A1A0E] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      
      {/* 404 Background */}
      <h1 className="text-[10rem] md:text-[18rem] font-black text-gray-100 dark:text-green-900/10 absolute select-none z-0">
        404
      </h1>

      <div className="z-10 flex flex-col items-center">
        
        {/* 🔥 IMAGEM GRANDE + ANIMADA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-56 h-56 md:w-80 md:h-80 mb-6"
        >
          <Image
            src="/assets/not-found.png"
            alt="Erro 404"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>

        {/* TEXTO */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white mb-3"
        >
          Ops! Página não encontrada
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 dark:text-gray-400 max-w-sm mb-10 text-sm md:text-base"
        >
          Parece que o caminho que você tentou acessar não existe ou foi movido.
        </motion.p>

        {/* BOTÃO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href={backLink}
            className="px-10 py-4 bg-[#00B539] hover:bg-[#008a2b] text-white font-bold rounded-full transition-all shadow-xl shadow-green-600/20 hover:scale-105 active:scale-95"
          >
            {label}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}