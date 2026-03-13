// components/smart-form/SmartForm.tsx
"use client";

/**
 * SmartForm.tsx
 * - Formulário em etapas (phased) mostrado em modal.
 * - Integração com MapTouch (modal) para escolher localidade em mapa.
 * - Código limpo, modular e comentado.
 *
 * NOTA: MapTouch é importado dinamicamente (ssr:false) para evitar problemas com Next.js SSR.
 * * CORREÇÕES APLICADAS:
 * 1. PriceTable movido para renderização fora do formulário (tela cheia/modal principal).
 * 2. Fase 1 ajustada para permitir que o usuário insira o Nome MANUALMENTE se o número de telefone
 * não retornar um usuário cadastrado, ou preencha AUTOMATICAMENTE se o usuário for encontrado.
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

  // --- Estados do Formulário ---
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [districts, setDistricts] = useState<string[]>([]);
  const [locality, setLocality] = useState<string>("");
  const [localityCoords, setLocalityCoords] = useState<{ lat: number; lng: number } | null>(null);

  const [category, setCategory] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const [imageName, setImageName] = useState<string>("Nenhuma imagem selecionada");
  const [imageURL, setImageURL] = useState<string | null>(null);

  const [mapOpen, setMapOpen] = useState<boolean>(false);
  const [showTable, setShowTable] = useState(false);
  const [isNameAutoFilled, setIsNameAutoFilled] = useState(false); // Novo estado para controlar preenchimento automático

  const cardRef = useRef<HTMLDivElement | null>(null);

  // --- Audio Hooks/Refs (Mantidos) ---
    const [tocando, setTocando] = useState(false);
    const timer = useRef<NodeJS.Timeout | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioBufferRef = useRef<AudioBuffer | null>(null);
    const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  
  // Carrega dados salvos localmente
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

    if (storedName && storedPhone && storedProvince) {
      setPhase(3);
    }
  }, []);

  // Inicializa Nampula e Localização
  useEffect(() => {
    setProvince("Nampula");
    const nampulaData = provincesData.find((p) => p.name === "Nampula");
    if (nampulaData) {
      setDistricts(nampulaData.districts);
    }
    if (navigator.geolocation && !localityCoords) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocalityCoords({ lat: latitude, lng: longitude });
          setLocality(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        },
        () => {}
      );
    }
  }, []);

  // Atualiza distritos
  useEffect(() => {
    if (province) {
      const selected = provincesData.find((p) => p.name === province);
      setDistricts(selected ? selected.districts : []);
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


  // --- Funções de Áudio (Mantidas) ---
    React.useEffect(() => {
      const carregarAudio = async () => {
        try {
          const context =  new (window.AudioContext || (window as any).webkitAudioContext)();
          audioContextRef.current = context;
          const response = await fetch("/assets/audio/price.mp3");
          const arrayBuffer = await response.arrayBuffer();
          audioBufferRef.current = await context.decodeAudioData(arrayBuffer)
        } catch (error) {
          console.warn('Erro ao carregar o audio '+ error);
        }
      };
      carregarAudio();
    }, []);
  
    const playAudio = async () => {
      if (!audioContextRef.current || !audioBufferRef.current) return;
      stopAudio(); 
      try {
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBufferRef.current;
        source.connect(audioContextRef.current.destination);
        source.start(0);
        sourceRef.current = source;
        setTocando(true);
        source.onended = () => setTocando(false);
      } catch (e) {
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
  
  // Rolagem para inputs (Mobile)
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


  // --- Lógica de Autenticação/Busca (Simulação) ---
  const fetchUserName = (phoneNumber: string): string | null => {
    // Simulação: Retorna um nome se o número for "cadastrado"
    if (phoneNumber.includes("84") || phoneNumber.includes("85")) {
      return "João da Silva";
    }
    // Simulação: Número não cadastrado
    return null; 
  }


  // --- Navegação entre fases ---
  const handleContinue = () => {
    if (phase === 1) {
      if (!phone) {
        alert("Por favor, preencha o número de telefone.");
        return;
      }

      const fetchedName = fetchUserName(phone);
      
      // 1. USUÁRIO CADASTRADO: Preenche automaticamente e continua.
      if (fetchedName) {
        setName(fetchedName);
        setIsNameAutoFilled(true);
        localStorage.setItem("userName", fetchedName);
        localStorage.setItem("userPhone", phone);
        setPhase((p) => p + 1);
        return;
      }

      // 2. USUÁRIO NÃO CADASTRADO: Exige que o campo 'name' seja preenchido manualmente.
      if (!name.trim()) {
        alert("Usuário não encontrado. Por favor, preencha seu Nome completo manualmente para prosseguir.");
        return;
      }
      
      // Se preencheu manualmente, salva e prossegue.
      setIsNameAutoFilled(false);
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

  // Imagem
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

  // Finalização
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
      if (onClose) onClose();
    }, 2200);
  };

  // MapTouch
  const handleMapConfirm = ({ lat, lng, displayName }: { lat: number; lng: number; displayName?: string }) => {
    setLocalityCoords({ lat, lng });
    if (displayName) {
      setLocality(displayName);
    } else {
      setLocality(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    }
    setMapOpen(false);
    localStorage.setItem("locality", displayName || `${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    localStorage.setItem("locality_lat", String(lat));
    localStorage.setItem("locality_lng", String(lng));
  };

  const progress = (phase / 5) * 100;

  // ----------------------------------------------------------------------------------
  // O componente principal (renderiza o PriceTable ou o Formulário)
  // ----------------------------------------------------------------------------------
  return (
    <AnimatePresence mode="wait">
        {/* Renderiza a Tabela de Preços como uma tela cheia se showTable for TRUE */}
        {showTable && (
            <motion.div
                key="price-table-full-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] overflow-auto bg-white" 
            >
                <PriceTable onClose={() => setShowTable(false)} />
            </motion.div>
        )}

        {/* Renderiza o Formulário de Etapas se showTable for FALSE */}
        {!showTable && (
            <motion.div 
                key="smart-form-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex items-center justify-center py-4 px-4 sm:px-6 relative z-10"
            >
              <div
                ref={cardRef}
                className="w-full bg-white rounded-2xl p-4 sm:p-6 relative"
                style={{
                  borderTop: `6px solid ${colors.primaryGreen}`,
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
                  {/* FASE 1: DADOS PESSOAIS (Nome opcional/automático) */}
                  {phase === 1 && (
                    <motion.div key="phase1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Dados Pessoais</h2>
                      <div className="space-y-4">
                         
                        <div className="flex items-center border rounded-lg p-2">
                          <Phone className="text-gray-500 mr-2" />
                          <input type="tel" placeholder="Número de telefone (84/85...)" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full outline-none" />
                        </div>

                        <div className={`flex items-center border rounded-lg p-2 ${isNameAutoFilled ? 'bg-gray-100' : ''}`}>
                          <User className="text-gray-500 mr-2" />
                          <input 
                              type="text" 
                              placeholder="Nome completo (Necessário)" 
                              value={name} 
                              onChange={(e) => {
                                  setName(e.target.value);
                                  setIsNameAutoFilled(false); // Permite edição se o usuário mudar o nome
                              }} 
                              className={`w-full outline-none ${isNameAutoFilled ? 'bg-gray-100 text-gray-700 cursor-not-allowed font-medium' : ''}`}
                              disabled={isNameAutoFilled}
                          />
                        </div>

                        <p className="text-xs text-gray-500">
                           Se o número for cadastrado, o nome será preenchido automaticamente ao clicar em Continuar. Caso contrário, preencha manualmente.
                        </p>

                        <button onClick={handleContinue} className="w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2" style={{ background: colors.primaryGreen }}>
                          Continuar <ArrowRight size={18} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* FASE 2: LOCALIZAÇÃO */}
                  {phase === 2 && (
                    <motion.div key="phase2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Localização</h2>

                      <div className="space-y-4">
                       
                        
                        {/* Província fixa */}
                        <div className="flex items-center border rounded-lg p-2">
                          <MapPin className="text-gray-500 mr-2" />
                          <input
                            type="text"
                            value="Nampula"
                            disabled
                            className="w-full outline-none bg-gray-100 text-gray-700 cursor-not-allowed"
                          />
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

                        {/* Campo localidade + botão pegar localização atual */}
                        <div className="flex gap-2 items-center">
                          <div className="flex items-center border rounded-lg p-2 flex-1">
                            <MapPin className="text-gray-500 mr-2" />
                            <input
                              type="text"
                              placeholder="Localidade (clique no mapa para pegar localização atual)"
                              value={locality}
                              onChange={(e) => {
                                setLocality(e.target.value);
                                if (localityCoords) setLocalityCoords(null);
                              }}
                              className="w-full outline-none"
                            />
                          </div>

                          <button
                            onClick={() => {
                              if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(
                                  (position) => {
                                    const { latitude, longitude } = position.coords;
                                    setLocalityCoords({ lat: latitude, lng: longitude });
                                    setLocality(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
                                    setMapOpen(true);
                                  },
                                  () => {
                                    setMapOpen(true);
                                  }
                                );
                              } else {
                                setMapOpen(true);
                              }
                            }}
                            className="py-2 px-3 rounded-lg bg-green-500 text-white hover:bg-green-600 flex items-center gap-2 transition-colors"
                            title="Usar localização atual"
                          >
                            <MapPin size={18} /> GPS
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

                  {/* FASE 3: DETALHES DO PRODUTO */}
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
                          <input type="number" placeholder="Quantidade disponivel (stock)" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full outline-none" min="1"/>
                        </div>

                        <div className="flex items-center border rounded-lg p-2">
                          <Coins className="text-gray-500 mr-2" />
                          <input type="number" placeholder="Preço (MZN)" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full outline-none" min="1" />
                          <Info
                            size={28}
                            className="text-blue-500 mr-2 cursor-pointer"
                            onClick={() => setShowTable(true)} // Abre a tabela em tela cheia
                            onMouseUp={handlePressEnd}
                            onMouseLeave={handlePressEnd}
                            onTouchStart={handlePressStart}
                            onMouseOver={handlePressStart}
                            onTouchEnd={handlePressEnd}
                          />
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

                  {/* FASE 4: IMAGEM */}
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

                  {/* FASE 5: REVISÃO */}
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
                      <MapTouch
                        initialCoords={localityCoords}
                        onConfirm={(payload) => handleMapConfirm(payload)}
                        onClose={() => setMapOpen(false)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>
        )}
      </AnimatePresence>
  );
};

export default SmartForm;