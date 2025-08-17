import React from 'react';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
}

const EXAMPLE_PROMPTS = [
  "Summarize in bullet points for executives",
  "Highlight only action items and deadlines",
  "Create a brief summary with key decisions made",
  "Extract main topics discussed and next steps",
  "Summarize for team members who missed the meeting"
];

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, onPromptChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">2. Customize Instructions</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          AI Instructions
        </label>
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your instructions for how the AI should summarize the transcript..."
        />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">Quick examples:</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((example, index) => (
            <button
              key={index}
              onClick={() => onPromptChange(example)}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};