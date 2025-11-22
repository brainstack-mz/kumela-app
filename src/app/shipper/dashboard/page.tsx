"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import { Truck, Package, CheckCircle, AlertCircle, DollarSign } from "lucide-react";
import UnifiedDashboardHeader from "@/components/shared/UnifiedDashboardHeader";

const mockDeliveries = [
  { id: 1, product: "Tomate", from: "Nampula", to: "Maputo", status: "pending", price: 50 },
  { id: 2, product: "Banana", from: "Nampula", to: "Beira", status: "accepted", price: 75 },
  { id: 3, product: "Arroz", from: "Sofala", to: "Maputo", status: "completed", price: 60 },
];

export default function ShipperDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  const stats = {
    today: mockDeliveries.filter((d) => d.status === "accepted").length,
    pending: mockDeliveries.filter((d) => d.status === "pending").length,
    completed: mockDeliveries.filter((d) => d.status === "completed").length,
    disputes: 0,
    revenue: mockDeliveries.filter((d) => d.status === "completed").reduce((sum, d) => sum + d.price, 0),
  };

  if (!user) {
    router.push("/public/login");
    return null;
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <UnifiedDashboardHeader title="Dashboard do Transportador" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Olá, {user.numero}!</h2>
          <p className="text-gray-600 dark:text-gray-400">Gerencie suas entregas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
            <Truck className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Hoje</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.today}</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
            <Package className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pendentes</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
            <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Concluídas</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
            <AlertCircle className="w-8 h-8 text-red-600 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Disputas</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.disputes}</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
            <DollarSign className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Receita</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.revenue} MT</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Entregas Pendentes</h3>
            <div className="space-y-4">
              {mockDeliveries.filter((d) => d.status === "pending").map((delivery) => (
                <div key={delivery.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{delivery.product}</h4>
                    <span className="text-lg font-bold text-green-600">{delivery.price} MT</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{delivery.from} → {delivery.to}</p>
                  <button className="w-full mt-3 p-2 bg-green-600 text-white rounded-lg font-semibold">
                    Aceitar Entrega
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Entregas Aceites</h3>
            <div className="space-y-4">
              {mockDeliveries.filter((d) => d.status === "accepted").map((delivery) => (
                <div key={delivery.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{delivery.product}</h4>
                    <span className="text-lg font-bold text-green-600">{delivery.price} MT</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{delivery.from} → {delivery.to}</p>
                  <button className="w-full mt-3 p-2 bg-blue-600 text-white rounded-lg font-semibold">
                    Confirmar Entregue
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
