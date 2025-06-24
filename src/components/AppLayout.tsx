import React, { useState } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import HomePage from './pages/HomePage';
import BenchmarkPage from './pages/BenchmarkPage';
import OptimizationPage from './pages/OptimizationPage';
import ContractsPage from './pages/ContractsPage';

const AppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'benchmark':
        return <BenchmarkPage />;
      case 'optimization':
        return <OptimizationPage />;
      case 'contracts':
        return <ContractsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto px-4 py-6 flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;