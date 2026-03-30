// src/lib/users.ts

export interface User {
  numero: string;
  password: string;
  role: "admin" | "buyer" | "user" | "shipper";
  name?: string;
  province?: string;
  district?: string;
}

// Interface global para o formulário SmartForm
export interface SmartFormData {
  name: string;
  phone: string;
  isRegistered: boolean;
  district: string;
  locality: string;
  category: string;
  stock: string;
  price: string;
  unit: string;
  images: string[];
  description: string;
  quantity: string; // Adicionado para resolver erro da imagem 97df22
}

export const DASHBOARD_URLS = {
  admin: "/admin/dashboard",
  buyer: "/user/dashboard",
  user: "/user/dashboard",
  shipper: "/user/dashboard",
};

export const USERS: User[] = [
  { numero: "841234567", password: "123456", role: "admin", name: "Admin User", province: "Nampula", district: "Nampula Cidade" },
  { numero: "842934326", password: "1234", role: "buyer", name: "João Cliente", province: "Nampula", district: "Nampula Cidade" },
  { numero: "861998877", password: "vendo123", role: "user", name: "Maria Vendedora", province: "Nampula", district: "Monapo" },
  { numero: "851112233", password: "transportador123", role: "shipper", name: "Carlos Transportador", province: "Nampula", district: "Mossuril" },
  { numero: "870570364", password: "123456", role: "buyer", name: "Lutyrano Etrice", province: "Nampula", district: "Meconta" },    
];

export const getUserByPhoneNumber = (phone: string): User | null => {
  const cleanPhone = phone.replace(/^\+258/, '').replace(/\D/g, '');
  return USERS.find(u => u.numero === cleanPhone) || null;
};

export const loginUser = (numero: string, password: string): User | null => {
  return USERS.find((u) => u.numero === numero && u.password === password) || null;
};