'use client';

import { useState } from 'react';

const SUGGESTED_PROMPTS = [
  'How do I find peace when life feels overwhelming?',
  'Reflect on finding strength in times of quiet waiting.',
  'A biblical meditation on forgiveness and second chances.',
  'How can I trust God during unexpected life changes?',
];

export default function FaithAssistant() {
  const [prompt, setPrompt] = useState('');
  const [reflection, setReflection] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate reflection');
      }

      setReflection(data.text);
    } catch (err: any) {
      console.error(err);
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
    <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#2C221E]/10 shadow-sm relative overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#D99B26]/15 text-[#D99B26] border border-[#D99B26]/30">
          AI Reflection Companion
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E] mt-3 mb-2">
          Faith & Reflection Assistant
        </h2>
        <p className="text-[#2C221E]/70 text-sm font-light leading-relaxed">
          Share a prayer topic, scripture verse, or question to receive a biblically grounded meditation.
        </p>
      </div>

      {/* Suggested Prompts */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-[#2C221E]/60 uppercase tracking-wider mb-2 text-center">
          Suggested Reflection Topics
        </label>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {SUGGESTED_PROMPTS.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setPrompt(chip)}
              className="px-3.5 py-1.5 rounded-xl text-xs bg-[#FAF6F0] hover:bg-[#A83226]/10 text-[#2C221E] hover:text-[#A83226] border border-[#2C221E]/10 transition-all text-left font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A83226]"
            >
              ✨ {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="faith-prompt" className="sr-only">Reflection Prompt</label>
          <textarea
            id="faith-prompt"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your reflection prompt or spiritual question here..."
            className="w-full rounded-2xl bg-[#FAF6F0] border border-[#2C221E]/15 focus:border-[#A83226] focus:ring-2 focus:ring-[#A83226]/20 text-[#2C221E] p-4 text-sm placeholder:text-[#2C221E]/40 focus:outline-none transition-all resize-none shadow-inner"
            required
            aria-required="true"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-[#2C221E]/50">
            GodDome AI Engine
          </span>

          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="px-6 py-3 rounded-xl font-bold text-sm bg-[#A83226] hover:bg-[#8f2a20] text-[#FAF6F0] shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A83226]"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-[#FAF6F0]"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Generating Reflection...</span>
              </>
            ) : (
              <>
                <span>Generate Reflection</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Styled Helper Error Banner */}
      {error && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl flex items-center gap-2" role="alert">
          <span aria-hidden="true">🙏</span>
          <span>{error}</span>
        </div>
      )}

      {/* Generated Reflection Output */}
      {reflection && (
        <div className="mt-8 p-6 rounded-2xl bg-[#FAF6F0] border border-[#D99B26]/30 relative animate-fade-in">
          <div className="flex items-center justify-between mb-4 border-b border-[#2C221E]/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D99B26]" />
              <span className="text-xs font-bold text-[#D99B26] uppercase tracking-wider">
                Spiritual Reflection
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="text-xs font-medium text-[#2C221E]/70 hover:text-[#A83226] transition-colors flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#2C221E]/10 cursor-pointer"
            >
              {copied ? (
                <span className="text-emerald-600 font-semibold">Copied!</span>
              ) : (
                <span>Copy Text</span>
              )}
            </button>
          </div>

          <div className="prose max-w-none text-[#2C221E] text-sm sm:text-base leading-relaxed font-serif whitespace-pre-wrap">
            {reflection}
          </div>
        </div>
      )}
    </div>
  );
}
