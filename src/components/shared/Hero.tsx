// components/universal-components/Hero.tsx
"use client";
import AnnounceModal from "@/components/modals/AnnounceModal";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ExternalLink, Megaphone, ShoppingBag } from "lucide-react";

// Paleta de cores otimizada
const colors = {
  primaryGreen: "#4CAF50",
  darkGreen: "#2E7D32",
  accentBlue: "#1976D2",
  darkBlue: "#0D47A1",
  white: "#FFFFFF",
  lightGray: "#F5F5F5",
  accentOrange: "#FF9800",
};

// Dados para os slides do hero
const slides = [
  {
    subtitle: "Dificuldades para vender?",
    title: "Venda Mais e Melhor Com a MOZAGRO!",
    description:
      "A MOZAGRO é a sua loja online. Ligue-se a quem quer comprar e garanta que os seus produtos frescos chegam a mais pessoas.",
    image: "/assets/img1.jpeg",
  },
  {
    subtitle: "Conecte-se a mais pessoas",
    title: "Venda Rápido, Sem Complicação",
    description:
      "Nossa plataforma ajuda-o a vender sem sair de casa. É fácil e seguro. Anuncie seus produtos e veja o seu negócio crescer.",
    image: "/assets/img2.jpeg",
  },
  {
    subtitle: "Um parceiro para o seu futuro",
    title: "Cultive o Sucesso com a Gente",
    description:
      "Junte-se à MOZAGRO. Nós damos as ferramentas para o seu negócio crescer, gerir os seus pedidos e vender mais. Simples e rápido.",
    image: "/assets/img4.jpeg",
  },
  {
    subtitle: "Seu produto no mercado",
    title: "O Seu Negócio Está no Nosso Mercado",
    description:
      "Com a MOZAGRO, o seu produto ganha um lugar no mercado digital. Conecte-se com mais clientes e venda mais. É fácil e seguro.",
    image: "/assets/img3.jpeg",
  },
];

// Variantes de animação
const textVariants = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -30, scale: 0.95 },
};

const imageVariants = {
  initial: { opacity: 0, scale: 1.1, x: 50 },
  animate: { opacity: 1, scale: 1, x: 0 },
  exit: { opacity: 0, scale: 0.9, x: -50 },
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

// Função abrir modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);


  const SLIDE_DURATION = 7000; // 7 segundos

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (100 / SLIDE_DURATION) * 100;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isPlaying, nextSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentSlideData = slides[currentSlide];

  // 👇 Nova função para rolar até a seção de produtos
  const scrollToProducts = () => {
    const section = document.getElementById("Produts"); // mesmo ID usado no page.tsx
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full font-sans flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white py-10 md:py-20"
    >
      {/* Fundo decorativo */}
      <div className="hidden md:block absolute inset-0 opacity-90">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#81C784" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#4CAF50" stopOpacity="0.7" />
            </linearGradient>
          </motion.defs>

          <motion.path
            d="M900 300 C1100 200, 1100 400, 900 500 S700 600, 500 500"
            stroke="#A5D6A7"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />

          <motion.path
            d="M0,300 C300,200 600,400 900,300 C1200,200 1440,300 1440,300 L1440,0 L0,0 Z"
            fill="url(#waveGradient)"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />

          <motion.circle
            cx="200"
            cy="600"
            r="80"
            fill="#81C784"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 1, delay: 1.2 }}
          />
        </svg>
      </div>

      {/* Conteúdo principal */}
      <div className="relative w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-center px-4 md:px-8 gap-10 md:gap-4">
        {/* Texto */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSlideData.title}-text`}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="text-base sm:text-lg font-semibold text-gray-600 mb-3">
                {currentSlideData.subtitle}
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2E7D32] leading-tight mb-6 max-w-xl mx-auto md:mx-0">
                {currentSlideData.title}
              </h1>

              <p className="text-md sm:text-lg md:text-xl text-gray-600 font-light mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                {currentSlideData.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* 🟩 Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center sm:justify-start">
            {/* Botão Explorar Produtos */}
            <button
              onClick={scrollToProducts}
              style={{ backgroundColor: colors.accentBlue }}
              className="inline-flex items-center justify-center gap-2 text-white
                         px-8 py-3 rounded-xl font-bold text-base md:text-lg
                         shadow-lg transition-all duration-300 transform
                         hover:bg-[#0D47A1] hover:shadow-xl hover:scale-[1.03]
                         focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-75
                         max-w-xs sm:w-auto mx-auto md:mx-0"
            >
              <ShoppingBag size={20} />
              Explorar Produtos
            </button>

            {/* Botão Anuncie Agora */}
            <button
        onClick={openModal}
        style={{ backgroundColor: colors.accentOrange }}
        className="inline-flex items-center justify-center gap-2 text-white
                   px-8 py-3 rounded-xl font-bold text-base md:text-lg
                   shadow-lg transition-all duration-300 transform
                   hover:bg-orange-600 hover:shadow-xl hover:scale-[1.03]
                   focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-opacity-75
                   max-w-xs sm:w-auto mx-auto md:mx-0"
      >
        <Megaphone size={20} />
        Anuncie Agora
      </button>
          </div>
        </div>

        {/* Imagem */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center p-6">
          <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-white">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${currentSlideData.image}-image`}
                src={currentSlideData.image}
                alt={currentSlideData.title}
                className="w-full h-full object-cover"
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>

          {/* Indicadores (dots) */}
          <div className="absolute -bottom-0 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`Ir para slide ${index + 1}`}
                >
                  <motion.div
                    className={`w-full h-full rounded-full transition-colors duration-300 ${
                      index === currentSlide
                        ? "bg-blue-600 scale-125"
                        : "bg-gray-400 hover:bg-gray-500"
                    }`}
                    animate={{ scale: index === currentSlide ? 1.25 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <AnnounceModal isOpen={showModal} onClose={closeModal} />
    </section>
  
  );
};

export default Hero;
