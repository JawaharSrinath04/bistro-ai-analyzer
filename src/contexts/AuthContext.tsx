
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: { [key: string]: { password: string; user: User } } = {
  admin: {
    password: '1234',
    user: {
      id: '1',
      username: 'admin',
      role: 'owner',
      name: 'Restaurant Owner'
    }
  },
  employee: {
    password: '5678',
    user: {
      id: '2',
      username: 'employee',
      role: 'staff',
      name: 'Restaurant Staff'
    }
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const userAuth = mockUsers[username];
    if (userAuth && userAuth.password === password) {
      setUser(userAuth.user);
      localStorage.setItem('currentUser', JSON.stringify(userAuth.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
