"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Theme = 'light' | 'dark';
type Language = 'pt' | 'en' | 'emk';

interface ThemeContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Common
    'back': 'Voltar',
    'next': 'Próximo',
    'cancel': 'Cancelar',
    'confirm': 'Confirmar',
    'save': 'Salvar',
    'edit': 'Editar',
    'delete': 'Excluir',
    'search': 'Buscar',
    // Purchase flow
    'buy_now': 'Comprar Agora',
    'send_message': 'Enviar Mensagem',
    'product_details': 'Detalhes do Produto',
    'price': 'Preço',
    'stock': 'Stock',
    'description': 'Descrição',
    'seller': 'Vendedor',
    'quantity': 'Quantidade',
    'total': 'Total',
    'province': 'Província',
    'district': 'Distrito',
    'carrier': 'Transportadora',
    'payment_method': 'Método de Pagamento',
    'payment_number': 'Número da Carteira',
    'password': 'Senha',
    'review_order': 'Revisão do Pedido',
    'finalize_order': 'Finalizar Pedido',
    'pay': 'Pagar',
    'escrow_message': 'Seu dinheiro fica seguro. Só será entregue ao vendedor após confirmação da entrega.',
    'delivery_confirmed': 'Entrega Confirmada',
    'received': 'Recebido',
    'delivered': 'Entregue',
  },
  en: {
    'back': 'Back',
    'next': 'Next',
    'cancel': 'Cancel',
    'confirm': 'Confirm',
    'save': 'Save',
    'edit': 'Edit',
    'delete': 'Delete',
    'search': 'Search',
    'buy_now': 'Buy Now',
    'send_message': 'Send Message',
    'product_details': 'Product Details',
    'price': 'Price',
    'stock': 'Stock',
    'description': 'Description',
    'seller': 'Seller',
    'quantity': 'Quantity',
    'total': 'Total',
    'province': 'Province',
    'district': 'District',
    'carrier': 'Carrier',
    'payment_method': 'Payment Method',
    'payment_number': 'Wallet Number',
    'password': 'Password',
    'review_order': 'Review Order',
    'finalize_order': 'Finalize Order',
    'pay': 'Pay',
    'escrow_message': 'Your money is safe. It will only be delivered to the seller after delivery confirmation.',
    'delivery_confirmed': 'Delivery Confirmed',
    'received': 'Received',
    'delivered': 'Delivered',
  },
  emk: {
    'back': 'Ula',
    'next': 'Mwela',
    'cancel': 'Khalula',
    'confirm': 'Khumela',
    'save': 'Hifadhi',
    'edit': 'Hindula',
    'delete': 'Futa',
    'search': 'Tafuta',
    'buy_now': 'Nunua Sasa',
    'send_message': 'Tuma Ujumbe',
    'product_details': 'Maelezo ya Bidhaa',
    'price': 'Bei',
    'stock': 'Hifadhi',
    'description': 'Maelezo',
    'seller': 'Muuzaji',
    'quantity': 'Kiasi',
    'total': 'Jumla',
    'province': 'Mkoa',
    'district': 'Wilaya',
    'carrier': 'Msafiri',
    'payment_method': 'Njia ya Malipo',
    'payment_number': 'Nambari ya Pochi',
    'password': 'Nenosiri',
    'review_order': 'Kagua Agizo',
    'finalize_order': 'Maliza Agizo',
    'pay': 'Lipa',
    'escrow_message': 'Pesa zako ziko salama. Zitatolewa kwa muuzaji tu baada ya uthibitishaji wa uwasilishaji.',
    'delivery_confirmed': 'Uwasilishaji Umehakikiwa',
    'received': 'Imepokelewa',
    'delivered': 'Imeletwa',
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    const storedTheme = localStorage.getItem('kumela_theme') as Theme;
    const storedLang = localStorage.getItem('kumela_language') as Language;
    if (storedTheme) setTheme(storedTheme);
    if (storedLang) setLanguage(storedLang);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('kumela_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('kumela_language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <ThemeContext.Provider value={{ theme, language, toggleTheme, setLanguage, t }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}




