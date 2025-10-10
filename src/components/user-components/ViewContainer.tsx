// src/components/universal-components/ViewContainer.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// Adaptação para o novo ViewContainer que pode incluir um botão de voltar
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ViewContainer({ children, header, backButtonAction = null }) {
  return (
    <motion.div
      className="p-4 sm:p-6 lg:p-8 min-h-screen bg-white text-gray-900"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <header className="flex items-center justify-between mb-8 md:mb-12">
        <div className="flex items-center gap-4">
          {backButtonAction && (
            <button
              onClick={backButtonAction}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{header}</h1>
        </div>
      </header>
      <main>
        {children}
      </main>
    </motion.div>
  );
}