import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mail, FileText } from 'lucide-react';

const SummaryKeyInsights: React.FC = () => {
  const summaryContent = `Total Opportunities Found: 134

Criteria: All parts are priced above the current market index.

Suppliers Most Frequently Flagged:
• PolyTech Plastics Ltd. (many extreme outliers)
• AutoPlast UK Ltd.
• Carpathian Polymers SRL
• GlobalMold Components BV
• EuroTech Plastics AG

Range of Overpricing:
• Lowest: 0% above market (PA-10122)
• Most Common: 3–29% above market
• Extreme Outliers: Up to 108,044,277% above market

Highest Opportunity:
Example: PA-10046, PolyTech Plastics Ltd., €1,322,463,177 (108,044,277% above market index)`;

  const handleSendEmail = () => {
    alert('Email functionality will be integrated with external service');
  };

  const handleExportPDF = () => {
    alert('PDF export functionality will be integrated with external service');
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Summary & Key Insights</h3>
        <div className="flex gap-2">
          <Button 
            onClick={handleSendEmail}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Send Email
          </Button>
          <Button 
            onClick={handleExportPDF}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Export PDF
          </Button>
        </div>
      </div>
      <Textarea
        value={summaryContent}
        readOnly
        className="min-h-[300px] font-mono text-sm resize-none"
        placeholder="Summary and insights will appear here..."
      />
    </Card>
  );
};

export default SummaryKeyInsights;