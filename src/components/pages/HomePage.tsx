import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ChatInterface from '@/components/ChatInterface';
import { Eye, Download, FileText } from 'lucide-react';

const HomePage: React.FC = () => {
  const [selectedNegotiation, setSelectedNegotiation] = useState<string | null>(null);
  const [strategy, setStrategy] = useState<string>('');

  const negotiations = [
    {
      id: '1',
      vendor: 'Supplier B',
      products: 'JKL012, MNO345',
      status: 'In Progress',
      dateStarted: '2024-01-15'
    }
  ];

  const strategyDetails = {
    assertive: 'Focus on data-driven arguments and firm positioning. Maintain professional tone while clearly stating requirements and expectations. Use market benchmarks to support your position.',
    aggressive: 'Take a strong stance with competitive alternatives ready. Apply time pressure and emphasize switching costs. Use leverage points and competitive intelligence effectively.',
    collaborative: 'Build partnership approach focusing on mutual benefits. Explore creative solutions and long-term value creation. Emphasize relationship building and shared goals.',
    conservative: 'Maintain existing relationships while seeking incremental improvements. Focus on risk mitigation and gradual optimization. Prioritize stability over aggressive savings.'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Negotiation Intelligence Platform</h1>
        <p className="text-gray-600">AI-powered procurement negotiations and opportunities</p>
      </div>

      {/* Negotiations In Progress - MOVED TO TOP */}
      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-4 text-center md:text-left">Negotiations In Progress</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2">Vendor</th>
                <th className="text-left py-2 px-2">Products/Parts</th>
                <th className="text-left py-2 px-2">Status</th>
                <th className="text-left py-2 px-2">Date Started</th>
                <th className="text-left py-2 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {negotiations.map((neg) => (
                <tr key={neg.id} className="border-b">
                  <td className="py-2 px-2">{neg.vendor}</td>
                  <td className="py-2 px-2">{neg.products}</td>
                  <td className="py-2 px-2">
                    <Badge variant="outline">{neg.status}</Badge>
                  </td>
                  <td className="py-2 px-2">{neg.dateStarted}</td>
                  <td className="py-2 px-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      <span className="hidden sm:inline">View Details</span>
                      <span className="sm:hidden">View</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* AI Chat - MOVED TO MIDDLE */}
      <ChatInterface 
        title="AI Negotiation Agent"
        initialMessage="Would you like to tailor a negotiation strategy?"
        className="h-fit"
      />

      {/* Strategy Section - REMAINS AT END */}
      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-4 text-center md:text-left">Negotiation Strategy</h3>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Select value={strategy} onValueChange={setStrategy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Select strategy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="assertive">Assertive</SelectItem>
              <SelectItem value="aggressive">Aggressive</SelectItem>
              <SelectItem value="collaborative">Collaborative</SelectItem>
              <SelectItem value="conservative">Conservative</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <Button className="w-full sm:w-auto">
              <FileText className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Generate Preparation Deck</span>
              <span className="sm:hidden">Generate Deck</span>
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Download Cheat-sheet</span>
              <span className="sm:hidden">Download</span>
            </Button>
          </div>
        </div>
        
        {/* Strategy Details Text Box */}
        {strategy && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">Strategy Details</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {strategyDetails[strategy as keyof typeof strategyDetails]}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default HomePage;