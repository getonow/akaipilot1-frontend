import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Search } from 'lucide-react';

const BenchmarkPage: React.FC = () => {
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [vendorResponse, setVendorResponse] = useState<string>('');
  const [isSearchingVendors, setIsSearchingVendors] = useState<boolean>(false);

  const handleTriggerAIScan = () => {
    setIsScanning(true);
    // Simulate AI scan process
    setTimeout(() => {
      setAiResponse(`AI Scan Results - Generated at ${new Date().toLocaleTimeString()}\n\nPart Analysis Complete:\n- 132 In-House Part Opportunities analyzed\n- Market benchmarking completed\n- Price optimization opportunities identified\n- Supplier recommendations generated\n\nKey Findings:\n• 15% cost reduction potential identified\n• 3 alternative suppliers found with better pricing\n• Lead time improvements possible with 2 vendors\n• Quality ratings above 4.5/5 for recommended suppliers\n\nRecommendations:\n1. Consider switching to Supplier A for 20% cost savings\n2. Negotiate volume discounts with current suppliers\n3. Implement dual sourcing strategy for critical parts\n\nNext Steps:\n- Generate RFQ for top 3 suppliers\n- Schedule supplier evaluation meetings\n- Update procurement strategy based on findings`);
      setIsScanning(false);
    }, 2000);
  };

  const handleTriggerVendorSearch = () => {
    setIsSearchingVendors(true);
    // Simulate vendor search process
    setTimeout(() => {
      setVendorResponse(`AI Vendor Search Results - Generated at ${new Date().toLocaleTimeString()}\n\nOut-Of-Panel Vendor Analysis:\n- 20 Out-Of-Panel Part Opportunities with new Potential Vendors identified\n- Market expansion analysis completed\n- New supplier discovery completed\n- Vendor qualification assessment generated\n\nNew Vendor Findings:\n• 25% additional cost savings potential with new vendors\n• 5 new qualified suppliers discovered\n• Improved delivery options with 3 vendors\n• Quality certifications verified for all new vendors\n\nPotential New Vendors:\n1. VendorTech Solutions - 30% cost reduction, ISO certified\n2. Global Parts Supply - Fast delivery, competitive pricing\n3. Premium Components Ltd - High quality, volume discounts\n4. Innovative Manufacturing Co - Custom solutions available\n5. Reliable Supply Chain Inc - Excellent track record\n\nNext Actions:\n- Contact new vendors for detailed quotes\n- Schedule vendor capability assessments\n- Expand approved vendor list based on findings`);
      setIsSearchingVendors(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Benchmark Agent</h1>
        <p className="text-gray-600">AI-powered supplier benchmarking and price analysis</p>
      </div>

      {/* Top Section with 132 In House Part Opportunities and Trigger Button */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <p className="text-3xl font-bold text-blue-600">132</p>
            <p className="text-lg text-gray-700">In-House Part Opportunities found</p>
          </div>
          <Button 
            onClick={handleTriggerAIScan}
            disabled={isScanning}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2"
          >
            <Search className="w-4 h-4 mr-2" />
            {isScanning ? 'Scanning...' : 'Trigger Manual AI Part Scan'}
          </Button>
        </div>
      </Card>

      {/* Large Text Output Response Box */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">AI Scan Output</h3>
        <Textarea
          value={aiResponse}
          readOnly
          placeholder="AI scan results will appear here after triggering the manual scan..."
          className="min-h-[400px] w-full resize-none font-mono text-sm"
        />
      </Card>

      {/* New Section with 20 Out-Of-Panel Part Opportunities and Vendor Search Button */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <p className="text-3xl font-bold text-green-600">20</p>
            <p className="text-lg text-gray-700">Out-Of-Panel Part Opportunities with new Potential Vendors</p>
          </div>
          <Button 
            onClick={handleTriggerVendorSearch}
            disabled={isSearchingVendors}
            className="bg-green-600 hover:bg-green-700 px-6 py-2"
          >
            <Search className="w-4 h-4 mr-2" />
            {isSearchingVendors ? 'Searching...' : 'Trigger AI Potential Vendors Search'}
          </Button>
        </div>
      </Card>

      {/* Vendor Search Output Box */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">AI Vendor Search Output</h3>
        <Textarea
          value={vendorResponse}
          readOnly
          placeholder="AI vendor search results will appear here after triggering the vendor search..."
          className="min-h-[400px] w-full resize-none font-mono text-sm"
        />
      </Card>
    </div>
  );
};

export default BenchmarkPage;