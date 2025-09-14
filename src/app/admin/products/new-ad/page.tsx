// src/app/admin/new-ad/page.tsx
"use client";

import ViewContainer from "@/components/universal-components/ViewContainer";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function AddPage() {
  return (
    <ViewContainer header="Criar Novo Anúncio">
      <motion.div variants={fadeIn} initial="initial" animate="animate">
              <p className="mt-2 text-gray-600">Página para criar novos anúncios.</p>
        {/* Aqui você pode adicionar o formulário ou o conteúdo para criar um novo anúncio */}
      </motion.div>
    </ViewContainer>
  );
}