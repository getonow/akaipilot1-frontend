import React, { useState } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Search } from 'lucide-react';

const BenchmarkPage: React.FC = () => {
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [vendorResponse, setVendorResponse] = useState<string>('');
  const [isSearchingVendors, setIsSearchingVendors] = useState<boolean>(false);

  const handleTriggerAIScan = async () => {
    setIsScanning(true);
    setAiResponse(''); // Clear previous output

    try {
      // Hardcoded Google Doc URL
      const docUrl = 'https://docs.google.com/document/d/1WToYMmFn2vryeMmphkAxq5cNu-bY0cN7owVwddtRUeU/edit';

      // Call your backend API
      const response = await axios.post(
        'http://localhost:8000/analyze/', // Change to your backend URL if different
        new URLSearchParams({ doc_url: docUrl }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      // Format the JSON response for display
      setAiResponse(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setAiResponse('Error fetching AI scan results.\n' + (error?.response?.data?.error || error.message));
    } finally {
      setIsScanning(false);
    }
  };

  const handleTriggerVendorSearch = async () => {
    setIsSearchingVendors(true);
    setVendorResponse(''); // Clear previous output

    try {
      // Call our Benchmark2 AI Agent API
      const response = await axios.post('http://127.0.0.1:8000/run-benchmark');
      
      // Format the response for display
      const data = response.data;
      let formattedResponse = `AI Vendor Search Results - Generated at ${new Date().toLocaleTimeString()}\n\n`;
      
      if (data.status === 'success') {
        formattedResponse += `✅ ${data.message}\n\n`;
        
        if (data.data && Array.isArray(data.data)) {
          formattedResponse += `📊 Analysis Summary:\n`;
          formattedResponse += `- ${data.data.length} opportunity parts analyzed\n`;
          
          let totalSuppliers = 0;
          data.data.forEach((item: any) => {
            if (item.alternative_suppliers && Array.isArray(item.alternative_suppliers)) {
              totalSuppliers += item.alternative_suppliers.length;
            }
          });
          
          formattedResponse += `- ${totalSuppliers} potential alternative suppliers found\n\n`;
          
          formattedResponse += `🔍 Detailed Results:\n`;
          formattedResponse += `==========================================\n\n`;
          
          data.data.forEach((item: any, index: number) => {
            formattedResponse += `${index + 1}. Part: ${item.partname}\n`;
            formattedResponse += `   Material: ${item.material}\n`;
            formattedResponse += `   Current Supplier: ${item.current_supplier}\n`;
            
            if (item.alternative_suppliers && item.alternative_suppliers.length > 0) {
              formattedResponse += `   Alternative Suppliers:\n`;
              item.alternative_suppliers.forEach((supplier: any, supplierIndex: number) => {
                formattedResponse += `     ${supplierIndex + 1}. ${supplier.name}\n`;
                if (supplier.url) {
                  formattedResponse += `        URL: ${supplier.url}\n`;
                }
              });
            } else {
              formattedResponse += `   Alternative Suppliers: No alternative suppliers found\n`;
            }
            formattedResponse += `\n`;
          });
        }
      } else {
        formattedResponse += `❌ Error: ${data.message || 'Unknown error occurred'}\n`;
      }
      
      setVendorResponse(formattedResponse);
    } catch (error: any) {
      setVendorResponse(`Error fetching vendor search results.\n${error?.response?.data?.detail || error.message}`);
    } finally {
      setIsSearchingVendors(false);
    }
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