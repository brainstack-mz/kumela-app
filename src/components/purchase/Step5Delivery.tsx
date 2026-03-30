"use client";

import { motion } from "framer-motion";
import { CheckCircle, Truck, Package, Home, ArrowLeft } from "lucide-react";
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
      ["Vendedor", order.product.user],
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
            Entrega e Liberação
          </h1>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">PASSO 7 de 7</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Entrega</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div className="h-2 bg-green-600 rounded-full" style={{ width: "100%" }}></div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6"
        >
          {/* Order Status */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
              <Package className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Pedido Confirmado!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Seu pedido está sendo processado
            </p>
          </div>

          {/* Confirmation Status */}
          <div className="space-y-4">
            {/* Shipper Confirmation */}
            <div className={`p-4 rounded-xl border-2 ${
              shipperConfirmed
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Truck className={`w-6 h-6 ${
                    shipperConfirmed ? "text-green-600 dark:text-green-400" : "text-gray-400"
                  }`} />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Transportador
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {shipperConfirmed ? "Confirmou entrega" : "Aguardando confirmação"}
                    </p>
                  </div>
                </div>
                {shipperConfirmed && (
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                )}
              </div>
            </div>

            {/* Customer Confirmation */}
            <div className={`p-4 rounded-xl border-2 ${
              customerConfirmed
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Home className={`w-6 h-6 ${
                    customerConfirmed ? "text-green-600 dark:text-green-400" : "text-gray-400"
                  }`} />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Você
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {customerConfirmed ? "Confirmou recebimento" : "Confirme quando receber"}
                    </p>
                  </div>
                </div>
                {customerConfirmed ? (
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                ) : (
                  <button
                    onClick={handleCustomerConfirm}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Confirmar Recebido
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Payment Status */}
          {paymentReleased && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center"
            >
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Pagamento Liberado!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                O pagamento foi liberado ao vendedor. Seu recibo foi gerado automaticamente.
              </p>
            </motion.div>
          )}

          {/* Order Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-2">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">
              Resumo do Pedido
            </h3>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Produto:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {order.product.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total:</span>
              <span className="font-bold text-green-600 dark:text-green-400">
                {order.purchaseData.total.toFixed(0)} MT
              </span>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => router.push("/buyer/dashboard")}
            className="flex-1 p-4 bg-white dark:bg-gray-800 rounded-xl font-semibold text-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Voltar ao Dashboard
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex-1 p-4 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

