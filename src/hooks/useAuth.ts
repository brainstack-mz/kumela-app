import { useEffect, useState } from 'react';
import api, { setAuthToken } from '@/lib/api';

interface User {
    id: string;
    phone: string;
    fullName?: string;
    onboardingCompleted: boolean;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            setAuthToken(token);
            api.get('/auth/me')
                .then(response => setUser(response.data.user))
                .catch(() => logout())
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (phone: string, otp: string) => {
        const response = await api.post('/auth/otp/verify', { phone, otp });
        setAuthToken(response.data.token);
        setUser(response.data.user);
        return response.data;
    };

    const logout = () => {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem('auth_token');
    };

    const updateProfile = async (data: {
        fullName: string;
        localityId: string;
        addressDetails: string;
        preferredLanguage: string;
    }) => {
        const response = await api.post('/auth/profile', data);
        setUser(response.data.user);
        return response.data;
    };

    return { user, loading, login, logout, updateProfile };
}