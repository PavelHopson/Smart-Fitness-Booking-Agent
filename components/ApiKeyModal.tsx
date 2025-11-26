import React, { useState } from 'react';
import { Key } from 'lucide-react';

interface ApiKeyModalProps {
  onSubmit: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSubmit }) => {
  const [inputKey, setInputKey] = useState('');

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-4 text-emerald-400">
          <div className="p-3 bg-emerald-950/50 rounded-lg border border-emerald-900">
            <Key className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold">Authentication Required</h2>
        </div>
        
        <p className="text-gray-400 text-sm mb-6">
          To activate the <strong>Smart Fitness Agent</strong>, please enter your Gemini API Key. 
          This is a client-side demo; your key is stored in memory only.
        </p>

        <form onSubmit={(e) => { e.preventDefault(); if(inputKey) onSubmit(inputKey); }}>
          <input
            type="password"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="Enter AI_STUDIO_API_KEY"
            className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all mb-4 font-mono text-sm"
            autoFocus
          />
          <button
            type="submit"
            disabled={!inputKey}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Initialize System
          </button>
        </form>
        
        <div className="mt-4 text-center">
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">
                Get API Key from Google AI Studio
            </a>
        </div>
      </div>
    </div>
  );
};
