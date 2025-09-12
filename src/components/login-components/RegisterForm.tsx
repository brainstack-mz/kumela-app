'use client';

import React, { useState } from 'react';
import { RegisterFormProps } from '@/types/login';
import { User, Phone, Key, MapPin, Home, ArrowLeft } from 'lucide-react';

const provincesData = {
  Maputo: ['KaMpfumo', 'Nlhamankulu', 'KaMaxakeni', 'Matola'],
  Gaza: ['Chibuto', 'Xai-Xai', 'Bilene', 'Manjacaze'],
  Inhambane: ['Inhambane', 'Vilankulo', 'Maxixe', 'Massinga'],
};

const colors = { primaryGreen: '#2E7D32', iconBlue: '#1D4ED8' };

const RegisterForm = ({
  name,
  setName,
  number,
  setNumber,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  province,
  setProvince,
  district,
  setDistrict,
  address,
  setAddress,
  handleRegister,
  loading,
  setCurrentView,
  views,
}: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const districtsForProvince =
    provincesData[province as keyof typeof provincesData] || [];

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="flex flex-col items-center mb-6">
        <img src="/favicon.ico" alt="Logo" className="h-14 w-14 mb-2" />
        <h2 className="text-xl font-extrabold text-gray-800">CRIE SUA CONTA</h2>
      </div>

      {/* Nome */}
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2" size={20} color={colors.iconBlue} />
        <input
          type="text"
          placeholder="Nome Completo"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500"
        />
      </div>

      {/* Número */}
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 -translate-y-1/2" size={20} color={colors.iconBlue} />
        <input
          type="text"
          placeholder="Número de Telefone"
          required
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500"
        />
      </div>

      {/* Província */}
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2" size={20} color={colors.iconBlue} />
        <select
          required
          value={province}
          onChange={(e) => {
            setProvince(e.target.value);
            setDistrict('');
          }}
          className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500"
        >
          <option value="">Selecione a Província</option>
          {Object.keys(provincesData).map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Distrito (visível após selecionar província) */}
      {province && (
        <div className="relative">
          <Home className="absolute left-3 top-1/2 -translate-y-1/2" size={20} color={colors.iconBlue} />
          <select
            required
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500"
          >
            <option value="">Selecione o Distrito</option>
            {districtsForProvince.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Morada */}
      <div className="relative">
        <Home className="absolute left-3 top-1/2 -translate-y-1/2" size={20} color={colors.iconBlue} />
        <input
          type="text"
          placeholder="Morada"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500"
        />
      </div>

      {/* Senha */}
      <div className="relative">
        <Key className="absolute left-3 top-1/2 -translate-y-1/2" size={20} color={colors.iconBlue} />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Senha"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500"
        />
      </div>

      {/* Confirmar senha */}
      <div className="relative">
        <Key className="absolute left-3 top-1/2 -translate-y-1/2" size={20} color={colors.iconBlue} />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirmar Senha"
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
          Mostrar senhas
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full text-white font-bold py-2 rounded-lg"
        style={{ background: colors.primaryGreen }}
      >
        {loading ? 'Aguarde...' : 'Criar Conta'}
      </button>

      <p className="text-xs text-gray-600 text-center mt-2 flex justify-center items-center gap-1">
        <button
          type="button"
          onClick={() => setCurrentView(views.LOGIN)}
          className="text-blue-500 hover:underline flex items-center gap-1"
        >
          <ArrowLeft size={16} color={colors.iconBlue} /> Já possui conta? Entrar
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
