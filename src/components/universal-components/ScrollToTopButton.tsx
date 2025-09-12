'use client';

import React, { useState, useEffect } from "react";
import { ArrowUp, Volume2, VolumeX } from "lucide-react";
import { useAudioAnnounce } from '@/lib/useAudioAnnounce';

// Roteiro de Áudio em Português (PT)
const heroTextPT = `Olá, bem-vindo à MOZAGRO! Aqui, você pode comprar e vender seus produtos agrícolas de forma fácil e rápida. Para anunciar seu produto, clique no botão amarelo. Preencha seu número e senha. Pronto, você já entrou! Não tem conta? Registre-se já e comece a fazer dinheiro sem sair de casa. Se tiver alguma dúvida, acesse a área de "Contactos" e escreva para nós. Procurando um produto? Temos todos os tipos! Escolha o seu e siga os passos em menos de quatro cliques.`;

// Roteiro de Áudio em Emákhua (falado em Nampula, Moçambique)
const heroTextEmakua = `Mmarahaba, moohakalihavo MOZAGRO! Vano, moohapula ni moohasuwa yoolima yaanyu yoovunlaaka etepa-epa. Opula yoolima yaanyu, mwekeererye e'butawu yooxerya. Mwesuwanyeni nimero naanyu ni ewokela. Moohapula! Mohina e'kontta? Mwikisareke, mwaakhuleke mwaavya mwaha omoho. Moohakalihavo ekekuru? Mwekeereke 'Makonttaktos' ni mwaalemeleke. Moohakalihavo etuuka? N'naawo etuuka yootxuva! Mwekeereke ni mwekeereke empaali yuuluvo ohoopola oohipa m'ekpaali yooluma.`;

const ScrollControls = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [language, setLanguage] = useState("pt-PT");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  
  // Hook de áudio atualizado para pausar e continuar
  const { isSpeaking, isPaused } = useAudioAnnounce(
    language === "pt-PT" ? heroTextPT : heroTextEmakua,
    isPlaying,
    language
  );

  // Detecta scroll para mostrar a seta
  const handleScroll = () => setIsScrolled(window.scrollY > 300);

  // Scroll para o topo
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Alterna idioma
  const toggleLanguage = () => {
    setLanguage(language === "pt-PT" ? "em-MZ" : "pt-PT");
    setIsLanguageDropdownOpen(false);
  };
 
  // Alterna o estado de reprodução do áudio
  const toggleAudio = () => {
    // A lógica de pausa/continuação é gerenciada pelo useAudioAnnounce
    setIsPlaying(current => !current);
  };

  useEffect(() => {
    // Adiciona evento de scroll
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Controla o estado de reprodução
  useEffect(() => {
    if (!isSpeaking && !isPaused) {
      setIsPlaying(false);
    }
  }, [isSpeaking, isPaused]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* Seta de Scroll */}
      {isScrolled && (
        <button
          onClick={scrollToTop}
          className="bg-green-800 text-white cursor-pointer rounded-full p-3 shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
          aria-label="Voltar ao topo"
        >
          <ArrowUp size={24} />
        </button>
      )}

      {/* Botão de Áudio */}
      <button
        onClick={toggleAudio}
        className="bg-green-600 text-white cursor-pointer rounded-full p-3 shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        aria-label={isSpeaking ? "Desligar áudio" : "Ouvir áudio"}
      >
        {isSpeaking && !isPaused ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {/* Dropdown de Idioma (agora visível no desktop) */}
      <div className="relative">
        <button
          onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
          className="bg-white text-green-800 border border-green-700 rounded-full px-3 py-2 shadow-lg flex items-center gap-1 hover:bg-green-50"
        >
          {language === "pt-PT" ? "PT" : "EMAKHUA"}
          <ArrowUp
            size={16}
            className={`transition-transform ${
              isLanguageDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isLanguageDropdownOpen && (
          <ul className="absolute bottom-full mb-2 right-0 bg-white border border-gray-300 rounded-lg shadow-lg w-36 p-2 z-50">
            <li>
              <button
                className="w-full text-left px-3 py-1 hover:bg-gray-100 rounded-md"
                onClick={toggleLanguage}
              >
                {language === "pt-PT" ? "EMAKHUA" : "Português (PT)"}
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ScrollControls;