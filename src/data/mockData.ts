// Mock data based on database schema
export interface User {
  user_id: string;
  phone_number: string;
  phone_verified: boolean;
  full_name: string;
  locality_id?: string;
  address_details?: string;
  preferred_language: string;
  has_set_password: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  last_login_at?: string;
}

export interface UserPassword {
  password_id: string;
  user_id: string;
  password_hash: string;
  password_algorithm: string;
  created_at: string;
  updated_at: string;
}

export interface Locality {
  locality_id: string;
  district_id: string;
  name: string;
  type?: string;
  latitude?: number;
  longitude?: number;
  is_active: boolean;
}

export interface District {
  district_id: string;
  province_id: string;
  name: string;
  is_active: boolean;
}

export interface Province {
  province_id: string;
  name: string;
  is_active: boolean;
}

// Mock users data
export const mockUsers: User[] = [
  {
    user_id: 'user-1',
    phone_number: '821234567',
    phone_verified: true,
    full_name: 'João Silva',
    locality_id: 'loc-1',
    address_details: 'Rua da Liberdade, 123',
    preferred_language: 'pt',
    has_set_password: true,
    status: 'active',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    last_login_at: '2024-01-20T14:30:00Z',
  },
  {
    user_id: 'user-2',
    phone_number: '831234567',
    phone_verified: true,
    full_name: 'Maria Santos',
    locality_id: 'loc-2',
    address_details: 'Avenida Marginal, 456',
    preferred_language: 'pt',
    has_set_password: false,
    status: 'active',
    created_at: '2024-01-16T09:00:00Z',
    updated_at: '2024-01-16T09:00:00Z',
  },
];

// Mock passwords data
export const mockPasswords: UserPassword[] = [
  {
    password_id: 'pwd-1',
    user_id: 'user-1',
    password_hash: '$2b$10$example_hash_1', // bcrypt hash for '123456'
    password_algorithm: 'bcrypt',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
];

// Mock localities data
export const mockLocalities: Locality[] = [
  {
    locality_id: 'loc-1',
    district_id: 'dist-1',
    name: 'Centro',
    type: 'bairro',
    latitude: -25.969248,
    longitude: 32.573924,
    is_active: true,
  },
  {
    locality_id: 'loc-2',
    district_id: 'dist-1',
    name: 'Sommerschield',
    type: 'bairro',
    latitude: -25.969248,
    longitude: 32.573924,
    is_active: true,
  },
];

// Mock districts data
export const mockDistricts: District[] = [
  {
    district_id: 'dist-1',
    province_id: 'prov-1',
    name: 'KaMpfumo',
    is_active: true,
  },
  {
    district_id: 'dist-2',
    province_id: 'prov-1',
    name: 'Nlhamankulu',
    is_active: true,
  },
];

// Mock provinces data
export const mockProvinces: Province[] = [
  {
    province_id: 'prov-1',
    name: 'Maputo Cidade',
    is_active: true,
  },
  {
    province_id: 'prov-2',
    name: 'Maputo Província',
    is_active: true,
  },
];

// Helper functions for mock data
export const findUserByPhone = (phoneNumber: string): User | undefined => {
  return mockUsers.find(user => user.phone_number === phoneNumber);
};

export const findUserPassword = (userId: string): UserPassword | undefined => {
  return mockPasswords.find(pwd => pwd.user_id === userId);
};

export const verifyPassword = (userId: string, password: string): boolean => {
  const userPassword = findUserPassword(userId);
  if (!userPassword) return false;
  
  // In a real app, you would use bcrypt.compare
  // For mock purposes, we'll assume '123456' is the correct password
  return password === '123456';
};

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTP = (phoneNumber: string): string => {
  // Mock OTP sending - in real app, this would send SMS
  const otp = generateOTP();
  console.log(`OTP sent to ${phoneNumber}: ${otp}`);
  return otp;
};

export const verifyOTP = (phoneNumber: string, otp: string): boolean => {
  // Mock OTP verification - in real app, this would verify with SMS service
  // For demo purposes, accept any 6-digit OTP
  return /^\d{6}$/.test(otp);
};

export const createUser = (userData: Partial<User>): User => {
  const newUser: User = {
    user_id: `user-${Date.now()}`,
    phone_number: userData.phone_number || '',
    phone_verified: false,
    full_name: userData.full_name || '',
    locality_id: userData.locality_id,
    address_details: userData.address_details,
    preferred_language: 'pt',
    has_set_password: false,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  mockUsers.push(newUser);
  return newUser;
};

export const updateUserPassword = (userId: string, password: string): void => {
  const existingPassword = mockPasswords.find(pwd => pwd.user_id === userId);
  
  if (existingPassword) {
    existingPassword.password_hash = `$2b$10$mock_hash_${Date.now()}`;
    existingPassword.updated_at = new Date().toISOString();
  } else {
    mockPasswords.push({
      password_id: `pwd-${Date.now()}`,
      user_id: userId,
      password_hash: `$2b$10$mock_hash_${Date.now()}`,
      password_algorithm: 'bcrypt',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
  
  // Update user's has_set_password flag
  const user = mockUsers.find(u => u.user_id === userId);
  if (user) {
    user.has_set_password = true;
    user.updated_at = new Date().toISOString();
  }
};
