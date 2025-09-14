// components/products/ProductCard.tsx
"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
    discount?: number;
    location: string;
  };
  onPreview: (productId: number) => void;
}

export default function ProductCard({ product, onPreview }: ProductCardProps) {
  const finalPrice = product.discount 
    ? product.price - product.price * (product.discount / 100)
    : product.price;

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
      whileHover={{ scale: 1.02 }}
      onClick={() => onPreview(product.id)}
    >
      <div className="relative w-full h-48 sm:h-56">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300"
        />
   
      </div>
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 truncate">{product.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{product.location}</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-xl font-extrabold text-[#2E7D32]">
            {finalPrice.toFixed(0)} Meticais
          </p>
          {product.discount && (
            <span className="text-sm text-red-700 line-through">
              {product.price.toFixed(0)} Meticais
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}