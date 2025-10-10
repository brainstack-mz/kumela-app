export interface LoginSliderProps {
  slides: { image: string; text: string; className?: string }[];
}

export interface LoginFormProps {
  number: string;
  setNumber: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  handleLogin: (e: React.FormEvent) => void;
  loading: boolean;
  setCurrentView: (v: string) => void;
  views: { LOGIN: string; REGISTER: string; FORGOT_PASSWORD: string; OTP_LOGIN: string; };
}

export interface RegisterFormProps {
  name: string;
  setName: (v: string) => void;
  number: string;
  setNumber: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  province: string;
  setProvince: (v: string) => void;
  district: string;
  setDistrict: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
  handleRegister: (e: React.FormEvent) => void;
  loading: boolean;
  setCurrentView: (v: string) => void;
  views: { LOGIN: string; REGISTER: string; FORGOT_PASSWORD: string; OTP_LOGIN: string; };
  accountType: string;
  setAccountType: (v: string) => void;
}

export interface ForgotPasswordFormProps {
  number: string;
  setNumber: (v: string) => void;
  newPassword: string;
  setNewPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  handleForgotPassword: (e: React.FormEvent) => void;
  loading: boolean;
  setCurrentView: (v: string) => void;
  views: { LOGIN: string; REGISTER: string; FORGOT_PASSWORD: string; OTP_LOGIN: string; };
}
