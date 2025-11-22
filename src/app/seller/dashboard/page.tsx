"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import {
  DollarSign,
  Package,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
} from "lucide-react";
import UnifiedDashboardHeader from "@/components/shared/UnifiedDashboardHeader";

const mockProducts = [
  { id: 1, name: "Tomate", stock: 25, price: 50, status: "active" },
  { id: 2, name: "Banana", stock: 100, price: 250, status: "active" },
  { id: 3, name: "Arroz", stock: 230, price: 1200, status: "expired" },
];

const mockSales = [
  { id: 1, product: "Tomate", quantity: 5, total: 250, status: "pending", date: "2024-01-15" },
  { id: 2, product: "Banana", quantity: 10, total: 500, status: "completed", date: "2024-01-14" },
];

export default function SellerDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  const stats = {
    totalSold: mockSales.reduce((sum, s) => sum + (s.status === "completed" ? s.total : 0), 0),
    pendingSales: mockSales.filter((s) => s.status === "pending").length,
    disputes: 0,
    activeProducts: mockProducts.filter((p) => p.status === "active").length,
    expiredProducts: mockProducts.filter((p) => p.status === "expired").length,
  };

  if (!user) {
    router.push("/public/login");
    return null;
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <UnifiedDashboardHeader title="Dashboard do Vendedor" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Olá, {user.numero}!</h2>
          <p className="text-gray-600 dark:text-gray-400">Gerencie seus produtos e vendas</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
            <DollarSign className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Vendido</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSold.toFixed(0)} MT</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
            <Package className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Vendas Pendentes</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pendingSales}</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
            <AlertCircle className="w-8 h-8 text-red-600 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Disputas</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.disputes}</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
            <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Produtos Ativos</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeProducts}</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
            <XCircle className="w-8 h-8 text-gray-600 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Expirados</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.expiredProducts}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Meus Produtos</h3>
                <button onClick={() => router.push("/seller/products/new-ad")} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold">
                  <Plus className="w-5 h-5" />
                  Adicionar
                </button>
              </div>
              <div className="space-y-4">
                {mockProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{product.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Stock: {product.stock} • {product.price} MT</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {product.status === "active" ? "Ativo" : "Expirado"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Vendas Recebidas</h3>
              <div className="space-y-4">
                {mockSales.map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{sale.product}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Qtd: {sale.quantity} • {sale.total} MT</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      sale.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {sale.status === "completed" ? "Pago" : "Pendente"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Estatísticas</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Vendas este mês</span>
                  <span className="font-bold text-gray-900 dark:text-white">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Receita</span>
                  <span className="font-bold text-green-600">{stats.totalSold} MT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
