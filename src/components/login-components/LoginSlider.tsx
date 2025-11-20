'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Se você não tiver LoginSliderProps, defina uma interface simples.
// Supondo que você a tenha em um arquivo de tipos:
interface Slide {
  image: string; // URL da imagem, se necessário
  text: string;
  className?: string;
  icon: React.ReactNode; // Adicionando icon para melhor visual
}

interface LoginSliderProps {
  slides: Slide[];
}

// Configuração das variantes de animação para entrada e saída de slides
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

/**
 * Componente Slider com animações Framer Motion.
 */
const LoginSlider = ({ slides }: LoginSliderProps) => {
  // O estado rastreia [índice, direção]. A direção é usada para animações
  // para que o slide saia pela direção correta (esquerda ou direita).
  const [[page, direction], setPage] = useState([0, 0]);

  // Usamos o wrap para garantir que o índice permaneça dentro dos limites do array
  const slideIndex = page % slides.length;

  // Função para avançar/retroceder o slide
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Efeito para trocar automaticamente o slide a cada 5 segundos
  useEffect(() => {
    const t = setInterval(() => {
      // Define a direção como 1 (próximo slide)
      paginate(1); 
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Container principal para as animações */}
      <AnimatePresence initial={false} custom={direction}>
        
        <motion.div
          key={page} // ESSENCIAL: key deve mudar para disparar a animação
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-800"
          // O conteúdo do slide é colocado dentro da motion.div para ser animado
        >
          {/* Conteúdo do Slide */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-12 text-center">
            <div className="text-center max-w-md">
              <div className="mb-6">
                {/* Ícone */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                  className="mx-auto w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6"
               
               >
                  {slides[slideIndex].icon}
                </motion.div>
                
                {/* Título/Texto */}
                <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">
                  {slides[slideIndex].text}
                </h2>
                
                {/* Texto deve ser visível e legível */}
                <p className="text-lg opacity-95">
                  {/* Você pode adicionar um campo de subtítulo à interface Slide, se quiser mais texto. */}
                  {/* Por agora, deixaremos este placeholder ou usaremos o className para um efeito visual */}
                  A solução completa para conectar produtores e consumidores em Moçambique.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicadores de Slide */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, idx) => (
          <motion.div
            key={idx}
            className="w-3 h-3 rounded-full cursor-pointer"
            initial={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
            animate={{
              backgroundColor:
                idx === slideIndex ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)',
              scale: idx === slideIndex ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
            onClick={() => setPage([idx, idx > slideIndex ? 1 : -1])}
          />
        ))}
      </div>
    </div>
  );
};

export default LoginSlider;