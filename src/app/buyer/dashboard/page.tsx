"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  Receipt,
  User,
  Repeat,
} from "lucide-react";
import Image from "next/image";
import UnifiedDashboardHeader from "@/components/shared/UnifiedDashboardHeader";

// Mock data
const mockOrders = [
  {
    id: 1,
    product: { name: "Tomate Fresco", image: "/assets/imgs/tomate.jpeg" },
    quantity: 5,
    total: 250,
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: 2,
    product: { name: "Banana", image: "/assets/imgs/banana.jpeg" },
    quantity: 10,
    total: 500,
    status: "delivering",
    date: "2024-01-14",
  },
  {
    id: 3,
    product: { name: "Arroz", image: "/assets/imgs/arroz.jpeg" },
    quantity: 2,
    total: 2400,
    status: "completed",
    date: "2024-01-10",
  },
];

export default function BuyerDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const [orders] = useState(mockOrders);

  const stats = {
    totalSpent: orders.reduce((sum, o) => sum + (o.status === "completed" ? o.total : 0), 0),
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    delivering: orders.filter((o) => o.status === "delivering").length,
    completed: orders.filter((o) => o.status === "completed").length,
    disputes: 0,
  };

  if (!user) {
    router.push("/public/login");
    return null;
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <UnifiedDashboardHeader title="Dashboard do Cliente" />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            Olá, {user.numero}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie suas compras e acompanhe seus pedidos
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Gasto</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalSpent.toFixed(0)} MT
            </p>
          </div>

          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
            <div className="flex items-center justify-between mb-2">
              <Package className="w-8 h-8 text-yellow-600" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pendentes</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.pendingOrders}
            </p>
          </div>

          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
            <div className="flex items-center justify-between mb-2">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">A Caminho</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.delivering}
            </p>
          </div>

          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Concluídos</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.completed}
            </p>
          </div>

          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Disputas</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.disputes}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Orders */}
            <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Minhas Compras
              </h3>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image
                        src={order.product.image}
                        alt={order.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {order.product.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Qtd: {order.quantity} • {order.total} MT
                      </p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "delivering"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status === "completed"
                          ? "Concluído"
                          : order.status === "delivering"
                          ? "A Caminho"
                          : "Pendente"}
                      </span>
                      {order.status === "delivering" && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold">
                          Confirmar Recebido
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Tracking */}
            <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Acompanhamento de Entregas
              </h3>
              <div className="space-y-4">
                {orders
                  .filter((o) => o.status === "delivering")
                  .map((order) => (
                    <div key={order.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {order.product.name}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {order.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-green-600 rounded-full w-2/3"></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          66% Concluído
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Ações Rápidas
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push("/")}
                  className="w-full flex items-center gap-3 p-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Nova Compra
                </button>
                <button className="w-full flex items-center gap-3 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600">
                  <Receipt className="w-5 h-5" />
                  Ver Recibos
                </button>
                <button className="w-full flex items-center gap-3 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600">
                  <Repeat className="w-5 h-5" />
                  Repetir Compra
                </button>
              </div>
            </div>

            {/* Profile */}
            <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Perfil</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-white">Usuário {user.numero}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 dark:text-gray-400">Telefone:</span>
                  <span className="text-gray-900 dark:text-white">{user.numero}</span>
                </div>
                {user.province && (
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 dark:text-gray-400">Província:</span>
                    <span className="text-gray-900 dark:text-white">{user.province}</span>
                  </div>
                )}
                <button className="w-full mt-4 p-3 bg-gray-200 dark:bg-gray-700 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600">
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
