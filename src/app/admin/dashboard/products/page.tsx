"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Eye, Package } from "lucide-react";
import UnifiedDashboardHeader from "@/components/shared/UnifiedDashboardHeader";
import Sidebar from "@/components/admin-components/Sidebar";
import ViewProductModal from "@/components/products-seller/ViewProductModal";
import EditProductModal from "@/components/products-seller/EditProductModal";
import { getAllProducts } from "@/data/adminData";
import { Product } from "@/types/dashboard";
import Image from "next/image";

export default function AdminProductsPage() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/public/login");
      return;
    }
    setProducts(getAllProducts());
  }, [user, router]);

  if (!user || user.role !== "admin") {
    return null;
  }

  const handleDeleteProduct = (id: number) => {
    if (confirm("Tem certeza que deseja eliminar este produto?")) {
      console.log("Eliminar produto:", id);
      setProducts(products.filter(p => p.id !== id));
      alert("Produto eliminado com sucesso!");
    }
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <UnifiedDashboardHeader
        title="Painel Administrativo"
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        showSidebarToggle={true}
      />
      <main className={`min-h-screen transition-all duration-300 ${
        isSidebarOpen ? "md:ml-64" : "md:ml-20"
      }`} style={{ paddingTop: '64px' }}>
        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              Gestão de Produtos
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Editar ou remover produtos do sistema
            </p>
          </div>

          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-4 sm:p-6 shadow-md`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Imagem</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Nome</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Categoria</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Preço</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Estoque</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="p-3">
                        {product.image && (
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </td>
                      <td className="p-3">
                        <p className="font-semibold text-gray-900 dark:text-white">{product.name}</p>
                      </td>
                      <td className="p-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{product.category}</p>
                      </td>
                      <td className="p-3">
                        <p className="font-semibold text-gray-900 dark:text-white">{product.price} MT</p>
                      </td>
                      <td className="p-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{product.stock} {product.unit}</p>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          product.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}>
                          {product.status === "active" ? "Ativo" : "Expirado"}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewProduct(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg"
                            title="Ver"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {products.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Nenhum produto encontrado</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {selectedProduct && (
        <>
          <ViewProductModal
            isOpen={showViewModal}
            onClose={() => {
              setShowViewModal(false);
              setSelectedProduct(null);
            }}
            product={selectedProduct}
          />
          <EditProductModal
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setSelectedProduct(null);
            }}
            product={selectedProduct}
            onSuccess={() => {
              setProducts(getAllProducts());
              setShowEditModal(false);
              setSelectedProduct(null);
            }}
          />
        </>
      )}
    </div>
  );
}

