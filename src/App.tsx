import React, { useState, useEffect } from 'react';
import { FileText, Brain } from 'lucide-react';
import { FileUploader } from './components/FileUploader';
import { PromptInput } from './components/PromptInput';
import { SummaryGenerator } from './components/SummaryGenerator';
import { SummaryEditor } from './components/SummaryEditor';
import { EmailSharer } from './components/EmailSharer';

function App() {
  const [transcript, setTranscript] = useState('');
  const [prompt, setPrompt] = useState('Summarize the key points and action items from this meeting transcript in a clear and organized format.');
  const [summary, setSummary] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <FileText className="text-blue-600" size={28} />
              <Brain className="text-green-600" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                AI Meeting Summarizer
              </h1>
              <p className="text-gray-600 text-sm">
                Upload transcripts, get AI-powered summaries using free models, and share with your team
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <FileUploader 
              onTranscriptLoad={setTranscript} 
              transcript={transcript}
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <PromptInput 
              prompt={prompt} 
              onPromptChange={setPrompt}
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <SummaryGenerator
              transcript={transcript}
              prompt={prompt}
              onSummaryGenerated={setSummary}
            />
          </div>

          {summary && (
            <>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <SummaryEditor 
                  summary={summary} 
                  onSummaryChange={setSummary}
                />
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <EmailSharer summary={summary} />
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="mt-16 py-8 border-t bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>AI-Powered Meeting Notes Summarizer - Built with React, TypeScript, and OpenRouter</p>
        </div>
      </footer>
    </div>
  );
}

export default App;