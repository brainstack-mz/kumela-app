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
          className="fixed inset-0 z-[950] flex items-center justify-center bg-slate-900/40 dark:bg-black/60 backdrop-blur-[6px] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ paddingTop: '80px', paddingBottom: '20px' }}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md mx-auto"
            style={{ pointerEvents: "auto", maxHeight: 'calc(100vh - 100px)' }}
          >
            {/* Card Principal com Design Premium */}
            <div className="relative rounded-[32px] overflow-hidden bg-white dark:bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-slate-800">
              
              {/* Botão Fechar Estilizado (Igual ao Header) */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-[55] bg-gray-100/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full p-2.5
                           text-gray-500 dark:text-slate-400 hover:bg-red-500 dark:hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm"
                aria-label="Fechar"
              >
                <X size={18} strokeWidth={2.5} />
              </button>

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