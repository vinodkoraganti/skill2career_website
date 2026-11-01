import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types/index.ts';
import { api, removeStoredToken, setStoredToken } from '../services/api.ts';
import {
  DEMO_USER_VINOD,
  DEMO_USER_KUMAR,
  DEMO_ADMIN_USER,
} from '../data/initialData.ts';

export type DemoUserKey = 'vinod' | 'kumar' | 'admin' | 'student' | 'professional';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateProfile: (displayName: string, details: any) => Promise<void>;
  switchDemoUser: (type: DemoUserKey) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      try {
        const currentUser = await api.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        // Fallback to Vinod demo user if initial request fails
        setUser(DEMO_USER_VINOD);
        setStoredToken(DEMO_USER_VINOD.uid);
      } finally {
        setLoading(false);
      }
    }
    initAuth();
  }, []);

  const login = async (email: string, password?: string) => {
    setLoading(true);
    try {
      const res = await api.login(email, password);
      setUser(res.user);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: any) => {
    setLoading(true);
    try {
      const res = await api.register(data);
      setUser(res.user);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeStoredToken();
    setUser(null);
  };

  const updateProfile = async (displayName: string, details: any) => {
    const res = await api.updateProfile(displayName, details);
    setUser(res.user);
  };

  const switchDemoUser = async (type: DemoUserKey) => {
    let targetUser: UserProfile = DEMO_USER_VINOD;
    if (type === 'vinod' || type === 'student') targetUser = DEMO_USER_VINOD;
    else if (type === 'kumar' || type === 'professional') targetUser = DEMO_USER_KUMAR;
    else if (type === 'admin') targetUser = DEMO_ADMIN_USER;

    setStoredToken(targetUser.uid);
    try {
      const res = await api.login(targetUser.email, 'password');
      setUser(res.user);
    } catch {
      setUser(targetUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        switchDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
