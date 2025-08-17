import React, { useCallback, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface FileUploaderProps {
  onTranscriptLoad: (content: string) => void;
  transcript: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onTranscriptLoad, transcript }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const handleFile = useCallback((file: File) => {
    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onTranscriptLoad(content);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a .txt file');
    }
  }, [onTranscriptLoad]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const clearTranscript = () => {
    onTranscriptLoad('');
    setFileName('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">1. Upload Transcript</h2>
        {transcript && (
          <button
            onClick={clearTranscript}
            className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
          >
            <X size={16} />
            Clear
          </button>
        )}
      </div>

      {!transcript ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="mb-4">
            <p className="text-lg text-gray-600">
              Drop your transcript file here, or{' '}
              <label className="text-blue-600 cursor-pointer hover:text-blue-800">
                browse
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Supports .txt files only
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
            <FileText size={16} />
            <span>Loaded: {fileName || 'Manual input'}</span>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transcript Content (editable)
            </label>
            <textarea
              value={transcript}
              onChange={(e) => onTranscriptLoad(e.target.value)}
              className="w-full h-48 p-3 border border-gray-300 rounded-md font-mono text-sm resize-vertical focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Paste or edit your transcript here..."
            />
          </div>
        </div>
      )}
    </div>
  );
};