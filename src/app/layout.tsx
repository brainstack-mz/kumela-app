"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import ScrollControls from "@/components/shared/ScrollControls";
import { SearchProvider } from "@/context/SearchContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast"; 
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // 1. Definição de Rotas Especiais
  const isLoginPage = pathname === "/public/login";
  const isCartPage = pathname === "/carrinho";
  const isAdminPath = pathname.startsWith("/admin");
  const isSellerPath = pathname.startsWith("/seller");  
  
  // 2. Identifica se é qualquer tipo de Dashboard (Admin ou Seller)
  const isDashboardArea = isAdminPath || isSellerPath || pathname.includes("/dashboard");

  const isLegalPage = pathname === "/termos-de-uso" || pathname === "/politicas-de-privacidade";
  const isProductDetailPage = pathname.startsWith("/produtos/") && pathname !== "/produtos";
  
  // 3. Uma página só é "pública" se não for área de login, admin ou seller
  const isPublicPage = !isAdminPath && !isSellerPath && !isLoginPage;

  // 4. Lógica de exibição de componentes globais (Header/Footer do site principal)
  const showHeader = isPublicPage && !isCartPage && !isProductDetailPage;
  const showFooter = isPublicPage && !isLegalPage && !isCartPage && !isProductDetailPage;
  const showScrollControls = isPublicPage && !isProductDetailPage;

  return (
    <>
      {/* O Header público some quando o usuário entra no Admin ou no Seller */}
      {showHeader && <Header />}

      <div className="flex flex-col flex-1">
        <main className="flex-1">
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
    <html lang="pt-br" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen flex flex-col bg-[#f8f9fa]">
        <ThemeProvider>
          <AuthProvider>
            <SearchProvider>
              <CartProvider> 
                <AppContent>{children}</AppContent>
              </CartProvider>
            </SearchProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}