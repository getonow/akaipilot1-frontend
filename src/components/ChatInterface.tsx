import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatInterfaceProps {
  title: string;
  initialMessage?: string;
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  title, 
  initialMessage = "How can I help you today?",
  className = ""
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: initialMessage,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm analyzing your request and will provide insights shortly.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <Card className={`p-4 ${className}`}>
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`flex items-start space-x-2 ${
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}>
            {message.sender === 'ai' && (
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
            )}
            <div className={`max-w-xs px-3 py-2 rounded-lg ${
              message.sender === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-900'
            }`}>
              <p className="text-sm">{message.text}</p>
            </div>
            {message.sender === 'user' && (
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend} size="sm">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};

export default ChatInterface;