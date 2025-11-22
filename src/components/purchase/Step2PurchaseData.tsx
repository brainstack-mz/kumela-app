"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

interface Step2Props {
  product: any;
  purchaseData: {
    phone: string;
    name: string;
    province: string;
    district: string;
    quantity: number;
    carrier: string;
  };
  onBack: () => void;
  onNext: (data: any) => void;
}

const PROVINCE = "Nampula";
const DISTRICTS = ["Nampula Cidade", "Monapo", "Mossuril", "Angoche", "Moma"];
const CARRIERS = [
  { name: "Transporte Ludy", time: "2-3 dias", price: 50 },
  { name: "Transporte Lizzyman", time: "3-4 dias", price: 75 },
  { name: "Transporte Mugaby", time: "2-5 dias", price: 60 },
];

export default function Step2PurchaseData({ product, purchaseData, onBack, onNext }: Step2Props) {
  const { user, getUserByPhone } = useAuth();
  const [phone, setPhone] = useState(purchaseData.phone || "");
  const [name, setName] = useState(purchaseData.name || "");
  const [district, setDistrict] = useState(purchaseData.district || "");
  const [quantity, setQuantity] = useState(purchaseData.quantity || 1);
  const [carrier, setCarrier] = useState(purchaseData.carrier || "");
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);

  useEffect(() => {
    if (user) {
      setPhone(user.numero);
      setName(user.name || `Usuário ${user.numero}`);
      setDistrict(user.district || "");
    }
  }, [user]);

  const handlePhoneChange = async (value: string) => {
    setPhone(value);
    const cleanPhone = value.replace(/\D/g, '');
    
    if (cleanPhone.length >= 9) {
      setIsCheckingPhone(true);
      // Simulate API call
      setTimeout(() => {
        const foundUser = getUserByPhone(cleanPhone);
        if (foundUser) {
          setName(foundUser.name || `Usuário ${foundUser.numero}`);
          setDistrict(foundUser.district || "");
          toast.success("Usuário encontrado!");
        } else {
          if (!user) {
            setName("");
          }
        }
        setIsCheckingPhone(false);
      }, 500);
    }
  };

  const selectedCarrier = CARRIERS.find(c => c.name === carrier);
  const unitPrice = product.discount 
    ? product.price - (product.price * product.discount / 100)
    : product.price;
  const subtotal = unitPrice * quantity;
  const shipping = selectedCarrier?.price || 0;
  const total = subtotal + shipping;

  const handleNext = () => {
    if (!phone || phone.length < 9) {
      toast.error("Digite um número de telefone válido!");
      return;
    }
    if (!name) {
      toast.error("Digite seu nome!");
      return;
    }
    if (!district) {
      toast.error("Selecione um distrito!");
      return;
    }
    if (quantity < 1 || quantity > product.stock) {
      toast.error(`Quantidade deve ser entre 1 e ${product.stock}!`);
      return;
    }
    if (!carrier) {
      toast.error("Selecione uma transportadora!");
      return;
    }

    onNext({
      phone,
      name,
      province: PROVINCE,
      district,
      quantity,
      carrier,
      subtotal,
      shipping,
      total,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dados da Compra
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6"
        >
          {/* A. Identification */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              A. Identificação
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Número de Telefone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  disabled={!!user}
                  placeholder="84xxxxxxx"
                  className="w-full p-4 text-lg border rounded-xl bg-gray-50 dark:bg-gray-700 disabled:opacity-50"
                />
                {isCheckingPhone && (
                  <p className="text-sm text-gray-500 mt-1">Verificando...</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!!user}
                  placeholder="Seu nome completo"
                  className="w-full p-4 text-lg border rounded-xl bg-gray-50 dark:bg-gray-700 disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* B. Location */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              B. Localização
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Província
                </label>
                <input
                  type="text"
                  value={PROVINCE}
                  disabled
                  className="w-full p-4 text-lg border rounded-xl bg-gray-100 dark:bg-gray-700 opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Distrito
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full p-4 text-lg border rounded-xl bg-white dark:bg-gray-700"
                >
                  <option value="">Selecione o Distrito</option>
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* C. Quantity */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              C. Quantidade
            </h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg text-2xl font-bold"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                className="flex-1 p-4 text-2xl font-bold text-center border rounded-xl"
                min={1}
                max={product.stock}
              />
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg text-2xl font-bold"
              >
                +
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Stock disponível: {product.stock} {product.unit}
            </p>
          </div>

          {/* D. Carrier */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              D. Transportadora
            </h2>
            <div className="space-y-3">
              {CARRIERS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setCarrier(c.name)}
                  className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                    carrier === c.name
                      ? "border-green-600 bg-green-50 dark:bg-green-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg text-gray-900 dark:text-white">{c.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{c.time}</p>
                    </div>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      {c.price} MT
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Total Preview */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 dark:text-gray-300">Subtotal:</span>
              <span className="font-bold text-lg">{subtotal.toFixed(0)} MT</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 dark:text-gray-300">Transporte:</span>
              <span className="font-bold text-lg">{shipping.toFixed(0)} MT</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-bold text-xl text-gray-900 dark:text-white">Total:</span>
              <span className="font-bold text-2xl text-green-600 dark:text-green-400">
                {total.toFixed(0)} MT
              </span>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 p-4 bg-white dark:bg-gray-800 rounded-xl font-semibold text-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Voltar
          </button>
          <button
            onClick={handleNext}
            className="flex-1 p-4 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            Próximo
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

