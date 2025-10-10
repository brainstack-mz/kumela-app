'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginSlider from '@/components/login-components/LoginSlider';
import LoginForm from '@/components/login-components/LoginForm';
import RegisterForm from '@/components/login-components/RegisterForm';
import ForgotPasswordForm from '@/components/login-components/ForgotPasswordForm';
import { useAuth } from '@/context/AuthContext';
import { loginUser, DASHBOARD_URLS } from '@/lib/users';
import toast from 'react-hot-toast'; // ← Apenas import

const colors = {
  lightBackground: '#eef2f5',
};

const views = {
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgotPassword',
};

const Page = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [currentView, setCurrentView] = useState(views.LOGIN);

  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const slides = [
    { image: '/assets/secury.jpeg', text: 'A Privacidade dos Seus Dados é a Nossa Prioridade', className: 'text-white' },
    { image: '/assets/payment.jpeg', text: 'Pagamentos Simples, Rápidos e Seguros', className: 'text-white' },
    { image: '/assets/feliz.jpeg', text: 'Inscrições Ágeis, Sem Complicações', className: 'text-white' },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const user = loginUser(number, password);

    if (user) {
      login({ email: user.numero, role: user.role });
      toast.success(`Bem-vindo, ${user.role}`);

      const redirectUrl = DASHBOARD_URLS[user.role];
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        toast.error("Papel do usuário não reconhecido.");
      }
    } else {
      toast.error("Número ou senha inválidos"); // ← Mostra toast de erro apenas aqui
    }

    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Conta criada com sucesso!");
    setTimeout(() => setCurrentView(views.LOGIN), 1500);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Um link foi enviado para o número ${number}`);
    setTimeout(() => setCurrentView(views.LOGIN), 2000);
  };

  const renderForm = () => {
    switch (currentView) {
      case views.LOGIN:
        return (
          <LoginForm
            number={number}
            setNumber={setNumber}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleLogin={handleLogin}
            loading={loading}
            setCurrentView={setCurrentView}
            views={views}
          />
        );
      case views.REGISTER:
        return (
          <RegisterForm
            name=""
            setName={() => {}}
            number={number}
            setNumber={setNumber}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            province=""
            setProvince={() => {}}
            district=""
            setDistrict={() => {}}
            address=""
            setAddress={() => {}}
            handleRegister={handleRegister}
            loading={loading}
            setCurrentView={setCurrentView}
            views={views}
          />
        );
      case views.FORGOT_PASSWORD:
        return (
          <ForgotPasswordForm
            number={number}
            setNumber={setNumber}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            handleForgotPassword={handleForgotPassword}
            loading={loading}
            setCurrentView={setCurrentView}
            views={views}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen" style={{ background: colors.lightBackground }}>
      <div className="flex-1">
        <LoginSlider slides={slides} />
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default Page;
