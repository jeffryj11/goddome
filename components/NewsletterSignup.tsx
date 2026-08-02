'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setEmail('');
        setName('');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#2C221E] to-[#42342E] text-[#FAF6F0] rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden my-12 border border-[#D99B26]/20">
      {/* Decorative Background Accent Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#D99B26]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#A83226]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D99B26]/20 text-[#D99B26] mb-4">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </div>

        <h3 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#FAF6F0] mb-3">
          Stay Connected with GodDome
        </h3>
        
        <p className="text-[#FAF6F0]/80 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-lg mx-auto">
          Receive quiet words of faith, new devotional stories by Jeanna’ Mead, and encouraging reflections delivered straight to your inbox.
        </p>

        {status === 'success' ? (
          <div className="bg-[#D99B26]/20 border border-[#D99B26] rounded-2xl p-6 text-center animate-fade-in" role="status">
            <h4 className="font-serif text-xl font-bold text-[#D99B26] mb-1">
              You’re Subscribed!
            </h4>
            <p className="text-sm text-[#FAF6F0]/90 font-light">
              Thank you for resting a while with us. Look out for our next devotional update in your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" aria-label="Newsletter Subscription Form">
            <label htmlFor="newsletter-name" className="sr-only">First Name (optional)</label>
            <input
              id="newsletter-name"
              type="text"
              placeholder="First Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3.5 bg-white/10 border border-[#FAF6F0]/20 rounded-xl sm:rounded-full text-[#FAF6F0] placeholder-[#FAF6F0]/50 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D99B26] transition-colors w-full sm:w-1/3"
            />

            <label htmlFor="newsletter-email" className="sr-only">Your Email Address (required)</label>
            <input
              id="newsletter-email"
              type="email"
              required
              aria-required="true"
              placeholder="Your Email Address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-5 py-3.5 bg-white/10 border border-[#FAF6F0]/20 rounded-xl sm:rounded-full text-[#FAF6F0] placeholder-[#FAF6F0]/50 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D99B26] transition-colors w-full sm:w-2/3"
            />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-7 py-3.5 bg-[#D99B26] hover:bg-[#c28a21] text-[#2C221E] font-semibold text-sm rounded-xl sm:rounded-full transition-all duration-200 transform hover:-translate-y-0.5 shadow-md cursor-pointer whitespace-nowrap disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99B26]"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-xs text-[#A83226] mt-3 font-semibold" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
