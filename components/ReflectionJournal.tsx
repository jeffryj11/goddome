"use client";

import React, { useState, useEffect } from "react";

interface ReflectionJournalProps {
  storySlug?: string;
  storyId?: string;
  storyTitle?: string;
}

export default function ReflectionJournal({
  storySlug,
  storyId,
  storyTitle = "this story",
}: ReflectionJournalProps) {
  const id = storySlug || storyId || "default";
  const storageKey = `goddome_reflection_${id}`;
  const [reflection, setReflection] = useState<string>("");
  const [saved, setSaved] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Load existing entry from localStorage on mount or slug change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedNote = localStorage.getItem(storageKey);
      if (savedNote) {
        setReflection(savedNote);
      } else {
        setReflection("");
      }
    }
  }, [storageKey]);

  // Handle saving to localStorage
  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, reflection);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  // Handle clearing the saved note
  const handleClear = () => {
    if (typeof window !== "undefined") {
      if (confirm('Are you sure you want to clear your reflection note for this devotional?')) {
        localStorage.removeItem(storageKey);
        setReflection("");
      }
    }
  };

  // Copy entry to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(reflection);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="mt-12 p-6 md:p-8 bg-amber-50/60 border border-amber-200/80 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-serif font-semibold text-slate-900 flex items-center gap-2">
            <span>✍️</span> Private Reflection Journal
          </h3>
          <p className="text-xs text-amber-800/80 mt-1">
            🔒 <strong>100% Private:</strong> Your notes are saved only in your browser and never sent to our servers.
          </p>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="reflection-textarea" className="block text-sm font-medium text-slate-700 mb-2">
          How is God speaking to you through <span className="italic font-serif">"{storyTitle}"</span>?
        </label>
        <textarea
          id="reflection-textarea"
          rows={5}
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Write your prayers, reflections, or action steps here..."
          className="w-full p-4 rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/90 text-slate-800 text-sm placeholder-slate-400 focus:outline-none transition font-serif leading-relaxed"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-medium rounded-xl transition shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 cursor-pointer"
          >
            {saved ? "✓ Saved to Device" : "Save Note"}
          </button>
          
          {reflection && (
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 bg-white border border-amber-200 hover:bg-amber-100/50 text-slate-700 text-xs font-medium rounded-xl transition cursor-pointer"
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          )}
        </div>

        {reflection && (
          <button
            onClick={handleClear}
            className="text-xs text-slate-400 hover:text-red-600 transition underline cursor-pointer"
          >
            Clear note
          </button>
        )}
      </div>
    </section>
  );
}
