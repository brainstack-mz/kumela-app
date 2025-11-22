"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import { 
  Truck, 
  Package, 
  CheckCircle, 
  AlertCircle, 
  DollarSign,
  Plus,
  Edit,
  Phone,
  User,
  MapPin,
  X,
} from "lucide-react";
import UnifiedDashboardHeader from "@/components/shared/UnifiedDashboardHeader";
import { mockDeliveries, mockRoutes, nampulaDistricts } from "@/data/dashboardData";

export default function ShipperDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [editingRoute, setEditingRoute] = useState<number | null>(null);
  const [routeForm, setRouteForm] = useState({ from: "", to: "", price: "" });

  const stats = {
    today: mockDeliveries.filter((d) => d.status === "accepted").length,
    pending: mockDeliveries.filter((d) => d.status === "pending").length,
    completed: mockDeliveries.filter((d) => d.status === "completed").length,
    disputes: 0,
    revenue: mockDeliveries.filter((d) => d.status === "completed").reduce((sum, d) => sum + d.price, 0),
  };

  const getUserDisplayName = () => {
    return user?.name || user?.numero || "Usuário";
  };

  if (!user) {
    router.push("/public/login");
    return null;
  }

  const handleAcceptDelivery = (id: number) => {
    if (confirm("Aceitar esta entrega?")) {
      console.log("Aceitar entrega:", id);
      alert("Entrega aceita com sucesso!");
    }
  };

  const handleConfirmDelivery = (id: number) => {
    if (confirm("Confirmar que a entrega foi concluída?")) {
      console.log("Confirmar entrega:", id);
      alert("Entrega confirmada com sucesso!");
    }
  };

  const handleOpenRouteModal = (route?: typeof mockRoutes[0]) => {
    if (route) {
      setEditingRoute(route.id);
      setRouteForm({ from: route.from, to: route.to, price: route.price.toString() });
    } else {
      setEditingRoute(null);
      setRouteForm({ from: "", to: "", price: "" });
    }
    setShowRouteModal(true);
  };

  const handleSaveRoute = () => {
    if (!routeForm.from || !routeForm.to || !routeForm.price) {
      alert("Preencha todos os campos!");
      return;
    }
    if (routeForm.from === routeForm.to) {
      alert("O destino deve ser diferente da origem!");
      return;
    }
    console.log(editingRoute ? "Atualizar rota:" : "Cadastrar rota:", routeForm);
    alert(editingRoute ? "Rota atualizada com sucesso!" : "Rota cadastrada com sucesso!");
    setShowRouteModal(false);
    setRouteForm({ from: "", to: "", price: "" });
    setEditingRoute(null);
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <UnifiedDashboardHeader title="Dashboard do Transportador" />

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            Olá, {getUserDisplayName()}!
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Gerencie suas entregas e rotas</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow`}>
            <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-2" />
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Hoje</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.today}</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow`}>
            <Package className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pendentes</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow`}>
            <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Concluídas</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow`}>
            <AlertCircle className="w-8 h-8 text-red-600 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Disputas</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.disputes}</p>
          </div>
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow`}>
            <DollarSign className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Receita</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.revenue} MT</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Entregas Pendentes */}
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md`}>
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white">Entregas Pendentes</h3>
            <div className="space-y-4">
              {mockDeliveries.filter((d) => d.status === "pending").map((delivery) => (
                <div key={delivery.id} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{delivery.product}</h4>
                    <span className="text-lg font-bold text-green-600">{delivery.price} MT</span>
                  </div>
                  <div className="space-y-2 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {delivery.from} → {delivery.to}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Vendedor: {delivery.seller.name}
                      </span>
                      <button
                        onClick={() => window.location.href = `tel:${delivery.seller.phone}`}
                        className="ml-2 p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Cliente: {delivery.buyer.name}
                      </span>
                      <button
                        onClick={() => window.location.href = `tel:${delivery.buyer.phone}`}
                        className="ml-2 p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAcceptDelivery(delivery.id)}
                    className="w-full p-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                  >
                    Aceitar Entrega
                  </button>
                </div>
              ))}
              {mockDeliveries.filter((d) => d.status === "pending").length === 0 && (
                <p className="text-gray-500 text-center py-4">Nenhuma entrega pendente</p>
              )}
            </div>
          </div>

          {/* Entregas Aceites */}
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md`}>
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white">Entregas Aceites</h3>
            <div className="space-y-4">
              {mockDeliveries.filter((d) => d.status === "accepted").map((delivery) => (
                <div key={delivery.id} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{delivery.product}</h4>
                    <span className="text-lg font-bold text-green-600">{delivery.price} MT</span>
                  </div>
                  <div className="space-y-2 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {delivery.from} → {delivery.to}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Vendedor: {delivery.seller.name}
                      </span>
                      <button
                        onClick={() => window.location.href = `tel:${delivery.seller.phone}`}
                        className="ml-2 p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Cliente: {delivery.buyer.name}
                      </span>
                      <button
                        onClick={() => window.location.href = `tel:${delivery.buyer.phone}`}
                        className="ml-2 p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleConfirmDelivery(delivery.id)}
                    className="w-full p-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Confirmar Entregue
                  </button>
                </div>
              ))}
              {mockDeliveries.filter((d) => d.status === "accepted").length === 0 && (
                <p className="text-gray-500 text-center py-4">Nenhuma entrega aceite</p>
              )}
            </div>
          </div>
        </div>

        {/* Ganhos e Perdas */}
        <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md mt-4 sm:mt-6`}>
          <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white">Ganhos e Perdas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total de Ganhos</span>
                <span className="text-lg font-bold text-green-600">{stats.revenue} MT</span>
              </div>
              <p className="text-xs text-gray-500">Entregas concluídas</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">Entregas Hoje</span>
                <span className="text-lg font-bold text-blue-600">{stats.today}</span>
              </div>
              <p className="text-xs text-gray-500">Em andamento</p>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">Pendentes</span>
                <span className="text-lg font-bold text-yellow-600">{stats.pending}</span>
              </div>
              <p className="text-xs text-gray-500">Aguardando aceitação</p>
            </div>
          </div>
        </div>

        {/* Rotas Cadastradas */}
        <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md mt-4 sm:mt-6`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Rotas Cadastradas</h3>
            <button
              onClick={() => handleOpenRouteModal()}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
            >
              <Plus className="w-5 h-5" />
              Cadastrar Nova Rota
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockRoutes.map((route) => (
              <div
                key={route.id}
                className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {route.from} → {route.to}
                    </span>
                  </div>
                  <button
                    onClick={() => handleOpenRouteModal(route)}
                    className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 rounded"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-lg font-bold text-green-600">{route.price} MT</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Cadastro/Edição de Rota */}
      {showRouteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {editingRoute ? "Editar Rota" : "Cadastrar Nova Rota"}
              </h3>
              <button
                onClick={() => {
                  setShowRouteModal(false);
                  setRouteForm({ from: "", to: "", price: "" });
                  setEditingRoute(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Origem (Distrito) <span className="text-red-500">*</span>
                </label>
                <select
                  value={routeForm.from}
                  onChange={(e) => setRouteForm({ ...routeForm, from: e.target.value })}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Selecione o distrito de origem</option>
                  {nampulaDistricts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Destino (Distrito) <span className="text-red-500">*</span>
                </label>
                <select
                  value={routeForm.to}
                  onChange={(e) => setRouteForm({ ...routeForm, to: e.target.value })}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Selecione o distrito de destino</option>
                  {nampulaDistricts
                    .filter((district) => district !== routeForm.from)
                    .map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preço (MT) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={routeForm.price}
                  onChange={(e) => setRouteForm({ ...routeForm, price: e.target.value })}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Ex: 50"
                  min="0"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => {
                  setShowRouteModal(false);
                  setRouteForm({ from: "", to: "", price: "" });
                  setEditingRoute(null);
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveRoute}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {editingRoute ? "Atualizar" : "Cadastrar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
