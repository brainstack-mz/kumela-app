'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 4000,
}) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-orange-500 text-white',
  };

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.3 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 right-4 z-50 max-w-sm"
        >
          <div className={`
            ${typeStyles[type]}
            px-4 py-3 rounded-lg shadow-lg
            flex items-center gap-3
            cursor-pointer
          `}
          onClick={onClose}
          >
            <span className="text-lg font-bold">{icons[type]}</span>
            <span className="flex-1 text-sm font-medium">{message}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="text-white hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
