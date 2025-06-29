'use client';

import { useState, useEffect } from 'react';
import { User, getCurrentUser, logout } from '@/lib/auth';
import { 
  BarChart3, 
  DollarSign, 
  Wrench, 
  Map, 
  TrendingUp, 
  LogOut,
  Menu,
  X,
  Home,
  Search
} from 'lucide-react';
import Image from 'next/image';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'metrics', label: 'Transportation Metrics', icon: BarChart3 },
  { id: 'pl', label: 'P&L', icon: DollarSign },
  { id: 'financial-drill', label: 'Financial Drill Down', icon: Search },
  { id: 'maintenance', label: 'Maintenance Reports', icon: Wrench },
  { id: 'map', label: 'Equipment Tracking', icon: Map },
  { id: 'forecasting', label: 'Forecasting & Insights', icon: TrendingUp },
];

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gray-900 text-white shadow-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="mr-3">
                <Image
                  src="/Deluxe_logo.png"
                  alt="Deluxe Transport Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold">Deluxe Transport</h1>
                <p className="text-xs text-gray-400">Fleet Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-right">
                <div className="text-sm">Welcome, {user?.name}</div>
                <div className="text-xs text-gray-400">{user?.role?.toUpperCase()}</div>
              </div>
              <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                {user?.role}
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-md hover:bg-gray-800 transition-colors group"
                title="Sign Out"
              >
                <LogOut size={16} className="group-hover:text-red-400 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-64 bg-white shadow-lg min-h-screen border-r border-gray-200`}>
          <nav className="mt-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-6 py-3 text-left transition-all duration-200 ${
                    activeTab === tab.id 
                      ? 'bg-red-50 border-r-4 border-red-600 text-red-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} className={`mr-3 ${activeTab === tab.id ? 'text-red-600' : 'text-gray-500'}`} />
                  <span className="text-sm">{tab.label}</span>
                </button>
              );
            })}
          </nav>
          
        </aside>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}