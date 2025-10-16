
// components/smart-form/SmartForm.tsx
"use client";

/**
 * SmartForm.tsx
 * - Formulário em etapas (phased) mostrado em modal.
 * - Integração com MapTouch (modal) para escolher localidade em mapa.
 * - Código limpo, modular e comentado.
 *
 * NOTA: MapTouch é importado dinamicamente (ssr:false) para evitar problemas com Next.js SSR.
 */

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
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
  CheckCircle,
  Edit3,
  Info,
} from "lucide-react";
import { provincesData } from "@/data/provincesData";
import PriceTable from "@/data/priceTable";

// dynamical import do MapTouch para carregar apenas no cliente
const MapTouch = dynamic(() => import("./MapTouch"), { ssr: false });

interface SmartFormProps {
  onClose?: () => void;
}

const colors = {
  primaryGreen: "#4CAF50",
  darkGreen: "#2E7D32",
  accentBlue: "#1976D2",
  darkBlue: "#0D47A1",
  white: "#FFFFFF",
  lightGray: "#F5F5F5",
  accentOrange: "#FF9800",
};

const SmartForm: React.FC<SmartFormProps> = ({ onClose }) => {
  const [phase, setPhase] = useState<number>(1);
  const [success, setSuccess] = useState(false);

  // dados do usuário / produto
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [districts, setDistricts] = useState<string[]>([]);
  const [locality, setLocality] = useState<string>("");
  // coordenadas preenchidas via MapTouch (opcional)
  const [localityCoords, setLocalityCoords] = useState<{ lat: number; lng: number } | null>(null);

  const [category, setCategory] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  // imagem
  const [imageName, setImageName] = useState<string>("Nenhuma imagem selecionada");
  const [imageURL, setImageURL] = useState<string | null>(null);

  // modal mapa
  const [mapOpen, setMapOpen] = useState<boolean>(false);

  // price table modal
  const [showTable, setShowTable] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);

  // audio
    const [tocando, setTocando] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const timer = useRef<NodeJS.Timeout | null>(null);
    const [valor, setValor] = useState("");
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioBufferRef = useRef<AudioBuffer | null>(null);
    const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  
  // Carrega dados salvos localmente (se existirem)
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedPhone = localStorage.getItem("userPhone");
    const storedProvince = localStorage.getItem("province");
    const storedDistrict = localStorage.getItem("district");
    const storedLocality = localStorage.getItem("locality");
    const lat = localStorage.getItem("locality_lat");
    const lng = localStorage.getItem("locality_lng");

    if (storedName) setName(storedName);
    if (storedPhone) setPhone(storedPhone);
    if (storedProvince) setProvince(storedProvince);
    if (storedDistrict) setDistrict(storedDistrict);
    if (storedLocality) setLocality(storedLocality);
    if (lat && lng) setLocalityCoords({ lat: Number(lat), lng: Number(lng) });

    // se já tiver dados básicos, salta para fase 3 (comportamento anterior)
    if (storedName && storedPhone && storedProvince) {
      setPhase(3);
    }
  }, []);

  // atualiza lista de distritos quando mudar província
  useEffect(() => {
    if (province) {
      const selected = provincesData.find((p) => p.name === province);
      setDistricts(selected ? selected.districts : []);
      // mantem o distrito guardado só se pertence à nova província
      const storedDistrict = localStorage.getItem("district");
      if (storedDistrict && selected && selected.districts.includes(storedDistrict)) {
        setDistrict(storedDistrict);
      } else {
        setDistrict("");
      }
    } else {
      setDistricts([]);
      setDistrict("");
    }
  }, [province]);


  //funcao para carregar o audio
    React.useEffect(() => {
      const carregarAudio = async () => {
        try {
          const context =  new (window.AudioContext || (window as any).webkitAudioContext)();
          audioContextRef.current = context;
          const response = await fetch("/assets/audio/price.mp3");
          const arrayBuffer = await response.arrayBuffer();
          audioBufferRef.current = await context.decodeAudioData(arrayBuffer)
//          alert("Audio carregado com sucesso");

        } catch (error) {
          alert("Erro ao carregar o audio "+ error);
          console.warn('Erro ao carregar o audio '+ error);
        }
      };
      carregarAudio();
    }, []);
  
    //tocar o audio
    const playAudio = async () => {
      if (!audioContextRef.current || !audioBufferRef.current) return;
      stopAudio(); //garante que nao haja ninguem reproduzindo
  
      try {
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBufferRef.current;
  
        source.connect(audioContextRef.current.destination);
        source.start(0);
        sourceRef.current = source;
        setTocando(true);
        source.onended = () => setTocando(false);
        console.log("Audio tocando");
      } catch (e) {
          alert("Erro ao reproduzir audio " + e);
        console.warn('Erro ao reproduzir o audio ', e);
      }
    };
  
    const stopAudio = () => {
      if (sourceRef.current) {
        sourceRef.current.stop();
        sourceRef.current.disconnect();
        sourceRef.current = null;
      }
    };
  
    //deteccao de click longo
    const handlePressStart = () => {
      timer.current = setTimeout(() => {
        playAudio();
      }, 400);
    };
  
    const handlePressEnd = () => {
      if (timer.current) {
        clearTimeout(timer.current);
        stopAudio();
      };
    };
  

  // rolagem correta ao focar inputs (mobile)
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onFocusIn = (ev: FocusEvent) => {
      const target = ev.target as HTMLElement | null;
      if (!target) return;
      if (["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName)) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 260);
      }
    };
    card.addEventListener("focusin", onFocusIn);
    return () => card.removeEventListener("focusin", onFocusIn);
  }, []);

  // navegação entre fases
  const handleContinue = () => {
    if (phase === 1) {
      if (!phone || !name.trim()) {
        alert("Por favor, preencha nome e telefone.");
        return;
      }
      localStorage.setItem("userName", name);
      localStorage.setItem("userPhone", phone);
    }

    if (phase === 2) {
      if (!province || !district) {
        alert("Por favor, selecione a província e o distrito.");
        return;
      }
      localStorage.setItem("province", province);
      localStorage.setItem("district", district);
      localStorage.setItem("locality", locality || "");
      if (localityCoords) {
        localStorage.setItem("locality_lat", String(localityCoords.lat));
        localStorage.setItem("locality_lng", String(localityCoords.lng));
      }
    }

    if (phase === 3 && (!category || !quantity || !price)) {
      alert("Por favor, preencha todas as informações do produto.");
      return;
    }

    if (phase < 5) setPhase((p) => p + 1);
  };

  const handleBack = () => {
    if (phase > 1) setPhase((p) => p - 1);
  };

  // imagem
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(file.name);
      setImageURL(URL.createObjectURL(file));
    } else {
      setImageName("Nenhuma imagem selecionada");
      setImageURL(null);
    }
  };

  // resumo e confirmação
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhase(5);
  };

  const confirmSubmit = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      localStorage.clear();
      setPhase(1);
      // opcional: limpa localstorage (ou mantem)
     //  localStorage.clear();
      if (onClose) onClose();
    }, 2200);
  };

  // handler vindo do MapTouch (quando o usuário confirma no modal)
  const handleMapConfirm = ({ lat, lng, displayName }: { lat: number; lng: number; displayName?: string }) => {
    setLocalityCoords({ lat, lng });
    if (displayName) {
      setLocality(displayName);
    } else {
      setLocality(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    }
    // fecha modal
    setMapOpen(false);
    // salva para persistência
    localStorage.setItem("locality", displayName || `${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    localStorage.setItem("locality_lat", String(lat));
    localStorage.setItem("locality_lng", String(lng));
  };

  // Progresso (visível)
  const progress = (phase / 5) * 100;

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
          <img src="/favicon.ico" alt="Logo" className="h-28 w-28 mb-0" />
        </div>

        <p className="text-sm text-gray-600 text-right mb-3">Etapa {phase} de 5</p>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-8 overflow-hidden">
          <motion.div
            className="h-2 rounded-full"
            style={{ background: colors.primaryGreen }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>

        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div key="phase1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Dados Pessoais</h2>
              <div className="space-y-4">
                <div className="flex items-center border rounded-lg p-2">
                  <User className="text-gray-500 mr-2" />
                  <input type="text" placeholder="Nome completo" value={name} onChange={(e) => setName(e.target.value)} className="w-full outline-none" />
                </div>

                <div className="flex items-center border rounded-lg p-2">
                  <Phone className="text-gray-500 mr-2" />
                  <input type="tel" placeholder="Número de telefone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full outline-none" />
                </div>

                <button onClick={handleContinue} className="w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2" style={{ background: colors.primaryGreen }}>
                  Continuar <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div key="phase2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Localização</h2>

              <div className="space-y-4">
                <div className="flex items-center border rounded-lg p-2">
                  <MapPin className="text-gray-500 mr-2" />
                  <select value={province} onChange={(e) => setProvince(e.target.value)} className="w-full outline-none bg-transparent">
                    <option value="">Selecione a província</option>
                    {provincesData.map((p) => (
                      <option key={p.name} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center border rounded-lg p-2">
                  <MapPin className="text-gray-500 mr-2" />
                  <select value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full outline-none bg-transparent">
                    <option value="">Selecione o distrito</option>
                    {districts.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Campo localidade + botão abrir mapa */}
                <div className="flex gap-2 items-center">
                  <div className="flex items-center border rounded-lg p-2 flex-1">
                    <MapPin className="text-gray-500 mr-2" />
                    <input
                      type="text"
                      placeholder="Localidade (opcional)"
                      value={locality}
                      onChange={(e) => {
                        setLocality(e.target.value);
                        // remove coords se o usuário editar manualmente
                        if (localityCoords) setLocalityCoords(null);
                      }}
                      className="w-full outline-none"
                    />
                  </div>

                  <button
                    onClick={() => setMapOpen(true)}
                    className="py-2 px-3 rounded-lg border hover:bg-gray-50 flex items-center gap-2"
                    title="Escolher no mapa"
                  >
                    <MapPin size={18} /> Mapa
                  </button>
                </div>

                <div className="flex justify-between gap-2">
                  <button onClick={handleBack} className="w-1/2 py-3 rounded-lg text-white font-semibold" style={{ background: colors.accentBlue }}>
                    <ArrowLeft size={18} className="inline-block mr-1" /> Voltar
                  </button>
                  <button onClick={handleContinue} className="w-1/2 py-3 rounded-lg text-white font-semibold" style={{ background: colors.primaryGreen }}>
                    Continuar <ArrowRight size={18} className="inline-block ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div key="phase3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Detalhes do Produto</h2>

              <div className="space-y-4">
                <div className="flex items-center border rounded-lg p-2">
                  <Layers className="text-gray-500 mr-2" />
                  <input type="text" placeholder="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full outline-none" />
                </div>

                <div className="flex items-center border rounded-lg p-2">
                  <Hash className="text-gray-500 mr-2" />
                  <input type="number" placeholder="Quantidade disponivel (stock)" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full outline-none" />
                </div>

                <div className="flex items-center border rounded-lg p-2">
                  <Coins className="text-gray-500 mr-2" />
                  <input type="number" placeholder="Preço (MZN)" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full outline-none" />
                  <Info
                    size={28}
                    className="text-blue-500 mr-2 cursor-pointer"
                    onClick={() => setShowTable(true)}
                    onMouseUp={() => {handlePressEnd()}}
                    onMouseLeave={() => {handlePressEnd()}}
                    onTouchStart={() => {handlePressStart()}}
                    onMouseOver={() => handlePressStart()}
                    onTouchEnd={() => {handlePressEnd()}}
                  />
                </div>

                {showTable && <PriceTable onClose={() => setShowTable(false)} />}

                <div className="flex justify-between gap-2">
                  <button onClick={handleBack} className="w-1/2 py-3 rounded-lg text-white font-semibold" style={{ background: colors.accentBlue }}>
                    <ArrowLeft size={18} className="inline-block mr-1" /> Voltar
                  </button>
                  <button onClick={handleContinue} className="w-1/2 py-3 rounded-lg text-white font-semibold" style={{ background: colors.primaryGreen }}>
                    Continuar <ArrowRight size={18} className="inline-block ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {phase === 4 && (
            <motion.div key="phase4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Adicione uma Imagem</h2>

              <div className="space-y-4 text-center">
                <label htmlFor="image-upload" className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center cursor-pointer hover:border-green-500 transition">
                  <Upload className="text-gray-400 mb-2" size={32} />
                  <p className="text-gray-600">{imageName}</p>
                </label>
                <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

                {imageURL && <img src={imageURL} alt="Pré-visualização" className="rounded-lg w-full h-48 object-cover border" />}

                <div className="flex justify-between gap-2">
                  <button onClick={handleBack} className="w-1/2 py-3 rounded-lg text-white font-semibold" style={{ background: colors.accentBlue }}>
                    <ArrowLeft size={18} className="inline-block mr-1" /> Voltar
                  </button>
                  <button onClick={handleSubmit} className="w-1/2 py-3 rounded-lg text-white font-semibold" style={{ background: colors.primaryGreen }}>
                    Anunciar <ArrowRight size={18} className="inline-block ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {phase === 5 && (
            <motion.div key="phase5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Revisar informações</h2>

              <div className="bg-gray-50 border rounded-xl p-4 mb-4">
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2"><MapPin size={18} /> Localização</h3>
                <p><strong>Província:</strong> {province}</p>
                <p><strong>Distrito:</strong> {district}</p>
                <p><strong>Localidade:</strong> {locality || "—"}</p>
                {localityCoords && <p className="text-sm text-gray-500">Coordenadas: {localityCoords.lat.toFixed(5)}, {localityCoords.lng.toFixed(5)}</p>}
              </div>

              <div className="bg-gray-50 border rounded-xl p-4 mb-4">
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2"><Layers size={18} /> Produto</h3>
                <p><strong>Categoria:</strong> {category}</p>
                <p><strong>Quantidade:</strong> {quantity}</p>
                <p><strong>Preço:</strong> {price} MZN</p>
              </div>

              <div className="bg-gray-50 border rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2"><ImageIcon size={18} /> Imagem</h3>
                {imageURL ? (
                  <img src={imageURL} alt="Pré-visualização" className="rounded-lg w-full h-48 object-cover border" />
                ) : (
                  <p className="text-gray-500 italic">Nenhuma imagem selecionada</p>
                )}
              </div>

              <div className="flex justify-between gap-2">
                <button onClick={() => setPhase(3)} className="flex items-center gap-2 px-4 py-2 w-1/2 justify-center rounded-lg text-white font-semibold transition" style={{ background: colors.accentBlue }}>
                  <Edit3 size={18} /> Editar
                </button>

                <button onClick={confirmSubmit} className="flex items-center gap-2 px-4 py-2 w-1/2 justify-center rounded-lg text-white font-semibold transition" style={{ background: colors.primaryGreen }}>
                  <CheckCircle size={18} /> Confirmar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* animação de sucesso */}
        <AnimatePresence>
          {success && (
            <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-2xl">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 120 }}>
                <CheckCircle size={72} color={colors.primaryGreen} />
              </motion.div>
              <p className="text-xl font-bold mt-4 text-gray-700">Produto anunciado com sucesso!</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal do mapa (MapTouch) */}
        <AnimatePresence>
          {mapOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50">
              {/* MapTouch é tela cheia e cuida do seu próprio layout */}
              <MapTouch
                initialCoords={localityCoords}
                onConfirm={(payload) => handleMapConfirm(payload)}
                onClose={() => setMapOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default SmartForm;
