// src/lib/users.js
 
interface User {
  numero: string;
  password: string;
  role: "admin" | "buyer" | "seller" | "shipper";
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
  { numero: "841234567", password: "123456", role: "admin" },
  { numero: "842934326", password: "1234", role: "buyer" },
  { numero: "861998877", password: "vendo123", role: "seller" },
  { numero: "851112233", password: "transportador123", role: "shipper" },
];

export const loginUser = (numero: string, password: string): User | null => {
  const user = USERS.find(
    (u) => u.numero === numero && u.password === password
  );
  return user || null;
};
