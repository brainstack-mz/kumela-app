 
 //context/AuthContext.tsx
 "use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Tipos para o usuário e o contexto
interface User {
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
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

  if (loading) {
    // Opcional: Mostre uma tela de carregamento enquanto o estado é restaurado
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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