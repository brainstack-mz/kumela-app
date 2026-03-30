"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { useSearch } from "@/context/SearchContext";
import { productsData } from "@/data/products"; // IMPORTANTE: Importando do local central
import ProductCard from "@/components/products-user/ProductCard";

const categories = [
  "Todos", "Frutas", "Legumes", "Verduras", "Raízes", "Laticínios", "Cereais",
];

export default function Products() {
  const { searchTerm } = useSearch();
  const router = useRouter(); 
  
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [visibleProducts, setVisibleProducts] = useState(12);

  const filteredProducts = productsData.filter((product) => {
    const matchCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        product.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchCategory && matchSearch;
  });

  const handlePreview = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  

  const handleSeeMore = () => {
    setVisibleProducts((prev) => prev + 6);
  };

  return (
    <section id="products" className="relative w-full py-1 bg-white font-sans">
      <div className="container mx-auto px-2 md:px-8">
        <p className="text-xl sm:text-2xl font-extrabold text-[#2E7D32] text-center mb-8 md:mb-12">
          Faça sua compra com um simples clique
        </p>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2E7D32]">
            Mais Recentes
          </h2>
          <nav className="flex flex-wrap items-center gap-2 md:gap-4 w-full md:w-auto">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer flex-shrink-0 px-4 py-2 rounded-full transition-colors duration-300 font-semibold text-sm sm:text-base ${
                  selectedCategory === cat
                    ? "bg-[#4CAF50] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>

        <hr className="my-8 border-t border-gray-200" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, visibleProducts).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPreview={() => handlePreview(product.id)}
               />
            ))}
        </div>

        {visibleProducts < filteredProducts.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleSeeMore}
              className="px-8 py-3 cursor-pointer rounded-full bg-[#E8F5E9] text-[#2E7D32] font-semibold hover:bg-[#C8E6C9] transition-colors"
            >
              Ver Mais Produtos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}