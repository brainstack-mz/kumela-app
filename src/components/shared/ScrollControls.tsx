// src/components/shared/ScrollControls.tsx
'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, ShoppingCart, User, MoreVertical, Eye, EyeOff, 
  Volume2, VolumeX, Headset, ArrowUp 
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const audioFiles = {
  "pt-PT": "/audio/Recording_7.m4a",
  "em-MZ": "/audio/Recording_5.m4a",
};

interface OptionBtnProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  active?: boolean;
}

const ScrollControls = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTextEnlarged, setIsTextEnlarged] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isTextEnlarged) {
      document.documentElement.style.fontSize = "1.15rem"; 
      document.body.classList.add("text-enlarged");
    } else {
      document.documentElement.style.fontSize = ""; 
      document.body.classList.remove("text-enlarged");
    }
  }, [isTextEnlarged]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  };

  const navItemClass = (path: string) => `
    flex flex-col items-center justify-center flex-1 gap-1 transition-all duration-300 active:scale-95
    ${pathname === path ? "text-[#2E7D32] scale-105" : "text-slate-400"}
  `;

  return (
    <>
      <audio ref={audioRef} src={audioFiles["pt-PT"]} preload="auto" onEnded={() => setIsPlaying(false)} />

      {/* --- BOTÃO VOLTAR AO TOPO (Design Estilo Rounded Square) --- */}
      <AnimatePresence>
        {isScrolled && isHomePage && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            // Alterado: rounded-2xl para suavizar os cantos e borda mais fina
            className="hidden cursor-pointer md:flex fixed bottom-10 right-10 z-[60] bg-white/10 backdrop-blur-md text-[#2E7D32] p-4 border border-[#2E7D32]/30 rounded-2xl shadow-xl hover:bg-[#2E7D32] hover:text-white transition-all items-center justify-center group"
            title="Voltar ao Topo"
          >
            <ArrowUp size={24} strokeWidth={2.5} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-xl border-t border-slate-100 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto relative px-2">
          
          <button onClick={() => router.push("/")} className={navItemClass("/")}>
            <Home size={22} strokeWidth={pathname === "/" ? 2.5 : 2} />
            <span className="text-[10px] font-bold">Início</span>
          </button>

          <button onClick={() => router.push("/carrinho")} className={navItemClass("/carrinho")}>
            <div className="relative">
              <ShoppingCart size={22} strokeWidth={pathname === "/carrinho" ? 2.5 : 2} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-white min-w-[18px] flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <span className="text-[10px] font-bold">Carrinho</span>
          </button>

          <button onClick={() => router.push("/public/login")} className={navItemClass("/public/login")}>
            <User size={22} strokeWidth={pathname === "/public/login" ? 2.5 : 2} />
            <span className="text-[10px] font-bold">Conta</span>
          </button>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className={`${navItemClass("")} ${isMenuOpen ? "text-[#2E7D32]" : ""}`}
          >
            <MoreVertical size={22} />
            <span className="text-[10px] font-bold">Opções</span>
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="fixed inset-0 -z-10 bg-black/5"
                />
                <motion.div 
                  initial={{ opacity: 0, y: 50, scale: 0.9 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: 50, scale: 0.9 }}
                  className="absolute bottom-[80px] right-4 w-60 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 p-3 z-70"
                >
                  <OptionBtn 
                    icon={isPlaying ? VolumeX : Volume2} 
                    label={isPlaying ? "Parar Áudio" : "Ouvir Página"} 
                    onClick={toggleAudio} 
                    active={isPlaying} 
                  />
                  <OptionBtn 
                    icon={isTextEnlarged ? EyeOff : Eye} 
                    label="Texto Grande" 
                    onClick={() => setIsTextEnlarged(!isTextEnlarged)} 
                    active={isTextEnlarged} 
                  />
                  <OptionBtn 
                    icon={Headset} 
                    label="Apoio ao Cliente" 
                    onClick={() => router.push("/#faq")} 
                  />
                  {isScrolled && isHomePage && (
                    <OptionBtn 
                      icon={ArrowUp} 
                      label="Voltar ao Topo" 
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setIsMenuOpen(false);
                      }} 
                    />
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

const OptionBtn = ({ icon: Icon, label, onClick, active = false }: OptionBtnProps) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-200 ${
      active 
      ? "bg-green-50 text-[#2E7D32] shadow-sm" 
      : "hover:bg-slate-50 text-slate-700 active:bg-slate-100"
    }`}
  >
    <div className={`p-2 rounded-lg ${active ? "bg-white shadow-sm" : "bg-slate-100 text-slate-500"}`}>
      <Icon size={18} />
    </div>
    <span className="text-sm font-bold tracking-tight">{label}</span>
  </button>
);

export default ScrollControls;