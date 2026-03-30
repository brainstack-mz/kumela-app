"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

// Interface atualizada para ser compatível com o banco de dados de produtos
interface ProductCardProps {
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
    discount?: number;
    location: string;
    category?: string; // Adicionado para compatibilidade
    quantity?: number | string;
    stock?: number;
    unit?: string;
  };
  onPreview: (productId: number) => void;
}

export default function ProductCard({ product, onPreview }: ProductCardProps) {
  const { addToCart, removeFromCart, cartItems } = useCart();
  
  const isInCart = cartItems.some((item) => item.id === product.id);

  const finalPrice = product.discount 
    ? product.price - product.price * (product.discount / 100)
    : product.price;

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      whileHover={{ scale: 1.02 }}
      onClick={() => onPreview(product.id)}
    >
      <div className="relative w-full h-48 sm:h-56">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300"
        />

        {product.discount && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-[11px] font-black px-2 py-1 rounded shadow-md">
            -{product.discount}%
          </div>
        )}

        <button
          onClick={handleCartClick}
          className={`absolute bottom-2 right-2 rounded-full p-3 flex items-center justify-center shadow-lg transition-all duration-300 ${
            isInCart 
              ? "bg-red-500 text-white" 
              : "bg-white bg-opacity-80 text-green-700 hover:bg-opacity-100"
          }`}
        >
          {isInCart ? <Trash2 size={20} /> : <ShoppingCart size={22} />}
        </button>
      </div>

      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 truncate">{product.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{product.location}</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col">
            <p className="text-xl font-extrabold text-[#2E7D32]">
              {finalPrice.toFixed(0)} <span className="text-sm">MT</span>
            </p>
            {product.discount && (
              <span className="text-xs text-red-600 line-through font-bold">
                {product.price.toFixed(0)} MT
              </span>
            )}
          </div>
          
          {isInCart && (
            <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded">
              Na Carrinha
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}