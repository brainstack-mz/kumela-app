// src/components/ScrollControls.tsx
'use client';

import React, { useState, useEffect, useRef } from "react";
// Importando o ícone Eye para a função de acessibilidade de texto
import { ArrowUp, Volume2, VolumeX, Eye, EyeOff, ChevronDown } from "lucide-react"; 

// Mapeamento de idiomas e seus arquivos de áudio correspondentes
const audioFiles = {
  "pt-PT": "/audio/Recording_7.m4a",
  "em-MZ": "/audio/Recording_5.m4a",
  // Nota: Adicione 'en-US' se precisar de áudio para "English"
};

const ScrollControls = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [language, setLanguage] = useState("pt-PT");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isTextEnlarged, setIsTextEnlarged] = useState(false);
  
  const audioRef = useRef(null);

  const handleScroll = () => setIsScrolled(window.scrollY > 300);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const toggleLanguage = (selectedLang) => {
    setLanguage(selectedLang);
    setIsLanguageDropdownOpen(false);
    
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    // Verifica se existe um arquivo de áudio para o idioma
    if (audioFiles[selectedLang]) {
      // Atualiza a fonte do áudio antes de tocar
      audioRef.current.src = audioFiles[selectedLang];
      audioRef.current.load();
      audioRef.current.play().then(() => {
          setIsPlaying(true);
      }).catch(error => {
          console.error("Erro ao tentar tocar o áudio:", error);
          setIsPlaying(false);
      });
    } else {
      setIsPlaying(false);
    }
  };
 
  const toggleAudio = () => {
    // Garante que o toggle só funcione se houver um arquivo de áudio carregado
    if (audioFiles[language] && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
            setIsPlaying(true);
        }).catch(error => {
            console.error("Erro ao tentar tocar o áudio:", error);
            setIsPlaying(false);
        });
      }
    }
  };

  const toggleTextSize = () => {
    const newEnlargedState = !isTextEnlarged;
    setIsTextEnlarged(newEnlargedState);
    
    if (newEnlargedState) {
      document.body.classList.add('text-enlarged');
    } else {
      document.body.classList.remove('text-enlarged');
    }
  };

  useEffect(() => {
    // Inicializa o áudio src no mount
    if (audioRef.current) {
        audioRef.current.src = audioFiles[language];
    }
    
    window.addEventListener("scroll", handleScroll);

    const handleAudioEnded = () => {
      setIsPlaying(false);
    };
    
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleAudioEnded);
    }
    
    if (isTextEnlarged) {
        document.body.classList.add('text-enlarged');
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleAudioEnded);
      }
      document.body.classList.remove('text-enlarged');
    };
  }, [isTextEnlarged, language]); // Adicionar 'language' como dependência

  // Base de estilo para os botões flutuantes (Desktop)
  const buttonBaseClasses =
    "bg-white text-green-700 rounded-xl p-3 shadow-xl transition-all duration-300 flex items-center justify-center hover:shadow-2xl hover:scale-[1.05]";
  
  // Base de estilo para os botões da barra inferior (Mobile)
  const mobileButtonBaseClasses = 
    "flex flex-col items-center justify-center text-xs font-medium py-1.5 transition-colors";


  return (
    <>
      <audio ref={audioRef} preload="auto" />

      {/* --- Estrutura Desktop (Botões Flutuantes na Lateral) --- */}
      <div className="hidden md:flex fixed bottom-4 right-4 z-50 flex-col items-end gap-3">

        {/* 1. Botão Voltar ao Topo (ArrowUp) */}
        <button
            onClick={scrollToTop}
            // ADICIONADO: Classe 'invisible' para manter o espaço quando não estiver visível
            className={`${buttonBaseClasses} bg-green-800 text-white ${!isScrolled ? 'invisible' : ''}`}
            aria-label="Voltar ao topo"
        >
            <ArrowUp size={24} />
        </button>
        
        {/* Botão de Aumento de Texto (Visão) */}
        <button
          onClick={toggleTextSize}
          className={`${buttonBaseClasses} ${isTextEnlarged ? 'bg-green-100 text-green-800' : 'bg-white'}`}
          aria-label={isTextEnlarged ? "Reduzir tamanho do texto" : "Aumentar tamanho do texto"}
        >
          {isTextEnlarged ? <EyeOff size={24} /> : <Eye size={24} />}
        </button>

        {/* 2. Botão de Controle de Áudio (Volume) */}
        <button
          onClick={toggleAudio}
          // Verifique se o áudio está tocando E se existe um arquivo de áudio.
          // O ícone VolumeX só será exibido se isPlaying for true.
          className={`${buttonBaseClasses} ${isPlaying ? 'bg-green-700 cursor-pointer text-white' : 'bg-white'}`}
          aria-label={isPlaying ? "Desligar áudio" : "Ouvir áudio"}
        >
          {isPlaying ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
        
        {/* Dropdown de Idiomas */}
        <div className="relative">
          <button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="bg-white cursor-pointer  text-green-800 border border-green-700 rounded-xl px-3 py-2 shadow-xl flex items-center gap-1 hover:bg-green-50"
          >
            {language === "pt-PT" ? "PT" : "EMAKHUA"}
            <ChevronDown 
              size={16}
              className={`transition-transform ${
                isLanguageDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isLanguageDropdownOpen && (
            <ul className="absolute bottom-full mb-3 right-0 bg-white border border-gray-300 rounded-lg shadow-lg w-36 p-2 z-50">
              <li>
                <button
                  className="w-full cursor-pointer  text-left px-3 py-1 hover:bg-green-400 rounded-md"
                  onClick={() => toggleLanguage("pt-PT")}
                >
                  Português 
                </button>
              </li>
                <li>
                <button
                  className="w-full cursor-pointer text-left px-3 py-1 hover:bg-green-400 rounded-md"
                  onClick={() => toggleLanguage("em-MZ")} // Se 'English' for o mesmo áudio que Emákhua, use 'em-MZ'
                >
                  English
                </button>
              </li>
              <li>
                <button
                  className="w-full cursor-pointer text-left px-3 py-1 hover:bg-green-400 rounded-md"
                  onClick={() => toggleLanguage("em-MZ")}
                >
                  Emákhua
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>


      {/* --- Estrutura Mobile (Barra de Navegação Inferior Fixa) --- */}
      {/* O código mobile abaixo já está correto para o ícone de volume */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-xl p-1.5">
        <div className="flex justify-around items-center h-full max-w-lg mx-auto w-full"> 
          
          {/* Mobile - Botão de Aumento de Texto (Visão) */}
          <button
            onClick={toggleTextSize}
            className={`${mobileButtonBaseClasses} ${isTextEnlarged ? 'text-green-700' : 'text-gray-500 hover:text-green-600'} flex-1`}
            aria-label={isTextEnlarged ? "Reduzir tamanho do texto" : "Aumentar tamanho do texto"}
          >
            {isTextEnlarged ? <EyeOff size={22} /> : <Eye size={22} />}
            <span className="mt-0.5">{isTextEnlarged ? "Normal" : "Visão"}</span>
          </button>

          {/* Mobile - Botão de Controle de Áudio (Volume) */}
          <button
            onClick={toggleAudio}
            className={`${mobileButtonBaseClasses} ${isPlaying ? 'text-green-700' : 'text-gray-500 hover:text-green-600'} flex-1`}
            aria-label={isPlaying ? "Desligar áudio" : "Ouvir áudio"}
          >
            {isPlaying ? <VolumeX size={22} /> : <Volume2 size={22} />}
            <span className="mt-0.5">Áudio</span>
          </button>
          
          {/* Mobile - Dropdown de Idiomas */}
          <div className="relative flex-1">
             <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className={`${mobileButtonBaseClasses} ${isLanguageDropdownOpen ? 'text-green-700' : 'text-gray-500 hover:text-green-600'} w-full`} 
             >
                <div className="flex items-center justify-center gap-0.5">
                    <span className="text-sm font-bold">{language === "pt-PT" ? "PT" : "EM"}</span>
                    <ChevronDown size={14} className={isLanguageDropdownOpen ? "rotate-180" : ""} />
                </div>
                <span className="mt-0.5">Idioma</span>
            </button>
            {isLanguageDropdownOpen && (
              <ul className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-xl w-36 p-2 z-50"> 
                <li>
                  <button
                    className="w-full text-center px-3 py-1 hover:bg-gray-100 rounded-md text-sm text-gray-700"
                    onClick={() => toggleLanguage("pt-PT")}
                  >
                    Português 
                  </button>
                </li>
                <li>
                 <button
                    className="w-full text-center px-3 py-1 hover:bg-gray-100 rounded-md text-sm text-gray-700"
                    onClick={() => toggleLanguage("em-MZ")} // Usando em-MZ
                  >
                    English 
                  </button>
              </li>
                <li>
                  <button
                    className="w-full text-center px-3 py-1 hover:bg-gray-100 rounded-md text-sm text-gray-700"
                    onClick={() => toggleLanguage("em-MZ")}
                  >
                    Emákhua
                  </button>
                </li>
              </ul>
            )}
          </div>

          {/* Mobile - Botão Voltar ao Topo */}
          {isScrolled && (
            <button
              onClick={scrollToTop}
              className={`${mobileButtonBaseClasses} text-green-700 hover:text-green-800 flex-1`}
              aria-label="Voltar ao topo"
            >
              <ArrowUp size={22} />
              <span className="mt-0.5">Topo</span>
            </button>
          )}
          
        </div>
      </div>
    </>
  );
};

export default ScrollControls;