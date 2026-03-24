//src/components/shared/kindness.tsx
"use client";
 
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  Truck, 
  CheckCircle,
  MapPin,
  Clock,
  User
} from "lucide-react";
import Image from "next/image";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Mock data for cart items
const mockCartItems = [
  {
    id: 1,
    name: 'Tomates Frescos',
    price: 150,
    quantity: 2,
    image: '/assets/imgs/tomate.jpeg',
    seller: 'João Silva',
    location: 'Maputo, Moçambique',
    description: 'Tomates orgânicos colhidos hoje mesmo'
  },
  {
    id: 2,
    name: 'Arroz Premium',
    price: 200,
    quantity: 1,
    image: '/assets/imgs/arroz.jpeg',
    seller: 'Maria Santos',
    location: 'Nampula, Moçambique',
    description: 'Arroz de alta qualidade, grão longo'
  },
  {
    id: 3,
    name: 'Bananas',
    price: 80,
    quantity: 3,
    image: '/assets/imgs/banana.jpeg',
    seller: 'Carlos Mendes',
    location: 'Beira, Moçambique',
    description: 'Bananas maduras e doces'
  }
];

export default function KindnessPage() {
  const cartItems = mockCartItems;
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping over 500
  const total = subtotal + shipping;

  return (
<motion.div
         variants={fadeIn}
         initial="initial"
         animate="animate"
      className="p-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="h-8 w-8 text-green-600" />
        <h1 className="text-2xl font-bold text-gray-800">Carrinho de Compras</h1>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
            >
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {item.description}
                  </p>
                  
                  {/* Seller Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{item.seller}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Price and Quantity */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-bold text-green-600">
                        {item.price} MT
                      </span>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 py-1 bg-gray-100 rounded-lg font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100 sticky top-4"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Resumo do Pedido
            </h2>

            {/* Order Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{subtotal} MT</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Entrega</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                  {shipping === 0 ? 'Grátis' : `${shipping} MT`}
                </span>
              </div>

              {shipping > 0 && (
                <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                  <p className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-blue-600" />
                    Adicione mais {500 - subtotal} MT para frete grátis!
                  </p>
                </div>
              )}

              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total</span>
                  <span>{total} MT</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 mb-4">
              <CreditCard className="h-5 w-5" />
              Finalizar Compra
            </button>

            {/* Security Info */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Compra 100% segura</span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Truck className="h-5 w-5 text-green-600" />
                Entrega
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Prazo: 2-5 dias úteis</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Entrega em todo Moçambique</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
       </motion.div>
  );
}