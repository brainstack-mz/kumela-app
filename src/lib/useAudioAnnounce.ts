'use client';

import { useEffect, useState } from "react";

export const useAudioAnnounce = (text: string, active: boolean, lang: string = "pt-PT") => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const synth = window.speechSynthesis;
  let utterance;

  useEffect(() => {
    // Função para obter e carregar as vozes
    const loadVoices = () => {
      const voices = synth.getVoices();
      if (voices.length > 0) {
        return voices;
      }
      return new Promise(resolve => {
        synth.onvoiceschanged = () => {
          resolve(synth.getVoices());
        };
      });
    };

    const handleSpeak = async () => {
      // Cancela qualquer fala que possa estar ativa para evitar conflito
      synth.cancel();

      // Carrega as vozes de forma assíncrona
      const voices = await loadVoices();
      
      utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.volume = 1;
      utterance.rate = 1;
      utterance.pitch = 1;
      
      const voice = voices.find(v => v.lang === lang) || voices.find(v => v.lang.startsWith(lang.substring(0, 2)));
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };

      synth.speak(utterance);
      setIsSpeaking(true);
      setIsPaused(false);
    };

    if (active) {
      if (synth.speaking && synth.paused) {
        // Se estava pausado, retoma
        synth.resume();
        setIsPaused(false);
      } else if (!synth.speaking) {
        // Se não estava falando, começa uma nova fala
        handleSpeak();
      }
    } else if (synth.speaking && !synth.paused) {
      // Se estiver falando e o 'active' for falso, pausa
      synth.pause();
      setIsPaused(true);
    }
    
    return () => {
      // Garante que a fala seja cancelada ao desmontar o componente
      synth.cancel();
    };
  }, [text, active, lang]);

  // Retorna os estados para o componente pai
  return { isSpeaking, isPaused };
};