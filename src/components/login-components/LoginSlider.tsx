'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image'; // Importante usar o Image do Next para otimização

interface Slide {
  image: string; // URL da imagem (obrigatório agora)
  text: string;
}

interface LoginSliderProps {
  slides: Slide[];
}

// Variantes de animação simplificadas para um "cross-fade" suave (dissolução)
// Transições laterais costumam ficar estranhas com imagens de fundo inteiras.
const fadeVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    zIndex: 1,
    opacity: 1,
    transition: {
      duration: 1.0, // Duração do fade in
      ease: [0.4, 0, 0.2, 1], // Cubic-bezier suave
    },
  },
  exit: {
    zIndex: 0,
    opacity: 0,
    transition: {
      duration: 1.0, // Duração do fade out
    },
  },
};

/**
 * Componente Slider focado em Imagens de Fundo com Texto.
 */
const LoginSlider = ({ slides }: LoginSliderProps) => {
  const [page, setPage] = useState(0);

  // Garante que o índice permaneça dentro dos limites do array
  const slideIndex = page % slides.length;

  // Efeito para trocar automaticamente o slide a cada 6 segundos (um pouco mais lento para apreciar a imagem)
  useEffect(() => {
    if (!slides || slides.length === 0) return;

    const t = setInterval(() => {
      setPage((prevPage) => prevPage + 1);
    }, 6000);
    return () => clearInterval(t);
  }, [slides]);

  if (!slides || slides.length === 0) {
    return <div className="w-full h-full bg-teal-600"></div>; // Fallback caso não haja slides
  }

  const currentSlide = slides[slideIndex];

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-900"> {/* Fundo escuro base */}
      
      {/* Container principal para as animações de fade */}
      <AnimatePresence initial={false} mode="wait">
        
        <motion.div
          key={page} // ESSENCIAL: muda para disparar a animação
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          {/* 1. Imagem de Fundo usando Next/Image */}
          <Image
            src={currentSlide.image}
            alt={currentSlide.text}
            fill // Preenche o container pai (motion.div)
            priority={slideIndex === 0} // Carrega a primeira imagem com prioridade
            sizes="50vw" // Diz ao Next que a imagem ocupa metade da largura da tela (lg:w-1/2)
            className="object-cover object-center" // Garante que a imagem cubra a área sem distorcer
          />

          {/* 2. Overlay Gradiente (Escurecimento) */}
          {/* ESSENCIAL para garantir a legibilidade do texto branco sobre qualquer imagem */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10" />

          {/* 3. Conteúdo do Texto */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-24 px-12 text-center text-white">
            <div className="max-w-lg">
              {/* Título/Texto Principal */}
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight drop-shadow-md"
              >
                {currentSlide.text}
              </motion.h2>
              
              {/* Subtítulo Fixo (opcional, remova se preferir) */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-lg text-slate-200 font-medium drop-shadow"
              >
                Kumela — Conectando o mercado agrícola de Moçambique.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicadores de Slide (Bolinhas) */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx)} // Permite clicar para ir ao slide
            className="group p-2 cursor-pointer" // Área de clique maior
            aria-label={`Ir para slide ${idx + 1}`}
          >
            <motion.div
              className="h-2.5 rounded-full"
              initial={false}
              animate={{
                width: idx === slideIndex ? '32px' : '10px', // Efeito de pílula no ativo
                backgroundColor:
                  idx === slideIndex ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.4)',
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default LoginSlider;