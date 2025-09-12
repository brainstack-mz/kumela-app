// app/layout.tsx

"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Header from "@/components/universal-components/header";
import AdminHeader from "@/components/universal-components/adminHeader";
import Sidebar from "@/components/universal-components/Sidebar";
import Footer from "@/components/universal-components/footer";
import { SearchProvider } from "@/context/SearchContext";

import "./globals.css";

import { Inter } from "next/font/google";

// Adicione a importação do AuthProvider
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isLoginPage = pathname === "/admin/login";
  const isAdminPage = pathname.startsWith("/admin") && !isLoginPage;
  const isPublicPage = !isAdminPage && !isLoginPage;

  return (
    <html lang="pt-br" className={inter.className}>
      <head>
        <title>mozagro.co.mz</title>
      </head>
      <body className="min-h-screen flex flex-col bg-[#f8f9fa]">
        {/* Envolva todo o corpo com o AuthProvider */}
        <AuthProvider>
          <SearchProvider>
            {isPublicPage && <Header />}

            {isAdminPage && (
              <Sidebar
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
              />
            )}

            <div
              className={`flex flex-col flex-1 transition-all duration-300
        ${isAdminPage ? (isSidebarOpen ? "md:ml-64" : "md:ml-20") : ""}
      `}
            >
              {isAdminPage && (
                <AdminHeader
                  onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  isSidebarOpen={isSidebarOpen}
                />
              )}
              <main
                className={`${
                  isAdminPage ? "p-4 mt-4" : isPublicPage ? "pt-24" : ""
                } flex-1`}
              >
                {children}
              </main>
            </div>

            {isPublicPage && <Footer />}
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
