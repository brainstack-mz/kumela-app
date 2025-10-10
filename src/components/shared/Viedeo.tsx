"use client";

import { motion } from "framer-motion";

const Video = () => {
  return (
    <section
      id="video"
      className="relative w-full font-sans flex items-center justify-center overflow-hidden bg-white py-0 my-0"
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

      {/* Conteúdo Principal do Vídeo */}
      <div
        className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center px-4 md:px-8 gap-8 py-2"
      >
   {/* Lado Esquerdo - Conteúdo do Texto */}
<div
  className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left pt-8 md:pt-0"
>
  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2E7D32] leading-tight mb-4 max-w-xl mx-auto md:mx-0">
    Dicas para uma Colheita Sustentável e Saudável
  </h2>
  
  <p className="text-md sm:text-lg md:text-xl text-gray-600 font-light mb-8 max-w-xl mx-auto md:mx-0">
    Aprenda as melhores práticas para manter seus produtos frescos e de alta qualidade após a colheita.
  </p>
  
  <p className="text-md sm:text-lg md:text-xl text-[#2E7D32] mb-8 max-w-xl mx-auto md:mx-0">
    Para mais dicas, acesse nosso canal no YouTube:
    <a 
      href="https://www.youtube.com/MozAgro" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-blue-500 hover:underline ml-2"
    >
      youtube.com/MozAgro
    </a>
  </p>
</div>
        
        {/* Lado Direito - Container do Vídeo */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center p-6 mt-8 md:mt-0">
          <div
            className="relative w-full aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl"
          >
            <iframe
              className="w-full h-full object-cover"
              src="https://www.youtube.com/embed/s7DZ7FJzdio?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0"
              title="Dicas para Proteger Seus Produtos Agrícolas"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Video;