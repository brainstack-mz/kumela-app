"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  DollarSign,
  Package,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Truck,
  Phone,
  X,
} from "lucide-react";
import UnifiedDashboardHeader from "@/components/shared/UnifiedDashboardHeader";
import NewProductModal from "@/components/products-seller/NewProductModal";
import EditProductModal from "@/components/products-seller/EditProductModal";
import ViewProductModal from "@/components/products-seller/ViewProductModal";
import { mockProducts, mockSales } from "@/data/dashboardData";
import { Product } from "@/types/dashboard";

// Calcular produtos expirados (7 dias sem confirmação)
const getExpiredProducts = () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  return mockSales.filter(sale => {
    if (sale.status !== "delivering") return false;
    const saleDate = new Date(sale.date);
    return saleDate < sevenDaysAgo;
  }).map(sale => sale.productId);
};

export default function SellerDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showViewProductModal, setShowViewProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductHistory, setSelectedProductHistory] = useState<number | null>(null);

  const expiredProductIds = getExpiredProducts();
  const expiredProducts = mockProducts.filter(p => expiredProductIds.includes(p.id));

  const stats = {
    totalSold: mockSales.reduce((sum, s) => sum + (s.status === "completed" && s.paid ? s.total : 0), 0),
    pendingSales: mockSales.filter((s) => s.status === "pending").length,
    pendingProducts: mockProducts.filter((p) => p.status === "active" && expiredProductIds.includes(p.id)).length,
    disputes: 0,
    activeProducts: mockProducts.filter((p) => p.status === "active" && !expiredProductIds.includes(p.id)).length,
    expiredProducts: expiredProducts.length,
  };

  const monthlyStats = {
    currentMonth: {
      sales: 12,
      revenue: 500,
      expenses: 200,
      profit: 300,
    },
    lastMonth: {
      sales: 8,
      revenue: 350,
      expenses: 150,
      profit: 200,
    },
  };

  const getUserDisplayName = () => {
    return user?.name || user?.numero || "Usuário";
  };

  // Use useEffect to handle navigation
  React.useEffect(() => {
    if (!user) {
      router.push("/public/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleDeleteProduct = (id: number) => {
    if (confirm("Tem certeza que deseja eliminar este produto?")) {
      console.log("Eliminar produto:", id);
      alert("Produto eliminado com sucesso!");
    }
  };

  const handleDeleteSale = (id: number) => {
    if (confirm("Tem certeza que deseja eliminar esta venda?")) {
      console.log("Eliminar venda:", id);
      alert("Venda eliminada com sucesso!");
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowEditProductModal(true);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowViewProductModal(true);
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <UnifiedDashboardHeader title="Dashboard do Vendedor" />

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            Olá, {getUserDisplayName()}!
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Gerencie seus produtos e vendas</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow`}>
            <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mb-2" />
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Total Vendido</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSold.toFixed(0)} MT</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow`}>
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 mb-2" />
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Vendas Pendentes</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.pendingSales}</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow`}>
            <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 mb-2" />
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Produtos Pendentes</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.pendingProducts}</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow`}>
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mb-2" />
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Produtos Ativos</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.activeProducts}</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow`}>
            <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 mb-2" />
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Expirados</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.expiredProducts}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Meus Produtos */}
            <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Meus Produtos</h3>
                <button 
                  onClick={() => setShowNewProductModal(true)} 
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  Adicionar
                </button>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {mockProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    {product.image && (
                      <div className="relative w-full sm:w-20 h-32 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0 w-full sm:w-auto">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{product.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Stock: {product.stock} • {product.price} MT • {product.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                        product.status === "active" && !expiredProductIds.includes(product.id)
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }`}>
                        {product.status === "active" && !expiredProductIds.includes(product.id) ? "Ativo" : "Expirado"}
                      </span>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button
                          onClick={() => {
                            setSelectedProductHistory(product.id);
                            handleViewProduct(product);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg"
                          title="Ver Histórico"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vendas Recebidas */}
            <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md`}>
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white">Vendas Recebidas</h3>
              <div className="space-y-3 sm:space-y-4">
                {mockSales.map((sale) => (
                  <div 
                    key={sale.id} 
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <div className="flex-1 min-w-0 w-full sm:w-auto">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{sale.product}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Qtd: {sale.quantity} • {sale.total} MT • {sale.date}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Comprador: {sale.buyer.name} ({sale.buyer.phone})
                      </p>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                        sale.paid 
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}>
                        {sale.paid ? "Pago" : "Pendente"}
                      </span>
                      <button
                        onClick={() => handleDeleteSale(sale.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Histórico de Produto */}
            {selectedProductHistory && (
              <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Histórico do Produto</h3>
                  <button
                    onClick={() => setSelectedProductHistory(null)}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {mockSales
                    .filter(s => s.productId === selectedProductHistory)
                    .map((sale) => (
                      <div key={sale.id} className="p-3 sm:p-4 border rounded-lg">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{sale.product}</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            sale.status === "completed" ? "bg-green-100 text-green-800" :
                            sale.status === "delivering" ? "bg-blue-100 text-blue-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {sale.status === "completed" ? "Concluído" :
                             sale.status === "delivering" ? "A Caminho" : "Pendente"}
                          </span>
                        </div>
                        <div className="space-y-2 text-xs sm:text-sm">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600 dark:text-gray-400">
                              Comprador: {sale.buyer.name} ({sale.buyer.phone})
                            </span>
                            <button 
                              onClick={() => window.location.href = `tel:${sale.buyer.phone}`}
                              className="ml-2 p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                            >
                              <Phone className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600 dark:text-gray-400">
                              Transportador: {sale.transporter.name} ({sale.transporter.phone})
                            </span>
                            <button 
                              onClick={() => window.location.href = `tel:${sale.transporter.phone}`}
                              className="ml-2 p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                            >
                              <Phone className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-gray-600 dark:text-gray-400">
                            Quantidade: {sale.quantity} • Total: {sale.total} MT • Data: {sale.date}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Estatísticas */}
          <div className="space-y-4 sm:space-y-6">
            <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md`}>
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white">Estatísticas</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Vendas este mês</span>
                  <span className="font-bold text-gray-900 dark:text-white">{monthlyStats.currentMonth.sales}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Receita Total</span>
                  <span className="font-bold text-green-600">{monthlyStats.currentMonth.revenue} MT</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Gastos</span>
                  <span className="font-bold text-red-600">{monthlyStats.currentMonth.expenses} MT</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-gray-900 dark:text-white font-semibold text-sm sm:text-base">Lucro</span>
                  <span className="font-bold text-green-600">{monthlyStats.currentMonth.profit} MT</span>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">Por Mês</span>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Janeiro 2024</span>
                      <span className="font-semibold">{monthlyStats.currentMonth.revenue} MT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Dezembro 2023</span>
                      <span className="font-semibold">{monthlyStats.lastMonth.revenue} MT</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => router.push("/seller/dashboard/profile")}
                  className="w-full mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  Ver Perfil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modais */}
      <NewProductModal
        isOpen={showNewProductModal}
        onClose={() => setShowNewProductModal(false)}
        onSuccess={() => {
          console.log("Produto criado com sucesso!");
        }}
      />
      {selectedProduct && (
        <>
          <EditProductModal
            isOpen={showEditProductModal}
            onClose={() => {
              setShowEditProductModal(false);
              setSelectedProduct(null);
            }}
            product={selectedProduct}
            onSuccess={() => {
              setShowEditProductModal(false);
              setSelectedProduct(null);
            }}
          />
          <ViewProductModal
            isOpen={showViewProductModal}
            onClose={() => {
              setShowViewProductModal(false);
              setSelectedProduct(null);
            }}
            product={selectedProduct}
          />
        </>
      )}
    </div>
  );
}
