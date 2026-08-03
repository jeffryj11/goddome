'use client';

import { useState } from 'react';
import { useAudio } from '@/context/AudioContext';

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

  const { playTrack, currentTrack, isPlaying } = useAudio();

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
      console.error('Faith Assistant Client Catch:', err);
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

  const handleListen = () => {
    if (!reflection) return;
    playTrack({
      id: `reflection_${prompt.slice(0, 20)}`,
      title: prompt.length > 35 ? `${prompt.slice(0, 35)}...` : prompt || 'Spiritual Reflection',
      author: "Jeanna’ Mead",
      src: `/api/audio?text=${encodeURIComponent(reflection)}`,
    });
  };

  return (
    <div className="bg-[#0B132B]/90 text-[#FAF6F0] p-8 sm:p-12 rounded-3xl border border-[#D99B26]/30 shadow-xl relative overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#D99B26]/15 text-[#D99B26] border border-[#D99B26]/30">
          AI Reflection Companion
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-3 mb-2">
          Faith & Reflection Assistant
        </h2>
        <p className="text-[#FAF6F0]/80 text-sm font-light leading-relaxed">
          Share a prayer topic, scripture verse, or question to receive a biblically grounded meditation.
        </p>
      </div>

      {/* Suggested Prompts */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-[#D99B26] uppercase tracking-wider mb-2 text-center">
          Suggested Reflection Topics
        </label>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {SUGGESTED_PROMPTS.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setPrompt(chip)}
              className="px-3.5 py-1.5 rounded-xl text-xs bg-[#030712] hover:bg-[#D99B26]/20 text-[#FAF6F0] hover:text-[#D99B26] border border-[#D99B26]/20 transition-all text-left font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99B26]"
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
            className="w-full rounded-2xl bg-[#030712] border border-[#D99B26]/30 focus:border-[#D99B26] focus:ring-2 focus:ring-[#D99B26]/20 text-white p-4 text-sm placeholder:text-[#FAF6F0]/40 focus:outline-none transition-all resize-none shadow-inner font-serif"
            required
            aria-required="true"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-[#FAF6F0]/50">
            GodDome AI Engine
          </span>

          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="px-6 py-3 rounded-xl font-bold text-sm bg-[#D99B26] hover:bg-[#c28a21] text-[#030712] shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99B26]"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-[#030712]"
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

      {/* Exposed Error Banner */}
      {error && (
        <div className="mt-6 p-4 bg-amber-950/80 border border-amber-500/40 text-amber-200 text-xs rounded-xl flex items-start gap-2.5" role="alert">
          <span aria-hidden="true" className="text-base">🙏</span>
          <div className="flex-1">
            <p className="font-semibold mb-0.5">Faith Assistant Notice</p>
            <p className="font-mono text-[11px] break-words">{error}</p>
          </div>
        </div>
      )}

      {/* Generated Reflection Output Card */}
      {reflection && (
        <div className="mt-8 p-6 rounded-2xl bg-[#030712] border border-[#D99B26]/40 relative animate-fade-in">
          <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D99B26]" />
              <span className="text-xs font-bold text-[#D99B26] uppercase tracking-wider">
                Spiritual Meditation
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Listen (Audio Icon) Button right beside Copy Text */}
              <button
                onClick={handleListen}
                className="text-xs font-bold text-[#D99B26] hover:text-[#F3E5AB] transition-colors flex items-center gap-1.5 bg-[#0B132B] px-3 py-1.5 rounded-lg border border-[#D99B26]/30 cursor-pointer"
                title="Listen to Southern voice narration"
              >
                <span>🎙️ Listen</span>
              </button>

              <button
                onClick={handleCopy}
                className="text-xs font-medium text-[#FAF6F0]/80 hover:text-[#D99B26] transition-colors flex items-center gap-1.5 bg-[#0B132B] px-3 py-1.5 rounded-lg border border-[#D99B26]/20 cursor-pointer"
              >
                {copied ? (
                  <span className="text-emerald-400 font-semibold">✓ Copied!</span>
                ) : (
                  <span>Copy Text</span>
                )}
              </button>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-[#FAF6F0] text-sm sm:text-base leading-relaxed font-serif whitespace-pre-wrap">
            {reflection}
          </div>
        </div>
      )}
    </div>
  );
}
