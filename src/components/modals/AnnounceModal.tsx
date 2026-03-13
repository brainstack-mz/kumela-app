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
          className="fixed inset-0 z-[950] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ paddingTop: '80px', paddingBottom: '20px' }}
        >
          {/* Conteúdo centralizado */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative w-full max-w-md mx-auto"
            style={{ pointerEvents: "auto", maxHeight: 'calc(100vh - 100px)' }}
          >
            {/* Card principal que contém o botão */}
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-2xl">
              {/* O botão "X" agora é relativo ao card do SmartForm */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 z-[55] bg-white/30 cursor-pointer backdrop-blur-md rounded-full p-2
                           hover:bg-red-500 hover:text-white transition-colors duration-200"
                aria-label="Fechar"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <X size={20} />
              </button>

              {/* O SmartForm é o conteúdo do card */}
              <div className="relative z-[50] overflow-y-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
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
