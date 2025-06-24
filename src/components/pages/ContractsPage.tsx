import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Mail } from 'lucide-react';

const ContractsPage: React.FC = () => {
  const handleExportPDF = () => {
    // Create a simple PDF export functionality
    const content = `Contract Insights & Recommendations\n\nAI Summary & Recommendations\n\nYour contract portfolio shows moderate risk with significant optimization opportunities. Priority actions: 1) Renegotiate TechCorp contract before Q4, 2) Address Global Supply Co renewal terms, 3) Implement volume discount clauses across framework agreements. Estimated annual savings potential: $85,000 through strategic contract management.`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contract-insights-recommendations.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSendEmail = () => {
    // Placeholder for email functionality
    alert('Email functionality would be integrated here with your email service provider');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">AI Contracts Agent</h1>
        <p className="text-gray-600">Intelligent contract analysis and risk management</p>
      </div>

      {/* Contract Insights & Recommendations */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-2 md:space-y-0">
          <h3 className="font-semibold text-lg text-center md:text-left">Contract Insights & Recommendations</h3>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <Button 
              onClick={handleSendEmail}
              className="bg-green-600 hover:bg-green-700 w-full md:w-auto"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
            <Button 
              onClick={handleExportPDF}
              className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
            >
              <Download className="w-4 h-4 mr-2" />
              Export to PDF
            </Button>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium mb-2 text-center md:text-left">AI Summary & Recommendations</h4>
          <p className="text-sm text-gray-700">
            Your contract portfolio shows moderate risk with significant optimization opportunities. 
            Priority actions: 1) Renegotiate TechCorp contract before Q4, 2) Address Global Supply Co 
            renewal terms, 3) Implement volume discount clauses across framework agreements. 
            Estimated annual savings potential: $85,000 through strategic contract management.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ContractsPage;