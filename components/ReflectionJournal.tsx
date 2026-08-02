'use client';

import { useState, useEffect } from 'react';

interface ReflectionJournalProps {
  storyId?: string;
  storySlug?: string;
  storyTitle?: string;
}

export default function ReflectionJournal({ storyId, storySlug, storyTitle }: ReflectionJournalProps) {
  const id = storyId || storySlug || 'default';
  const [note, setNote] = useState('');
  const [savedTime, setSavedTime] = useState<string | null>(null);

  const storageKey = `goddome_reflection_${id}`;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedNote = localStorage.getItem(storageKey);
      if (savedNote) {
        setNote(savedNote);
      }
      const time = localStorage.getItem(`${storageKey}_time`);
      if (time) {
        setSavedTime(time);
      }
    }
  }, [storageKey]);

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, note);
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      localStorage.setItem(`${storageKey}_time`, now);
      setSavedTime(now);
    }
  };

  const handleClear = () => {
    if (typeof window !== 'undefined') {
      if (confirm('Are you sure you want to clear your reflection note for this devotional?')) {
        localStorage.removeItem(storageKey);
        localStorage.removeItem(`${storageKey}_time`);
        setNote('');
        setSavedTime(null);
      }
    }
  };

  return (
    <section className="my-12 bg-white border border-[#2C221E]/10 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#D99B26]/15 text-[#D99B26] flex items-center justify-center shadow-xs">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#2C221E] flex items-center gap-2">
              Quiet Reflection Journal
            </h3>
            {storyTitle && (
              <p className="text-xs text-[#2C221E]/60 font-light">
                Reflecting on "{storyTitle}"
              </p>
            )}
          </div>
        </div>

        <span className="text-[11px] font-semibold text-[#D99B26] bg-[#D99B26]/10 px-3 py-1 rounded-full border border-[#D99B26]/20">
          🔒 100% Private (Saved on your device)
        </span>
      </div>

      <p className="text-xs text-[#2C221E]/70 mb-4 leading-relaxed font-light">
        Take a quiet moment to pause. What message or Scripture stood out to you today? Write down your thoughts, prayers, or commitments below.
      </p>

      <label htmlFor="reflection-textarea" className="sr-only">Personal Reflection Input</label>
      <textarea
        id="reflection-textarea"
        rows={4}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="What did God whisper to your heart while reading this story? Record your reflection here..."
        className="w-full p-4 bg-[#FAF6F0] border border-[#2C221E]/15 rounded-2xl text-[#2C221E] text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D99B26] transition-colors resize-none font-serif leading-relaxed mb-4 shadow-inner"
        aria-label="Personal Reflection Input"
      />

      <div className="flex items-center justify-between text-xs">
        <span className="text-[#2C221E]/60 italic font-light">
          {savedTime ? `✓ Saved locally at ${savedTime}` : 'Private & saved in your browser'}
        </span>

        <div className="flex items-center space-x-3">
          {note && (
            <button
              type="button"
              onClick={handleClear}
              className="text-[#2C221E]/50 hover:text-[#A83226] font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A83226]"
            >
              Clear Note
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#D99B26] hover:bg-[#c28a21] text-[#2C221E] font-bold text-xs rounded-full shadow-xs transition-all transform hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99B26]"
          >
            Save Reflection
          </button>
        </div>
      </div>
    </section>
  );
}
