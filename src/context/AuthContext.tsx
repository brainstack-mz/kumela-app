 
 //context/AuthContext.tsx
 "use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { loginUser, USERS, getUserByPhoneNumber } from '@/lib/users';

// Tipos para o usuário e o contexto - compatível com users.ts
export interface User {
  numero: string;
  password?: string;
  role: "admin" | "buyer" | "seller" | "shipper";
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

  // Carrega o usuário do localStorage ao iniciar
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('sgrc_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Falha ao carregar usuário do localStorage", error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
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