// components/universal-components/Hero.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Paleta de cores para o botão
const colors = {
  primaryGreen: "#4CAF50",
  darkGreen: "#2E7D32",
    accentOrange: "#FF9800",
    white: "#FFFFFF",
};

// Dados para os slides do hero
const slides = [
  {
    subtitle: "Dificuldades em vender seus produtos agrícolas?",
    title: "MOZAGRO: A Conexão Direta ao Mercado!",
    description:
      "Nossa plataforma liga produtores a compradores, impulsionando suas vendas e garantindo que seus produtos frescos cheguem a mais pessoas. Expanda seu negócio com facilidade e segurança.",
    image: "/assets/img1.jpeg",
  },
  {
    subtitle: "Alcance Mais Clientes em Moçambique",
    title: "Venda Mais, Com Menos Esforço",
    description:
      "Com a MOZAGRO, seus produtos ganham visibilidade nacional. Nossa interface intuitiva facilita a gestão de vendas e a comunicação com os compradores.",
    image: "/assets/img2.jpeg",
  },
  {
    subtitle: "Cultive seu Sucesso Conosco",
    title: "Soluções Digitais para o Agricultor Moderno",
    description:
      "Oferecemos ferramentas para otimizar sua produção, gerenciar pedidos e escalar seu agronegócio. Junte-se à comunidade que está revolucionando a agricultura moçambicana.",
    image: "/assets/img4.jpeg",
  },
  {
    subtitle: "Colha os Frutos do Futuro",
    title: "Inovação e Crescimento no Agronegócio",
    description:
      "A MOZAGRO é seu parceiro estratégico para inovar e crescer. Conecte-se, aprenda e prospere em um mercado dinâmico e cheio de oportunidades.",
    image: "/assets/img3.jpeg",
  },
];

// Variantes de animação para o conteúdo de TEXTO (baixo para cima)
const textVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

// Variantes de animação para a IMAGEM (direita para esquerda)
const imageVariants = {
  initial: { opacity: 0, x: 100 }, // Começa à direita
  animate: { opacity: 1, x: 0 }, // Move para a posição original
  exit: { opacity: 0, x: -100 }, // Sai para a esquerda
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const buttonLink = "/admin/login";

  useEffect(() => {
    // Intervalo para a mudança automática dos slides
    const autoSlideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // 7 segundos

    // Função de limpeza
    return () => {
      clearInterval(autoSlideInterval);
    };
  }, [currentSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <section
      id="hero"
      className="relative py-3 font-sans flex items-center justify-center overflow-hidden bg-white"
    >

      {/* Fundo com Figuras Geométricas (para desktop) */}
      <div className="hidden md:block absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Círculo maior - canto superior direito */}
          <motion.circle
            cx="1300" cy="150" r="250" fill="#E0F2F1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          {/* Linhas curvas - centro-direita */}
          <motion.path
            d="M900 300 C1100 200, 1100 400, 900 500 S700 600, 500 500"
            stroke="#A5D6A7" strokeWidth="2" fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />
          {/* Círculo menor - canto inferior esquerdo */}
          <motion.circle
            cx="150" cy="700" r="120" fill="#E8F5E9"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
          />
           {/* Onda no canto superior esquerdo */}
          <motion.path
            d="M0 0 C200 100, 300 0, 400 100 V0 H0 Z"
            fill="#C8E6C9"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </svg>
      </div>
      {/* Conteúdo Principal do Hero */}
      <div
        className="relative w-full max-w-7xl mx-auto flex flex-col-reverse 
        md:flex-row items-center justify-center px-4 md:px-8 gap-8 py-8"
      >
        {/* Lado Esquerdo - Conteúdo do Texto e Botão */}
        <div
          className="w-full md:w-1/2 flex flex-col justify-center 
          text-center md:text-left pt-8 md:pt-0"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlideData.title + "-text"}
              variants={textVariants} // Usando as variantes de texto
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <p className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
                {currentSlideData.subtitle}
              </p>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold
                text-[#2E7D32] leading-tight mb-4 max-w-xl mx-auto md:mx-0"
              >
                {currentSlideData.title}
              </h1>
              <p className="text-md sm:text-lg md:text-xl text-gray-600 font-light mb-8 max-w-xl mx-auto md:mx-0">
                {currentSlideData.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <Link
            href={buttonLink}
            className="inline-flex items-center self-center md:self-start px-8 py-4 
            text-base md:text-xl font-bold rounded-full transition-all duration-300 
            ease-in-out transform hover:scale-105 gap-2"
            style={{ 
 
              backgroundColor: colors.accentOrange,
              color: colors.white, 
              border: `2px solid ${colors.accentOrange}`
            }}
          >
            Anuncie Agora! <ArrowRight size={24} />
          </Link>
        </div>

        {/* Lado Direito - Card Retangular Vertical com a Imagem do Slide */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center p-6 mt-0 md:mt-0">
          <div
            className="relative w-full max-w-[900px] aspect-[5/4] rounded-2xl overflow-hidden bg-white"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlideData.image + "-image"}
                src={currentSlideData.image}
                alt={currentSlideData.title}
                className="w-full h-full object-cover"
                variants={imageVariants} // Usando as novas variantes de imagem
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>

          {/* Indicadores */}
          <div className="absolute -bottom-8 md:-bottom-10 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out
                  ${
                    index === currentSlide
                      ? "bg-gray-800 scale-125"
                      : "bg-gray-400 opacity-60"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;