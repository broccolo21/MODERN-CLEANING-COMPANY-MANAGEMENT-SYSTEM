import React, { createContext, useContext, useState } from 'react';

interface User {
  uid: string;
  email: string;
  role: 'admin' | 'employee' | 'client';
  subscription?: {
    plan: 'demo' | 'base' | 'pro' | 'enterprise';
    startDate: Date;
    endDate?: Date;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  checkSubscription: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USERS: Record<string, User> = {
  'admin@example.com': {
    uid: 'admin-123',
    email: 'admin@example.com',
    role: 'admin',
    subscription: {
      plan: 'demo',
      startDate: new Date(),
      endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
    }
  },
  'employee@example.com': {
    uid: 'employee-123',
    email: 'employee@example.com',
    role: 'employee',
    subscription: {
      plan: 'demo',
      startDate: new Date(),
      endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
    }
  },
  'client@example.com': {
    uid: 'client-123',
    email: 'client@example.com',
    role: 'client',
    subscription: {
      plan: 'demo',
      startDate: new Date(),
      endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
    }
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('demoUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));

      const demoUser = DEMO_USERS[email];
      if (!demoUser || password !== 'demo-password') {
        throw new Error('Invalid credentials');
      }

      setUser(demoUser);
      localStorage.setItem('demoUser', JSON.stringify(demoUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      setUser(null);
      localStorage.removeItem('demoUser');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkSubscription = () => {
    if (!user?.subscription) return false;

    const now = new Date();
    if (user.subscription.plan === 'demo' && user.subscription.endDate) {
      if (now > user.subscription.endDate) {
        logout();
        return false;
      }
    }
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoading, 
      checkSubscription 
    }}>
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