'use client';

import React, { useState } from 'react';
import { ForgotPasswordFormProps } from '@/types/login';
import { User, Key, ArrowLeft } from 'lucide-react'; // Importando os ícones

const colors = { primaryGreen: '#2E7D32', iconBlue: '#1D4ED8' }; // azul para ícones

const ForgotPasswordForm = ({
  number,
  setNumber,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  handleForgotPassword,
  loading,
  setCurrentView,
  views,
}: ForgotPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleForgotPassword} className="space-y-4">
      <div className="flex flex-col items-center mb-6">
        <img src="/favicon.ico" alt="Logo" className="h-14 w-14 mb-2" /> {/* Ícone favicon */}
        <h2 className="text-xl font-extrabold text-gray-800">REDEFINIR SENHA</h2>
      </div>

      {/* Input do número com ícone */}
      <div className="relative">
        <User
          className={`absolute left-3 top-1/2 -translate-y-1/2`}
          size={20}
          color={colors.iconBlue}
        />
        <input
          type="text"
          placeholder="Digite seu número"
          required
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500"
        />
      </div>

      {/* Input da nova senha com ícone */}
      <div className="relative">
        <Key
          className="absolute left-3 top-1/2 -translate-y-1/2"
          size={20}
          color={colors.iconBlue}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Nova Senha"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500"
        />
      </div>

      {/* Input de confirmar senha com ícone */}
      <div className="relative">
        <Key
          className="absolute left-3 top-1/2 -translate-y-1/2"
          size={20}
          color={colors.iconBlue}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirmar Nova Senha"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500"
        />
      </div>

      {/* Mostrar senha */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="showPassword"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
          className="accent-blue-500"
        />
        <label htmlFor="showPassword" className="text-blue-500 text-sm cursor-pointer">
          Mostrar senha
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full text-white font-bold py-2 rounded-lg"
        style={{ background: colors.primaryGreen }}
      >
        {loading ? 'Aguarde...' : 'Redefinir Senha'}
      </button>

      <p className="text-xs text-gray-600 text-center mt-2 flex justify-center items-center gap-1">
        <button
          type="button"
          onClick={() => setCurrentView(views.LOGIN)}
          className="text-blue-500 hover:underline flex items-center gap-1"
        >
          <ArrowLeft size={16} color={colors.iconBlue} /> Voltar ao Login
        </button>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
