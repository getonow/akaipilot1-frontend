import React from 'react';
import { Card } from '@/components/ui/card';
import { ImageIcon } from 'lucide-react';

interface ApiOutputPlaceholderProps {
  title: string;
}

const ApiOutputPlaceholder: React.FC<ApiOutputPlaceholderProps> = ({ title }) => {
  return (
    <Card className="p-4 mt-4">
      <h4 className="font-medium mb-3 text-center md:text-left">{title} - API Output</h4>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500 text-sm mb-2">API Output Image Placeholder</p>
        <p className="text-xs text-gray-400">Chart or visualization will appear here</p>
      </div>
    </Card>
  );
};

export default ApiOutputPlaceholder;