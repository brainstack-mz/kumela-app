'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Plus, Minus, Trash2, CreditCard, 
  ArrowLeft, ShieldCheck, Clock, ShoppingBag, ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();
  
  // Lógica de negócio mantida conforme requisitos
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 50;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center transition-colors duration-500">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="relative mb-10"
        >
          <div className="w-72 h-72 bg-muted/30 rounded-[3rem] flex items-center justify-center backdrop-blur-3xl border border-border/50">
            <ShoppingCart size={100} className="text-muted-foreground/20" />
          </div>
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -top-4 -right-4 bg-[#2E7D32] p-5 rounded-3xl shadow-2xl text-white"
          >
            <Clock size={32} strokeWidth={2.5} />
          </motion.div>
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tighter">
          Carrinho <span className="text-[#2E7D32]">Vazio</span>
        </h1>
        <p className="text-muted-foreground mb-10 max-w-sm text-lg font-medium leading-relaxed">
          Parece que o seu cesto ainda não tem a frescura do campo. Vamos colher algo novo?
        </p>
        
        <Link href="/" className="group flex items-center gap-3 bg-[#2E7D32] text-white px-10 py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-green-900/20 hover:bg-[#1b4e1f] transition-all active:scale-95">
          Explorar Mercado <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 pb-32">
      {/* Navbar Premium */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border px-6 h-20 flex items-center justify-between">
        <button 
          onClick={() => router.back()} 
          className="group flex items-center gap-3 font-bold text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all"
        >
          <div className="p-2 rounded-xl bg-muted group-hover:bg-[#2E7D32] group-hover:text-white transition-all">
            <ArrowLeft size={18} />
          </div>
          Voltar
        </button>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border">
          <ShieldCheck size={16} className="text-[#2E7D32]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Pagamento Seguro 256-bit</span>
        </div>
        <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter leading-none">Total Atual</p>
                <p className="text-lg font-black text-[#2E7D32] leading-none">{total.toFixed(0)} MT</p>
            </div>
            <div className="w-10 h-10 bg-[#2E7D32]/10 rounded-2xl flex items-center justify-center text-[#2E7D32]">
                <ShoppingBag size={20}/>
            </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 max-w-7xl pt-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-2">Checkout.</h1>
            <p className="text-muted-foreground text-lg font-medium italic">Você selecionou {cartItems.length} produtos de alta qualidade.</p>
          </div>
          <button 
            onClick={clearCart} 
            className="group flex items-center gap-2 text-red-500 font-bold text-sm bg-red-500/5 hover:bg-red-500 hover:text-white px-6 py-3 rounded-2xl transition-all border border-red-500/10"
          >
            <Trash2 size={16} className="group-hover:rotate-12 transition-transform" /> Limpar Carrinho
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Lista de Itens */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode='popLayout'>
              {cartItems.map((item) => (
                <motion.div 
                  key={item.id} 
                  layout 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-card rounded-[2.5rem] p-6 border border-border shadow-sm hover:shadow-xl hover:border-[#2E7D32]/30 transition-all flex flex-col sm:flex-row gap-8 relative overflow-hidden"
                >
                  {/* Badge de quantidade no mobile */}
                  <div className="absolute top-4 right-4 sm:hidden bg-[#2E7D32] text-white text-[10px] font-black px-3 py-1 rounded-full">
                    {item.quantity}x
                  </div>

                  <div className="w-full sm:w-40 h-40 bg-muted rounded-[2rem] overflow-hidden shrink-0 border border-border/50">
                    <Image 
                        src={item.image} 
                        alt={item.name} 
                        width={200} 
                        height={200} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black text-[#2E7D32] uppercase tracking-[0.2em] mb-1 block">Produtos Kumela</span>
                        <h3 className="font-black text-foreground text-2xl tracking-tight">{item.name}</h3>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1 flex items-center gap-2">
                           Vendedor: <span className="text-foreground">{item.user}</span>
                        </p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="p-3 bg-muted rounded-2xl text-muted-foreground hover:bg-red-500 hover:text-white transition-all shadow-inner"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-8">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-muted-foreground uppercase">Subtotal Item</span>
                        <span className="text-foreground font-black text-3xl tracking-tighter">
                            {(item.price * item.quantity).toFixed(0)} <span className="text-sm font-medium">MT</span>
                        </span>
                      </div>

                      <div className="flex items-center bg-muted/50 rounded-2xl p-1.5 border border-border shadow-inner">
                        <button 
                            onClick={() => updateQuantity(item.id, -1)} 
                            className="p-3 hover:bg-background rounded-xl text-muted-foreground hover:text-foreground transition-all disabled:opacity-30"
                            disabled={item.quantity <= 1}
                        >
                            <Minus size={18} strokeWidth={3} />
                        </button>
                        <span className="w-12 text-center font-black text-xl">{item.quantity}</span>
                        <button 
                            onClick={() => updateQuantity(item.id, 1)} 
                            className="p-3 hover:bg-background rounded-xl text-muted-foreground hover:text-foreground transition-all"
                        >
                            <Plus size={18} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Resumo lateral estilo Neumorphism/Dark */}
          <div className="lg:col-span-5">
            <div className="bg-card dark:bg-slate-900/50 rounded-[3.5rem] p-10 border border-border shadow-2xl sticky top-28 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#2E7D32]" />
              
              <h2 className="text-3xl font-black mb-10 tracking-tighter flex items-center gap-3">
                Resumo <span className="text-muted-foreground font-light text-xl">da Compra</span>
              </h2>

              <div className="space-y-6 mb-12">
                <div className="flex justify-between font-bold text-muted-foreground">
                    <span className="flex items-center gap-2">Subtotal</span>
                    <span className="text-foreground">{subtotal.toFixed(0)} MT</span>
                </div>
                
                <div className="flex justify-between font-bold text-muted-foreground">
                    <span className="flex items-center gap-2 italic font-medium">Taxa de Entrega</span>
                    <span className={deliveryFee === 0 ? "text-green-500 font-black" : "text-foreground"}>
                        {deliveryFee === 0 ? 'GRÁTIS' : `${deliveryFee} MT`}
                    </span>
                </div>

                {deliveryFee > 0 && (
                   <div className="bg-[#2E7D32]/5 p-4 rounded-2xl border border-[#2E7D32]/20">
                      <p className="text-[10px] text-[#2E7D32] font-black uppercase text-center">
                        Adicione mais {(501 - subtotal).toFixed(0)} MT para frete grátis!
                      </p>
                   </div>
                )}

                <div className="h-px bg-border my-8" />

                <div className="flex flex-col gap-2">
                  <span className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em]">Valor Total Final</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black tracking-tighter text-foreground">{total.toFixed(0)}</span>
                    <span className="text-xl font-bold text-[#2E7D32]">MT</span>
                  </div>
                </div>
              </div>

              <button className="group w-full bg-[#2E7D32] py-6 rounded-[2rem] font-black text-xl text-white hover:bg-[#236327] transition-all active:scale-95 shadow-2xl shadow-green-900/30 flex items-center justify-center gap-4">
                <CreditCard size={24} /> Finalizar Pedido <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              
              <p className="text-center text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-8 flex items-center justify-center gap-2 opacity-50">
                <ShieldCheck size={12} /> Compra 100% Protegida
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}