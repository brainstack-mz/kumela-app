// src/app/admin/products/pending/page.tsx
"use client";

import ViewContainer from "@/components/user-components/ViewContainer";
import OrderCard from "@/components/orders/OrderCard";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Timer } from "lucide-react";

// Dados mockados para pedidos pendentes com todos os novos campos
const pendingOrdersData = [
  {
    id: "ord-1",
    productName: "Tomate Fresco Orgânico",
    productImage: "/assets/imgs/tomate.jpeg",
    productCategory: "Verduras",
    productLocation: "Nampula",
    quantity: 5,
    unit: "kg",
    productPrice: 250,
    shippingCost: 50,
    buyerName: "João da Silva",
    buyerPhone: "+258 84 123 4567",
    buyerDistrict: "Nampula",
    transporterName: "Trans-Rápido",
    paymentMethod: "M-Pesa",
    orderDate: new Date(Date.now() - 3600000), // 1 hora atrás
    status: "pending",
  },
  {
    id: "ord-2",
    productName: "Cenouras Orgânicas",
    productImage: "/assets/imgs/cenoura.jpeg",
    productCategory: "Legumes",
    productLocation: "Nampula",
    quantity: 2,
    unit: "kg",
    productPrice: 90,
    shippingCost: 35,
    buyerName: "Maria de Fátima",
    buyerPhone: "+258 82 987 6543",
    buyerDistrict: "Meconta",
    transporterName: "Entrega Certa",
    paymentMethod: "e-Mola",
    orderDate: new Date(Date.now() - 7200000), // 2 horas atrás
    status: "pending",
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function PendingOrdersPage() {
  const router = useRouter();
  const [pendingOrders, setPendingOrders] = useState(pendingOrdersData);

  const handleConfirmOrder = (orderId) => {
    // Lógica para confirmar o pedido (em uma aplicação real, faria uma chamada de API)
    console.log(`Pedido ${orderId} confirmado.`);
    // Remove o pedido da lista de pendentes
    setPendingOrders(pendingOrders.filter(order => order.id !== orderId));
    // Em uma aplicação real, o pedido seria movido para a lista de concluídos
  };

  return (
    <ViewContainer
      header="Pedidos Pendentes"
      backButtonAction={() => router.back()}
    >
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="max-w-7xl mx-auto"
      >
        <p className="mb-8 text-gray-600">
          Acompanhe os pedidos que aguardam sua confirmação.
        </p>

        {pendingOrders.length > 0 ? (
          <div className="space-y-6">
            {pendingOrders.map((order) => (
              <OrderCard key={order.id} order={order} onConfirm={handleConfirmOrder} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-lg text-gray-500">
            <Timer size={48} className="mb-4" />
            <p className="text-lg font-semibold">Nenhum pedido pendente no momento.</p>
          </div>
        )}
      </motion.div>
    </ViewContainer>
  );
}