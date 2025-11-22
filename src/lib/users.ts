// src/lib/users.js
 
export interface User {
  numero: string;
  password: string;
  role: "admin" | "buyer" | "seller" | "shipper";
  name?: string;
  province?: string;
  district?: string;
}

// Mapeamento de papéis para URLs de redirecionamento
// Isso torna o redirecionamento centralizado e fácil de manter.
export const DASHBOARD_URLS = {
  admin: "/admin/dashboard",
  buyer: "/buyer/dashboard",
  seller: "/seller/dashboard",
  shipper: "/shipper/dashboard",
};

 
export const USERS: User[] = [
  { numero: "841234567", password: "123456", role: "admin", name: "Admin User", province: "Nampula", district: "Nampula Cidade" },
  { numero: "842934326", password: "1234", role: "buyer", name: "João Cliente", province: "Nampula", district: "Nampula Cidade" },
  { numero: "861998877", password: "vendo123", role: "seller", name: "Maria Vendedora", province: "Nampula", district: "Monapo" },
  { numero: "851112233", password: "transportador123", role: "shipper", name: "Carlos Transportador", province: "Nampula", district: "Mossuril" },
  { numero: "841112233", password: "123456", role: "buyer", name: "Ana Compradora", province: "Nampula", district: "Angoche" },
  { numero: "842223344", password: "123456", role: "buyer", name: "Pedro Cliente", province: "Nampula", district: "Moma" },
  { numero: "843334455", password: "123456", role: "seller", name: "Sofia Vendedora", province: "Nampula", district: "Mecuburi" },
  { numero: "844445566", password: "123456", role: "shipper", name: "Lucas Transportador", province: "Nampula", district: "Meconta" },
];

// Função para obter usuário por número
export const getUserByPhoneNumber = (phone: string): User | null => {
  const cleanPhone = phone.replace(/^\+258/, '').replace(/\D/g, '');
  return USERS.find(u => u.numero === cleanPhone) || null;
};

export const loginUser = (numero: string, password: string): User | null => {
  const user = USERS.find(
    (u) => u.numero === numero && u.password === password
  );
  return user || null;
};
