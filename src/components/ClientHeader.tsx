'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/auth';

interface ClientHeaderProps {
  children?: React.ReactNode;
}

export default function ClientHeader({ children }: ClientHeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me');
      setIsLoggedIn(response.ok);
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Docafrik</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (isLoggedIn) {
    return (
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Docafrik</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#templates" className="text-gray-700 hover:text-blue-600 transition-colors">
                Modèles
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
                Tarifs
              </a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
                Fonctionnalités
              </a>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  return <>{children}</>;
}