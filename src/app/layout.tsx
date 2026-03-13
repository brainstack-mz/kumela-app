// src/app/layout.tsx ou onde estiver seu AppContent
"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import ScrollControls from "@/components/shared/ScrollControls";
import { SearchProvider } from "@/context/SearchContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "react-hot-toast"; 
import "./globals.css";

function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isLoginPage = pathname === "/public/login";
  const isCartPage = pathname === "/carrinho";
  const isDashboardPage = pathname.includes("/dashboard");
  const isAdminPath = pathname.startsWith("/admin");
  const isLegalPage = pathname === "/termos-de-uso" || pathname === "/politicas-de-privacidade";
  
  // Detecta se é a página de detalhes do produto (ex: /produtos/1)
  const isProductDetailPage = pathname.startsWith("/produtos/") && pathname !== "/produtos";
  
  const isPublicPage = !isAdminPath && !isDashboardPage && !isLoginPage;

  // REGRAS DE EXIBIÇÃO ATUALIZADAS
  // Esconde Header no Carrinho, Dashboards, Login e agora nos Detalhes do Produto
  const showHeader = isPublicPage && !isCartPage && !isProductDetailPage;
  
  // Esconde Footer no Carrinho, Páginas Legais, Dashboards e agora nos Detalhes do Produto
  const showFooter = isPublicPage && !isLegalPage && !isCartPage && !isProductDetailPage;
  
  // Esconde ScrollControls nos Detalhes do Produto conforme solicitado
  const showScrollControls = isPublicPage && !isProductDetailPage;

  return (
    <>
      {showHeader && <Header />}

      <div className="flex flex-col flex-1">
        <main className={`${showHeader ? "pt-20" : "pt-0"} flex-1`}>
          {children}
        </main>
      </div>

      {showFooter && <Footer />}
      {showScrollControls && <ScrollControls />}

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
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