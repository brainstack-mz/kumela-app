// app/admin/report/page.tsx
"use client";
 
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function KindnessPage() {
  return (
<motion.div
         variants={fadeIn}
         initial="initial"
         animate="animate"
         className="p-6"
       >
         <h1 className="text-2xl font-bold text-gray-800">Carrinho</h1>
         <p className="mt-2 text-gray-600">Todos Produtos adiciionado na carinha ficarao aqui</p>
       </motion.div>
  );
}