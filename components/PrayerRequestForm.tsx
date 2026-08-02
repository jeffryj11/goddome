'use client';

import { useState } from 'react';

export default function PrayerRequestForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [requestText, setRequestText] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/prayer-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          request: requestText,
          isPrivate,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setRequestText('');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="bg-white border border-[#2C221E]/10 rounded-3xl p-8 sm:p-12 shadow-sm my-12 relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center">
        <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#D99B26]/15 text-[#D99B26] tracking-wider uppercase inline-block mb-3">
          Quiet Sanctuary & Prayer
        </span>

        <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#2C221E] mb-3 leading-tight">
          Request Prayer & Grace
        </h3>

        <p className="text-[#2C221E]/75 text-sm sm:text-base font-light mb-8 max-w-lg mx-auto">
          Whatever burden, joy, or quiet prayer is on your heart today, feel free to leave it here. Jeanna’ and the GodDome ministry hold each request in prayer.
        </p>

        {status === 'success' ? (
          <div className="bg-[#FAF6F0] border border-[#D99B26] rounded-2xl p-8 text-center animate-fade-in" role="status">
            <div className="w-12 h-12 bg-[#D99B26]/20 text-[#D99B26] rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#2C221E] mb-2">
              Prayer Received
            </h4>
            <p className="text-sm text-[#2C221E]/80 font-light max-w-md mx-auto">
              Your prayer request has been received with love and care. We are holding you in prayer today.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 text-xs font-semibold text-[#A83226] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A83226]"
            >
              Submit another prayer request →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="text-left space-y-4 max-w-lg mx-auto" aria-label="Prayer Request Form">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="prayer-name" className="block text-xs font-semibold text-[#2C221E]/70 mb-1">
                  Your Name (optional)
                </label>
                <input
                  id="prayer-name"
                  type="text"
                  placeholder="e.g. Sarah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF6F0] border border-[#2C221E]/15 rounded-xl text-[#2C221E] text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A83226] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="prayer-email" className="block text-xs font-semibold text-[#2C221E]/70 mb-1">
                  Email Address (optional)
                </label>
                <input
                  id="prayer-email"
                  type="email"
                  placeholder="For a personal note back"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF6F0] border border-[#2C221E]/15 rounded-xl text-[#2C221E] text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A83226] transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="prayer-details" className="block text-xs font-semibold text-[#2C221E]/70 mb-1">
                Prayer Request / Reflection *
              </label>
              <textarea
                id="prayer-details"
                required
                aria-required="true"
                rows={4}
                placeholder="Share what is on your heart..."
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF6F0] border border-[#2C221E]/15 rounded-xl text-[#2C221E] text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A83226] transition-colors resize-none"
              />
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="privateCheck"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="w-4 h-4 accent-[#A83226] rounded cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A83226]"
              />
              <label htmlFor="privateCheck" className="text-xs text-[#2C221E]/70 cursor-pointer select-none">
                Keep this request private (shared only with Jeanna’)
              </label>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 bg-[#A83226] hover:bg-[#8f2a20] text-[#FAF6F0] font-semibold text-sm rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50 mt-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A83226]"
            >
              {status === 'loading' ? 'Submitting Prayer Request...' : 'Send Prayer Request 🙏'}
            </button>

            {status === 'error' && (
              <p className="text-xs text-[#A83226] font-semibold text-center mt-2" role="alert">
                {errorMessage}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
