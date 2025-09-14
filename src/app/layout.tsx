// app/layout.tsx

"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Header from "@/components/universal-components/header";
import AdminHeader from "@/components/universal-components/adminHeader";
import Sidebar from "@/components/universal-components/Sidebar";
import Footer from "@/components/universal-components/footer";
import { SearchProvider } from "@/context/SearchContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";

import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isLoginPage = pathname === "/admin/login";
  const isAdminPage = pathname.startsWith("/admin") && !isLoginPage;
  const isPublicPage = !isAdminPage && !isLoginPage;

  // Lógica de renderização
  const showAdminLayout = isAdminPage;
  const showSidebar = isAdminPage && user?.role === "Administrador";

  return (
    <>
      {isPublicPage && <Header />}

      {showSidebar && (
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}

      {showAdminLayout && (
        <AdminHeader
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
      )}

      <div
        className={`flex flex-col flex-1 transition-all duration-300
          ${showSidebar ? (isSidebarOpen ? "md:ml-64" : "md:ml-20") : ""}
        `}
      >
        <main
          className={`${
            isAdminPage ? "p-4 mt-4" : isPublicPage ? "pt-24" : ""
          } flex-1`}
        >
          {children}
        </main>
      </div>

      {isPublicPage && <Footer />}
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
        <title>mozagro.co.mz</title>
      </head>
      <body className="min-h-screen flex flex-col bg-[#f8f9fa]">
        <AuthProvider>
          <SearchProvider>
            <AppContent>{children}</AppContent>
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  );
}