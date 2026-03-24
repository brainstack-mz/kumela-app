"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";

// Componentes Essenciais
import UnifiedDashboardHeader from "@/components/shared/UnifiedDashboardHeader";
import Sidebar from "@/components/admin-components/Sidebar";

export default function AdminDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/public/login");
    }
  }, [user, router]);

  if (!user || user.role !== "admin") return null;

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <UnifiedDashboardHeader
         onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
         showSidebarToggle={true}
      />

      <main className={`min-h-screen transition-all duration-300 ${
        isSidebarOpen ? "md:ml-64" : "md:ml-20"
      }`} style={{ paddingTop: '64px' }}>
        
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-90">
              Tela de Ludy
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              (chamar cards aqui)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {/* Espaço reservado para os componentes de card futuramente */}
          </div>
        </div>
      </main>
    </div>
  );
}