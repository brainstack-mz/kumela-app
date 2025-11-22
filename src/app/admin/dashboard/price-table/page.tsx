"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import UnifiedDashboardHeader from "@/components/shared/UnifiedDashboardHeader";
import Sidebar from "@/components/admin-components/Sidebar";
import PriceTable from "@/data/priceTable";

export default function AdminPriceTablePage() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showPriceTable, setShowPriceTable] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/public/login");
      return;
    }
  }, [user, router]);

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <UnifiedDashboardHeader
        title="Painel Administrativo"
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        showSidebarToggle={true}
      />
      <main className={`min-h-screen transition-all duration-300 ${
        isSidebarOpen ? "md:ml-64" : "md:ml-20"
      }`} style={{ paddingTop: '64px' }}>
        <div className="h-[calc(100vh-64px)] overflow-hidden">
          {showPriceTable && (
            <PriceTable onClose={() => router.push("/admin/dashboard")} />
          )}
        </div>
      </main>
    </div>
  );
}

