// src/app/admin/dashboard/page.tsx
"use client";

import {   Package, Clock, ShoppingBag, TrendingUp, Leaf, LayoutList } from "lucide-react";
import { motion } from "framer-motion";
import AdminRouteProtector from "@/components/admin-components/AdminRouteProtector";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import ViewContainer from "@/components/user-components/ViewContainer";

// Dados simulados para os cards e atividade recente
const dashboardData = {
  totalProducts: 12,
  pendingOrders: 5,
  completedOrders: 32,
  totalSales: 15400, // Meticais
  recentActivity: [
    { type: "new_ad", product: "milho", user: "João", time: "Há 5 min" },
    { type: "new_order", product: "cebola", user: "Maria", time: "Há 15 min" },
    { type: "order_update", product: "amendoim", status: "em andamento", time: "Há 1 hora" },
  ]
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <AdminRouteProtector>
      <ViewContainer>
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="rounded-2xl p-6 lg:p-8 font-sans overflow-hidden" // Removi o bg-gray-50 e a sombra
        >
          {/* Seção do Cabeçalho e Total de Vendas */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Painel do Vendedor</h1>
              <p className="text-sm sm:text-base text-gray-500">Bem-vindo(a), {user?.role.split('@')[0]}!</p>
            </div>
            {/* Card de Vendas Totais (agora no topo) */}
            <div className="flex flex-col items-end">
              <span className="text-xl sm:text-2xl font-extrabold text-[#4CAF50]">MZN {dashboardData.totalSales.toLocaleString()}</span>
              <p className="mt-1 text-xs text-gray-500">Total de Vendas</p>
            </div>
          </div>
          
          {/* Seção de Cards Informativos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Card de Anunciar */}
            <Link href="/seller/products/new-ad" passHref>
              <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer text-center h-40">
                <Leaf size={40} className="text-[#4CAF50] mb-2"/>
                <span className="text-base font-semibold text-gray-900">Anunciar</span>
                <p className="mt-1 text-xs text-gray-500">Adicione um novo produto.</p>
              </div>
            </Link>

            {/* Card de Meus Anúncios */}
            <Link href="/seller/products/my-products" passHref>
              <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer text-center h-40">
                <LayoutList size={40} className="text-gray-500 mb-2"/>
                <span className="text-3xl font-bold text-gray-900">{dashboardData.totalProducts}</span>
                <p className="mt-1 text-sm text-gray-500">Meus Anúncios</p>
              </div>
            </Link>

            {/* Card de Pedidos Pendentes */}
            <Link href="/seller/products/pending" passHref>
              <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer text-center h-40">
                <Clock size={40} className="text-yellow-500 mb-2"/>
                <span className="text-3xl font-bold text-gray-900">{dashboardData.pendingOrders}</span>
                <p className="mt-1 text-sm text-gray-500">Pedidos Pendentes</p>
              </div>
            </Link>

            {/* Card de Pedidos Concluídos */}
            <Link href="/seller/products/completed" passHref>
              <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer text-center h-40">
                <ShoppingBag size={40} className="text-green-600 mb-2"/>
                <span className="text-3xl font-bold text-gray-900">{dashboardData.completedOrders}</span>
                <p className="mt-1 text-sm text-gray-500">Vendas Concluídas</p>
              </div>
            </Link>
          </div>

          <hr className="my-8 border-gray-200" />

          {/* Seção de Atividade Recente */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><TrendingUp size={24} className="mr-2 text-blue-600" /> Atividade Recente</h2>
            <ul className="space-y-4">
              {dashboardData.recentActivity.map((activity, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className={`p-2 rounded-full mr-3 ${activity.type === "new_ad" ? "bg-green-100" : activity.type === "new_order" ? "bg-blue-100" : "bg-yellow-100"}`}>
                    {activity.type === "new_ad" && <Package size={16} className="text-green-600" />}
                    {activity.type === "new_order" && <ShoppingBag size={16} className="text-blue-600" />}
                    {activity.type === "order_update" && <Clock size={16} className="text-yellow-600" />}
                  </span>
                  <span className="flex-1">
                    {activity.type === "new_ad" && `Novo anúncio de **${activity.product}** por **${activity.user}**`}
                    {activity.type === "new_order" && `Novo pedido de **${activity.product}** para **${activity.user}**`}
                    {activity.type === "order_update" && `Pedido de **${activity.product}** atualizado para '${activity.status}'`}
                  </span>
                  <span className="text-sm text-gray-400">{activity.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </ViewContainer>
    </AdminRouteProtector>
  );
}