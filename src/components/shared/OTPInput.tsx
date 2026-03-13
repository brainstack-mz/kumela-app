"use client";

import React, { useRef } from 'react';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
}

const OTPInput = ({ value, onChange }: OTPInputProps) => {
  const length = 5; // Forçado para 5 campos
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const otpArray = Array.from({ length }).map((_, index) => value[index] || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    
    // Bloqueia IMEDIATAMENTE se não for número
    if (!/^\d*$/.test(val)) return;

    const newOtpArray = [...otpArray];
    newOtpArray[index] = val.slice(-1); // Apenas o último caractere
    const combinedValue = newOtpArray.join('');
    
    onChange(combinedValue);

    // Foco automático para o próximo
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!otpArray[index] && index > 0) {
        const newOtpArray = [...otpArray];
        newOtpArray[index - 1] = '';
        onChange(newOtpArray.join(''));
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-4">
      {Array.from({ length }).map((_, index) => (
     <input
          key={index}
          ref={el => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={otpArray[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          // BORDAS MAIS VISÍVEIS (border-slate-300 e focus:border-emerald-600)
          className={`
            w-12 h-14 sm:w-16 sm:h-20 text-center text-2xl font-black rounded-2xl border-2 transition-all shadow-sm outline-none
            ${otpArray[index] 
              ? 'border-emerald-600 bg-white text-emerald-600' 
              : 'border-slate-300 bg-slate-50 text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50'
            }
          `}
        />
      ))}
    </div>
  );
};

export default OTPInput;