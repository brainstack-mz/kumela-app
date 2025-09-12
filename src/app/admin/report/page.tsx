// app/admin/report/page.tsx
"use client";

import ViewContainer from "@/components/universal-components/ViewContainer";
import { motion } from "framer-motion";
import { BarChart, TrendingUp, Package, Leaf, Truck } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function ReportPage() {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <ViewContainer header="Relatórios e Análises">
        <div className="bg-white p-6 rounded-2xl shadow-lg mt-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Visão Geral dos Relatórios</h2>

          {/* Seção de Relatórios de Vendas e Mercado */}
          <div className="mb-8">
            <div className="flex items-center text-xl font-semibold text-gray-700 mb-4">
              <TrendingUp size={24} className="mr-2 text-green-600" />
              Relatórios de Vendas
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Desempenho de Vendas Mensais</h3>
                <p className="text-sm text-gray-500">
                  Gráfico de linha mostrando o crescimento das vendas ao longo do tempo.
                </p>
                <div className="mt-4 h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                  [Gráfico de Vendas Aqui]
                </div>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Produtos Mais Vendidos</h3>
                <p className="text-sm text-gray-500">
                  Gráfico de barras mostrando os produtos mais populares.
                </p>
                <div className="mt-4 h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                  [Gráfico de Top Produtos Aqui]
                </div>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Distribuição de Pedidos</h3>
                <p className="text-sm text-gray-500">
                  Gráfico de pizza com o status dos pedidos (concluídos, pendentes, etc.).
                </p>
                <div className="mt-4 h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                  [Gráfico de Pedidos Aqui]
                </div>
              </div>
            </div>
          </div>

          <hr className="my-8 border-gray-200" />

          {/* Seção de Relatórios de Logística e Usuários */}
          <div>
            <div className="flex items-center text-xl font-semibold text-gray-700 mb-4">
              <BarChart size={24} className="mr-2 text-green-600" />
              Relatórios Operacionais
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Atividade de Agricultores</h3>
                <p className="text-sm text-gray-500">
                  Tabela mostrando a quantidade de anúncios e vendas por agricultor.
                </p>
                <div className="mt-4 h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                  [Tabela de Agricultores Aqui]
                </div>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Relatório de Logística</h3>
                <p className="text-sm text-gray-500">
                  Detalhes sobre prazos de entrega e eficiência dos transportadores.
                </p>
                <div className="mt-4 h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                  [Gráfico de Logística Aqui]
                </div>
              </div>
            </div>
          </div>

        </div>
      </ViewContainer>
    </motion.div>
  );
}