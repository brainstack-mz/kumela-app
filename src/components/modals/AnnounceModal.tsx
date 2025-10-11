"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SmartForm from "@/components/smart-form/SmartForm";
import { createPortal } from "react-dom";
import React from "react";

interface AnnounceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnnounceModal: React.FC<AnnounceModalProps> = ({ isOpen, onClose }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -30 },
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-start md:items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Scroll wrapper: ocupa toda a viewport, permite rolagem quando o teclado abre */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative w-full max-w-3xl px-3 md:px-0 flex justify-center items-start mt-6 md:mt-10"
            style={{ pointerEvents: "auto" }}
          >
            {/* Botão Fechar sempre acima (z-index alto) e com fundo sem bloquear leitura */}
            <button
              onClick={onClose}
              className="absolute top-2 right-3 z-[100000] bg-white/90 backdrop-blur-md rounded-full p-1.5 shadow-md hover:bg-red-500 hover:text-white transition-colors duration-200"
              aria-label="Fechar"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <X size={22} />
            </button>

            {/* O SmartForm renderiza o card e cuida da sua rolagem interna */}
            <div className="w-full flex justify-center">
              <SmartForm />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default AnnounceModal;
