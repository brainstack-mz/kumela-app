"use client";

import React, { useRef } from 'react';

interface OTPInputProps {
  length: number; 
  value: string;
  onChange: (value: string) => void;
}

const OTPInput = ({ length, value, onChange }: OTPInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const otpArray = Array.from({ length }).map((_, index) => value[index] || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;

    const newOtpValue = value.split('');
    newOtpValue[index] = val.slice(-1);
    const finalValue = newOtpValue.join('').slice(0, length);
    onChange(finalValue);

    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      const newOtpValue = value.split('');
      
      // Se o campo atual tem valor, limpa ele
      if (otpArray[index]) {
        newOtpValue[index] = '';
        onChange(newOtpValue.join(''));
      } 
      // Se o campo atual está vazio e não é o primeiro, volta e limpa o anterior
      else if (index > 0) {
        newOtpValue[index - 1] = '';
        onChange(newOtpValue.join(''));
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={el => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otpArray[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={`
            w-10 h-14 sm:w-12 sm:h-16 text-center text-xl font-bold rounded-xl border-2 transition-all duration-200 outline-none
            ${otpArray[index] 
              // Sincronizado com o verde #10B981 do seu StepAuth
              ? 'border-[#10B981] bg-white text-slate-800 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
              : 'border-slate-200 bg-slate-50 text-slate-400 focus:border-[#10B981] focus:bg-white focus:ring-4 focus:ring-green-50'
            }
          `}
        />
      ))}
    </div>
  );
};

export default OTPInput;