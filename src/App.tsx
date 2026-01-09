import { useState } from 'react';
import { NotebookPen, Sparkles, ArrowRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navbar */}
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-8">
          
          {/* Step 1: File Upload */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Upload Transcript</h2>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
              <FileUploader 
                onTranscriptLoad={setTranscript} 
                transcript={transcript}
              />
            </div>
          </div>

          {/* Step 2: Prompt Configuration */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-lg">
                  <span className="text-indigo-600 font-bold text-sm">2</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Customize Prompt</h2>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
              <PromptInput 
                prompt={prompt} 
                onPromptChange={setPrompt}
              />
            </div>
          </div>

          {/* Step 3: Generate Summary */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
                  <span className="text-purple-600 font-bold text-sm">3</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Generate AI Summary</h2>
                <Sparkles className="w-5 h-5 text-purple-500" />
              </div>
              <SummaryGenerator
                transcript={transcript}
                prompt={prompt}
                onSummaryGenerated={setSummary}
              />
            </div>
          </div>

          {/* Enhanced Summary Display */}
          {summary && (
            <>
              {/* Step 4: Edit Summary */}
              <div className="group relative animate-in slide-in-from-bottom-4 duration-500">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-8 h-8 bg-emerald-100 rounded-lg">
                      <span className="text-emerald-600 font-bold text-sm">4</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Review & Edit</h2>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <SummaryEditor 
                    summary={summary} 
                    onSummaryChange={setSummary}
                  />
                </div>
              </div>

              {/* Step 5: Share Summary */}
              <div className="group relative animate-in slide-in-from-bottom-4 duration-700">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-lg">
                      <span className="text-orange-600 font-bold text-sm">5</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Share Summary</h2>
                    <div className="flex-1"></div>
                    <div className="px-3 py-1 bg-green-100 rounded-full">
                      <span className="text-green-700 text-sm font-medium">Ready to Share</span>
                    </div>
                  </div>
                  <EmailSharer summary={summary} />
                </div>
              </div>
            </>
          )}

          {/* Progress Indicator */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    step <= 3 || (step === 4 && summary) || (step === 5 && summary)
                      ? 'bg-blue-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="relative mt-20 py-12 border-t border-gray-200/60">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-slate-50"></div>
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <NotebookPen className="text-white" size={16} />
              </div>
              <span className="text-gray-600 font-medium">AI Meeting Summarizer</span>
            </div>
            <div>
              <p className="text-gray-500 text-sm">
                Built with ❤️. Powered by AI.
              </p>
              <p className="text-gray-400 text-xs mt-2">
                &copy; {new Date().getFullYear()} AI Meeting Summarizer. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
