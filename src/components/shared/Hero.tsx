"use client";

import AnnounceModal from "@/components/modals/AnnounceModal";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, ShoppingBag } from "lucide-react";

interface Slide {
  subtitle: string;
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    subtitle: "Dificuldades para vender?",
    title: "Venda Mais e Melhor Com a KUMELA!",
    description: "A KUMELA é a sua loja online. Ligue-se a quem quer comprar e garanta que os seus produtos frescos chegam a mais pessoas.",
    image: "/assets/img1.jpeg",
  },
  {
    subtitle: "Conecte-se a mais pessoas",
    title: "Venda Rápido, Sem Complicação",
    description: "Nossa plataforma ajuda-o a vender sem sair de casa. É fácil e seguro. Anuncie seus produtos e veja o seu negócio crescer.",
    image: "/assets/img2.jpeg",
  },
  {
    subtitle: "Um parceiro para o seu futuro",
    title: "Cultive o Sucesso com a Gente",
    description: "Junte-se à KUMELA. Nós damos as ferramentas para o seu negócio crescer, gerir os seus pedidos e vender mais. Simples e rápido.",
    image: "/assets/img3.jpeg",
  },
  {
    subtitle: "Seu produto no mercado",
    title: "O Seu Negócio Está no Nosso Mercado",
    description: "Com a KUMELA, o seu produto ganha um lugar no mercado digital. Conecte-se com mais clientes e venda mais. É fácil e seguro.",
    image: "/assets/img4.jpeg",
  },
];

const textVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const imageVariants = {
  initial: { opacity: 0, scale: 1.1 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
  const SLIDE_DURATION = 7000; 

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentSlideData = slides[currentSlide];

  const scrollToProducts = () => {
    const section = document.getElementById("products");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full font-sans flex items-center justify-center overflow-hidden bg-background py-10 md:py-24 mt-16 md:mt-0 transition-colors duration-300"
    >
      {/* SVG Decorativo */}
      <div className="hidden md:block absolute inset-0 opacity-80 dark:opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2E7D32" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <motion.path 
            d="M0,300 C300,200 600,400 900,300 C1200,200 1440,300 1440,300 L1440,0 L0,0 Z" 
            fill="url(#waveGradient)" 
          />
        </svg>
      </div>

      <div className="relative w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-center px-4 md:px-8 gap-10 md:gap-4">
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <p className="text-base sm:text-lg font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                {currentSlideData.subtitle}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2E7D32] dark:text-green-500 leading-tight mb-6 max-w-xl mx-auto md:mx-0">
                {currentSlideData.title}
              </h1>
              <p className="text-md sm:text-lg md:text-xl text-foreground/80 dark:text-slate-400 font-light mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                {currentSlideData.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center sm:justify-start">
            <button
              onClick={scrollToProducts}
              className="inline-flex items-center justify-center gap-2 bg-[#1976D2] hover:bg-[#1565C0] text-white px-8 py-3 rounded-xl font-bold text-base md:text-lg shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <ShoppingBag size={20} /> Explorar Produtos
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center gap-2 bg-[#FF9800] hover:bg-[#F57C00] text-white px-8 py-3 rounded-xl font-bold text-base md:text-lg shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <Megaphone size={20} /> Anuncie Agora
            </button>
          </div>
        </div>

        <div className="relative w-full md:w-1/2 flex items-center justify-center p-6">
          <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-muted border border-border transition-colors">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={currentSlideData.image}
                alt={currentSlideData.title}
                className="w-full h-full object-cover"
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            {/* Overlay sutil apenas para dar profundidade, sem esbranquiçar */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Paginação Dots - CORREÇÃO: Removido o bg-white/60 que causava o ofuscamento */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 py-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="focus:outline-none group"
              >
                <div
                  className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${
                    index === currentSlide 
                      ? "w-8 bg-[#2E7D32] dark:bg-green-500" 
                      : "w-2.5 bg-gray-300 dark:bg-slate-700 group-hover:bg-gray-400"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      <AnnounceModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
};

export default Hero;