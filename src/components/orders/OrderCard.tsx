// src/components/orders/OrderCard.jsx
"use client";

import Image from "next/image";
import { CheckCircle2, Package, User, MapPin, Truck, Phone, Wallet, Clock } from "lucide-react";
import { motion } from "framer-motion";

const OrderCard = ({ order, onConfirm }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col lg:flex-row gap-4 lg:gap-8 items-start"
    >
      <div className="relative w-full h-40 lg:w-48 lg:h-48 rounded-lg overflow-hidden flex-shrink-0">
        <Image 
          src={order.productImage} 
          alt={order.productName} 
          layout="fill" 
          objectFit="cover"
        />
      </div>
      <div className="flex-1 w-full">
        <h3 className="text-xl font-bold text-gray-900 truncate">{order.productName}</h3>
        <p className="text-sm text-gray-500">{order.productCategory} em {order.productLocation}</p>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          {/* Coluna 1: Detalhes do Comprador e Entrega */}
          <div className="space-y-2">
            <div className="flex items-center">
              <User size={16} className="text-gray-500 mr-2 flex-shrink-0" />
              <span className="font-semibold">Comprador:</span> {order.buyerName}
            </div>
            <div className="flex items-center">
              <Phone size={16} className="text-gray-500 mr-2 flex-shrink-0" />
              <span className="font-semibold">Telefone:</span> {order.buyerPhone}
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="text-gray-500 mr-2 flex-shrink-0" />
              <span className="font-semibold">Local de Entrega:</span> {order.buyerDistrict}
            </div>
            <div className="flex items-center">
              <Truck size={16} className="text-gray-500 mr-2 flex-shrink-0" />
              <span className="font-semibold">Transportador:</span> {order.transporterName}
            </div>
          </div>

          {/* Coluna 2: Detalhes da Compra e Pagamento */}
          <div className="space-y-2">
            <div className="flex items-center">
              <Clock size={16} className="text-gray-500 mr-2 flex-shrink-0" />
              <span className="font-semibold">Hora do Pedido:</span> {new Date(order.orderDate).toLocaleString('pt-MZ')}
            </div>
            <div className="flex items-center">
              <Package size={16} className="text-gray-500 mr-2 flex-shrink-0" />
              <span className="font-semibold">Quantidade:</span> {order.quantity} {order.unit}
            </div>
            <div className="flex items-center">
              <Wallet size={16} className="text-gray-500 mr-2 flex-shrink-0" />
              <span className="font-semibold">Método de Pagamento:</span> {order.paymentMethod}
            </div>
            <div className="flex items-center">
                <span className="font-semibold text-lg">Total do Produto:</span> 
                <span className="text-lg font-bold text-green-600 ml-2">
                    {order.productPrice.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
                </span>
            </div>
            <div className="flex items-center">
                <span className="font-semibold text-lg">Pagamento do Transporte:</span> 
                <span className="text-lg font-bold text-red-600 ml-2">
                    {order.shippingCost.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
                </span>
            </div>
          </div>
        </div>
      </div>
      {order.status === 'pending' && (
        <div className="w-full lg:w-auto mt-4 lg:mt-0">
          <button
            onClick={() => onConfirm(order.id)}
            className="w-full lg:w-auto flex items-center justify-center gap-2 py-3 px-6 rounded-full shadow-lg text-sm font-bold text-white bg-green-500 hover:bg-green-600 transition-colors"
          >
            <CheckCircle2 size={20} /> Confirmar Venda
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default OrderCard;