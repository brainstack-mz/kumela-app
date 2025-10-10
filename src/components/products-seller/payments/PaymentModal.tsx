"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Step1CustomerForm from "@/components/products-seller/payments/Step1CustomerForm";
import Step2PaymentForm from "@/components/products-seller/payments/Step2PaymentForm";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Métodos de pagamento
const paymentMethods = [{ name: "M-Pesa" }, { name: "e-Mola" }, { name: "M-Kesh" }];

// Províncias
const mozambiqueProvinces = [
  "Cabo Delgado", "Gaza", "Inhambane", "Manica",
  "Maputo", "Nampula", "Niassa", "Sofala", "Tete",
  "Zambézia", "Maputo City",
];

// Distritos exemplo
const districts = {
  Nampula: ["Nampula Cidade", "Monapo", "Mossuril"],
  Sofala: ["Beira", "Dondo", "Nhamatanda"],
};

// Transportadoras (mock)
const carriers = ["Transporte de Lizzyman", "Transporte Aquatico", "Tranporte Zaquelina & Shelcya"];

const PaymentModal = ({ product, show, onClose }) => {
  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [district, setDistrict] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [carrier, setCarrier] = useState("");

  const totalAmount = product
    ? product.price * quantity * (1 - (product.discount || 0) / 100)
    : 0;

  const handleNext = () => {
    if (!fullName || !phoneNumber) {
      toast.error("Preencha Nome e Telefone corretamente!");
      return;
    }
    setStep(2);
  };

  const handleConfirm = () => {
    if (!location || !district || !carrier || !paymentMethod || !paymentNumber) {
      toast.error("Todos os campos são obrigatórios!");
      return;
    }

    toast.success("Pagamento confirmado com sucesso!");
    generateAndDownloadReceipt();
    onClose();
  };

  const generateAndDownloadReceipt = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleString("pt-MZ");

    doc.setFontSize(20);
    doc.text("Recibo de Compra - MOZAGRO", 10, 20);

    const tableData = [
      ["Produto", product?.name],
      ["Vendedor", product?.seller],
      ["Preço Unitário", `MZN ${product?.price.toFixed(2)}`],
      ["Quantidade", quantity],
      ["Total", `MZN ${totalAmount.toFixed(2)}`],
      ["Nome", fullName],
      ["Telefone", phoneNumber],
      ["Província", location],
      ["Distrito", district],
      ["Transportadora", carrier],
      ["Pagamento", paymentMethod],
      ["Número Pagamento", paymentNumber],
      ["Data", date],
    ];

    doc.autoTable({ startY: 30, head: [["Detalhe", "Info"]], body: tableData });
    doc.save(`recibo_${product?.name.replace(/\s/g, "_")}.pdf`);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-[5000] flex justify-center items-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Toaster position="top-right" />

          <motion.div
            className="bg-white rounded-2xl w-full max-w-xl p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={24} />
            </button>

            {step === 1 && (
              <Step1CustomerForm
                fullName={fullName}
                phoneNumber={phoneNumber}
                setFullName={setFullName}
                setPhoneNumber={setPhoneNumber}
                onNext={handleNext}
              />
            )}

            {step === 2 && (
              <Step2PaymentForm
                location={location}
                district={district}
                quantity={quantity}
                carrier={carrier}
                paymentMethod={paymentMethod}
                paymentNumber={paymentNumber}
                setLocation={setLocation}
                setDistrict={setDistrict}
                setQuantity={setQuantity}
                setCarrier={setCarrier}
                setPaymentMethod={setPaymentMethod}
                setPaymentNumber={setPaymentNumber}
                totalAmount={totalAmount}
                mozambiqueProvinces={mozambiqueProvinces}
                districts={districts}
                carriers={carriers}
                paymentMethods={paymentMethods}
                onConfirm={handleConfirm}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
