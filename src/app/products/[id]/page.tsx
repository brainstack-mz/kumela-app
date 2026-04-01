"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  LucideIcon, Volume2, ShoppingCart, Send, Star, 
  ExternalLink, Check 
} from "lucide-react";
import {
  ArrowLeft,
  MessageCircle,
  MapPin,
  Tag,
  Box,
  User,
  Scale,
  X,
} from "lucide-react";
import PurchaseFlow from "@/components/purchase/PurchaseFlow";
import { productsData } from "@/data/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductMap } from "@/components/product/ProductMap";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [showPurchase, setShowPurchase] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const product = productsData.find((p) => p.id === Number(id));

  useEffect(() => {
    if ((showPurchase || showChat) && isPlaying) {
      const audio = document.getElementById("product-audio") as HTMLAudioElement;
      if (audio) {
        audio.pause();
        setIsPlaying(false);
      }
    }
  }, [showPurchase, showChat, isPlaying]);

  if (!product) return null;

  const finalPrice = product.discount
    ? product.price - product.price * (product.discount / 100)
    : product.price;

  const toggleAudio = () => {
    const audio = document.getElementById("product-audio") as HTMLAudioElement;
    if (audio) {
      if (isPlaying) audio.pause();
      else audio.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-background text-gray-900 dark:text-foreground pb-20 relative transition-all duration-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      
      <audio id="product-audio" src="/audio/Recording_5.m4a" onEnded={() => setIsPlaying(false)} />

      {/* ── BOTÕES SUPERIORES ── */}
      <div className={`max-w-7xl mx-auto px-6 pt-6 flex justify-between items-center sticky top-0 z-30 transition-all duration-300 ${showPurchase || showChat ? 'opacity-0 pointer-events-none -translate-y-5' : 'opacity-100 translate-y-0'}`}>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 group cursor-pointer bg-white/90 dark:bg-card/90 backdrop-blur-md p-2 pr-4 rounded-full border border-gray-100 dark:border-border shadow-sm hover:shadow-md transition-all"
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 dark:bg-muted border border-gray-100 dark:border-border group-hover:bg-green-600 transition-colors">
            <ArrowLeft size={16} className="text-gray-500 dark:text-muted-foreground group-hover:text-white" />
          </div>
          <span className="text-[10px] font-black text-gray-400 dark:text-muted-foreground group-hover:text-gray-700 dark:group-hover:text-foreground tracking-widest uppercase">Voltar</span>
        </button>

        <button 
          onClick={toggleAudio}
          className="flex items-center gap-2 bg-white/90 dark:bg-card/90 backdrop-blur-md p-1.5 pr-4 rounded-full border border-gray-100 dark:border-border shadow-sm hover:border-green-200 transition-all cursor-pointer"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-green-600 scale-110 shadow-lg shadow-green-200' : 'bg-gray-100 dark:bg-muted'}`}>
            <Volume2 size={14} className={isPlaying ? 'text-white' : 'text-gray-400 dark:text-muted-foreground'} />
          </div>
          <span className="text-[10px] font-black text-gray-500 dark:text-muted-foreground uppercase tracking-tighter">Ouvir Detalhes</span>
        </button>
      </div>

      {/* ── CONTEÚDO PRINCIPAL ── */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ── COLUNA ESQUERDA ── */}
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-[40px] overflow-hidden shadow-xl shadow-gray-200/40 dark:shadow-none bg-white dark:bg-card p-2 border dark:border-border">
              <ProductGallery images={product.images || [product.image]} />
            </div>

            {/* Ícones de Detalhes Rápidos */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <DetailItem icon={Tag} label="Categoria" value={product.category} />
              <DetailItem icon={Scale} label="Unidade" value={product.unit} />
              <DetailItem icon={Box} label="Stock" value={`${product.quantity} un.`} />
              <DetailItem icon={User} label="Origem" value={product.user} />
            </div>

            {/* Descrição Textual */}
            <div className="bg-white dark:bg-card rounded-[32px] border border-gray-100 dark:border-border p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-green-500 rounded-full" />
                <h2 className="text-xs font-black text-gray-800 dark:text-foreground uppercase tracking-[0.2em]">Sobre o Produto</h2>
              </div>
              <p className="text-gray-500 dark:text-slate-400 leading-relaxed text-sm font-medium">{product.description}</p>
            </div>
          </div>

          {/* ── COLUNA DIREITA ── */}
          <div className="lg:col-span-5 space-y-6">
            <div className="lg:sticky lg:top-24 space-y-6">

              <div className="px-2 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-500/10 px-3 py-1.5 rounded-full border border-green-100 dark:border-green-500/20">
                    <Check size={10} strokeWidth={3} /> Produto Disponível
                  </span>
                  {product.discount && (
                    <span className="text-[10px] font-black text-white bg-red-500 px-3 py-1.5 rounded-full uppercase tracking-tighter">
                      -{product.discount}% OFF
                    </span>
                  )}
                </div>
                
                <h1 className="text-4xl font-black text-gray-900 dark:text-foreground leading-tight tracking-tight">{product.name}</h1>
                
                <div className="flex flex-col gap-2">
                   <div className="flex items-center gap-1.5 text-gray-400 dark:text-slate-500">
                      <MapPin size={14} className="text-green-500" />
                      <span className="text-xs font-bold">{product.location}, Moçambique</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1,2,3,4].map(i => <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />)}
                        <Star size={12} className="text-gray-200 dark:text-muted fill-gray-200 dark:fill-muted" />
                      </div>
                      <span className="text-[11px] font-bold text-gray-400 dark:text-slate-500">4.0 · <span className="text-green-600">Produtor verificado</span></span>
                   </div>
                </div>
              </div>

              {/* CARD DE COMPRA */}
              <div className="bg-white dark:bg-card rounded-[40px] border border-gray-100 dark:border-border shadow-2xl shadow-gray-200/60 dark:shadow-none overflow-hidden transition-all duration-500">
                <div className={`p-8 border-b border-gray-50 dark:border-border transition-colors ${showPurchase || showChat ? 'bg-green-50/30 dark:bg-green-500/5' : 'bg-gray-50/20 dark:bg-muted/10'}`}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black text-gray-900 dark:text-foreground tracking-tighter">{finalPrice.toFixed(0)}</span>
                    <span className="text-xl font-black text-gray-400 dark:text-muted-foreground">MT</span>
                    {product.discount && (
                      <div className="ml-4 flex flex-col">
                        <span className="text-[10px] font-black text-gray-400 uppercase">Antes</span>
                        <span className="text-sm font-bold text-red-400 line-through">{product.price} MT</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 dark:text-muted-foreground mt-2 font-black uppercase tracking-[0.15em]">por {product.unit}</p>
                </div>

                <div className="p-8">
                  {!showPurchase && !showChat ? (
                    <div className="space-y-4">
                      <button
                        onClick={() => setShowPurchase(true)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white h-16 rounded-[24px] font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-green-100 dark:shadow-none active:scale-95 cursor-pointer flex items-center justify-center gap-3"
                      >
                        <ShoppingCart size={18} />
                        Comprar Agora
                      </button>
                      <button 
                        onClick={() => setShowChat(true)}
                        className="w-full bg-white dark:bg-card border-2 border-gray-100 dark:border-border hover:border-green-500 text-gray-700 dark:text-foreground h-16 rounded-[24px] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all cursor-pointer"
                      >
                        <MessageCircle size={18} className="text-green-500" />
                        Enviar mensagem
                      </button>
                    </div>
                  ) : showChat ? (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-[10px] font-black text-gray-900 dark:text-foreground uppercase tracking-widest">Chat com Vendedor</h4>
                        <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-red-500 transition-colors"><X size={18} /></button>
                      </div>
                      <div className="bg-gray-50 dark:bg-muted/50 rounded-2xl p-4 mb-4 h-32 overflow-y-auto text-[11px] text-gray-500 dark:text-slate-400 border border-gray-100 dark:border-border">
                        Olá! Como posso ajudar com o pedido de {product.name}?
                      </div>
                      <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Escreva sua mensagem..."
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            className="w-full bg-white dark:bg-muted border border-gray-200 dark:border-border rounded-xl py-3 pl-4 pr-12 text-xs focus:ring-2 focus:ring-green-500 outline-none transition-all dark:text-foreground"
                        />
                        <button className="absolute right-2 top-1.5 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            <Send size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="animate-in fade-in zoom-in-95 duration-300 text-foreground">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-[10px] font-black text-gray-900 dark:text-foreground uppercase tracking-[0.2em]">Checkout Kumela</h4>
                        <button onClick={() => setShowPurchase(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-muted text-gray-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-all cursor-pointer">
                          <X size={18} />
                        </button>
                      </div>
                      <PurchaseFlow
                        product={{...product, stock: product.quantity, userPhone: product.phone}}
                        onClose={() => setShowPurchase(false)}
                      />
                    </div>
                  )}
                </div>
              </div>    

              {/* CARD DE MAPA */}
                <div className="h-64 relative rounded-[32px] overflow-hidden border-4 border-white dark:border-card shadow-inner">
                   <ProductMap location={product.location} />
                   
                   <button className="absolute top-4 right-4 bg-white/90 dark:bg-card/90 backdrop-blur px-4 py-2.5 rounded-xl shadow-lg border border-gray-100 dark:border-border flex items-center gap-2 hover:bg-white dark:hover:bg-card transition-all">
                      <ExternalLink size={14} className="text-gray-500 dark:text-muted-foreground" />
                      <span className="text-[10px] font-black text-gray-800 dark:text-foreground uppercase">Abrir GPS</span>
                   </button>

                   <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-card/95 px-3 py-2 rounded-xl shadow-md border border-gray-100 dark:border-border flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-[10px] font-bold text-gray-700 dark:text-foreground">Localização Exata</span>
                   </div>
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string | number }) {
  return (
    <div className="bg-white dark:bg-card p-5 rounded-[28px] border border-gray-100 dark:border-border flex flex-col items-center text-center gap-2 hover:border-green-200 dark:hover:border-green-500/30 transition-all shadow-sm group">
      <div className="w-10 h-10 bg-green-50 dark:bg-green-500/10 rounded-2xl flex items-center justify-center text-green-600 mb-1 group-hover:bg-green-600 group-hover:text-white transition-all">
        <Icon size={18} />
      </div>
      <span className="text-[9px] font-black text-gray-400 dark:text-muted-foreground uppercase tracking-widest">{label}</span>
      <span className="text-xs font-black text-gray-800 dark:text-foreground">{value}</span>
    </div>
  );
}