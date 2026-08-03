'use client';

import { useState } from 'react';
import { ChristianCrossIcon, MenorahIcon } from './FaithIcons';

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

  const hashtags = "#writingmyheartout #jeannasoul #wordsforthesoul #myownwords";
  const shareText = `"${quote}" — ${author}${storyTitle ? ` (${storyTitle})` : ''} ${hashtags} via https://goddome.org`;

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
        text: `"${quote}" — ${author} ${hashtags}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="my-10 bg-gradient-to-r from-[#0B132B] via-[#030712] to-[#0B132B] border-l-4 border-[#D99B26] rounded-r-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden group text-[#FAF6F0]">
      {/* Background Decorative Quote Watermark */}
      <span className="absolute -top-4 right-4 text-7xl font-serif text-[#D99B26]/10 select-none pointer-events-none">
        “
      </span>

      <div className="flex items-center space-x-2 mb-3">
        <ChristianCrossIcon className="w-3.5 h-3.5 text-[#D99B26]" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#D99B26]">Featured Quote</span>
        <MenorahIcon className="w-3.5 h-3.5 text-[#D99B26]" />
      </div>

      <blockquote className="font-serif text-xl sm:text-2xl font-medium text-[#F3E5AB] italic leading-relaxed mb-4 relative z-10">
        "{quote}"
      </blockquote>

      {/* Hashtags section */}
      <p className="text-xs font-mono text-[#D99B26]/80 mb-4 tracking-wide">
        #writingmyheartout #jeannasoul #wordsforthesoul #myownwords
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-white/10 relative z-10">
        <cite className="not-italic text-xs font-bold uppercase tracking-wider text-[#D99B26]">
          — {author}
        </cite>

        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <button
            onClick={handleNativeShare}
            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF6F0] transition-colors cursor-pointer inline-flex items-center gap-1.5"
            title="Share Quote"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/>
            </svg>
            Share
          </button>

          <button
            onClick={handleTwitterShare}
            className="px-3 py-1.5 rounded-full bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 text-[#1DA1F2] transition-colors cursor-pointer"
            title="Share on X / Twitter"
          >
            X / Tweet
          </button>

          <button
            onClick={handleFacebookShare}
            className="px-3 py-1.5 rounded-full bg-[#4267B2]/20 hover:bg-[#4267B2]/30 text-[#4267B2] transition-colors cursor-pointer"
            title="Share on Facebook"
          >
            Facebook
          </button>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-full bg-[#D99B26] hover:bg-[#c28a21] text-[#030712] font-bold transition-colors cursor-pointer"
            title="Copy Quote & Hashtags to Clipboard"
          >
            {copied ? '✓ Copied!' : 'Copy Text'}
          </button>
        </div>
      </div>
    </div>
  );
}
