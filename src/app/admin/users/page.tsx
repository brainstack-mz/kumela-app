// app/admin/report/page.tsx
"use client";

import ViewContainer from "@/components/user-components/ViewContainer";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function Users() {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <ViewContainer header="Gestao de Usuarios do Sistema">
        <div className="p-4 text-center text-gray-500">
          <p>Esta é a página de gestao de usuarios</p>
        </div>
      </ViewContainer>
    </motion.div>
  );
}