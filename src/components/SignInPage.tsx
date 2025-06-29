'use client';

import { useState } from 'react';
import { authenticate, setCurrentUser } from '@/lib/auth';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { companyInfo } from '@/lib/enhanced-demo-data';
import Image from 'next/image';

interface SignInPageProps {
  onLogin: () => void;
  onBack: () => void;
}

export default function SignInPage({ onLogin, onBack }: SignInPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = authenticate(username, password);
    
    if (user) {
      setCurrentUser(user);
      onLogin();
    } else {
      setError('Invalid credentials. Please check your username and password.');
    }
    setIsLoading(false);
  };

  const demoAccounts = [
    { role: 'Admin', username: 'admin', description: 'Full system access' },
    { role: 'Manager', username: 'manager', description: 'Operations management' },
    { role: 'Dispatcher', username: 'dispatcher', description: 'Trip coordination' },
    { role: 'Driver', username: 'driver', description: 'Driver portal access' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <button 
            onClick={onBack}
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </button>
          <div className="flex justify-center mb-4">
            <Image
              src="/Deluxe_logo.png"
              alt="Deluxe Transport Logo"
              width={80}
              height={80}
              className="h-20 w-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{companyInfo.name}</h1>
          <p className="text-white/80">Fleet Management System</p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-white text-gray-900 placeholder-gray-500 font-medium"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-white text-gray-900 placeholder-gray-500 font-medium"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <button className="text-red-600 hover:text-red-700 font-medium">
                Contact Administrator
              </button>
            </p>
          </div>
        </div>

        {/* Demo Accounts */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Demo Accounts</h3>
          <div className="space-y-3">
            {demoAccounts.map((account) => (
              <button
                key={account.username}
                onClick={() => {
                  setUsername(account.username);
                  setPassword('demo123');
                  setError('');
                }}
                className="w-full bg-white/10 hover:bg-white/20 rounded-lg p-3 transition-all duration-200 border border-white/20 hover:border-white/40"
              >
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <div className="text-white font-medium">{account.role}</div>
                    <div className="text-white/70 text-sm">{account.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/90 text-sm font-mono bg-white/20 px-2 py-1 rounded">
                      {account.username}
                    </div>
                    <div className="text-white/70 text-xs mt-1">Click to auto-fill</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <p className="text-white/70 text-xs text-center mt-4">
            Click any account above to auto-populate credentials
          </p>
        </div>
      </div>
    </div>
  );
}