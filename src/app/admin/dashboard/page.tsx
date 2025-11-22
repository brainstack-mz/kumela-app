"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import {
  Users,
  ShoppingBag,
  Truck,
  DollarSign,
  AlertCircle,
  Package,
  Settings,
  Edit,
  Trash2,
} from "lucide-react";
import UnifiedDashboardHeader from "@/components/shared/UnifiedDashboardHeader";
import Sidebar from "@/components/admin-components/Sidebar";
import { getAdminStats } from "@/data/adminData";

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

  if (!user || user.role !== "admin") {
    return null;
  }

  const stats = getAdminStats();

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
        <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8 max-w-7xl overflow-x-hidden">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-white">Painel Administrativo</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Gerencie o sistema completo</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow`}>
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-2" />
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Usuários</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow`}>
            <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mb-2" />
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Vendedores</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.activeSellers}</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow`}>
            <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mb-2" />
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Transportadores</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.activeShippers}</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow`}>
            <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 mb-2" />
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Transações</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.transactions}</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow`}>
            <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 mb-2" />
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Disputas</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.disputes}</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow`}>
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 mb-2" />
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Produtos</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.activeProducts}</p>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <button
            onClick={() => router.push("/admin/dashboard/users")}
            className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all text-left`}
          >
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-3" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Gestão de Usuários</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Clientes, Vendedores e Transportadores</p>
          </button>

          <button
            onClick={() => router.push("/admin/dashboard/products")}
            className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all text-left`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              <Edit className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Gestão de Produtos</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Editar ou remover produtos</p>
          </button>

          <button
            onClick={() => router.push("/admin/dashboard/transactions")}
            className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all text-left`}
          >
            <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 mb-3" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Transações</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Ver todas as transações e pagamentos</p>
          </button>

          <button
            onClick={() => router.push("/admin/dashboard/disputes")}
            className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all text-left`}
          >
            <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 mb-3" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Disputas</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Mediar disputas entre usuários</p>
          </button>

          <button
            onClick={() => router.push("/admin/dashboard/settings")}
            className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all text-left`}
          >
            <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 mb-3" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Configurações</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Configurar sistema, taxas e transportadoras</p>
          </button>

          <button
            onClick={() => router.push("/admin/dashboard/report")}
            className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all text-left`}
          >
            <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 mb-3" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Relatórios</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Relatórios financeiros e estatísticas</p>
          </button>

          <button
            onClick={() => router.push("/admin/dashboard/price-table")}
            className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all text-left`}
          >
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-3" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Tabela de Preços</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Gerenciar tabela de preços</p>
          </button>
        </div>
        </div>
      </main>
    </div>
  );
}
