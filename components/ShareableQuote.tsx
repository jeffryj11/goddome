'use client';

import { useState } from 'react';

interface ShareableQuoteProps {
  quote: string;
  author?: string;
  storyTitle?: string;
}

export default function ShareableQuote({
  quote,
  author = "Jeanna’ Mead",
  storyTitle,
}: ShareableQuoteProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `"${quote}" — ${author}${storyTitle ? ` (${storyTitle})` : ''} via https://goddome.org`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://goddome.org')}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: storyTitle || 'GodDome Devotional',
        text: `"${quote}" — ${author}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="my-10 bg-gradient-to-r from-[#FAF6F0] via-white to-[#FAF6F0] border-l-4 border-[#D99B26] rounded-r-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden group">
      {/* Background Decorative Quote Watermark */}
      <span className="absolute -top-4 right-4 text-7xl font-serif text-[#D99B26]/10 select-none pointer-events-none">
        “
      </span>

      <blockquote className="font-serif text-xl sm:text-2xl font-medium text-[#2C221E] italic leading-relaxed mb-4 relative z-10">
        "{quote}"
      </blockquote>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-[#2C221E]/10 relative z-10">
        <cite className="not-italic text-xs font-bold uppercase tracking-wider text-[#A83226]">
          — {author}
        </cite>

        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <button
            onClick={handleNativeShare}
            className="px-3 py-1.5 rounded-full bg-[#2C221E]/5 hover:bg-[#2C221E]/10 text-[#2C221E] transition-colors cursor-pointer inline-flex items-center gap-1.5"
            title="Share Quote"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/>
            </svg>
            Share
          </button>

          <button
            onClick={handleTwitterShare}
            className="px-3 py-1.5 rounded-full bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] transition-colors cursor-pointer"
            title="Share on X / Twitter"
          >
            X / Tweet
          </button>

          <button
            onClick={handleFacebookShare}
            className="px-3 py-1.5 rounded-full bg-[#4267B2]/10 hover:bg-[#4267B2]/20 text-[#4267B2] transition-colors cursor-pointer"
            title="Share on Facebook"
          >
            Facebook
          </button>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-full bg-[#D99B26]/15 hover:bg-[#D99B26]/25 text-[#2C221E] transition-colors cursor-pointer"
            title="Copy Quote to Clipboard"
          >
            {copied ? '✓ Copied!' : 'Copy Text'}
          </button>
        </div>
      </div>
    </div>
  );
}
