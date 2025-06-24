import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Negotiation Intelligence' },
    { id: 'benchmark', label: 'Benchmark Agent' },
    { id: 'optimization', label: 'Market Optimization' },
    { id: 'contracts', label: 'Contract Analysis' }
  ];

  return (
    <div className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 space-y-4 md:space-y-0">
          <div className="flex items-center justify-center md:justify-start">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/6824f1e74792863c7aa3b60f_1750290833366_6e9320f8.png" 
              alt="Company Logo" 
              className="h-12 w-auto"
            />
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end gap-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'px-2 md:px-4 py-2 rounded-lg transition-colors text-xs md:text-sm',
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                {tab.label}
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navigation;