import React from 'react';
import { Edit3 } from 'lucide-react';

interface SummaryEditorProps {
  summary: string;
  onSummaryChange: (summary: string) => void;
}

export const SummaryEditor: React.FC<SummaryEditorProps> = ({
  summary,
  onSummaryChange
}) => {
  if (!summary) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Edit3 size={18} />
        <h2 className="text-lg font-medium">4. Edit Summary</h2>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Generated Summary (editable)
        </label>
        <textarea
          value={summary}
          onChange={(e) => onSummaryChange(e.target.value)}
          className="w-full h-64 p-3 border border-gray-300 rounded-md font-mono text-sm resize-vertical focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Your AI-generated summary will appear here..."
        />
      </div>
    </div>
  );
};