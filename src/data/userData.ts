// ─────────────────────────────────────────────────────────────────────────────
// data/userData.ts — Dados mockados do utilizador geral
// Usados em todas as telas do dashboard do utilizador
// ─────────────────────────────────────────────────────────────────────────────

import type { Order, Transaction } from "@/types";

// ── Encomendas do utilizador (como comprador E como vendedor) ─────────────────
export const myOrders: Order[] = [
  {
    id: "ORD001", productId: 1,  productName: "Tomate Fresco Orgânico",
    buyerName: "Lutyrano Etrice", userName: "João da Horta",
    quantity: 10, unit: "kg", total: 450,
    status: "delivered", district: "Nampula", createdAt: "2025-01-15T10:30:00Z",
  },
  {
    id: "ORD002", productId: 7, productName: "Cachos de Banana",
    buyerName: "Maria Vendedora", userName: "Lutyrano Etrice",
    quantity: 5, unit: "kg", total: 1000,
    status: "pending", district: "Monapo", createdAt: "2025-01-14T09:00:00Z",
  },
  {
    id: "ORD003", productId: 4, productName: "Cenouras Orgânicas",
    buyerName: "Lutyrano Etrice", userName: "Hortaliças de Gaza",
    quantity: 20, unit: "kg", total: 900,
    status: "in_delivery", district: "Nacala", createdAt: "2025-01-13T16:00:00Z",
  },
  {
    id: "ORD004", productId: 18, productName: "Milho Fresco",
    buyerName: "João Cliente", userName: "Lutyrano Etrice",
    quantity: 50, unit: "kg", total: 5250,
    status: "confirmed", district: "Meconta", createdAt: "2025-01-12T14:00:00Z",
  },
  {
    id: "ORD005", productId: 9, productName: "Manga Fresca",
    buyerName: "Lutyrano Etrice", userName: "Manga de Ouro",
    quantity: 15, unit: "kg", total: 1350,
    status: "cancelled", district: "Mossuril", createdAt: "2025-01-10T11:00:00Z",
  },
];

// ── Transacções / Pagamentos do utilizador ────────────────────────────────────
export const myTransactions: Transaction[] = [
  { id: "T001", type: "sale",     amount: 1000, from: "Maria Vendedora", to: "Lutyrano Etrice", productName: "Cachos de Banana",  status: "completed", date: "2025-01-14" },
  { id: "T002", type: "purchase", amount: 450,  from: "Lutyrano Etrice", to: "João da Horta",   productName: "Tomate Fresco",     status: "completed", date: "2025-01-15" },
  { id: "T003", type: "sale",     amount: 5250, from: "João Cliente",    to: "Lutyrano Etrice", productName: "Milho Fresco",      status: "completed", date: "2025-01-12" },
  { id: "T004", type: "purchase", amount: 900,  from: "Lutyrano Etrice", to: "Hortaliças Gaza", productName: "Cenouras Orgânicas",status: "pending",   date: "2025-01-13" },
  { id: "T005", type: "refund",   amount: 1350, from: "KUmela",          to: "Lutyrano Etrice", productName: "Manga Fresca",      status: "completed", date: "2025-01-10" },
];

// ── Mensagens / Chat ──────────────────────────────────────────────────────────
export interface ChatContact {
  id:          string;
  name:        string;
  role:        string;
  lastMessage: string;
  time:        string;
  unread:      number;
  online:      boolean;
}

export interface ChatMessage {
  id:        string;
  contactId: string;
  from:      "me" | "them";
  text:      string;
  time:      string;
  read:      boolean;
}

export const chatContacts: ChatContact[] = [
  { id: "C1", name: "João da Horta",    role: "Agricultor",    lastMessage: "Quando quer receber o tomate?",     time: "09:30", unread: 2, online: true  },
  { id: "C2", name: "Carlos Transport.",role: "Transportador", lastMessage: "Chego às 14h em Nampula.",           time: "08:15", unread: 3, online: true  },
  { id: "C3", name: "Maria Vendedora",  role: "Agricultor",    lastMessage: "Obrigada pela encomenda!",           time: "ontem", unread: 0, online: false },
  { id: "C4", name: "Frutas Tropicais", role: "Agricultor",    lastMessage: "O abacate está disponível.",         time: "ontem", unread: 0, online: false },
  { id: "C5", name: "KUmela Suporte",   role: "Suporte",       lastMessage: "Como podemos ajudar?",              time: "Seg",   unread: 0, online: true  },
];

export const chatMessages: ChatMessage[] = [
  { id: "M1", contactId: "C1", from: "them", text: "Olá! Tem interesse em tomate fresco?",              time: "09:00", read: true  },
  { id: "M2", contactId: "C1", from: "me",   text: "Sim, quero 10kg. Qual o preço?",                   time: "09:10", read: true  },
  { id: "M3", contactId: "C1", from: "them", text: "50 MZN/kg. Posso entregar amanhã.",                 time: "09:20", read: true  },
  { id: "M4", contactId: "C1", from: "me",   text: "Perfeito! Confirmo a encomenda.",                   time: "09:25", read: true  },
  { id: "M5", contactId: "C1", from: "them", text: "Quando quer receber o tomate?",                     time: "09:30", read: false },
  { id: "M6", contactId: "C2", from: "them", text: "Sou o Carlos, transportador disponível.",           time: "08:00", read: true  },
  { id: "M7", contactId: "C2", from: "me",   text: "Preciso entregar 50kg de milho para Meconta.",      time: "08:05", read: true  },
  { id: "M8", contactId: "C2", from: "them", text: "Cobro 500 MZN. Pode ser amanhã?",                  time: "08:10", read: true  },
  { id: "M9", contactId: "C2", from: "them", text: "Chego às 14h em Nampula.",                          time: "08:15", read: false },
];

// ── Avaliações recebidas e dadas ──────────────────────────────────────────────
export interface Review {
  id:          string;
  type:        "received" | "given";
  authorName:  string;
  targetName:  string;
  productName: string;
  rating:      number;        // 1 a 5
  comment:     string;
  date:        string;
}

export const myReviews: Review[] = [
  { id: "R1", type: "received", authorName: "João da Horta",  targetName: "Lutyrano Etrice", productName: "Milho Fresco",       rating: 5, comment: "Excelente comprador! Pagou rapidamente e comunicou bem.", date: "2025-01-12" },
  { id: "R2", type: "received", authorName: "Maria Vendedora",targetName: "Lutyrano Etrice", productName: "Cachos de Banana",   rating: 4, comment: "Bom comprador, recomendo.",                                date: "2025-01-14" },
  { id: "R3", type: "given",    authorName: "Lutyrano Etrice", targetName: "João da Horta",  productName: "Tomate Fresco",      rating: 5, comment: "Produto fresco e de boa qualidade. Entrega rápida!",      date: "2025-01-15" },
  { id: "R4", type: "given",    authorName: "Lutyrano Etrice", targetName: "Manga de Ouro",  productName: "Manga Fresca",       rating: 2, comment: "Produto não correspondeu ao descrito. Decepcionante.",    date: "2025-01-10" },
];

// ── Entregas ──────────────────────────────────────────────────────────────────
export type DeliveryStatus = "waiting" | "matched" | "collected" | "in_transit" | "delivered";

export interface Delivery {
  id:              string;
  orderId:         string;
  productName:     string;
  origin:          string;
  destination:     string;
  transporterName: string | null;
  transporterPhone:string | null;
  status:          DeliveryStatus;
  estimatedDate:   string;
  cost:            number;
  createdAt:       string;
}

export const myDeliveries: Delivery[] = [
  {
    id: "DEL001", orderId: "ORD003",
    productName: "Cenouras Orgânicas",
    origin: "Nampula", destination: "Nacala",
    transporterName: "Carlos Transportador", transporterPhone: "258851112233",
    status: "in_transit", estimatedDate: "2025-01-16", cost: 350, createdAt: "2025-01-13",
  },
  {
    id: "DEL002", orderId: "ORD004",
    productName: "Milho Fresco",
    origin: "Nampula", destination: "Meconta",
    transporterName: null, transporterPhone: null,
    status: "waiting", estimatedDate: "2025-01-17", cost: 0, createdAt: "2025-01-12",
  },
  {
    id: "DEL003", orderId: "ORD001",
    productName: "Tomate Fresco Orgânico",
    origin: "Nampula", destination: "Nampula",
    transporterName: "Maria Transportadora", transporterPhone: "258861998877",
    status: "delivered", estimatedDate: "2025-01-15", cost: 150, createdAt: "2025-01-14",
  },
];

// ── Transportadores disponíveis (para match) ──────────────────────────────────
export interface Transporter {
  id:       string;
  name:     string;
  district: string;
  rating:   number;
  price:    number;    // MZN por entrega
  phone:    string;
  online:   boolean;
}

export const availableTransporters: Transporter[] = [
  { id: "TR1", name: "Carlos Transportador", district: "Nampula",  rating: 4.8, price: 350, phone: "258851112233", online: true  },
  { id: "TR2", name: "Ana Entregas",         district: "Monapo",   rating: 4.5, price: 280, phone: "258852223344", online: true  },
  { id: "TR3", name: "Pedro Rápido",         district: "Nacala",   rating: 4.2, price: 400, phone: "258853334455", online: false },
];