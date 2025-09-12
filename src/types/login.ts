export interface LoginSliderProps {
  slides: { image: string; text: string; className?: string }[];
}

export interface LoginFormProps {
  numero: string;
  setNumero: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  handleLogin: (e: React.FormEvent) => void;
  loading: boolean;
  setCurrentView: (v: string) => void;
}

export interface RegisterFormProps {
  name: string;
  setName: (v: string) => void;
  number: string; // mudar de numero para number
  setNumber: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  confirmPassword: string; // adicionado
  setConfirmPassword: (v: string) => void; // adicionado
  province: string;
  setProvince: (v: string) => void;
  district: string;
  setDistrict: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
  handleRegister: (e: React.FormEvent) => void;
  loading: boolean;
  setCurrentView: (v: string) => void;
  views: { LOGIN: string; REGISTER: string; FORGOT_PASSWORD: string }; // adicionado
}

export interface ForgotPasswordFormProps {
  numero: string;
  setNumero: (v: string) => void;
  handleForgotPassword: (e: React.FormEvent) => void;
  loading: boolean;
  setCurrentView: (v: string) => void;
}
