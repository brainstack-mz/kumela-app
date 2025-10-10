// src/app/admin/products/[id]/page.tsx
"use client";

import ViewContainer from "@/components/user-components/ViewContainer";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Pencil, ArrowLeft, MapPin, Tag, Package, Barcode } from "lucide-react";

// Dados mockados para simular a busca por um produto
const productsData = [
  {
      id: 1,
      name: "Tomate Fresco Orgânico",
      image: "/assets/imgs/tomate.jpeg",
      price: 50,
      discount: 10,
      location: "Nampula",
      description: "Tomates orgânicos colhidos na horta. Ideal para saladas e molhos. Cultivado sem pesticidas.",
      category: "Verduras",
      quantity: 25,  
      unit: "kg",    
      createdAt: new Date(Date.now() - 3 * 3600 * 1000)
  },
  {
      id: 2,
      name: "Alface Hidropónica",
      image: "/assets/imgs/alface.jpeg",
      price: 35,
      location: "Nampula",
      description: "Alface crespa cultivada em sistema hidropónico. Frescor e qualidade garantidos.",
      category: "Verduras",
      quantity: 50,  
      unit: "molho",
      createdAt: new Date(Date.now() - 12 * 3600 * 1000)
  },
  {
      id: 3,
      name: "Couve Fresca",
      image: "/assets/imgs/couve.jpeg",
      price: 40,
      location: "Malema",
      description: "Couve fresca de horta comunitária. Ideal para refogados e acompanhamentos.",
      category: "Verduras",
      quantity: 15, 
      unit: "molho",
      createdAt: new Date(Date.now() - 5 * 3600 * 1000)
  },
  {
      id: 4,
      name: "Cenouras Orgânicas",
      image: "/assets/imgs/cenoura.jpeg",
      price: 45,
      location: "Nampula",
      description: "Cenouras frescas e crocantes, ideais para sucos e saladas. Cultivo sustentável.",
      category: "Legumes",
      quantity: 100,  
      unit: "kg",
      createdAt: new Date(Date.now() - 2 * 3600 * 1000)
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function ProductDetailsPage({ params }) {
  const router = useRouter();
  const { id } = params;
  
  const productId = parseInt(id);
  const product = productsData.find(p => p.id === productId);

  if (!product) {
    return (
      <ViewContainer header="Produto Não Encontrado">
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Oops!</h2>
          <p className="mt-4 text-gray-600">O produto não existe ou o ID é inválido.</p>
          <button 
              onClick={() => router.back()} // CORREÇÃO: Usa router.back()
              className="mt-6 flex items-center gap-2 py-3 px-6 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
          >
              <ArrowLeft size={20} /> Voltar
          </button>
        </div>
      </ViewContainer>
    );
  }
  
  const canEdit = (Date.now() - new Date(product.createdAt).getTime()) <= 10 * 3600 * 1000;

  return (
    <ViewContainer header="Detalhes do Produto">
      <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto"
      >
          <div className="flex justify-between items-center mb-6">
              <button 
                  onClick={() => router.back()} // CORREÇÃO: Usa router.back()
                  className="flex items-center gap-2 py-2 px-4 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
              >
                  <ArrowLeft size={20} /> Voltar
              </button>
              {canEdit ? (
                  <button
                      onClick={() => router.push(`/admin/products/edit-ad/${product.id}`)}
                      className="flex items-center gap-2 py-2 px-4 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
                  >
                      <Pencil size={20} /> Editar
                  </button>
              ) : (
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Pencil size={16} /> Edição Expirada
                  </span>
              )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden md:flex">
              <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                  <Image 
                      src={product.image} 
                      alt={product.name} 
                      layout="fill" 
                      objectFit="cover" 
                  />
              </div>
              <div className="p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-between">
                  <div>
                      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                      <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-3xl font-extrabold text-[#4CAF50]">
                              {product.price.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
                          </span>
                          <span className="text-lg text-gray-500">
                              /{product.unit}
                          </span>
                          {product.discount && (
                              <span className="text-sm line-through text-red-500">
                                  {(product.price / (1 - product.discount / 100)).toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
                              </span>
                          )}
                      </div>
                      
                      <p className="text-gray-700 mt-4 leading-relaxed">
                          {product.description}
                      </p>

                      <div className="mt-6 space-y-3">
                          <div className="flex items-center text-gray-600">
                              <MapPin size={20} className="text-gray-400 mr-2" />
                              <span>Localização: <span className="font-semibold">{product.location}</span></span>
                          </div>
                          <div className="flex items-center text-gray-600">
                              <Tag size={20} className="text-gray-400 mr-2" />
                              <span>Categoria: <span className="font-semibold">{product.category}</span></span>
                          </div>
                          <div className="flex items-center text-gray-600">
                              <Barcode size={20} className="text-gray-400 mr-2" />
                              <span>Quantidade Disponível: <span className="font-semibold">{product.quantity} {product.unit}</span></span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </motion.div>
    </ViewContainer>
  );
}