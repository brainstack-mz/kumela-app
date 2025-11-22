"use client";

import { motion } from "framer-motion";
import { CheckCircle, Truck, Package, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface Step7Props {
  order: any;
  onBack: () => void;
}

export default function Step7Delivery({ order, onBack }: Step7Props) {
  const router = useRouter();
  const [shipperConfirmed, setShipperConfirmed] = useState(false);
  const [customerConfirmed, setCustomerConfirmed] = useState(false);
  const [paymentReleased, setPaymentReleased] = useState(false);

  // Simulate shipper confirmation (in real app, this would be from shipper dashboard)
  useEffect(() => {
    // Auto-confirm after 2 seconds for demo
    const timer = setTimeout(() => {
      setShipperConfirmed(true);
      toast.success("Transportador confirmou entrega!");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-release payment when both confirm
  useEffect(() => {
    if (shipperConfirmed && customerConfirmed && !paymentReleased) {
      setPaymentReleased(true);
      generateReceipt();
      toast.success("Pagamento liberado ao vendedor!");
    }
  }, [shipperConfirmed, customerConfirmed, paymentReleased]);

  const handleCustomerConfirm = () => {
    setCustomerConfirmed(true);
    toast.success("Você confirmou o recebimento!");
  };

  const generateReceipt = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleString("pt-MZ");

    doc.setFontSize(20);
    doc.text("Recibo de Compra - KUMELA", 10, 20);

    const tableData = [
      ["Produto", order.product.name],
      ["Vendedor", order.product.seller],
      ["Preço Unitário", `MZN ${order.purchaseData.subtotal / order.purchaseData.quantity}`],
      ["Quantidade", `${order.purchaseData.quantity} ${order.product.unit}`],
      ["Subtotal", `MZN ${order.purchaseData.subtotal.toFixed(2)}`],
      ["Transporte", `MZN ${order.purchaseData.shipping.toFixed(2)}`],
      ["Total", `MZN ${order.purchaseData.total.toFixed(2)}`],
      ["Cliente", order.purchaseData.name],
      ["Telefone", order.purchaseData.phone],
      ["Distrito", order.purchaseData.district],
      ["Transportadora", order.purchaseData.carrier],
      ["Pagamento", order.paymentData.paymentMethod.toUpperCase()],
      ["Status", paymentReleased ? "Pago" : "Pendente"],
      ["Data", date],
    ];

    // @ts-ignore - jspdf-autotable types
    doc.autoTable({ startY: 30, head: [["Detalhe", "Info"]], body: tableData });
    doc.save(`recibo_${order.product.name.replace(/\s/g, "_")}.pdf`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full"
    >
      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-green-600 dark:text-green-400">PASSO 7 de 7</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">Entrega</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div className="h-2 bg-green-600 rounded-full" style={{ width: "100%" }}></div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Order Status */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full mb-3">
            <Package className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            Pedido Confirmado!
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Seu pedido está sendo processado
          </p>
        </div>

        {/* Confirmation Status */}
        <div className="space-y-3">
          {/* Shipper Confirmation */}
          <div className={`p-3 rounded-xl border-2 ${
            shipperConfirmed
              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
              : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className={`w-5 h-5 ${shipperConfirmed ? "text-green-600" : "text-gray-400"}`} />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Transportador
                </span>
              </div>
              {shipperConfirmed ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <span className="text-xs text-gray-500">Pendente</span>
              )}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {shipperConfirmed ? "Entregue confirmado" : "Aguardando confirmação"}
            </p>
          </div>

          {/* Customer Confirmation */}
          <div className={`p-3 rounded-xl border-2 ${
            customerConfirmed
              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
              : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className={`w-5 h-5 ${customerConfirmed ? "text-green-600" : "text-gray-400"}`} />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Você
                </span>
              </div>
              {customerConfirmed ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <button
                  onClick={handleCustomerConfirm}
                  className="px-3 py-1 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Confirmar Recebido
                </button>
              )}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {customerConfirmed ? "Recebido confirmado" : "Clique para confirmar recebimento"}
            </p>
          </div>
        </div>

        {/* Payment Status */}
        {paymentReleased && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center"
          >
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-green-600 dark:text-green-400">
              Pagamento liberado ao vendedor!
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Recibo gerado automaticamente
            </p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onBack}
          className="flex-1 px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Voltar
        </button>
        <button
          onClick={() => router.push("/")}
          className="flex-1 px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Voltar ao Início
        </button>
      </div>
    </motion.div>
  );
}




