'use client';

import { useState, useEffect } from 'react';

const SUGGESTED_PROMPTS = [
  'How do I find peace when life feels overwhelming?',
  'Reflect on finding strength in times of quiet waiting.',
  'A biblical meditation on forgiveness and second chances.',
  'How can I trust God during unexpected life changes?',
];

interface FaithAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export default function FaithAssistantModal({
  isOpen,
  onClose,
  initialPrompt = '',
}: FaithAssistantModalProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [reflection, setReflection] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError(null);
    setReflection('');

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: `HTTP ${res.status} Error` }));
        throw new Error(data.error || `HTTP ${res.status}: Failed to generate reflection`);
      }

      if (!res.body) {
        throw new Error('Response body is empty.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          setReflection((prev) => prev + chunk);
        }
      }
    } catch (err: any) {
      console.error('Faith Assistant Modal Client Error:', err);
      setError(
        err.message || 'Unable to connect to Faith Assistant right now. Please try again in a few moments.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!reflection) return;
    navigator.clipboard.writeText(reflection);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="relative w-full max-w-2xl bg-[#FAF6F0] rounded-3xl shadow-2xl border border-[#D99B26]/30 max-h-[90vh] flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-[#2C221E] text-[#FAF6F0] flex items-center justify-between border-b border-[#D99B26]/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#D99B26]/20 text-[#D99B26] flex items-center justify-center">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#D99B26]">
                AI Reflection Companion
              </span>
              <h3 className="font-serif text-xl font-bold text-[#FAF6F0]">
                Faith & Reflection Assistant
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF6F0] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99B26]"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-grow space-y-6">
          {/* Suggested Prompts */}
          <div>
            <label className="block text-xs font-semibold text-[#2C221E]/60 uppercase tracking-wider mb-2">
              Suggested Topics
            </label>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(chip)}
                  className="px-3 py-1.5 rounded-xl text-xs bg-white hover:bg-[#A83226]/10 text-[#2C221E] hover:text-[#A83226] border border-[#2C221E]/10 transition-all text-left font-medium cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A83226]"
                >
                  ✨ {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="modal-prompt" className="sr-only">Reflection Prompt</label>
            <textarea
              id="modal-prompt"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Share a topic, prayer, or scripture verse..."
              className="w-full rounded-2xl bg-white border border-[#2C221E]/15 focus:border-[#A83226] focus:ring-2 focus:ring-[#A83226]/20 text-[#2C221E] p-4 text-sm focus:outline-none transition-all resize-none font-serif"
              required
              aria-required="true"
            />

            <div className="flex items-center justify-between">
              <span className="text-xs text-[#2C221E]/50">
                Biblically Grounded AI
              </span>

              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="px-6 py-3 rounded-xl font-bold text-sm bg-[#A83226] hover:bg-[#8f2a20] text-[#FAF6F0] shadow-md disabled:opacity-50 transition-all cursor-pointer flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A83226]"
              >
                {loading ? 'Reflecting...' : 'Generate Reflection ✨'}
              </button>
            </div>
          </form>

          {/* Exposed Error Banner */}
          {error && (
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl flex items-start gap-2.5" role="alert">
              <span aria-hidden="true" className="text-base">🙏</span>
              <div className="flex-1">
                <p className="font-semibold mb-0.5">Faith Assistant Notice</p>
                <p className="font-mono text-[11px] break-words">{error}</p>
              </div>
            </div>
          )}

          {/* Reflection */}
          {reflection && (
            <div className="p-6 rounded-2xl bg-white border border-[#D99B26]/30 animate-fade-in">
              <div className="flex items-center justify-between mb-3 border-b border-[#2C221E]/10 pb-2">
                <span className="text-xs font-bold text-[#D99B26] uppercase">
                  Spiritual Meditation
                </span>

                <button
                  onClick={handleCopy}
                  className="text-xs font-semibold text-[#2C221E]/70 hover:text-[#A83226] cursor-pointer"
                >
                  {copied ? '✓ Copied' : 'Copy Text'}
                </button>
              </div>

              <div className="prose max-w-none text-[#2C221E] text-sm leading-relaxed font-serif whitespace-pre-wrap">
                {reflection}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
