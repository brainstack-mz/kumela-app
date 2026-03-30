// app/admin/layout.tsx
"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Sidebar from "@/components/admin/Sidebar";
import UnifiedDashboardHeader from "@/components/shared/UnifiedDashboardHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* SIDEBAR FIXO */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      {/* HEADER FIXO */}
      <UnifiedDashboardHeader
         onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
         showSidebarToggle={true}
      />

      {/* CONTEÚDO DINÂMICO (As páginas como o seu Painel Geral) */}
      <main className={`transition-all duration-300 ${
        isSidebarOpen ? "md:ml-64" : "md:ml-20"
      }`} style={{ paddingTop: '64px' }}>
        {children}
      </main>
    </div>
  );
}