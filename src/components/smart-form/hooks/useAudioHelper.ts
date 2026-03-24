import { useState, useRef, useEffect } from "react";

export const useAudioHelper = (audioPath: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioPath);
    audioRef.current = audio;

    audio.onended = () => setIsPlaying(false);
    audio.onpause = () => setIsPlaying(false);
    audio.onplay = () => setIsPlaying(true);

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [audioPath]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Para outros áudios na página
      document.querySelectorAll("audio").forEach(a => a.pause());
      
      audioRef.current.play().catch((err) => {
        console.warn("Autoplay bloqueado pelo navegador. Clique novamente.", err);
      });
    }
  };

  const playOnce = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return { isPlaying, togglePlay, playOnce, stopAudio };
};