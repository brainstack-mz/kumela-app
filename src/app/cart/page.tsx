'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Plus, Minus, Trash2, CreditCard, 
  ArrowLeft, ShieldCheck, Clock, History 
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();
  
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 50;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="w-64 h-64 bg-slate-50 rounded-full flex items-center justify-center mb-8 relative"
        >
           <ShoppingCart size={80} className="text-slate-200" />
           <div className="absolute bottom-10 right-10 bg-white p-3 rounded-full shadow-lg text-green-600">
              <Clock size={32} strokeWidth={3} />
           </div>
        </motion.div>
        <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tighter">Seu Carrinho está Vazio</h1>
        <p className="text-slate-500 mb-8 max-w-xs">Parece que você ainda não escolheu seus produtos frescos de hoje.</p>
        
        <Link href="/" className="bg-[#2E7D32] text-white px-12 py-5 rounded-3xl font-black shadow-xl shadow-green-100 hover:bg-[#1b4e1f] transition-all">
          Começar a Comprar
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-32">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 h-16 flex items-center justify-between">
        <button onClick={() => router.back()} className="flex items-center gap-2 font-black text-xs uppercase text-gray-400 hover:text-gray-900 transition-all">
          <ArrowLeft size={18} /> Voltar
        </button>
        <span className="font-black text-[#2E7D32] text-sm tracking-widest">FINALIZAR PEDIDO</span>
        <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center text-green-600"><ShieldCheck size={18}/></div>
      </nav>

      <div className="container mx-auto px-4 max-w-6xl pt-10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Meu Carrinho</h1>
            <p className="text-slate-500 font-bold">{cartItems.length} Itens selecionados</p>
          </div>
          <button onClick={clearCart} className="text-red-500 font-bold text-sm flex items-center gap-2 hover:bg-red-50 px-4 py-2 rounded-2xl transition-all">
            <Trash2 size={16} /> Limpar Tudo
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div key={item.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }}
                  className="bg-white rounded-[2.5rem] p-5 border border-slate-100 shadow-sm flex gap-6"
                >
                  <div className="w-28 h-28 bg-slate-100 rounded-3xl overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} width={150} height={150} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-black text-slate-800 text-xl tracking-tight">{item.name}</h3>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.user}</span>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 size={22} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[#2E7D32] font-black text-2xl">{(item.price * item.quantity).toFixed(0)} <span className="text-xs">MT</span></span>
                      <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-900 transition-all"><Minus size={18} strokeWidth={3} /></button>
                        <span className="w-10 text-center font-black text-lg">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-900 transition-all"><Plus size={18} strokeWidth={3} /></button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl sticky top-24">
              <h2 className="text-2xl font-black mb-8 tracking-tighter">Resumo Final</h2>
              <div className="space-y-4 mb-10">
                <div className="flex justify-between font-bold text-slate-400 text-sm"><span>Subtotal</span><span className="text-white">{subtotal.toFixed(0)} MT</span></div>
                <div className="flex justify-between font-bold text-slate-400 text-sm"><span>Entrega</span><span className={deliveryFee === 0 ? "text-green-400" : "text-white"}>{deliveryFee === 0 ? 'GRÁTIS' : '50 MT'}</span></div>
                <div className="h-px bg-white/10 my-6" />
                <div className="flex justify-between items-end">
                  <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Total a Pagar</span>
                  <span className="text-4xl font-black tracking-tighter">{total.toFixed(0)} <span className="text-lg">MT</span></span>
                </div>
              </div>
              <button className="w-full bg-[#2E7D32] py-5 rounded-3xl font-black text-lg hover:bg-[#388e3c] transition-all active:scale-95 shadow-xl flex items-center justify-center gap-3">
                <CreditCard size={22} /> Finalizar Agora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}