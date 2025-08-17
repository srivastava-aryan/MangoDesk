import React, { useState } from 'react';
import { Send, Loader2, Plus, X } from 'lucide-react';

interface EmailSharerProps {
  summary: string;
}

export const EmailSharer: React.FC<EmailSharerProps> = ({ summary }) => {
  const [recipients, setRecipients] = useState<string[]>(['']);
  const [subject, setSubject] = useState('Meeting Summary');
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const addRecipient = () => {
    setRecipients([...recipients, '']);
  };

  const removeRecipient = (index: number) => {
    if (recipients.length > 1) {
      setRecipients(recipients.filter((_, i) => i !== index));
    }
  };

  const updateRecipient = (index: number, value: string) => {
    const newRecipients = [...recipients];
    newRecipients[index] = value;
    setRecipients(newRecipients);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const shareSummary = async () => {
    const validRecipients = recipients.filter(r => r.trim() && validateEmail(r.trim()));
    
    if (validRecipients.length === 0) {
      setMessage({ type: 'error', text: 'Please enter at least one valid email address' });
      return;
    }

    if (!summary.trim()) {
      setMessage({ type: 'error', text: 'No summary to share' });
      return;
    }

    setIsSending(true);
    setMessage(null);

    try {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: validRecipients.join(','),
          subject,
          text: summary,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      setMessage({
        type: 'success',
        text: `Summary shared with ${validRecipients.length} recipient(s)`
      });
      setRecipients(['']);
      setSubject('Meeting Summary');
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to send email' });
    } finally {
      setIsSending(false);
    }
  };

  if (!summary) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">5. Share Summary</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipients
          </label>
          {recipients.map((recipient, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="email"
                value={recipient}
                onChange={(e) => updateRecipient(index, e.target.value)}
                placeholder="Enter email address"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {recipients.length > 1 && (
                <button
                  onClick={() => removeRecipient(index)}
                  className="px-2 py-2 text-red-600 hover:text-red-800"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addRecipient}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
          >
            <Plus size={16} />
            Add recipient
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preview
          </label>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-md text-sm max-h-32 overflow-y-auto">
            <div className="font-medium mb-2">Subject: {subject}</div>
            <div className="whitespace-pre-wrap">{summary}</div>
          </div>
        </div>

        <button
          onClick={shareSummary}
          disabled={isSending || !summary.trim()}
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSending ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={20} />
              Share Summary
            </>
          )}
        </button>

        {message && (
          <div className={`p-3 rounded-md ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`text-sm ${
              message.type === 'success' ? 'text-green-700' : 'text-red-700'
            }`}>
              {message.text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};