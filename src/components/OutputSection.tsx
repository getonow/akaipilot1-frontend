import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, ExternalLink } from 'lucide-react';

interface OutputSectionProps {
  selectedPart?: string;
  selectedVendors?: string[];
}

const OutputSection: React.FC<OutputSectionProps> = ({ selectedPart, selectedVendors = [] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<string>('');
  const [outputType, setOutputType] = useState<'text' | 'graphics'>('text');

  const handleConnectService = async () => {
    setIsLoading(true);
    // Simulate external service call
    setTimeout(() => {
      if (outputType === 'text') {
        setOutput(`Analysis Results for Part: ${selectedPart || 'N/A'}\n\nSelected Vendors: ${selectedVendors.length}\n\nBenchmark Summary:\n- Cost savings potential: 15-20%\n- Lead time optimization: 2-3 weeks\n- Quality score: 4.6/5 average\n\nRecommendation: Proceed with top 2 vendors for detailed negotiations.`);
      } else {
        setOutput('📊 Benchmark Chart\n📈 Cost Analysis Graph\n🎯 Performance Metrics\n\n[Graphics would be displayed here from external service]');
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleClear = () => {
    setOutput('');
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Output</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOutputType(outputType === 'text' ? 'graphics' : 'text')}
          >
            {outputType === 'text' ? '📊 Graphics' : '📝 Text'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={!output}
          >
            Clear
          </Button>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex gap-2 mb-2">
          <Button
            onClick={handleConnectService}
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700"
            size="sm"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <ExternalLink className="w-4 h-4 mr-2" />
            )}
            {isLoading ? 'Connecting...' : 'Connect External Service'}
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 mb-3">
          Service Type: {outputType === 'text' ? 'Text Analysis' : 'Graphics Display'} | 
          Status: {output ? 'Connected' : 'Disconnected'}
        </div>
      </div>

      <div className="border rounded-lg p-4 min-h-[200px] bg-gray-50">
        {output ? (
          <div className="whitespace-pre-wrap text-sm font-mono">
            {output}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="text-2xl mb-2">📡</div>
              <p>No data from external service</p>
              <p className="text-xs mt-1">Click 'Connect External Service' to fetch {outputType} data</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default OutputSection;