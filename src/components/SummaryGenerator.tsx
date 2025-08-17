import React, { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';

interface SummaryGeneratorProps {
  transcript: string;
  prompt: string;
  onSummaryGenerated: (summary: string) => void;
}

export const SummaryGenerator: React.FC<SummaryGeneratorProps> = ({
  transcript,
  prompt,
  onSummaryGenerated,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>('');

  const generateSummary = async () => {
    if (!transcript.trim()) {
      setError('Please provide a transcript first');
      return;
    }

    if (!prompt.trim()) {
      setError('Please provide instructions for the AI');
      return;
    }


    setIsGenerating(true);
    setError('');

    try {
  const response = await fetch('http://localhost:3001/api/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.2-3b-instruct:free',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that summarizes meeting transcripts based on specific instructions.'
            },
            {
              role: 'user',
              content: `Instructions: ${prompt}\n\nTranscript to summarize:\n${transcript}`
            }
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to generate summary');
      }

      const data = await response.json();
      const summary = data.choices[0]?.message?.content || '';
      
      if (summary) {
        onSummaryGenerated(summary);
      } else {
        throw new Error('No summary generated');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">3. Generate Summary</h2>
      
      <button
        onClick={generateSummary}
  disabled={isGenerating || !transcript.trim() || !prompt.trim()}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isGenerating ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Generating Summary...
          </>
        ) : (
          <>
            <Wand2 size={20} />
            Generate Summary
          </>
        )}
      </button>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};