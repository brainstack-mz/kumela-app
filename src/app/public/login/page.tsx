'use client';

// O LoginSlider reescrito agora lida com as animações de slide
import LoginSlider from '@/components/login-components/LoginSlider';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { 
  Phone, 
  Lock, 
  User, 
  MapPin, 
  Truck,
  ShoppingCart,
  UserCheck,
  CreditCard // Novo ícone para slide
} from 'lucide-react';

// Components
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import { Select } from '@/components/shared/Select';
import { StepIndicator } from '@/components/shared/StepIndicator';

// Data
import { provincesData } from '@/data/provincesData';
import { loginUser, DASHBOARD_URLS } from '@/lib/users';
import { useAuth } from '@/context/AuthContext';

// Tipos (mantidos inalterados)
interface AuthState {
  phoneNumber: string;
  password: string;
  otp: string;
  showPassword: boolean;
  showOTPField: boolean;
  showPasswordField: boolean;
  isRegistering: boolean;
  registrationStep: number;
  wantsPassword: boolean;
  registrationData: {
    fullName: string;
    userType: string;
    province: string;
    district: string;
    addressDetails: string;
    password: string;
    confirmPassword: string;
  };
  errors: Record<string, string>;
  loading: boolean;
}

const userTypes = [
  { value: 'seller', label: 'Vendedor', icon: ShoppingCart },
  { value: 'shipper', label: 'Transportador', icon: Truck },
  { value: 'buyer', label: 'Cliente', icon: UserCheck },
];

const registrationSteps = [
  'Informações Básicas',
  'Localização',
  'Definir Senha'
];

// Dados dos Slides (usando os ícones importados)
const sliderData = [
  { 
    text: 'Pagamentos Simples e Seguros', 
    icon: <CreditCard className="h-12 w-12 text-white" />,
    image: '/images/slide1.jpg' // Adicione URLs de imagem reais, se necessário
  },
  { 
    text: 'Entrega em Todo Moçambique', 
    icon: <Truck className="h-12 w-12 text-white" />,
    image: '/images/slide2.jpg' 
  },
  { 
    text: 'Conectando Comunidades', 
    icon: <UserCheck className="h-12 w-12 text-white" />,
    image: '/assets/imgs/img1.jpeg'
  },
];


export default function AuthPage() {
  const router = useRouter();
  const { login: authLogin } = useAuth();
  
  const [authState, setAuthState] = useState<AuthState>({
    phoneNumber: '',
    password: '',
    otp: '',
    showPassword: false,
    showOTPField: false,
    showPasswordField: false,
    isRegistering: false,
    registrationStep: 1,
    wantsPassword: false,
    registrationData: {
      fullName: '',
      userType: '',
      province: '',
      district: '',
      addressDetails: '',
      password: '',
      confirmPassword: '',
    },
    errors: {},
    loading: false,
  });


  // Phone number validation
  const validatePhoneNumber = (phone: string): boolean => {
    // Remove +258 prefix if present
    const cleanPhone = phone.replace(/^\+258/, '');
    // Validate 9 digits starting with 82, 83, 84, 85, 86, or 87
    return /^(82|83|84|85|86|87)\d{7}$/.test(cleanPhone);
  };

  // Password strength validation
  const validatePassword = (password: string): { isValid: boolean; message: string } => {
    if (password.length < 6) {
      return { isValid: false, message: 'Senha deve ter pelo menos 6 caracteres' };
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return { isValid: false, message: 'Senha deve conter pelo menos uma letra minúscula' };
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return { isValid: false, message: 'Senha deve conter pelo menos uma letra maiúscula' };
    }
    if (!/(?=.*\d)/.test(password)) {
      return { isValid: false, message: 'Senha deve conter pelo menos um número' };
    }
    return { isValid: true, message: 'Senha forte' };
  };

  // Show toast
  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    } else if (type === 'warning') {
      toast(message, { icon: '⚠️' });
    } else {
      toast(message);
    }
  };

  // Handle phone number input
  const handlePhoneChange = (value: string) => {
    // Format phone number with +258 prefix
    let cleanValue = value.replace(/[^\d+]/g, '');
    
    // If user starts typing without +258, add it
    if (!cleanValue.startsWith('+258') && cleanValue.length > 0) {
      if (cleanValue.startsWith('8')) {
        cleanValue = '+258' + cleanValue;
      } else if (!cleanValue.startsWith('+')) {
        cleanValue = '+258' + cleanValue;
      }
    }
    
    setAuthState(prev => ({
      ...prev,
      phoneNumber: cleanValue,
      errors: { ...prev.errors, phoneNumber: '' }
    }));
  };

  // Handle login with OTP
  const handleOTPLogin = async () => {
    if (!validatePhoneNumber(authState.phoneNumber)) {
      showToast('Número de telefone inválido. Use formato: +258 8xxxxxxx', 'error');
      return;
    }

    setAuthState(prev => ({ ...prev, loading: true }));
    
    try {
      // Simulate OTP sending
      setTimeout(() => {
        setAuthState(prev => ({ 
          ...prev, 
          showOTPField: true,
          loading: false 
        }));
        showToast('Código OTP enviado para seu telefone', 'success');
      }, 1000);
    } catch {
      setAuthState(prev => ({ ...prev, loading: false }));
      showToast('Erro ao enviar OTP', 'error');
    }
  };

  // Handle login with password
  const handlePasswordLogin = async () => {
    if (!validatePhoneNumber(authState.phoneNumber)) {
      showToast('Número de telefone inválido. Use formato: +258 8xxxxxxx', 'error');
      return;
    }

    setAuthState(prev => ({ ...prev, showPasswordField: true }));
  };

  // Verify OTP
  const handleOTPVerification = async () => {
    if (authState.otp.length !== 6) {
      showToast('Código OTP deve ter 6 dígitos', 'error');
      return;
    }

    setAuthState(prev => ({ ...prev, loading: true }));

    try {
      // Simulate OTP verification - accept any 6-digit code
      const isValidOTP = /^\d{6}$/.test(authState.otp);
      
      if (isValidOTP) {
        // Check if user exists in mock data
        const cleanPhone = authState.phoneNumber.replace(/^\+258/, '');
        const user = loginUser(cleanPhone, 'dummy'); // We don't need password for OTP

    if (user) {
          // User exists, redirect to dashboard
          showToast(`Bem-vindo, ${user.role}!`, 'success');
          setTimeout(() => {
      const redirectUrl = DASHBOARD_URLS[user.role];
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
              router.push('/admin/dashboard');
            }
          }, 1500);
        } else {
          // User doesn't exist, start registration
          setAuthState(prev => ({
            ...prev,
            isRegistering: true,
            registrationStep: 1,
            loading: false
          }));
        }
      } else {
        showToast('Código OTP inválido', 'error');
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    } catch {
      showToast('Erro ao verificar OTP', 'error');
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  };

  // Verify password
  const handlePasswordVerification = async () => {
    if (!authState.password) {
      showToast('Digite sua senha', 'error');
      return;
    }

    setAuthState(prev => ({ ...prev, loading: true }));

    try {
      // Use existing login function from lib/users.ts
      const cleanPhone = authState.phoneNumber.replace(/^\+258/, '');
      const user = loginUser(cleanPhone, authState.password);
      
      if (user) {
        // Salvar no AuthContext
        authLogin(user);
        showToast(`Bem-vindo, ${user.role}!`, 'success');
        setTimeout(() => {
          const redirectUrl = DASHBOARD_URLS[user.role];
          if (redirectUrl) {
            router.push(redirectUrl);
          } else {
            router.push('/admin/dashboard');
          }
        }, 1500);
      } else {
        // User doesn't exist, start registration
        setAuthState(prev => ({
          ...prev,
          isRegistering: true,
          registrationStep: 1,
          loading: false
        }));
      }
    } catch {
      showToast('Erro ao verificar senha', 'error');
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  };

  // Handle registration step 1
  const handleRegistrationStep1 = () => {
    const errors: Record<string, string> = {};
    
    if (!authState.registrationData.fullName.trim()) {
      errors.fullName = 'Nome completo é obrigatório';
    }
    
    if (!authState.registrationData.userType) {
      errors.userType = 'Tipo de usuário é obrigatório';
    }

    if (Object.keys(errors).length > 0) {
      setAuthState(prev => ({ ...prev, errors }));
      return;
    }

    setAuthState(prev => ({
      ...prev,
      registrationStep: 2,
      errors: {}
    }));
  };

  // Handle registration step 2
  const handleRegistrationStep2 = () => {
    const errors: Record<string, string> = {};
    
    if (!authState.registrationData.province) {
      errors.province = 'Província é obrigatória';
    }
    
    if (!authState.registrationData.district) {
      errors.district = 'Distrito é obrigatório';
    }
    
    if (!authState.registrationData.addressDetails.trim()) {
      errors.addressDetails = 'Endereço é obrigatório';
    }

    if (Object.keys(errors).length > 0) {
      setAuthState(prev => ({ ...prev, errors }));
      return;
    }

    setAuthState(prev => ({
      ...prev,
      registrationStep: 3,
      errors: {}
    }));
  };

  // Handle registration step 3
  const handleRegistrationStep3 = async () => {
    const { password, confirmPassword } = authState.registrationData;
    const errors: Record<string, string> = {};

    // Only validate password if user wants to set one
    if (authState.wantsPassword) {
      if (!password) {
        errors.password = 'Senha é obrigatória';
      } else {
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
          errors.password = passwordValidation.message;
        }
        
        if (password !== confirmPassword) {
          errors.confirmPassword = 'Senhas não coincidem';
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      setAuthState(prev => ({ ...prev, errors }));
      return;
    }

    setAuthState(prev => ({ ...prev, loading: true }));

    try {
      // Simulate user creation
      showToast('Cadastro concluído com sucesso!', 'success');
      
      setTimeout(() => {
        // Redirect based on user type
        const redirectUrl = DASHBOARD_URLS[authState.registrationData.userType as keyof typeof DASHBOARD_URLS];
        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          router.push('/buyer/dashboard');
        }
      }, 2000);
    } catch {
      showToast('Erro ao criar conta', 'error');
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  };

  // Get districts for selected province
  const getDistrictsForProvince = (provinceName: string) => {
    const province = provincesData.find(p => p.name === provinceName);
    return province ? province.districts.map(district => ({ value: district, label: district })) : [];
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left side - Slider */}
 {/* Left side - Slider: Usando o componente LoginSlider importado */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-teal-600">
        <LoginSlider slides={sliderData} />
      </div>

      {/* Right side - Auth form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            {/* Logo and title */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Image src="/favicon.ico" alt="Logo" width={40} height={40} />
                <span className="text-sm font-medium text-gray-600">KUMELA</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                {authState.isRegistering ? 'Criar Conta' : 'ACESSE A SUA CONTA'}
              </h2>
            </div>

            <AnimatePresence mode="wait">
              {/* Initial phone input */}
              {!authState.showOTPField && !authState.showPasswordField && !authState.isRegistering && (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <Input
                    type="tel"
                    value={authState.phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="+258 8XXXXXXXX"
                    label="Número de Telefone *"
                    required
                    icon={Phone}
                    error={authState.errors.phoneNumber}
                    maxLength={15}
                  />
                  
                  <p className="text-xs text-gray-500 -mt-2">
                    Digite os 9 dígitos do seu número (ex: 841234567)
                  </p>

                  <div className="space-y-4">
                    <Button
                      onClick={handleOTPLogin}
                      loading={authState.loading}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Entrar com OTP
                    </Button>

                    <Button
                      onClick={handlePasswordLogin}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Entrar com Senha
                    </Button>
                  </div>

                  <div className="space-y-3 text-center">
                    <button
                      onClick={() => router.push('/')}
                      className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mx-auto"
                    >
                      ← Voltar à página inicial
                    </button>
                    
                    <p className="text-sm text-gray-600">
                      Não possui conta?{' '}
                      <button
                        onClick={() => setAuthState(prev => ({ ...prev, isRegistering: true }))}
                        className="text-blue-500 hover:underline font-medium"
                      >
                        Registre-se agora
                      </button>
                    </p>
                  </div>
                </motion.div>
              )}

              {/* OTP input */}
              {authState.showOTPField && !authState.isRegistering && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Código de Verificação
                    </h3>
                    <p className="text-sm text-gray-600">
                      Digite o código de 6 dígitos enviado para {authState.phoneNumber}
                    </p>
                  </div>

                  <Input
                    type="tel"
                    value={authState.otp}
                    onChange={(value) => setAuthState(prev => ({ ...prev, otp: value }))}
                    placeholder="000000"
                    label="Código OTP"
                    required
                    maxLength={6}
                  />

                  <div className="space-y-3">
                    <Button
                      onClick={handleOTPVerification}
                      loading={authState.loading}
                      className="w-full"
                    >
                      Verificar Código
                    </Button>

                    <Button
                      onClick={() => setAuthState(prev => ({ ...prev, showOTPField: false, otp: '' }))}
                      variant="ghost"
                      className="w-full"
                    >
                      Voltar
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Password input */}
              {authState.showPasswordField && !authState.isRegistering && (
                <motion.div
                  key="password"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Digite sua Senha
                    </h3>
                    <p className="text-sm text-gray-600">
                      Para o número {authState.phoneNumber}
                    </p>
                  </div>

                  <Input
                    type={authState.showPassword ? 'text' : 'password'}
                    value={authState.password}
                    onChange={(value) => setAuthState(prev => ({ ...prev, password: value }))}
                    placeholder="Digite sua senha"
                    label="Senha"
                    required
                    icon={Lock}
                  />

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showPassword"
                      checked={authState.showPassword}
                      onChange={() => setAuthState(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="showPassword" className="ml-2 text-sm text-gray-700">
                      Mostrar senha
                    </label>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handlePasswordVerification}
                      loading={authState.loading}
                      className="w-full"
                    >
                      Entrar
                    </Button>

                    <Button
                      onClick={() => setAuthState(prev => ({ ...prev, showPasswordField: false, password: '' }))}
                      variant="ghost"
                      className="w-full"
                    >
                      Voltar
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Registration steps */}
              {authState.isRegistering && (
                <motion.div
                  key="registration"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <StepIndicator
                    currentStep={authState.registrationStep}
                    totalSteps={3}
                    stepLabels={registrationSteps}
                  />

                  {/* Step 1: Basic Info */}
                  {authState.registrationStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 text-center">
                        Informações Básicas
                      </h3>

                      <Input
                        value={authState.registrationData.fullName}
                        onChange={(value) => setAuthState(prev => ({
                          ...prev,
                          registrationData: { ...prev.registrationData, fullName: value },
                          errors: { ...prev.errors, fullName: '' }
                        }))}
                        placeholder="Seu nome completo"
                        label="Nome completo"
                        required
                        icon={User}
                        error={authState.errors.fullName}
                      />

                      <Select
                        value={authState.registrationData.userType}
                        onChange={(value) => setAuthState(prev => ({
                          ...prev,
                          registrationData: { ...prev.registrationData, userType: value },
                          errors: { ...prev.errors, userType: '' }
                        }))}
                        options={userTypes.map(type => ({
                          value: type.value,
                          label: type.label,
                          icon: type.icon
                        }))}
                        placeholder="Selecione seu tipo"
                        label="Tipo de usuário"
                        required
                        error={authState.errors.userType}
                      />

                      <Button
                        onClick={handleRegistrationStep1}
                        className="w-full"
                      >
                        Próximo
                      </Button>
                    </motion.div>
                  )}

                  {/* Step 2: Location */}
                  {authState.registrationStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 text-center">
                        Localização
                      </h3>

                      <Select
                        value={authState.registrationData.province}
                        onChange={(value) => setAuthState(prev => ({
                          ...prev,
                          registrationData: { 
                            ...prev.registrationData, 
                            province: value,
                            district: '' // Reset district when province changes
                          },
                          errors: { ...prev.errors, province: '', district: '' }
                        }))}
                        options={provincesData.map(province => ({
                          value: province.name,
                          label: province.name
                        }))}
                        placeholder="Selecione a província"
                        label="Província"
                        required
                        error={authState.errors.province}
                      />

                      <Select
                        value={authState.registrationData.district}
                        onChange={(value) => setAuthState(prev => ({
                          ...prev,
                          registrationData: { ...prev.registrationData, district: value },
                          errors: { ...prev.errors, district: '' }
                        }))}
                        options={getDistrictsForProvince(authState.registrationData.province)}
                        placeholder="Selecione o distrito"
                        label="Distrito"
                        required
                        disabled={!authState.registrationData.province}
                        error={authState.errors.district}
                      />

                      <Input
                        value={authState.registrationData.addressDetails}
                        onChange={(value) => setAuthState(prev => ({
                          ...prev,
                          registrationData: { ...prev.registrationData, addressDetails: value },
                          errors: { ...prev.errors, addressDetails: '' }
                        }))}
                        placeholder="Rua, número, bairro"
                        label="Endereço"
                        required
                        icon={MapPin}
                        error={authState.errors.addressDetails}
                      />

                      <div className="flex gap-3">
                        <Button
                          onClick={() => setAuthState(prev => ({ ...prev, registrationStep: 1 }))}
                          variant="ghost"
                          className="flex-1"
                        >
                          Voltar
                        </Button>
                        <Button
                          onClick={handleRegistrationStep2}
                          className="flex-1"
                        >
                          Próximo
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Password */}
                  {authState.registrationStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 text-center">
                        Definir Senha
                      </h3>

                      <div className="text-center mb-6">
                        <p className="text-lg font-medium text-gray-800 mb-2">
                          Deseja definir uma senha agora? (Opcional)
                        </p>
                        <p className="text-sm text-gray-500">
                          Você pode pular esta etapa e definir depois
                        </p>
                      </div>

                      {/* SIM/NÃO Buttons */}
                      <div className="flex gap-4 mb-6">
                        <Button
                          onClick={() => setAuthState(prev => ({ ...prev, wantsPassword: true }))}
                          className={`flex-1 ${authState.wantsPassword ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                          SIM
                        </Button>
                        
                      </div>

                      {/* Password fields - only show if user wants password */}
                      {authState.wantsPassword && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          <Input
                            type={authState.showPassword ? 'text' : 'password'}
                            value={authState.registrationData.password}
                            onChange={(value) => setAuthState(prev => ({
                              ...prev,
                              registrationData: { ...prev.registrationData, password: value },
                              errors: { ...prev.errors, password: '' }
                            }))}
                            placeholder="Digite uma senha forte"
                            label="Senha"
                            icon={Lock}
                            error={authState.errors.password}
                          />

                          <Input
                            type={authState.showPassword ? 'text' : 'password'}
                            value={authState.registrationData.confirmPassword}
                            onChange={(value) => setAuthState(prev => ({
                              ...prev,
                              registrationData: { ...prev.registrationData, confirmPassword: value },
                              errors: { ...prev.errors, confirmPassword: '' }
                            }))}
                            placeholder="Confirme sua senha"
                            label="Confirmar senha"
                            icon={Lock}
                            error={authState.errors.confirmPassword}
                          />

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="showRegPassword"
                              checked={authState.showPassword}
                              onChange={() => setAuthState(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="showRegPassword" className="ml-2 text-sm text-gray-700">
                              Mostrar senha
                            </label>
                          </div>
                        </motion.div>
                      )}

                      <div className="flex gap-3">
                        <Button
                          onClick={() => setAuthState(prev => ({ ...prev, registrationStep: 2 }))}
                          variant="ghost"
                          className="flex-1"
                        >
                          Voltar
                        </Button>
                        <Button
                          onClick={handleRegistrationStep3}
                          loading={authState.loading}
                          className="flex-1"
                        >
                          Pular
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>

          </motion.div>
        </div>
      </div>
    </div>
  );
}