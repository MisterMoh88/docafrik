'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { clientStorage, ClientUser } from '@/lib/client-storage';

interface AuthContextType {
  user: ClientUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function ClientAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ClientUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const savedUser = clientStorage.getUser();
    setUser(savedUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulation d'authentification (en mode statique)
      // En production, cela appellerait une API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password.length >= 6) {
        const userData: ClientUser = {
          id: 'user_' + Date.now(),
          email,
          name: email.split('@')[0],
          role: email.includes('admin') ? 'ADMIN' : 'CLIENT',
          createdAt: new Date().toISOString()
        };
        
        clientStorage.saveUser(userData);
        setUser(userData);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulation d'inscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password.length >= 6 && name) {
        const userData: ClientUser = {
          id: 'user_' + Date.now(),
          email,
          name,
          role: 'CLIENT',
          createdAt: new Date().toISOString()
        };
        
        clientStorage.saveUser(userData);
        setUser(userData);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clientStorage.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useClientAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useClientAuth must be used within a ClientAuthProvider');
  }
  return context;
}