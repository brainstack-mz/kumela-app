"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  Eye,
  Star,
  MessageCircle,
  Phone,
  User,
} from "lucide-react";
import Image from "next/image";
import UnifiedDashboardHeader from "@/components/shared/UnifiedDashboardHeader";
import { mockOrders } from "@/data/dashboardData";

export default function BuyerDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState({ rating: 0, comment: "" });

  const stats = {
    totalSpent: mockOrders.reduce((sum, o) => sum + (o.status === "completed" ? o.total : 0), 0),
    pendingOrders: mockOrders.filter((o) => o.status === "pending").length,
    delivering: mockOrders.filter((o) => o.status === "delivering").length,
    completed: mockOrders.filter((o) => o.status === "completed").length,
    disputes: 0,
  };

  const getUserDisplayName = () => {
    return user?.name || user?.numero || "Usuário";
  };

  if (!user) {
    router.push("/public/login");
    return null;
  }

  const handleConfirmReceipt = (orderId: number) => {
    if (confirm("Confirmar que recebeu este produto?")) {
      console.log("Confirmar recebimento:", orderId);
      alert("Recebimento confirmado! Agora você pode dar feedback.");
      setShowFeedbackModal(true);
      setSelectedOrder(orderId);
    }
  };

  const handleSubmitFeedback = () => {
    if (feedbackData.rating === 0) {
      alert("Por favor, selecione uma avaliação!");
      return;
    }
    console.log("Feedback enviado:", feedbackData);
    alert("Feedback enviado com sucesso!");
    setShowFeedbackModal(false);
    setFeedbackData({ rating: 0, comment: "" });
    setSelectedOrder(null);
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <UnifiedDashboardHeader title="Dashboard do Cliente" />

      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            Olá, {getUserDisplayName()}!
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Gerencie suas compras e acompanhe seus pedidos
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow`}>
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Total Gasto</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalSpent.toFixed(0)} MT
            </p>
          </div>

          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow`}>
            <div className="flex items-center justify-between mb-2">
              <Package className="w-8 h-8 text-yellow-600" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pendentes</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.pendingOrders}
            </p>
          </div>

          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow`}>
            <div className="flex items-center justify-between mb-2">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">A Caminho</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.delivering}
            </p>
          </div>

          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow`}>
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Concluídos</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.completed}
            </p>
          </div>

          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow`}>
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
          <div className="lg:col-span-2 space-y-6">
            {/* My Orders */}
            <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md`}>
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Minhas Compras
            </h3>
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    <div className="relative w-full sm:w-20 h-48 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={order.product.image}
                        alt={order.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                            {order.product.name}
                          </h4>
                          <p className="text-sm text-gray-500">{order.product.category}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : order.status === "delivering"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                        >
                          {order.status === "completed"
                            ? "Concluído"
                            : order.status === "delivering"
                            ? "A Caminho"
                            : "Pendente"}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {order.product.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-gray-500">Quantidade:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white">{order.quantity}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Total:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white">{order.total} MT</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Data:</span>
                          <span className="ml-2 text-gray-900 dark:text-white">{order.date}</span>
                        </div>
                      </div>

                      {/* Informações do Vendedor e Transportador */}
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600 dark:text-gray-400">Vendedor:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{order.seller.name}</span>
                            <button
                              onClick={() => window.location.href = `tel:${order.seller.phone}`}
                              className="ml-2 p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                              title="Ligar"
                            >
                              <Phone className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600 dark:text-gray-400">Transportador:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{order.transporter.name}</span>
                            <button
                              onClick={() => window.location.href = `tel:${order.transporter.phone}`}
                              className="ml-2 p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                              title="Ligar"
                            >
                              <Phone className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => setSelectedOrder(order.id === selectedOrder ? null : order.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          <Eye className="w-4 h-4" />
                          {selectedOrder === order.id ? "Ocultar Detalhes" : "Ver Detalhes"}
                        </button>
                        {order.status === "delivering" && (
                          <button
                            onClick={() => handleConfirmReceipt(order.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Confirmar Recebido
                          </button>
                        )}
                        {order.status === "completed" && !order.feedback && (
                          <button
                            onClick={() => {
                              setSelectedOrder(order.id);
                              setShowFeedbackModal(true);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-700"
                          >
                            <Star className="w-4 h-4" />
                            Dar Feedback
                          </button>
                        )}
                        {order.feedback && (
                          <div className="flex items-center gap-1 px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-semibold">{order.feedback.rating}/5</span>
                          </div>
                        )}
                      </div>

                      {/* Detalhes Expandidos */}
                      {selectedOrder === order.id && (
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Detalhes Completos</h5>
                          <div className="space-y-2 text-sm">
                            <p><span className="text-gray-500">Categoria:</span> <span className="text-gray-900 dark:text-white">{order.product.category}</span></p>
                            <p><span className="text-gray-500">Descrição:</span> <span className="text-gray-900 dark:text-white">{order.product.description}</span></p>
                            <p><span className="text-gray-500">Vendedor:</span> <span className="text-gray-900 dark:text-white">{order.seller.name} ({order.seller.phone})</span></p>
                            <p><span className="text-gray-500">Transportador:</span> <span className="text-gray-900 dark:text-white">{order.transporter.name} ({order.transporter.phone})</span></p>
                            {order.feedback && (
                              <div className="mt-2 pt-2 border-t">
                                <p><span className="text-gray-500">Avaliação:</span> <span className="text-gray-900 dark:text-white">{order.feedback.rating}/5</span></p>
                                <p><span className="text-gray-500">Comentário:</span> <span className="text-gray-900 dark:text-white">{order.feedback.comment}</span></p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>

          {/* Sidebar - Ganhos e Perdas */}
          <div className="space-y-6">
            <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md`}>
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white">Ganhos e Perdas</h3>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Gasto</span>
                    <span className="text-lg font-bold text-red-600">{stats.totalSpent.toFixed(0)} MT</span>
                  </div>
                  <p className="text-xs text-gray-500">Total de compras</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Compras Concluídas</span>
                    <span className="text-lg font-bold text-green-600">{stats.completed}</span>
                  </div>
                  <p className="text-xs text-gray-500">Entregues com sucesso</p>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Em Andamento</span>
                    <span className="text-lg font-bold text-yellow-600">{stats.delivering + stats.pendingOrders}</span>
                  </div>
                  <p className="text-xs text-gray-500">Pendentes + A caminho</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Feedback */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Avaliar Compra</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Avaliação (1-5 estrelas)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFeedbackData({ ...feedbackData, rating })}
                      className={`p-2 rounded ${
                        feedbackData.rating >= rating
                          ? "bg-yellow-400 text-yellow-900"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                      }`}
                    >
                      <Star className="w-6 h-6" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Comentário (opcional)
                </label>
                <textarea
                  value={feedbackData.comment}
                  onChange={(e) => setFeedbackData({ ...feedbackData, comment: e.target.value })}
                  rows={4}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Deixe seu comentário sobre a compra..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => {
                  setShowFeedbackModal(false);
                  setFeedbackData({ rating: 0, comment: "" });
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Enviar Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
