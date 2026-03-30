"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getUserByPhoneNumber } from '@/lib/users';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Tipos
export interface User {
  numero: string;
  password?: string;
  role: "admin" | "buyer" | "user" | "shipper";
  name?: string;
  province?: string;
  district?: string;
  photo?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  getUserByPhone: (phone: string) => User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('sgrc_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Falha ao carregar usuário do localStorage", error);
    } finally {
      // Pequeno delay para evitar o "flash" branco muito rápido e dar suavidade
      setTimeout(() => setLoading(false), 800);
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('sgrc_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sgrc_user');
  };

  const getUserByPhone = (phone: string): User | null => {
    return getUserByPhoneNumber(phone);
  };

  // TELA DE LOADING PROFISSIONAL
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          {/* Logo ou Icone da Kumela */}
          <div className="relative w-16 h-16 mb-6">
            <Image 
              src="/favicon.ico" 
              alt="Kumela Logo" 
              fill 
              className="object-contain"
            />
            {/* Spinner ao redor do logo */}
            <motion.div 
              className="absolute inset-0 border-4 border-slate-100 border-t-green-600 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </div>

          {/* Texto de Identidade */}
          <h2 className="text-lg font-black text-slate-800 tracking-tighter uppercase">
            KUMELA
          </h2>
          <div className="flex gap-1 mt-2">
             <motion.span 
               animate={{ opacity: [0, 1, 0] }} 
               transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
               className="w-1.5 h-1.5 bg-green-600 rounded-full"
             />
             <motion.span 
               animate={{ opacity: [0, 1, 0] }} 
               transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
               className="w-1.5 h-1.5 bg-green-500 rounded-full"
             />
             <motion.span 
               animate={{ opacity: [0, 1, 0] }} 
               transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
               className="w-1.5 h-1.5 bg-green-400 rounded-full"
             />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, getUserByPhone }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}