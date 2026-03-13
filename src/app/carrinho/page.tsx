'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Plus, Minus, Trash2, CreditCard, Truck, 
  MapPin, User, ArrowLeft, ShieldCheck, Clock, History 
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(mockCartItems);
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + (subtotal > 500 ? 0 : 50);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: number) => setCartItems(prev => prev.filter(item => item.id !== id));

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="w-64 h-64 bg-slate-50 rounded-full flex items-center justify-center mb-8 relative"
        >
           <ShoppingCart size={80} className="text-slate-200" />
           {/* ÍCONE DE HORA/HISTÓRICO ADICIONADO AQUI */}
           <div className="absolute bottom-10 right-10 bg-white p-3 rounded-full shadow-lg text-green-600">
              <Clock size={32} strokeWidth={3} />
           </div>
        </motion.div>
        <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tighter">Carrinho Vazio</h1>
        <p className="text-slate-500 mb-8 max-w-xs">Parece que ainda não adicionou nada. Que tal ver o seu histórico de compras?</p>
        
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link href="/" className="bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-100 active:scale-95 transition-all">
            Começar a Comprar
          </Link>
          <button className="flex items-center justify-center gap-2 text-slate-500 font-bold py-3 hover:bg-slate-50 rounded-xl transition-all">
            <History size={18} /> Ver pedidos passados
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-32">
      {/* Header Interno do Carrinho */}
      {/* 1. TOP BAR REFINADA */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 group transition-all"
          >
            <div className="p-2 group-hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-900">
              Produtos
            </span>
          </button>
          
          <div className="flex flex-col items-center">
             <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em]">Kumela Market</span>
             <span className="text-[9px] text-gray-400 font-medium tracking-tight">Qualidade Garantida</span>
          </div>
          
          <div className="w-8 h-8 flex items-center justify-center bg-green-50 rounded-full text-green-600">
             <ShieldCheck size={18} />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-2 max-w-6xl pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Meu Carrinho</h1>
            <p className="text-slate-500 font-medium">Produtos de Moçambique selecionados</p>
          </div>
          <button onClick={() => setCartItems([])} className="text-red-500 font-bold text-sm flex items-center gap-2 hover:bg-red-50 px-4 py-2 rounded-xl transition-all">
            <Trash2 size={16} /> Esvaziar
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -100 }}
                  className="bg-white rounded-3xl p-4 md:p-6 border border-slate-100 shadow-sm flex gap-4 md:gap-6"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-2xl overflow-hidden shrink-0 border border-slate-50">
                    <Image src={item.image} alt={item.name} width={128} height={128} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg md:text-xl leading-none">{item.name}</h3>
                        <span className="text-xs font-bold text-slate-400 mt-2 block uppercase tracking-wider">{item.seller}</span>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-4">
                      <div className="text-green-600 font-black text-xl md:text-2xl">
                        {item.price * item.quantity} <span className="text-sm">MT</span>
                      </div>
                      <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200 scale-90 md:scale-100">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-white rounded-lg transition-colors text-slate-600"><Minus size={16} strokeWidth={3} /></button>
                        <span className="w-8 text-center font-black text-slate-800">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-white rounded-lg transition-colors text-slate-600"><Plus size={16} strokeWidth={3} /></button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
              <h2 className="text-xl font-black text-slate-900 mb-6">Resumo do Pedido</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-500 font-bold"><span>Subtotal</span><span className="text-slate-800">{subtotal} MT</span></div>
                <div className="flex justify-between text-slate-500 font-bold"><span>Taxa de Entrega</span><span className="text-green-600">{subtotal > 500 ? 'GRÁTIS' : '50 MT'}</span></div>
                <div className="border-t border-slate-100 pt-4 flex justify-between items-end">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Total Final</span>
                  <span className="text-3xl font-black text-slate-900 tracking-tighter">{total} MT</span>
                </div>
              </div>
              <button className="w-full bg-green-600 text-white py-5 rounded-[1.5rem] font-black text-lg shadow-lg shadow-green-100 hover:bg-green-700 transition-all active:scale-95 flex items-center justify-center gap-3">
                <CreditCard size={22} /> Pagar Agora
              </button>
              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <ShieldCheck size={14} className="text-green-500" /> Transação Segura
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mockCartItems = [
  { id: 1, name: 'Tomates Frescos', price: 150, quantity: 2, image: '/assets/imgs/tomate.jpeg', seller: 'João Silva' },
  { id: 2, name: 'Arroz Premium', price: 200, quantity: 1, image: '/assets/imgs/arroz.jpeg', seller: 'Maria Santos' },
  { id: 3, name: 'Bananas Maduras', price: 80, quantity: 3, image: '/assets/imgs/banana.jpeg', seller: 'Carlos Mendes' }
];