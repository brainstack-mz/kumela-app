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
import { provincesData } from "@/data/provincesData";
import MapPicker from "@/components/MapPicker";

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
  const [showMap, setShowMap] = useState(false);
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

  return (
    <div className="w-full flex items-center justify-center py-4 px-2 relative z-10">
      <div
        ref={cardRef}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 relative"
        style={{
          borderTop: `6px solid ${colors.primaryGreen}`,
          maxHeight: "calc(100vh - 120px)",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
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
              <div className="flex items-center border rounded-lg mb-3 p-2 bg-gray-50">
                <User className="text-gray-400 mr-2" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Nome completo"
                  className="flex-1 bg-transparent outline-none py-2"
                />
              </div>
              <div className="flex items-center border rounded-lg mb-6 p-2 bg-gray-50">
                <Phone className="text-gray-400 mr-2" />
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

              {showMap ? (
                <MapPicker
                  onSelect={(coords, name) => {
                    setLocality(name || `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`);
                    setShowMap(false);
                  }}
                  onCancel={() => setShowMap(false)}
                />
              ) : (
                <>
                  <div className="flex items-center border rounded-lg mb-3 p-2 bg-gray-50">
                    <MapPin className="text-gray-400 mr-2" />
                    <select
                      value={province}
                      onChange={(e) => {
                        setProvince(e.target.value);
                        setDistrict("");
                        setLocality("");
                      }}
                      className="flex-1 bg-transparent outline-none py-2"
                    >
                      <option value="">Selecione a Província</option>
                      {provincesData.map((p) => (
                        <option key={p.name} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center border rounded-lg mb-3 p-2 bg-gray-50">
                    <MapPin className="text-gray-400 mr-2" />
                    <select
                      value={district}
                      onChange={(e) => {
                        setDistrict(e.target.value);
                        setLocality("");
                      }}
                      disabled={!province}
                      className="flex-1 bg-transparent outline-none py-2"
                    >
                      <option value="">Selecione o Distrito</option>
                      {provincesData
                        .find((p) => p.name === province)
                        ?.districts.map((d) => (
                          <option key={d.name} value={d.name}>
                            {d.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="flex items-center border rounded-lg mb-3 p-2 bg-gray-50">
                    <MapPin className="text-gray-400 mr-2" />
                    <select
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      disabled={!district}
                      className="flex-1 bg-transparent outline-none py-2"
                    >
                      <option value="">Selecione a Localidade</option>
                      {provincesData
                        .find((p) => p.name === province)
                        ?.districts.find((d) => d.name === district)
                        ?.localities.map((l) => (
                          <option key={l.name} value={l.name}>
                            {l.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <button
                    onClick={() => setShowMap(true)}
                    className="flex items-center justify-center w-full py-2 mb-4 rounded-lg text-white font-semibold"
                    style={{ background: colors.accentBlue }}
                  >
                    📍 Escolher Localidade no Mapa
                  </button>
                </>
              )}

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

          {/* === ETAPA 3: Produto === */}
          {phase === 3 && (
            <motion.div key="phase3" {...containerVariants} transition={{ duration: 0.4 }}>
              <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">
                {name} — {phone}
              </h2>
              <p className="text-sm text-gray-600 mb-5 text-center">Preencha informações do produto</p>

              {/* Categoria */}
              <div className="flex items-center border rounded-lg mb-3 p-2 bg-gray-50 focus-within:ring-2 focus-within:ring-green-600 group">
                <Layers className="text-gray-400 mr-2 group-focus-within:text-green-600" />
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

              {/* Quantidade */}
              <div className="flex items-center border rounded-lg mb-6 p-2 bg-gray-50 focus-within:ring-2 focus-within:ring-green-600 group">
                <Hash className="text-gray-400 mr-2 group-focus-within:text-green-600" />
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                  placeholder="Quantidade (KG, UD)"
                  className="flex-1 bg-transparent outline-none py-2"
                />
              </div>

              {/* Preço */}
              <div className="flex items-center border rounded-lg mb-6 p-2 bg-gray-50 focus-within:ring-2 focus-within:ring-green-600 group">
                <Coins className="text-gray-400 mr-2 group-focus-within:text-green-600" />
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

          {/* === ETAPA 4: Imagem === */}
          {phase === 4 && (
            <motion.form
              key="phase4"
              onSubmit={handleSubmit}
              {...containerVariants}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">
                {name} — {phone}
              </h2>
              <h3 className="text-bold mb-5 text-gray-600 text-center">
                Adicione uma imagem (opcional)
              </h3>

              {/* Upload */}
              <div className="flex flex-col items-center mb-5 group">
                <label
                  htmlFor="imageUpload"
                  className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition"
                >
                  <ImageIcon
                    size={40}
                    className="text-gray-400 mb-2 group-focus-within:text-green-600"
                  />
                  <span className="text-sm text-gray-600">Carregar imagem</span>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
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
