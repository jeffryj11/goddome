'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFaithAssistant } from './FaithAssistantContext';

export default function Navbar() {
  const pathname = usePathname();
  const paypalUrl = process.env.NEXT_PUBLIC_PAYPAL_DONATE_URL || 'https://www.paypal.com/ncp/payment/3L3XFTP7UATMJ';
  const { openAssistant } = useFaithAssistant();

  const isHome = pathname === '/';
  const isTopics = pathname.startsWith('/topics');
  const isPrayer = pathname === '/prayer';

  return (
    <nav className="sticky top-0 z-40 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#2C221E]/10 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* 1. Brand Logo & Title (Home: /) */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-[#D99B26]/30 shadow-sm transition-transform group-hover:scale-105">
            <img
              src="/images/logo.png"
              alt="GodDome Emblem"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-tight text-[#2C221E] flex items-center gap-1.5 group-hover:text-[#A83226] transition-colors">
              GodDome
            </span>
            <p className="text-[11px] text-[#2C221E]/60 font-light tracking-wide">
              Faithful Words by Jeanna’ Mead
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-[#2C221E]/80">
          {/* 1. Home */}
          <Link 
            href="/" 
            className={`transition-colors hover:text-[#A83226] ${isHome ? 'text-[#A83226] border-b-2 border-[#A83226] pb-1' : ''}`}
          >
            Home
          </Link>

          {/* 2. Devotionals */}
          <Link 
            href="/#stories" 
            className="transition-colors hover:text-[#A83226]"
          >
            Devotionals
          </Link>

          {/* 3. Topics */}
          <Link 
            href="/topics" 
            className={`transition-colors hover:text-[#A83226] ${isTopics ? 'text-[#A83226] border-b-2 border-[#A83226] pb-1' : ''}`}
          >
            Topics
          </Link>

          {/* 4. Prayer Requests */}
          <Link 
            href="/prayer" 
            className={`transition-colors hover:text-[#A83226] ${isPrayer ? 'text-[#A83226] border-b-2 border-[#A83226] pb-1' : ''}`}
          >
            Prayer Requests
          </Link>

          {/* 5. Faith Assistant (Triggers Global Modal Drawer) */}
          <button 
            onClick={() => openAssistant()} 
            className="hover:text-[#A83226] transition-colors cursor-pointer inline-flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A83226]"
            title="Open AI Faith & Reflection Assistant"
          >
            <span>Faith Assistant</span>
            <span className="text-xs" aria-hidden="true">✨</span>
          </button>

          {/* 6. CMS Admin */}
          <Link href="/admin" className="hover:text-[#A83226] transition-colors text-xs font-bold uppercase tracking-wider text-[#D99B26]">
            CMS Admin
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* 7. DONATE (PayPal Link) */}
          <a
            href={paypalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D99B26] hover:bg-[#c28a21] text-[#2C221E] shadow-sm transition-all transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99B26]"
            title="Donate to GodDome Non-Profit"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            Donate
          </a>

          {/* 8. REQUEST PRAYER (CTA Button: /prayer) */}
          <Link
            href="/prayer"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#A83226] hover:bg-[#8f2a20] text-[#FAF6F0] shadow-sm transition-all transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A83226]"
          >
            Request Prayer
          </Link>
        </div>
      </div>
    </nav>
  );
}
