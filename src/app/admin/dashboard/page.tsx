// src/app/admin/dashboard/page.tsx
"use client";

import { Home, Users, Package, Clock, ShoppingBag, BarChartBig, TrendingUp, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import AdminRouteProtector from "@/components/AdminRouteProtector";
import { useAuth } from "@/context/AuthContext";
import MetricCard from "@/components/MetricCard";
import Link from "next/link";

// Dados simulados. Substitua por sua lógica real de API.
const mockData = {
  totalFarmers: 120,
  newFarmersThisWeek: 15,
  totalProducts: 450,
  newAdsToday: 10,
  pendingOrders: 25,
  totalSalesValue: "55,000.00 MZN",
};

// Dados de exemplo para o gráfico (substitua por dados reais)
const salesData = [
  { month: 'Jan', value: 1200 },
  { month: 'Fev', value: 1500 },
  { month: 'Mar', value: 1800 },
  { month: 'Abr', value: 1650 },
  { month: 'Mai', value: 2500 },
];

export default function Dashboard() {
  const { user } = useAuth();

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AdminRouteProtector>
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="bg-gray-50 rounded-2xl shadow-md p-6 lg:p-12 font-sans overflow-hidden"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Ola</h1>
        <p className="text-lg text-gray-500 mb-8">Bem-vindo(a), {user?.email.split('@')[0]}!</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total de Agricultores"
            value={mockData.totalFarmers}
            subtext={`${mockData.newFarmersThisWeek} novos esta semana`}
            icon={Users}
            bgColor="#2E7D32" 
            link="/admin/farmers"
          />
          <MetricCard
            title="Produtos Anunciados"
            value={mockData.totalProducts}
            subtext={`${mockData.newAdsToday} novos anúncios hoje`}
            icon={Package}
            bgColor="#1976D2"
            link="/admin/products/ads"
          />
          <MetricCard
            title="Pedidos Pendentes"
            value={mockData.pendingOrders}
            subtext="Aja agora para evitar atrasos"
            icon={Clock}
            bgColor="#FF9800" 
            link="/admin/products/orders"
          />
          <MetricCard
            title="Receita Total"
            value={mockData.totalSalesValue}
            subtext="Total em vendas concluídas"
            icon={DollarSign}
            bgColor="#4CAF50"
            link="/admin/report"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Seção de Análises e Gráficos */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><BarChartBig size={24} className="mr-2" /> Vendas e Anúncios Mensais</h2>
            {/* Aqui você pode renderizar seu componente de gráfico. Ex: */}
            {/* <SalesChart data={salesData} /> */}
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              [Placeholder para o gráfico de vendas]
            </div>
          </div>

          {/* Seção de Atividade Recente */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><TrendingUp size={24} className="mr-2" /> Atividade Recente</h2>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-700">
                <span className="p-2 bg-green-100 rounded-full mr-3"><Package size={16} className="text-green-600" /></span>
                <span className="flex-1">Novo anúncio de **milho** por **João**</span>
                <span className="text-sm text-gray-400">Há 5 min</span>
              </li>
              <li className="flex items-center text-gray-700">
                <span className="p-2 bg-blue-100 rounded-full mr-3"><ShoppingBag size={16} className="text-blue-600" /></span>
                <span className="flex-1">Novo pedido de **cebola** para **Maria**</span>
                <span className="text-sm text-gray-400">Há 15 min</span>
              </li>
              <li className="flex items-center text-gray-700">
                <span className="p-2 bg-yellow-100 rounded-full mr-3"><Clock size={16} className="text-yellow-600" /></span>
                <span className="flex-1">Pedido de **amendoim** atualizado para 'em andamento'</span>
                <span className="text-sm text-gray-400">Há 1 hora</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </AdminRouteProtector>
  );
}