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
          className="fixed inset-0 z-[950] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Conteúdo centralizado */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative w-full max-w-md mx-4"
            style={{ pointerEvents: "auto" }}
          >
            {/* Card principal que contém o botão */}
            <div className="relative rounded-2xl overflow-hidden">
              {/* O botão “X” agora é relativo ao card do SmartForm */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 z-[55] bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full p-1.5
                           hover:bg-red-500 text-white transition-colors duration-200"
                aria-label="Fechar"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <X size={22} />
              </button>

              {/* O SmartForm é o conteúdo do card */}
              <div className="relative z-[50]">
                <SmartForm onClose={onClose}/>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default AnnounceModal;
