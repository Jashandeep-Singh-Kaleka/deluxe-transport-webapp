'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/lib/auth';
import LandingPage from '@/components/LandingPage';
import SignInPage from '@/components/SignInPage';
import Layout from '@/components/Layout';
import Welcome from '@/components/Welcome';
import TransportationMetrics from '@/components/TransportationMetrics';
import ProfitLoss from '@/components/ProfitLoss';
import MaintenanceReports from '@/components/MaintenanceReports';
import EquipmentMap from '@/components/EquipmentMap';
import Forecasting from '@/components/Forecasting';
import FinancialDrillDown from '@/components/FinancialDrillDown';

type AppState = 'landing' | 'signin' | 'dashboard';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setAppState('dashboard');
    }
    setIsLoading(false);
  }, []);

  const handleSignInClick = () => {
    setAppState('signin');
  };

  const handleLogin = () => {
    setAppState('dashboard');
    setActiveTab('overview');
  };

  const handleBackToLanding = () => {
    setAppState('landing');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
      case 'welcome':
        return <Welcome />;
      case 'metrics':
        return <TransportationMetrics />;
      case 'pl':
        return <ProfitLoss />;
      case 'financial-drill':
        return <FinancialDrillDown />;
      case 'maintenance':
        return <MaintenanceReports />;
      case 'map':
        return <EquipmentMap />;
      case 'forecasting':
        return <Forecasting />;
      default:
        return <Welcome />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (appState === 'landing') {
    return <LandingPage onSignIn={handleSignInClick} />;
  }

  if (appState === 'signin') {
    return <SignInPage onLogin={handleLogin} onBack={handleBackToLanding} />;
  }

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}