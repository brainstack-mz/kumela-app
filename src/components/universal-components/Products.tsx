"use client";

import { useState, useRef } from "react";
import ProductCard from "../products/ProductCard";
import ProductPreviewModal from "../products/ProductPreviewModal";
import PaymentModal from "./PaymentModal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearch } from "@/context/SearchContext";


// Produtos organizados nas categorias corretas
const productsData = [
  // --------- Verduras ---------
  {
    id: 1,
    name: "Tomate Fresco Orgânico",
    image: "/assets/imgs/tomate.jpeg",
    price: 50,
    discount: 10, 
    location: "Nampula",
    description:
      "Tomates orgânicos colhidos na horta. Ideal para saladas e molhos. Cultivado sem pesticidas.",
    seller: "João da Horta",
    phone: "258841234567",
    category: "Verduras",
  },
  {
    id: 2,
    name: "Alface Hidropónica",
    image: "/assets/imgs/alface.jpeg",
    price: 35,
    location: "Gaza",
    description:
      "Alface crespa cultivada em sistema hidropónico. Frescor e qualidade garantidos.",
    seller: "VerdeTech",
    phone: "258845566778",
    category: "Verduras",
  },
  {
    id: 3,
    name: "Couve Fresca",
    image: "/assets/imgs/couve.jpeg", // você coloca depois a imagem
    price: 40,
    location: "Zambézia",
    description:
      "Couve fresca de horta comunitária. Ideal para refogados e acompanhamentos.",
    seller: "Horta Zambézia",
    phone: "258841112233",
    category: "Verduras",
  },

  // --------- Legumes ---------
  {
    id: 4,
    name: "Cenouras Orgânicas",
    image: "/assets/imgs/cenoura.jpeg",
    price: 45,
    location: "Inhambane",
    description:
      "Cenouras frescas e crocantes, ideais para sucos e saladas. Cultivo sustentável.",
    seller: "Hortaliças de Gaza",
    phone: "258841122334",
    category: "Legumes",
  },
  {
    id: 5,
    name: "Pimentão Verde",
    image: "/assets/imgs/pimentao.jpeg", // você coloca depois a imagem
    price: 60,
    location: "Maputo",
    description: "Pimentão verde fresco, ideal para molhos e refogados.",
    seller: "Mercado Maputo",
    phone: "258847889900",
    category: "Legumes",
  },
  {
    id: 6,
    name: "Pepino Fresco",
    image: "/assets/imgs/pepino.jpeg", // você coloca depois a imagem
    price: 55,
    discount: 10, 
    location: "Nampula",
    description: "Pepino crocante e fresco, ótimo para saladas.",
    seller: "Agro Nampula",
    phone: "258846778899",
    category: "Legumes",
  },

  // --------- Frutas ---------
  {
    id: 7,
    name: "Cachos de Banana",
    image: "/assets/imgs/banana.jpeg",
    price: 250,
      discount: 20, 
    location: "Manica",
    description:
      "Cachos de bananas nanicas, frescas e prontas para amadurecer.",
    seller: "Banana & Cia",
    phone: "258841122334",
    category: "Frutas",
  },
  {
    id: 8,
    name: "Abacate Hass",
    image: "/assets/imgs/abacate.jpeg",
    price: 75,
    location: "Sofala",
    description: "Abacate Hass, cremoso e delicioso. Perfeito para guacamole.",
    seller: "Frutas Tropicais SA",
    phone: "258847778899",
    category: "Frutas",
  },
  {
    id: 9,
    name: "Manga Fresca",
    image: "/assets/imgs/manga.jpeg", // você coloca depois a imagem
    price: 90,
    location: "Cabo Delgado",
    description: "Mangas doces e suculentas, típicas da estação.",
    seller: "Manga de Ouro",
    phone: "258848877990",
    category: "Frutas",
  },
    {
    id: 10,
    name: "Manga Fresca",
    image: "/assets/imgs/manga2.jpeg", // você coloca depois a imagem
    price: 90,
    location: "Nampula",
    description: "Mangas doces e suculentas, típicas da estação.",
    seller: "Manga Fina",
    phone: "258848877990",
    category: "Frutas",
  },
    {
    id: 11,
    name: "Melancia",
    image: "/assets/imgs/melancia.jpeg", // você coloca depois a imagem
    price: 90,
    location: "Cabo Delgado",
    description: "Mangas doces e suculentas, típicas da estação.",
    seller: "Manga de Ouro",
    phone: "258848877990",
    category: "Frutas",
  },



  // --------- Raízes ---------
  {
    id: 12,
    name: "Batata-doce Laranja",
    image: "/assets/imgs/batata_doce.jpeg",
    price: 80,
    location: "Zambézia",
    description:
      "Batata-doce de cor laranja, rica em vitaminas. Perfeita para assados e purê.",
    seller: "Fazenda Doce",
    phone: "258849876543",
    category: "Raízes",
  },
  {
    id: 13,
    name: "Mandioca Fresca",
    image: "/assets/imgs/mandioca.jpeg",
    price: 90,
    location: "Cabo Delgado",
    description:
      "Mandioca de primeira qualidade, pronta para ser cozida. Essencial na culinária.",
    seller: "Produtos da Terra",
    phone: "258848877990",
    category: "Raízes",
  },
  {
    id: 14,
    name: "Inhame Fresco",
    image: "/assets/imgs/inhame.jpeg", // você coloca depois a imagem
    price: 95,
    location: "Niassa",
    description: "Inhame fresco e nutritivo, excelente para sopas e cozidos.",
    seller: "Niassa Agro",
    phone: "258842345678",
    category: "Raízes",
  },
    {
    id: 15,
    name: "Mandioca Fresca",
    image: "/assets/imgs/mandioca1.jpeg", // você coloca depois a imagem
    price: 95,
    location: "Niassa",
    description: "Inhame fresco e nutritivo, excelente para sopas e cozidos.",
    seller: "Niassa Agro",
    phone: "258842345678",
    category: "Raízes",
  },


  // --------- Laticínios ---------
  {
    id: 16,
    name: "Leite Pasteurizado",
    image: "/assets/imgs/leite.jpeg",
    price: 60,
    location: "Tete",
    description: "Leite integral pasteurizado, fonte de cálcio e proteínas.",
    seller: "Laticínios de Tete",
    phone: "258846665544",
    category: "Laticínios",
  },
  {
    id: 17,
    name: "Queijo Fresco",
    image: "/assets/imgs/queijo.jpeg", // você coloca depois a imagem
    price: 150,
    location: "Maputo",
    description: "Queijo fresco artesanal, sabor suave e textura cremosa.",
    seller: "Fazenda Maputo",
    phone: "258845123456",
    category: "Laticínios",
  },
  // --------- Cereais ---------
  {
    id: 18,
    name: "Milho Fresco",
    image: "/assets/imgs/milho.jpeg",
    price: 1500,
    discount: 30,
    location: "Maputo",
    description:
      "Milho amarelo de alta qualidade, ensacado e pronto para transporte.",
    seller: "Agro Comercial",
    phone: "258847654321",
    category: "Cereais",
  },
  {
    id: 19,
    name: "Arroz Branco",
    image: "/assets/imgs/arroz.jpeg", // você coloca depois a imagem
    price: 1200,
    location: "Sofala",
    description: "Arroz branco polido, ideal para consumo diário.",
    seller: "Arroz Sofala",
    phone: "258847123456",
    category: "Cereais",
  },
  {
    id: 20,
    name: "Trigo",
    image: "/assets/imgs/trigo.jpeg", // você coloca depois a imagem
    price: 1000,
    location: "Manica",
    description: "Grãos de trigo selecionados para panificação e massas.",
    seller: "Agro Manica",
    phone: "258846112233",
    category: "Cereais",
  },
];

// Categorias definitivas
const categories = [
  "Todos",
  "Frutas",
  "Legumes",
  "Verduras",
  "Raízes",
  "Laticínios",
  "Cereais",
];


export default function Products() {
    const { searchTerm } = useSearch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Filtragem com base em categoria + pesquisa
  const filteredProducts = productsData.filter((product) => {
    const matchCategory =
      selectedCategory === "Todos" || product.category === selectedCategory;
    const matchSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchCategory && matchSearch;
  });



  const handlePreview = (productId: number) => {
    const product = productsData.find((p) => p.id === productId);
    setSelectedProduct(product || null);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowPaymentModal(false);
  };

  const handleBuy = (product: any) => {
    setSelectedProduct(product);
    setShowPaymentModal(true);
  };

  const handleSeeMore = () => {
    setVisibleProducts((prev) => prev + 6);
  };

  const scrollCategories = (direction: "left" | "right") => {
    if (categoriesRef.current) {
      const scrollAmount = direction === "right" ? 200 : -200;
      categoriesRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="products" className="relative w-full py-12 bg-white font-sans">
      <div className="container mx-auto px-4 md:px-8">
        <p className="text-xl sm:text-2xl font-extrabold text-[#2E7D32] text-center mb-8 md:mb-12">
          Faça sua compra com um simples clique
        </p>

        {/* Cabeçalho com "Mais Recentes" à esquerda e categorias bem afastadas à direita */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2E7D32]">
            Mais Recentes
          </h2>
          <div className="relative flex items-center w-full md:w-auto">
            <button
              onClick={() => scrollCategories("left")}
              className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md md:hidden"
              aria-label="Rolar para a esquerda"
            >
              <ChevronLeft size={24} />
            </button>
            <nav
              ref={categoriesRef}
              className="flex items-center gap-2 md:gap-4 overflow-x-auto md:overflow-visible md:w-auto w-full pb-2 scrollbar-hide md:justify-end"
            >
              {categories.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full transition-colors duration-300 font-semibold text-sm sm:text-base ${
                    selectedCategory === cat
                      ? "bg-[#4CAF50] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
            <button
              onClick={() => scrollCategories("right")}
              className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md md:hidden"
              aria-label="Rolar para a direita"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <hr className="my-8 border-t border-gray-200" />

        {/* Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, visibleProducts).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPreview={handlePreview}
            />
          ))}
        </div>

        {visibleProducts < filteredProducts.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleSeeMore}
              className="px-8 py-3 rounded-full bg-[#E8F5E9] text-[#2E7D32] font-semibold hover:bg-[#C8E6C9] transition-colors"
            >
              Ver Mais Produtos
            </button>
          </div>
        )}
      </div>

      <ProductPreviewModal
        product={selectedProduct}
        onClose={handleCloseModal}
        onAddToCart={() => alert("Produto adicionado ao carrinho!")}
        onBuy={handleBuy}
      />

      <PaymentModal
        product={selectedProduct}
        show={showPaymentModal}
        onClose={handleCloseModal}
      />
    </section>
  );
}
