// ─────────────────────────────────────────────────────────────────────────────
// types/index.ts — Tipos globais do projecto KUmela
// ─────────────────────────────────────────────────────────────────────────────

// ── Utilizadores ─────────────────────────────────────────────────────────────

export type UserRole = "admin" | "buyer" | "user" | "shipper";

export interface User {
  numero:    string;
  password:  string;
  role:      UserRole;
  name?:     string;
  province?: string;
  district?: string;
  avatar?:   string;       // URL opcional da foto de perfil
  active?:   boolean;      // conta activa ou suspensa
  createdAt?: string;      // data de registo ISO
}

// ── Produtos ─────────────────────────────────────────────────────────────────

export type ProductCategory =
  | "Verduras"
  | "Legumes"
  | "Frutas"
  | "Raízes"
  | "Cereais"
  | "Laticínios";

export type ProductStatus = "active" | "inactive" | "pending" | "rejected";

export interface Product {
  id:          number;
  name:        string;
  image:       string;
  images:      string[];
  price:       number;
  discount?:   number;      // percentagem de desconto opcional
  location:    string;
  description: string;
  user:      string;
  phone:       string;
  category:    ProductCategory;
  quantity:    number;
  stock:       number;
  unit:        string;
  status?:     ProductStatus;
  createdAt?:  string;
}

// ── Encomendas ────────────────────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "in_delivery"
  | "delivered"
  | "cancelled";

export interface Order {
  id:          string;
  productId:   number;
  productName: string;
  buyerName:   string;
  userName:  string;
  quantity:    number;
  unit:        string;
  total:       number;
  status:      OrderStatus;
  district:    string;
  createdAt:   string;
}

// ── Transacções ───────────────────────────────────────────────────────────────

export type TransactionType   = "sale" | "purchase" | "commission" | "refund";
export type TransactionStatus = "completed" | "pending" | "failed";

export interface Transaction {
  id:          string;
  type:        TransactionType;
  amount:      number;
  from:        string;    // nome do pagador
  to:          string;    // nome do receptor
  productName: string;
  status:      TransactionStatus;
  date:        string;    // ISO date string
}

// ── Tabela de Preços de Mercado ───────────────────────────────────────────────

export interface PriceItem {
  id:        number;
  name:      string;       // nome do produto
  category:  ProductCategory;
  minPrice:  number;       // preço mínimo de referência (MZN)
  maxPrice:  number;       // preço máximo de referência (MZN)
  unit:      string;       // kg, molho, lit, etc.
  trend:     string;       // ex: "+2.5%" ou "-1.2%"
  updatedAt: string;       // data da última actualização
  province:  string;
  district:  string;
}

// ── Províncias e Distritos ────────────────────────────────────────────────────

export interface ProvinceData {
  name:      string;
  districts: string[];
}

// ── Formulário SmartForm ──────────────────────────────────────────────────────

export interface SmartFormData {
  name:         string;
  phone:        string;
  isRegistered: boolean;
  district:     string;
  locality:     string;
  category:     string;
  stock:        string;
  price:        string;
  unit:         string;
  images:       string[];
  description:  string;
  quantity:     string;
}

// ── KPIs do Admin ─────────────────────────────────────────────────────────────

export interface AdminKPI {
  label:   string;
  value:   string | number;
  delta:   string;        // ex: "+12%" ou "-3"
  up:      boolean;       // true = crescimento positivo
  icon:    string;        // nome do ícone lucide
}

// ── Notificações ──────────────────────────────────────────────────────────────

export type NotificationType = "order" | "delivery" | "payment" | "system";

export interface AppNotification {
  id:      string;
  type:    NotificationType;
  title:   string;
  message: string;
  time:    string;
  read:    boolean;
}

// ── URLs de navegação por role ────────────────────────────────────────────────

export const DASHBOARD_URLS: Record<UserRole, string> = {
  admin:   "/admin/dashboard",
  buyer:   "/user/dashboard",
  user:  "/user/dashboard",
  shipper: "/user/dashboard",
};