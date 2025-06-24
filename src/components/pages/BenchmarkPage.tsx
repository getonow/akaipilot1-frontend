import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SummaryKeyInsights from '@/components/SummaryKeyInsights';
import ApiOutputPlaceholder from '@/components/ApiOutputPlaceholder';
import { Send, Search } from 'lucide-react';

const BenchmarkPage: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [selectedAlternativePart, setSelectedAlternativePart] = useState<string | null>(null);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [customPart, setCustomPart] = useState<string>('');
  const [parts, setParts] = useState<any[]>([]);
  const [loadingParts, setLoadingParts] = useState(false);
  const [partsError, setPartsError] = useState<string | null>(null);

  const potentialVendors = [
    { id: '1', vendorName: 'TechSupply Co.', location: 'Germany', price: '$9.20', leadTime: '4 weeks', rating: '4.8/5' },
    { id: '2', vendorName: 'Global Parts Ltd.', location: 'China', price: '$8.75', leadTime: '6 weeks', rating: '4.5/5' },
    { id: '3', vendorName: 'Euro Components', location: 'Italy', price: '$9.80', leadTime: '3 weeks', rating: '4.7/5' },
    { id: '4', vendorName: 'Asian Manufacturing', location: 'Vietnam', price: '$8.50', leadTime: '5 weeks', rating: '4.3/5' }
  ];

  const handleSelectPart = (partNumber: string) => {
    setSelectedPart(partNumber);
    setSelectedVendors([]);
  };

  const handleSelectAlternativePart = (partNumber: string) => {
    if (selectedAlternativePart === partNumber) {
      setSelectedAlternativePart(null);
    } else {
      setSelectedAlternativePart(partNumber);
    }
  };

  const handleStartBenchmark = () => {
    const partToUse = customPart.trim() || selectedPart;
    alert(`Starting benchmark for part: ${partToUse || 'No part selected'}`);
  };

  const handleVendorSelect = (vendorId: string, checked: boolean) => {
    if (checked) {
      setSelectedVendors(prev => [...prev, vendorId]);
    } else {
      setSelectedVendors(prev => prev.filter(id => id !== vendorId));
    }
  };

  const handleGenerateRFQ = () => {
    const partToUse = customPart.trim() || selectedPart;
    const selectedVendorNames = potentialVendors
      .filter(vendor => selectedVendors.includes(vendor.id))
      .map(vendor => vendor.vendorName)
      .join(', ');
    alert(`Generating RFI/RFQ for part ${partToUse || 'No part selected'} with vendors: ${selectedVendorNames || 'None selected'}`);
  };

  const handleSendRFQ = () => {
    alert(`Sending RFQ to ${selectedVendors.length} selected vendors`);
  };

  const handleTriggerAIScan = async () => {
  setLoadingParts(true);
  setPartsError(null);
  try {
    const formData = new FormData();
    const docUrl = 'https://docs.google.com/document/d/1WToYMmFn2vryeMmphkAxq5cNu-bY0cN7owVwddtRUeU/edit';
    formData.append('doc_url', docUrl);
    console.log("Sending doc_url:", docUrl);
    const response = await fetch('http://127.0.0.1:8000/analyze/', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();
    console.log("API response:", data); // <-- Add this line
    setParts(data.actionablePartsList || []);
  } catch (err) {
    setPartsError(err.message || 'Unknown error');
    setParts([]);
  } finally {
    setLoadingParts(false);
  }
};

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Benchmark Agent</h1>
        <p className="text-gray-600">AI-powered supplier benchmarking and price analysis</p>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-blue-600">132</p>
            <p className="text-xs md:text-sm text-gray-600">In-House</p>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-orange-600">20</p>
            <p className="text-xs md:text-sm text-gray-600">Out of Panel</p>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-green-600">152</p>
            <p className="text-xs md:text-sm text-gray-600">Total Opportunities Found</p>
          </div>
          <div className="flex items-center justify-center">
            <Button 
              onClick={handleTriggerAIScan}
              className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
              disabled={loadingParts}
            >
              <Search className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{loadingParts ? 'Scanning...' : 'Trigger Manual AI Scan'}</span>
              <span className="sm:hidden">AI Scan</span>
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card className="p-4">
            <h3 className="font-semibold text-lg mb-4">Parts Above Average Market Index</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">Select</th>
                    <th className="text-left py-2 px-2">Part Number</th>
                    <th className="text-left py-2 px-2">Current Supplier</th>
                    <th className="text-left py-2 px-2">Current Price</th>
                    <th className="text-left py-2 px-2">% Above Index</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingParts ? (
                    <tr><td colSpan={5} className="py-8 text-center text-gray-500">Loading...</td></tr>
                  ) : partsError ? (
                    <tr><td colSpan={5} className="py-8 text-center text-red-500">{partsError}</td></tr>
                  ) : parts.length === 0 ? (
                    <tr><td colSpan={5} className="py-8 text-center text-gray-500">Data will be populated by external service</td></tr>
                  ) : (
                    parts.map((part, idx) => (
                      <tr key={idx}>
                        <td>{part.Select}</td>
                        <td>{part["Part Number"]}</td>
                        <td>{part["Current Supplier"]}</td>
                        <td>{part["Current Price"]}</td>
                        <td>{part["% Above Index"]}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
          <ApiOutputPlaceholder title="Parts Above Average Market Index" />
        </div>

        <div>
          <Card className="p-4">
            <h3 className="font-semibold text-lg mb-4">Parts with Potential Alternative Suppliers</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">Select</th>
                    <th className="text-left py-2 px-2">Part Name</th>
                    <th className="text-left py-2 px-2">Material</th>
                    <th className="text-left py-2 px-2">Current Supplier</th>
                    <th className="text-left py-2 px-2">Alternatives</th>
                    <th className="text-left py-2 px-2">Websites</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-8 text-center text-gray-500" colSpan={6}>
                      Data will be populated by external service
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
          <ApiOutputPlaceholder title="Parts with Potential Alternative Suppliers" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="customPart" className="text-sm font-medium">Enter any Custom Part</Label>
          <Input
            id="customPart"
            type="text"
            placeholder="Enter part number..."
            value={customPart}
            onChange={(e) => setCustomPart(e.target.value)}
            className="w-64"
          />
        </div>
        <Button 
          onClick={handleStartBenchmark}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-2 mt-6"
        >
          Start Benchmark
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Potential Vendors</h3>
            <Button 
              onClick={handleGenerateRFQ}
              className="bg-green-600 hover:bg-green-700"
              size="sm"
            >
              Generate RFI/RFQ
            </Button>
          </div>
          <div className="space-y-3">
            <div className="text-sm text-gray-600 mb-3">
              Potential suppliers for part: <span className="font-medium text-blue-600">{customPart.trim() || selectedPart || 'ABC123'}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">Select</th>
                    <th className="text-left py-2 px-2">Vendor Name</th>
                    <th className="text-left py-2 px-2">Location</th>
                    <th className="text-left py-2 px-2">Quote Price</th>
                    <th className="text-left py-2 px-2">Lead Time</th>
                    <th className="text-left py-2 px-2">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {potentialVendors.map((vendor, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-2">
                        <Checkbox
                          checked={selectedVendors.includes(vendor.id)}
                          onCheckedChange={(checked) => handleVendorSelect(vendor.id, checked as boolean)}
                        />
                      </td>
                      <td className="py-2 px-2 font-medium">{vendor.vendorName}</td>
                      <td className="py-2 px-2">{vendor.location}</td>
                      <td className="py-2 px-2 text-green-600 font-medium">{vendor.price}</td>
                      <td className="py-2 px-2">{vendor.leadTime}</td>
                      <td className="py-2 px-2">
                        <Badge variant="secondary">{vendor.rating}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {selectedVendors.length > 0 && (
              <div className="mt-3 p-2 bg-green-50 rounded text-sm text-green-700">
                Selected vendors: {selectedVendors.length}
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-4">RFQ</h3>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Request for Quote for Part {customPart.trim() || selectedPart || 'ABC123'}</h4>
              <p className="text-sm text-gray-600 mb-3">
                Dear Supplier,<br/>
                We are seeking a quote for the part {customPart.trim() || selectedPart || 'ABC123'}.<br/>
                Please provide your pricing and lead time information.
              </p>
              <div className="text-sm">
                <p><strong>Details</strong></p>
                <p>Part: {customPart.trim() || selectedPart || 'ABC123'}</p>
                <p>Description: Widget Component</p>
                <p>Quantity: 1000 units</p>
              </div>
            </div>
            <Button 
              onClick={handleSendRFQ}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Send RFQ to Selected Vendors ({selectedVendors.length})
            </Button>
          </div>
        </Card>
      </div>

      <SummaryKeyInsights />
    </div>
  );
};

export default BenchmarkPage;