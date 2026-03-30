// Tipos para dashboards

export interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
  status: "active" | "expired" | "pending";
  createdAt: string;
  category: string;
  description?: string;
  unit: string;
  quantity: number;
  location: string;
  discount?: number;
  image: string;
  userId?: string;
}

export interface Sale {
  id: number;
  product: string;
  productId: number;
  quantity: number;
  total: number;
  status: "pending" | "completed" | "delivering";
  paid: boolean;
  date: string;
  buyer: {
    name: string;
    phone: string;
  };
  transporter: {
    name: string;
    phone: string;
  };
}

export interface Order {
  id: number;
  product: {
    name: string;
    image: string;
    category: string;
    description: string;
  };
  user: {
    name: string;
    phone: string;
  };
  transporter: {
    name: string;
    phone: string;
  };
  quantity: number;
  total: number;
  status: "pending" | "delivering" | "completed";
  date: string;
  feedback: {
    rating: number;
    comment: string;
  } | null;
}

export interface Delivery {
  id: number;
  product: string;
  from: string;
  to: string;
  status: "pending" | "accepted" | "completed";
  price: number;
  user: {
    name: string;
    phone: string;
  };
  buyer: {
    name: string;
    phone: string;
  };
  date: string;
}

export interface Route {
  id: number;
  from: string;
  to: string;
  price: number;
}

export interface MonthlyStats {
  currentMonth: {
    sales: number;
    revenue: number;
    expenses: number;
    profit: number;
  };
  lastMonth: {
    sales: number;
    revenue: number;
    expenses: number;
    profit: number;
  };
}

