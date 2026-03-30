// src/app/admin/my-products/page.tsx
"use client";

import ViewContainer from "@/components/user-components/ViewContainer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Pencil, Timer, PlusCircle } from "lucide-react"; // ArrowLeft não é mais necessário aqui
import { useRouter } from "next/navigation";

// Dados organizados nas categorias corretas
const productsData = [
    // Simulação de dados com data de criação para o limite de 10 horas
  {
    id: "1",
    name: "Tomate Fresco Orgânico",
    image: "/assets/imgs/tomate.jpeg",
    price: 50,
    discount: 10,
    location: "Nampula",
    category: "Verduras",
    quantity: 25,  
    unit: "kg",    
    createdAt: new Date(Date.now() - 3 * 3600 * 1000) // Criado 3 horas atrás
  },
  {
    id: "2",
    name: "Alface Hidropónica",
    image: "/assets/imgs/alface.jpeg",
    price: 35,
    location: "Nampula",
    category: "Verduras",
    quantity: 50,  
    unit: "molho",
    createdAt: new Date(Date.now() - 12 * 3600 * 1000) // Criado 12 horas atrás
  },
  {
    id: "3",
    name: "Couve Fresca",
    image: "/assets/imgs/couve.jpeg",
    price: 40,
    location: "Malema",
    category: "Verduras",
    quantity: 15, 
    unit: "molho",
    createdAt: new Date(Date.now() - 5 * 3600 * 1000) // Criado 5 horas atrás
  },
  {
    id: "4",
    name: "Cenouras Orgânicas",
    image: "/assets/imgs/cenoura.jpeg",
    price: 45,
    location: "Nampula",
    category: "Legumes",
    quantity: 100,  
    unit: "kg",
    createdAt: new Date(Date.now() - 2 * 3600 * 1000) // Criado 2 horas atrás
  },
  {
    id: "5",
    name: "Pimentão Verde",
    image: "/assets/imgs/pimentao.jpeg",
    price: 60,
    location: "Nampula",
    category: "Legumes",
    quantity: 45, 
    unit: "kg",
    createdAt: new Date(Date.now() - 1 * 3600 * 1000) // Criado 1 hora atrás
  },
  {
    id: "6",
    name: "Pepino Fresco",
    image: "/assets/imgs/pepino.jpeg",
    price: 55,
    discount: 10,
    location: "Nampula",
    category: "Legumes",
    quantity: 100,  
    unit: "kg",
    createdAt: new Date(Date.now() - 7 * 3600 * 1000) // Criado 7 horas atrás
  },
];

// Animação para a entrada da página
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Componente para um único card de produto
const ProductCard = ({ product }) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
      onClick={() => router.push(`/admin/products/${product.id}`)}
    >
      <div className="relative w-full h-40 overflow-hidden">
        <Image 
            src={product.image} 
            alt={product.name} 
            layout="fill" 
            objectFit="cover" 
            className="transition-transform duration-300 hover:scale-105"
        />
        {product.discount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{product.discount}%
            </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 truncate">{product.name}</h3>
        <p className="text-gray-600 font-semibold mt-1">
          {product.price.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
          <span className="text-sm font-normal text-gray-500"> / {product.unit}</span>
        </p>
        <div className="flex items-center text-sm text-gray-500 mt-2">
            {(Date.now() - new Date(product.createdAt).getTime()) <= 10 * 3600 * 1000 ? (
                <>
                <Timer size={16} className="text-blue-500 mr-1" />
                <span>Editável por 10h</span>
                </>
            ) : (
                <>
                <Timer size={16} className="text-gray-400 mr-1" />
                <span>Edição Expirada</span>
                </>
            )}
            
        </div>
      </div>
    </motion.div>
  );
};

export default function MyProductsPage() {
    const router = useRouter();

    return (
        <ViewContainer 
            header="Meus Anúncios"
            backButtonAction={() => router.back()}
        >
            <motion.div
                variants={fadeIn}
                initial="initial"
                animate="animate"
                className="max-w-7xl mx-auto"
            >
                <div className="flex flex-col sm:flex-row items-center justify-between mt-2 mb-8 gap-4">
                    <p className="text-gray-600 text-center sm:text-left">
                        Acompanhe e gerencie todos os seus produtos anunciados aqui.
                    </p>
                    <button 
                        onClick={() => router.push("/admin/products/new-ad")}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 rounded-full shadow-lg text-sm font-bold text-white bg-[#4CAF50] hover:bg-[#388E3C] transition-colors"
                    >
                        <PlusCircle size={20} /> Publicar Novo Anúncio
                    </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {productsData.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>
        </ViewContainer>
    );
}