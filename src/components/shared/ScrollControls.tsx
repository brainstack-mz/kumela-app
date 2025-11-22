// src/components/ScrollControls.tsx
'use client';

import React, { useState, useEffect, useRef } from "react";
import { ArrowUp, Volume2, VolumeX, Eye, EyeOff, ChevronDown } from "lucide-react";

const audioFiles = {
  "pt-PT": "/audio/Recording_7.m4a",
  "em-MZ": "/audio/Recording_5.m4a",
};

const ScrollControls = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [language, setLanguage] = useState("pt-PT");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isTextEnlarged, setIsTextEnlarged] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleScroll = () => setIsScrolled(window.scrollY > 300);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const toggleLanguage = (selectedLang: "pt-PT" | "em-MZ") => {
    setLanguage(selectedLang);
    setIsLanguageDropdownOpen(false);

    if (audioRef.current) audioRef.current.pause();

    const audioFile = audioFiles[selectedLang as keyof typeof audioFiles];
    if (audioFile && audioRef.current) {
      audioRef.current.src = audioFile;
      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    const audioFile = audioFiles[language as keyof typeof audioFiles];
    if (audioFile && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  };

  const toggleTextSize = () => {
    const enlarged = !isTextEnlarged;
    setIsTextEnlarged(enlarged);

    if (enlarged) document.body.classList.add("text-enlarged");
    else document.body.classList.remove("text-enlarged");
  };

  useEffect(() => {
    const audioFile = audioFiles[language as keyof typeof audioFiles];
    if (audioRef.current && audioFile) audioRef.current.src = audioFile;

    window.addEventListener("scroll", handleScroll);

    const handleAudioEnded = () => setIsPlaying(false);
    if (audioRef.current) audioRef.current.addEventListener("ended", handleAudioEnded);

    if (isTextEnlarged) document.body.classList.add("text-enlarged");

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (audioRef.current)
        audioRef.current.removeEventListener("ended", handleAudioEnded);
      document.body.classList.remove("text-enlarged");
    };
  }, [isTextEnlarged, language]);

  const buttonBaseClasses =
    "bg-white text-green-700 rounded-xl p-3 shadow-xl transition-all duration-300 flex items-center justify-center hover:shadow-2xl hover:scale-[1.05]";

  const mobileButtonBaseClasses =
    "flex flex-col items-center justify-center text-xs font-medium py-1.5 transition-colors";

  return (
    <>
      <audio ref={audioRef} preload="auto" />

      {/* Desktop */}
      <div className="hidden md:flex fixed bottom-4 right-4 z-50 flex-col items-end gap-3">

        {/* FIXED: Voltar ao Topo agora igual aos outros botões */}
        <button
          onClick={scrollToTop}
          className={`${buttonBaseClasses} text-green-700 bg-white ${
            isScrolled ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          aria-label="Voltar ao topo"
          disabled={!isScrolled}
        >
          <ArrowUp size={24} />
        </button>

        {/* Texto */}
        <button
          onClick={toggleTextSize}
          className={`${buttonBaseClasses} ${
            isTextEnlarged ? "bg-green-100 text-green-800" : "bg-white"
          }`}
        >
          {isTextEnlarged ? <EyeOff size={24} /> : <Eye size={24} />}
        </button>

        {/* Áudio */}
        <button
          onClick={toggleAudio}
          className={`${buttonBaseClasses} ${
            isPlaying ? "bg-green-700 text-white" : "bg-white text-green-700"
          }`}
        >
          {isPlaying ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>

        {/* Idioma */}
        <div className="relative">
          <button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="bg-white text-green-800 border border-green-700 rounded-xl px-3 py-2 shadow-xl flex items-center gap-1 hover:bg-green-50"
          >
            {language === "pt-PT" ? "PT" : "EMAKHUA"}
            <ChevronDown
              size={16}
              className={`${isLanguageDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isLanguageDropdownOpen && (
            <ul className="absolute bottom-full mb-3 right-0 bg-white border border-gray-300 rounded-lg shadow-lg w-36 p-2 z-50">
              <li>
                <button
                  className="w-full text-left px-3 py-1 hover:bg-green-400 rounded-md"
                  onClick={() => toggleLanguage("pt-PT")}
                >
                  Português
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-3 py-1 hover:bg-green-400 rounded-md"
                  onClick={() => toggleLanguage("em-MZ")}
                >
                  English
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-3 py-1 hover:bg-green-400 rounded-md"
                  onClick={() => toggleLanguage("em-MZ")}
                >
                  Emákhua
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-xl p-1.5">
        <div className="flex justify-around items-center h-full max-w-lg mx-auto w-full">

          <button
            onClick={toggleTextSize}
            className={`${mobileButtonBaseClasses} ${
              isTextEnlarged
                ? "text-green-700"
                : "text-gray-500 hover:text-green-600"
            } flex-1`}
          >
            {isTextEnlarged ? <EyeOff size={22} /> : <Eye size={22} />}
            <span className="mt-0.5">{isTextEnlarged ? "Normal" : "Visão"}</span>
          </button>

          <button
            onClick={toggleAudio}
            className={`${mobileButtonBaseClasses} ${
              isPlaying
                ? "text-green-700"
                : "text-gray-500 hover:text-green-600"
            } flex-1`}
          >
            {isPlaying ? <VolumeX size={22} /> : <Volume2 size={22} />}
            <span className="mt-0.5">Áudio</span>
          </button>

          <div className="relative flex-1">
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className={`${mobileButtonBaseClasses} ${
                isLanguageDropdownOpen
                  ? "text-green-700"
                  : "text-gray-500 hover:text-green-600"
              } w-full`}
            >
              <div className="flex items-center justify-center gap-0.5">
                <span className="text-sm font-bold">
                  {language === "pt-PT" ? "PT" : "EM"}
                </span>
                <ChevronDown
                  size={14}
                  className={isLanguageDropdownOpen ? "rotate-180" : ""}
                />
              </div>
              <span className="mt-0.5">Idioma</span>
            </button>

            {isLanguageDropdownOpen && (
              <ul className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-xl w-36 p-2 z-50">
                <li>
                  <button
                    className="w-full text-center px-3 py-1 hover:bg-gray-100 rounded-md"
                    onClick={() => toggleLanguage("pt-PT")}
                  >
                    Português
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-center px-3 py-1 hover:bg-gray-100 rounded-md"
                    onClick={() => toggleLanguage("em-MZ")}
                  >
                    English
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-center px-3 py-1 hover:bg-gray-100 rounded-md"
                    onClick={() => toggleLanguage("em-MZ")}
                  >
                    Emákhua
                  </button>
                </li>
              </ul>
            )}
          </div>

          {isScrolled && (
            <button
              onClick={scrollToTop}
              className={`${mobileButtonBaseClasses} text-green-700 hover:text-green-800 flex-1`}
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
