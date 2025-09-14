// src/app/admin/products/completed/page.tsx
"use client";

import ViewContainer from "@/components/universal-components/ViewContainer";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function CompletedPage() {
  return (
    <ViewContainer header="Pedidos Concluídos">
      <motion.div variants={fadeIn} initial="initial" animate="animate">
          <p className="mt-2 text-gray-600">Visualize o histórico de todos os pedidos finalizados.</p>
        {/* Aqui irá a tabela ou lista de pedidos concluídos */}
      </motion.div>
    </ViewContainer>
  );
}