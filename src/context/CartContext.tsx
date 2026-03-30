"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Interface para o item dentro do carrinho
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  user: string;
}

// Interface para o produto que vem da lista (com desconto opcional)
interface ProductInput {
  id: number;
  name: string;
  price: number;
  image: string;
  discount?: number;
  user?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ProductInput) => void; // CORRIGIDO: Removido 'any'
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Carregar do cache ao abrir o site
  useEffect(() => {
    const saved = localStorage.getItem('kumela_cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar carrinho:", e);
      }
    }
  }, []);

  // Salvar no cache sempre que mudar o carrinho
  useEffect(() => {
    localStorage.setItem('kumela_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: ProductInput) => { // CORRIGIDO: Removido 'any'
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      // Calcula preço com desconto se houver
      const priceToCharge = product.discount 
        ? product.price - (product.price * (product.discount / 100)) 
        : product.price;

      return [...prev, { 
        id: product.id, 
        name: product.name, 
        price: priceToCharge, 
        image: product.image, 
        user: product.user || "Vendedor Kumela",
        quantity: 1 
      }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id: number) => setCartItems(prev => prev.filter(item => item.id !== id));
  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de um CartProvider");
  return context;
};