'use client';

import React from 'react';
import { motion } from 'framer-motion';
import OTPInput from '@/components/shared/OTPInput';
import { Button } from '@/components/shared/Button';

interface OTPStepProps {
  phoneNumber: string;
  otpValue: string;
  setOtpValue: (value: string) => void;
  onVerify: () => void;
  onBack: () => void;
  loading?: boolean;
}

const OTPStep = ({
  phoneNumber,
  otpValue,
  setOtpValue,
  onVerify,
  onBack,
  loading = false,
}: OTPStepProps) => {
  return (
    <motion.div
      key="otp-step"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-8 text-center py-4"
    >
      {/* Badge de Informação */}
      <div className="bg-orange-50 p-3 rounded-xl inline-block">
        <p className="text-xs text-orange-700 font-bold">
          Código enviado para +258 {phoneNumber}
        </p>
      </div>

      {/* Input de 6 dígitos */}
      <div className="flex justify-center">
        <OTPInput length={5} value={otpValue} onChange={setOtpValue} />
      </div>

      <div className="space-y-3">
        <Button
          onClick={onVerify}
          loading={loading}
          disabled={otpValue.length < 6 || loading}
          className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg transition-all"
        >
          Verificar e Entrar
        </Button>

        <button
          onClick={onBack}
          type="button"
          className="text-sm text-slate-400 font-bold hover:text-slate-600 transition-colors"
        >
          Corrigir número de telefone
        </button>
      </div>

      <p className="text-[10px] text-slate-300 font-medium px-6">
        Não recebeu o código? Aguarde 60 segundos para reenviar.
      </p>
    </motion.div>
  );
};

export default OTPStep;