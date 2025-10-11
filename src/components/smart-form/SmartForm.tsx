"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  User,
  Phone,
  MapPin,
  Layers,
  Hash,
  Coins,
} from "lucide-react";

const colors = {
  primaryGreen: "#4CAF50",
  darkGreen: "#2E7D32",
  accentBlue: "#1976D2",
  darkBlue: "#0D47A1",
  white: "#FFFFFF",
  lightGray: "#F5F5F5",
  accentOrange: "#FF9800",
};

const SmartForm: React.FC = () => {
  const [phase, setPhase] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [locality, setLocality] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [imageName, setImageName] = useState("Nenhuma imagem selecionada");

  // ref para o container interno do card (rolável)
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedPhone = localStorage.getItem("userPhone");
    if (storedName) setName(storedName);
    if (storedPhone) setPhone(storedPhone);
  }, []);

  const handleContinue = () => {
    if (phase === 1) {
      if (!phone || !name.trim()) {
        alert("Por favor, preencha nome e telefone.");
        return;
      }
      localStorage.setItem("userName", name);
      localStorage.setItem("userPhone", phone);
    }
    if (phase < 4) setPhase((prev) => prev + 1);
  };

  const handleBack = () => {
    if (phase > 1) setPhase((prev) => prev - 1);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageName(file ? file.name : "Nenhuma imagem selecionada");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Produto anunciado com sucesso! (simulação)");
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const progress = (phase / 4) * 100;

  // --- Mobile keyboard handling: scroll input focado para centro do card ---
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onFocusIn = (ev: FocusEvent) => {
      const target = ev.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName;
      if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") {
        // pequeno delay para esperar o teclado abrir em mobile
        setTimeout(() => {
          // scroll o elemento para o centro do card rolável
          try {
            target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
          } catch (e) {
            // fallback simples
            const rect = target.getBoundingClientRect();
            card.scrollTop += rect.top - card.getBoundingClientRect().top - 20;
          }
        }, 260);
      }
    };

    card.addEventListener("focusin", onFocusIn);

    // visualViewport: quando disponível (melhora comportamento em mobile)
    const vv = (window as any).visualViewport;
    const onViewportResize = () => {
      // se houver elemento activo dentro do card, recentre-o
      const active = document.activeElement as HTMLElement | null;
      if (active && card.contains(active)) {
        setTimeout(() => {
          try {
            active.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
          } catch (e) {}
        }, 120);
      }
    };

    if (vv && typeof vv.addEventListener === "function") {
      vv.addEventListener("resize", onViewportResize);
      vv.addEventListener("scroll", onViewportResize);
    } else {
      // fallback: também ouvir window resize
      window.addEventListener("resize", onViewportResize);
    }

    return () => {
      card.removeEventListener("focusin", onFocusIn);
      if (vv && typeof vv.removeEventListener === "function") {
        vv.removeEventListener("resize", onViewportResize);
        vv.removeEventListener("scroll", onViewportResize);
      } else {
        window.removeEventListener("resize", onViewportResize);
      }
    };
  }, []);

  return (
    // REMOVED min-h-screen to avoid forcing full viewport height inside modal
    <div className="w-full flex items-center justify-center py-4 px-2 relative z-10">
     
      {/* Card: limitar altura e ativar rolagem interna */}
      <div
        ref={cardRef}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 relative"
        
        style={{
          borderTop: `6px solid ${colors.primaryGreen}`,
          maxHeight: "calc(100vh - 120px)", // permite espaço para o teclado / header
          overflowY: "auto",
          WebkitOverflowScrolling: "touch", // iOS smoothing
        }}
      >
        <div className="flex flex-col items-center -mb-6 -mt-3">
          <img src="/favicon.ico" alt="Logo" className="h-32 w-32 mb-0" />
        </div>

        <p className="text-sm text-gray-600 text-right mb-3">Etapa {phase} de 4</p>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-8 overflow-hidden">
          <motion.div
            className="h-2 rounded-full"
            style={{ background: colors.primaryGreen }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div key="phase1" {...containerVariants} transition={{ duration: 0.4 }}>
              <h2 className="text-xl font-bold text-gray-800 mb-8 text-center">Dados Pessoais</h2>

              {/* Campo nome */}
              <div className="flex items-center border rounded-lg mb-3 p-2 bg-gray-50 focus-within:ring-2 focus-within:ring-green-600 group">
                <User className="text-gray-400 mr-2 transition-colors duration-200 group-focus-within:text-green-600" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Nome completo"
                  className="flex-1 bg-transparent outline-none py-2"
                />
              </div>

              {/* Campo telefone */}
              <div className="flex items-center border rounded-lg mb-6 p-2 bg-gray-50 focus-within:ring-2 focus-within:ring-green-600 group">
                <Phone className="text-gray-400 mr-2 transition-colors duration-200 group-focus-within:text-green-600" />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="+258 84 xxx xxxx"
                  className="flex-1 bg-transparent outline-none py-2"
                />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleContinue}
                  className="flex items-center w-full justify-center mb-8 gap-2 px-4 py-2 rounded-lg text-white font-semibold transition"
                  style={{ background: colors.primaryGreen }}
                >
                  Continuar <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div key="phase2" {...containerVariants} transition={{ duration: 0.4 }}>
              <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Localização</h2>

              <div className="flex items-center border rounded-lg mb-3 p-2 bg-gray-50 focus-within:ring-2 focus-within:ring-green-600 group">
                <MapPin className="text-gray-400 mr-2 transition-colors duration-200 group-focus-within:text-green-600" />
                <input
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  placeholder="Província"
                  className="flex-1 bg-transparent outline-none py-2"
                />
              </div>

              <div className="flex items-center border rounded-lg mb-3 p-2 bg-gray-50 focus-within:ring-2 focus-within:ring-green-600 group">
                <MapPin className="text-gray-400 mr-2 transition-colors duration-200 group-focus-within:text-green-600" />
                <input
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="Distrito"
                  className="flex-1 bg-transparent outline-none py-2"
                />
              </div>

              <div className="flex items-center border rounded-lg mb-6 p-2 bg-gray-50 focus-within:ring-2 focus-within:ring-green-600 group">
                <MapPin className="text-gray-400 mr-2 transition-colors duration-200 group-focus-within:text-green-600" />
                <input
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="Localidade"
                  className="flex-1 bg-transparent outline-none py-2"
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition"
                  style={{ background: colors.accentBlue }}
                >
                  <ArrowLeft size={18} /> Voltar
                </button>

                <button
                  onClick={handleContinue}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition"
                  style={{ background: colors.primaryGreen }}
                >
                  Continuar <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div key="phase3" {...containerVariants} transition={{ duration: 0.4 }}>
              <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">
                {name} — {phone}
              </h2>
              <p className="text-sm text-gray-600 mb-5 text-center">Preencha informações do produto</p>

              <div className="flex items-center border rounded-lg mb-3 p-2 bg-gray-50 focus-within:ring-2 focus-within:ring-green-600 group">
                <Layers className="text-gray-400 mr-2 transition-colors duration-200 group-focus-within:text-green-600" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="flex-1 bg-transparent outline-none py-2"
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="Verdura">Verdura</option>
                  <option value="Cereais">Cereais</option>
                  <option value="Legumes">Legumes</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div className="flex items-center border rounded-lg mb-6 p-2 bg-gray-50 focus-within:ring-2 focus-within:ring-green-600 group">
                <Hash className="text-gray-400 mr-2 transition-colors duration-200 group-focus-within:text-green-600" />
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                  placeholder="Quantidade (KG, UD)"
                  className="flex-1 bg-transparent outline-none py-2"
                />
              </div>

              <div className="flex items-center border rounded-lg mb-6 p-2 bg-gray-50 focus-within:ring-2 focus-within:ring-green-600 group">
                <Coins className="text-gray-400 mr-2 transition-colors duration-200 group-focus-within:text-green-600" />
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  placeholder="Preço (MZN)"
                  className="flex-1 bg-transparent outline-none py-2"
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition"
                  style={{ background: colors.accentBlue }}
                >
                  <ArrowLeft size={18} /> Voltar
                </button>

                <button
                  onClick={handleContinue}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition"
                  style={{ background: colors.primaryGreen }}
                >
                  Continuar <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {phase === 4 && (
            <motion.form key="phase4" onSubmit={handleSubmit} {...containerVariants} transition={{ duration: 0.4 }}>
              <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">
                {name} — {phone}
              </h2>
              <h3 className="text-bold mb-5 text-gray-600 text-center">Adicione uma imagem (opcional)</h3>

              <div className="flex flex-col items-center mb-5 group">
                <label
                  htmlFor="imageUpload"
                  className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition"
                >
                  <ImageIcon size={40} className="text-gray-400 mb-2 transition-colors duration-200 group-focus-within:text-green-600" />
                  <span className="text-sm text-gray-600">Carregar imagem</span>
                  <input id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                <span className="text-xs mt-2 text-gray-500 italic">{imageName}</span>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="flex w-full items-center gap-2 justify-center mb-10 px-4 py-3 rounded-lg text-white text-center font-semibold transition"
                  style={{ background: colors.accentOrange }}
                >
                  <Upload size={18} /> Anunciar Produto
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SmartForm;
