"use client";

import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function PerfilPage() {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="p-6"
    >
      <h1 className="text-2xl font-bold text-gray-800">Perfil</h1>
      <p className="mt-2 text-gray-600">Bem-vindo à sua página de perfil!</p>
    </motion.div>
  );
}
