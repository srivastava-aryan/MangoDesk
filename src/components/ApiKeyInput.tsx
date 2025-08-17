import React, { useState } from 'react';
import { Eye, EyeOff, Key } from 'lucide-react';

interface ApiKeyInputProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, onApiKeyChange }) => {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Key size={16} className="text-blue-600" />
        <h3 className="font-medium text-blue-800">OpenRouter API Key Required</h3>
      </div>
      
      <p className="text-sm text-blue-700 mb-3">
        To use the AI summarization feature, please enter your OpenRouter API key. 
        Your key is stored locally and never sent to our servers.
      </p>
      
      <div className="relative">
        <input
          type={showKey ? 'text' : 'password'}
          value={apiKey}
          onChange={(e) => onApiKeyChange(e.target.value)}
          placeholder="sk-or-v1-..."
          className="w-full px-3 py-2 pr-10 border border-blue-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowKey(!showKey)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      
      <p className="text-xs text-blue-600 mt-2">
        Don't have an API key? Get one at{' '}
        <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="underline">
          openrouter.ai/keys
        </a>
        {' '}(Free models available!)
      </p>
    </div>
  );
};