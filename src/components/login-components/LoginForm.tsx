"use client";

import React from "react";
import { LoginFormProps } from "@/types/login";
import { User, Lock, ArrowLeft } from "lucide-react"; // ⬅️ importa os ícones

const colors = { primaryGreen: "#2E7D32" };

const LoginForm = ({
  number,
  setNumber,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  handleLogin,
  loading,
  setCurrentView,
  views,
}: LoginFormProps) => {
  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {/* Logo + título */}
      <div className="flex flex-col items-center">
        <img src="/favicon.ico" alt="Logo" className="h-45 w-45" />
        <h2 className="text-xl font-extrabold text-gray-800">
          ACESSE A SUA CONTA
        </h2>
      </div>
        <button
          type="button"
          onClick={() => setCurrentView(views.LOGIN)}
          className="text-blue-500 hover:underline flex items-center gap-1"
        >
          <ArrowLeft size={16} color={colors.iconBlue} /> Voltar aa pagina inicial
        </button>
      {/* Número */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Número *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-600 focus:border-green-600"
          />
        </div>
      </div>

      {/* Senha */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Senha *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-10 pr-12 py-2 border-2 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-600 focus:border-green-600"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-500"
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>
      </div>

      {/* Esqueceu senha */}
      <div className="text-xs text-gray-600 text-left mt-1">
        <button
          type="button"
          onClick={() => setCurrentView(views.FORGOT_PASSWORD)}
          className="text-blue-500 hover:underline"
        >
          Esqueceu a senha?
        </button>
      </div>

      {/* Botão login */}
      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer text-white font-bold py-2 rounded-lg transition-opacity duration-200 hover:opacity-90"
        style={{ background: colors.primaryGreen }}
      >
        {loading ? "Aguarde..." : "Entrar"}
      </button>

      {/* OU estilizado */}
      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-2 text-gray-500 text-sm">OU</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Entrar via OTP */}
      <button
        type="button"
        className="w-full cursor-pointer text-gray-700 border border-gray-300 font-bold py-2 rounded-lg mt-2 hover:bg-gray-100 transition"
      >
        Entrar via OTP
      </button>

      {/* Criar conta */}
      <div className="text-xs text-gray-600 text-center mt-4">
        <p>
          Não possui conta?{" "}
          <button
            type="button"
            onClick={() => setCurrentView(views.REGISTER)}
            className="text-blue-500 hover:underline"
          >
            Criar conta
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
