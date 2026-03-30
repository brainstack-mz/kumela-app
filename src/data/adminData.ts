// Dados mockados para admin baseados em USERS
import { USERS } from "@/lib/users";
import { mockProducts, mockSales, mockDeliveries } from "./dashboardData";

// Calcular estatísticas reais baseadas nos dados
export const getAdminStats = () => {
  const totalUsers = USERS.length;
  const activeusers = USERS.filter(u => u.role === "user").length;
  const activeShippers = USERS.filter(u => u.role === "shipper").length;
  const activeBuyers = USERS.filter(u => u.role === "buyer").length;
  
  // Calcular transações baseadas em vendas completadas
  const transactions = mockSales.filter(s => s.status === "completed" && s.paid).length;
  
  // Disputas (mockado por enquanto)
  const disputes = 3;
  
  // Produtos ativos
  const activeProducts = mockProducts.filter(p => p.status === "active").length;

  return {
    totalUsers,
    activeusers,
    activeShippers,
    activeBuyers,
    transactions,
    disputes,
    activeProducts,
  };
};

// Obter todos os usuários por role
export const getUsersByRole = (role: "admin" | "buyer" | "user" | "shipper") => {
  return USERS.filter(u => u.role === role);
};

// Obter todos os produtos
export const getAllProducts = () => {
  return mockProducts;
};

// Obter todas as transações
export const getAllTransactions = () => {
  return mockSales;
};

// Obter todas as entregas
export const getAllDeliveries = () => {
  return mockDeliveries;
};

