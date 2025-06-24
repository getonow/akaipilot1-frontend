import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, Search, Filter, TrendingUp, Mail, FileText } from 'lucide-react';

const OptimizationPage: React.FC = () => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const opportunities: any[] = [];

  const handleManualScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  const handleSendEmail = () => {
    // Placeholder for email functionality
    alert('Email functionality will be implemented with external service');
  };

  const handleExportPDF = () => {
    // Placeholder for PDF export functionality
    alert('PDF export functionality will be implemented with external service');
  };

  const topOpportunities = opportunities.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Market Driven Cost Optimization</h1>
        <p className="text-gray-600">AI-powered sourcing opportunities and cost savings</p>
      </div>

      {/* Sourcing Opportunities AI Agent - Merged Section */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-blue-900">Sourcing Opportunities AI Agent</h2>
        </div>
        
        <div className="mb-6">
          <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
            <p className="text-gray-700 mb-2">
              <strong>AI Analysis:</strong> No active sourcing opportunities detected at this time. 
              The system is continuously monitoring market conditions for potential cost savings.
            </p>
            <p className="text-sm text-gray-600">
              Key findings: All current suppliers are optimally positioned based on market analysis.
            </p>
          </div>
        </div>

        {/* Summary Panel - Integrated */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-blue-600">0</p>
            <p className="text-xs md:text-sm text-gray-600">Current Opportunities</p>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-green-600">$0</p>
            <p className="text-xs md:text-sm text-gray-600">Total Potential Savings</p>
          </div>
          <div className="flex items-center justify-center col-span-2 md:col-span-1">
            <Button 
              onClick={handleManualScan}
              disabled={isScanning}
              className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
            >
              <Search className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">
                {isScanning ? 'Scanning...' : 'Trigger Manual AI Scan'}
              </span>
              <span className="sm:hidden">
                {isScanning ? 'Scanning...' : 'AI Scan'}
              </span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Opportunity Overview Table */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-2 md:space-y-0">
          <h3 className="font-semibold text-lg text-center md:text-left">Opportunity Overview</h3>
          <div className="flex flex-col sm:flex-row justify-center md:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSendEmail}
              className="flex items-center justify-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportPDF}
              className="flex items-center justify-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="text-center py-8 text-gray-500">
            <p>No opportunities available at this time.</p>
            <p className="text-sm mt-2">Use the manual AI scan to search for new opportunities.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OptimizationPage;