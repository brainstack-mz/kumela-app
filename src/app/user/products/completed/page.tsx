// src/app/admin/products/completed/page.tsx
"use client";

import ViewContainer from "@/components/user-components/ViewContainer";
import OrderCard from "@/components/orders/OrderCard";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PackageCheck } from "lucide-react";

// Dados mockados para pedidos concluídos com todos os campos necessários
const completedOrdersData = [
  {
    id: "ord-3",
    productName: "Couve Fresca",
    productImage: "/assets/imgs/couve.jpeg",
    productCategory: "Verduras",
    productLocation: "Malema",
    quantity: 3,
    unit: "molho",
    productPrice: 120, // <-- Adicionado
    shippingCost: 25,  // <-- Adicionado
    buyerName: "Paula Gomes",
    buyerPhone: "+258 84 111 2222", // <-- Adicionado
    buyerDistrict: "Nampula", // <-- Adicionado
    transporterName: "Transportes Lda.", // <-- Adicionado
    paymentMethod: "M-Pesa", // <-- Adicionado
    orderDate: new Date(Date.now() - 10 * 3600000), // <-- Adicionado
    status: "completed",
  },
  {
    id: "ord-4",
    productName: "Pepino Fresco",
    productImage: "/assets/imgs/pepino.jpeg",
    productCategory: "Legumes",
    productLocation: "Nampula",
    quantity: 10,
    unit: "kg",
    productPrice: 550, // <-- Adicionado
    shippingCost: 40,  // <-- Adicionado
    buyerName: "Carlos Martins",
    buyerPhone: "+258 87 333 4444", // <-- Adicionado
    buyerDistrict: "Meconta", // <-- Adicionado
    transporterName: "Expresso Já", // <-- Adicionado
    paymentMethod: "e-Mola", // <-- Adicionado
    orderDate: new Date(Date.now() - 15 * 3600000), // <-- Adicionado
    status: "completed",
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function CompletedOrdersPage() {
  const router = useRouter();

  return (
    <ViewContainer
      header="Pedidos Concluídos"
      backButtonAction={() => router.back()}
    >
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="max-w-7xl mx-auto"
      >
        <p className="mb-8 text-gray-600">
          Histórico de todas as suas vendas concluídas.
        </p>

        {completedOrdersData.length > 0 ? (
          <div className="space-y-6">
            {completedOrdersData.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-lg text-gray-500">
            <PackageCheck size={48} className="mb-4" />
            <p className="text-lg font-semibold">Nenhuma venda finalizada ainda.</p>
          </div>
        )}
      </motion.div>
    </ViewContainer>
  );
}