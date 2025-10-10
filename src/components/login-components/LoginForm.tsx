"use client";

import React, { useEffect } from "react";
import { LoginFormProps } from "@/types/login";
import { User, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const colors = { primaryGreen: "#2E7D32", accentOrange: "#FF9800" };

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

  useEffect(() => {
    // Garante que inputs fiquem vazios ao abrir
    setNumber("");
    setPassword("");
  }, [setNumber, setPassword]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const success = await handleLogin(e);

      if (!success) {
        toast.error("Número ou senha inválidos");
      }
    } catch (error: any) {
      toast.error(error?.message || "Erro no login");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Logo e título — reduzindo espaço entre eles */}
      <div className="flex flex-col items-center gap-0 mb-4">
        <img src="/favicon.ico" alt="Logo" className="h-45 w-45" />
        <h2 className="text-xl font-extrabold text-gray-800 mt-1">
          ACESSE A SUA CONTA
        </h2>
      </div>

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
            autoComplete="off"
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
            autoComplete="new-password"
            className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-600 focus:border-green-600"
          />
        </div>
      </div>

      {/* Mostrar Senha e Esqueceu senha */}
      <div className="flex justify-between items-center text-xs text-gray-600">
        <div className="flex items-center">
          <input
            id="showPassword"
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label htmlFor="showPassword" className="ml-2 block text-sm text-gray-900">
            Mostrar Senha
          </label>
        </div>

        <button
          type="button"
          onClick={() => setCurrentView(views.FORGOT_PASSWORD)}
          className="text-blue-500 hover:underline"
        >
          Esqueceu a senha?
        </button>
      </div>

      {/* Entrar via OTP */}
      <button
        type="button"
        onClick={() => setCurrentView(views.OTP_LOGIN)}
        className="w-full cursor-pointer text-white border border-transparent font-bold py-2 rounded-lg hover:opacity-90 transition"
        style={{ background: colors.accentOrange }}
      >
        Entrar via OTP
      </button>

      {/* OU estilizado */}
      <div className="flex items-center my-2">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-2 text-gray-500 text-sm">OU</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Botão login */}
      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer text-white font-bold py-2 rounded-lg mt-2 transition-opacity duration-200 hover:opacity-90"
        style={{ background: colors.primaryGreen }}
      >
        {loading ? "Aguarde..." : "Entrar"}
      </button>

      {/* Criar conta e voltar */}
      <div className="text-xs text-gray-600 flex flex-col gap-2 justify-center text-center mt-4">
        <Link href="/" passHref>
          <button
            type="button"
            className="text-blue-500 hover:underline flex items-center gap-1 justify-center"
          >
            <ArrowLeft size={16} color={colors.primaryGreen} /> Voltar à página inicial
          </button>
        </Link>
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
