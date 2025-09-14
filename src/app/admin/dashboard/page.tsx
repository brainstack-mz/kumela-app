// src/app/admin/dashboard/page.tsx

"use client";

import { Home, Users, Package, Clock, ShoppingBag, BarChartBig, TrendingUp, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import AdminRouteProtector from "@/components/AdminRouteProtector";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import ViewContainer from "@/components/universal-components/ViewContainer"; // Importa o ViewContainer

// Dados simulados (ainda podem ser úteis para a seção de atividade)
const mockData = {
  // ... (manter os dados para a seção de atividade)
};

export default function Dashboard() {
  const { user } = useAuth();

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AdminRouteProtector>
      <ViewContainer> 
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-gray-50 rounded-2xl shadow-md p-6 lg:p-12 font-sans overflow-hidden"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Painel de Administração</h1>
          <p className="text-lg text-gray-500 mb-8">Bem-vindo(a), {user?.role.split('@')[0]}! Escolha uma ação:</p>
          
          {/* Seção dos Botões de Ação */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
           
            <Link href="/admin/products/new-ad" passHref>
              <div className="flex flex-col items-center justify-center p-8 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 cursor-pointer">
                <Package size={48} />
                <span className="mt-4 text-2xl font-semibold">Anunciar</span>
              </div>
            </Link>
            <Link href="/admin/products/orders" passHref>
              <div className="flex flex-col items-center justify-center p-8 bg-yellow-500 text-white rounded-xl shadow-lg hover:bg-yellow-600 transition-colors duration-300 transform hover:scale-105 cursor-pointer">
                <Clock size={48} />
                <span className="mt-4 text-2xl font-semibold">Pedidos Pendentes</span>
              </div>
            </Link>
            <Link href="/admin/products/completed" passHref>
              <div className="flex flex-col items-center justify-center p-8 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105 cursor-pointer">
                <ShoppingBag size={48} />
                <span className="mt-4 text-2xl font-semibold">Pedidos Concluídos</span>
              </div>
            </Link>
          </div>

          <hr className="my-8 border-gray-200" />

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
        </motion.div>
      </ViewContainer>
    </AdminRouteProtector>
  );
}