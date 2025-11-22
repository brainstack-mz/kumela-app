"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Header from "@/components/shared/header";
import AdminHeader from "@/components/shared/adminHeader";
import Sidebar from "@/components/admin-components/Sidebar";
import Footer from "@/components/shared/footer";
import { SearchProvider } from "@/context/SearchContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

import "./globals.css";

import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast"; 

const inter = Inter({ subsets: ["latin"] });

function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isLoginPage = pathname === "/public/login";
  const isDashboardPage = pathname.endsWith("/dashboard");
  const isAdminPath = pathname.startsWith("/admin");
  
  // === NOVO: Identifica páginas legais que devem ter APENAS o Header ===
  const isLegalPage = pathname === "/termos-de-uso" || pathname === "/politicas-de-privacidade";
  
  // Páginas públicas agora incluem as páginas legais, mas excluem o login
  const isPublicPage = !isAdminPath && !isDashboardPage && !isLoginPage;
  
  // Sidebar apenas para admin (mas não renderiza AdminHeader aqui, cada dashboard gerencia seu próprio header)
  const showSidebar = false; // Desabilitado - cada dashboard gerencia seu próprio sidebar

  // O Header Público é exibido em todas as páginas públicas (incluindo legais)
  const showHeader = isPublicPage;
  
  // O Footer só é exibido se for uma página pública E NÃO for uma página legal
  const showFooter = isPublicPage && !isLegalPage;

  return (
    <>
      {showHeader && <Header />}


      <div
        className={`flex flex-col flex-1 transition-all duration-300
          ${showSidebar ? (isSidebarOpen ? "md:ml-64" : "md:ml-20") : ""}
        `}
      >
        <main
          className={`${
            showHeader ? "pt-20" : " "
          } flex-1`}
        >
          {children}
        </main>
      </div>

      {/* === LÓGICA ATUALIZADA: Footer só aparece se NÃO for uma página legal === */}
      {showFooter && <Footer />}

      {/* Toaster para notificações */}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={inter.className}>
      <head>
        <title>kumela.co.mz</title>
      </head>
      <body className="min-h-screen flex flex-col bg-[#f8f9fa]">
        <ThemeProvider>
          <AuthProvider>
            <SearchProvider>
              <AppContent>{children}</AppContent>
            </SearchProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}