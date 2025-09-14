// src/app/admin/products/orders/page.tsx
"use client";

import ViewContainer from "@/components/universal-components/ViewContainer";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function OrdersPage() {
  return (
    <ViewContainer header="Pedidos Pendentes">
      <motion.div variants={fadeIn} initial="initial" animate="animate">
              <p className="mt-2 text-gray-600">Acompanhe todos os pedidos que ainda não foram concluídos.</p>
        {/* Aqui irá a tabela ou lista de pedidos pendentes */}
      </motion.div>
    </ViewContainer>
  );
}