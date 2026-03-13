// src/components/ScrollControls.tsx
'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, ShoppingCart, User, MoreVertical, Eye, EyeOff, 
  Volume2, VolumeX, Headset, Globe, ArrowUp 
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const audioFiles = {
  "pt-PT": "/audio/Recording_7.m4a",
  "em-MZ": "/audio/Recording_5.m4a",
};

const ScrollControls = () => {
  const router = useRouter();
  const pathname = usePathname(); // Para detectar a página atual
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTextEnlarged, setIsTextEnlarged] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // CORREÇÃO VISÃO AMPLIADA
  useEffect(() => {
    if (isTextEnlarged) {
      document.documentElement.style.fontSize = "1.25rem"; // Aumenta base
      document.body.classList.add("text-enlarged");
    } else {
      document.documentElement.style.fontSize = ""; 
      document.body.classList.remove("text-enlarged");
    }
  }, [isTextEnlarged]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
      else { audioRef.current.play().then(() => setIsPlaying(true)); }
    }
  };

  const navItemClass = (path: string) => `
    flex flex-col items-center justify-center flex-1 gap-1 transition-all duration-300 active:scale-90
    ${pathname === path ? "text-green-600 scale-110" : "text-slate-400"}
  `;

  return (
    <>
      <audio ref={audioRef} src={audioFiles["pt-PT"]} preload="auto" onEnded={() => setIsPlaying(false)} />

      {/* MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/90 backdrop-blur-xl border-t border-slate-100 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto relative">
          
          <button onClick={() => router.push("/")} className={navItemClass("/")}>
            <Home size={22} strokeWidth={pathname === "/" ? 2.5 : 2} />
            <span className="text-[10px] font-bold">Início</span>
          </button>

          <button onClick={() => router.push("/carrinho")} className={navItemClass("/carrinho")}>
            <div className="relative">
              <ShoppingCart size={22} strokeWidth={pathname === "/carrinho" ? 2.5 : 2} />
              <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">3</span>
            </div>
            <span className="text-[10px] font-bold">Carrinho</span>
          </button>

          <button onClick={() => router.push("/public/login")} className={navItemClass("/public/login")}>
            <User size={22} strokeWidth={pathname === "/public/login" ? 2.5 : 2} />
            <span className="text-[10px] font-bold">Conta</span>
          </button>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${navItemClass("")} ${isMenuOpen ? "text-green-600" : ""}`}>
            <MoreVertical size={22} />
            <span className="text-[10px] font-bold">Opções</span>
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
                className="absolute bottom-[80px] right-4 w-56 bg-white rounded-3xl shadow-2xl border border-slate-100 p-3 z-70"
              >
                <OptionBtn icon={isPlaying ? VolumeX : Volume2} label={isPlaying ? "Parar Áudio" : "Ouvir Página"} onClick={toggleAudio} active={isPlaying} />
                <OptionBtn icon={isTextEnlarged ? EyeOff : Eye} label="Texto Grande" onClick={() => setIsTextEnlarged(!isTextEnlarged)} active={isTextEnlarged} />
                <OptionBtn icon={Headset} label="Apoio" onClick={() => router.push("/#contact")} />
                {isScrolled && <OptionBtn icon={ArrowUp} label="Topo" onClick={() => window.scrollTo({top:0, behavior:'smooth'})} />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

const OptionBtn = ({ icon: Icon, label, onClick, active = false }: any) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all ${active ? "bg-green-50 text-green-700" : "hover:bg-slate-50 text-slate-700"}`}>
    <Icon size={20} />
    <span className="text-sm font-bold tracking-tight">{label}</span>
  </button>
);

export default ScrollControls;