"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Header from "@/components/shared/header";
import AdminHeader from "@/components/shared/adminHeader";
import Sidebar from "@/components/admin-components/Sidebar";
import Footer from "@/components/shared/footer";
import { SearchProvider } from "@/context/SearchContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";

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
  const isPublicPage = !isAdminPath && !isDashboardPage && !isLoginPage;

  const showAdminLayout = isAdminPath || isDashboardPage;
  const showSidebar = user?.role === "admin" && (isAdminPath || isDashboardPage);

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
            showAdminLayout ? "p-4 mt-4" : isPublicPage ? "pt-15" : " "
          } flex-1`}
        >
          {children}
        </main>
      </div>

      {isPublicPage && <Footer />}

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
