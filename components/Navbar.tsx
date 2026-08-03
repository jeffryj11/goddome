'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFaithAssistant } from './FaithAssistantContext';
import { ChristianCrossIcon, MenorahIcon } from './FaithIcons';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const paypalUrl = process.env.NEXT_PUBLIC_PAYPAL_DONATE_URL || 'https://www.paypal.com/ncp/payment/3L3XFTP7UATMJ';
  const { openAssistant } = useFaithAssistant();

  const isHome = pathname === '/';
  const isTopics = pathname.startsWith('/topics');
  const isPrayer = pathname === '/prayer' || pathname === '/prayer-requests';

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md border-b border-white/10 text-[#FAF6F0] shadow-lg">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* 1. Brand Logo & Title with Praying Hands Emblem */}
        <Link href="/" onClick={closeMobileMenu} className="flex items-center space-x-3 group">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-[#D99B26]/40 bg-[#0B132B] p-1 shadow-sm transition-transform group-hover:scale-105 flex items-center justify-center">
            <img
              src="/praying-hands.svg"
              alt="GodDome Praying Hands Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <ChristianCrossIcon className="w-3.5 h-3.5 text-[#D99B26]" />
              <span className="font-serif text-xl font-bold tracking-tight text-[#FAF6F0] group-hover:text-[#D99B26] transition-colors">
                GodDome
              </span>
              <MenorahIcon className="w-3.5 h-3.5 text-[#D99B26]" />
            </div>
            <p className="text-[11px] text-[#D99B26] font-medium tracking-wide">
              Words For Your Soul by Jeanna’ Mead
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-[#FAF6F0]/80">
          {/* 1. Home */}
          <Link 
            href="/" 
            className={`transition-colors hover:text-[#D99B26] ${isHome ? 'text-[#D99B26] border-b-2 border-[#D99B26] pb-1' : ''}`}
          >
            Home
          </Link>

          {/* 2. Devotionals */}
          <Link 
            href="/#stories" 
            className="transition-colors hover:text-[#D99B26]"
          >
            Devotionals
          </Link>

          {/* 3. Topics */}
          <Link 
            href="/topics" 
            className={`transition-colors hover:text-[#D99B26] ${isTopics ? 'text-[#D99B26] border-b-2 border-[#D99B26] pb-1' : ''}`}
          >
            Topics
          </Link>

          {/* 4. Prayer Requests */}
          <Link 
            href="/prayer" 
            className={`transition-colors hover:text-[#D99B26] ${isPrayer ? 'text-[#D99B26] border-b-2 border-[#D99B26] pb-1' : ''}`}
          >
            Prayer Requests
          </Link>

          {/* 5. Faith Assistant */}
          <button 
            onClick={() => openAssistant()} 
            className="hover:text-[#D99B26] transition-colors cursor-pointer inline-flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99B26]"
            title="Open AI Faith & Reflection Assistant"
          >
            <span>Faith Assistant</span>
            <span className="text-xs text-[#D99B26]" aria-hidden="true">✨</span>
          </button>

          {/* 6. CMS Admin */}
          <Link href="/admin" className="hover:text-[#A83226] transition-colors text-xs font-bold uppercase tracking-wider text-[#D99B26]">
            CMS Admin
          </Link>
        </nav>

        {/* Desktop & Mobile Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* DONATE (PayPal Link) */}
          <a
            href={paypalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D99B26] hover:bg-[#c28a21] text-[#030712] shadow-sm transition-all transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99B26]"
            title="Donate to GodDome Non-Profit"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            Donate
          </a>

          {/* REQUEST PRAYER */}
          <Link
            href="/prayer"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#A83226] hover:bg-[#8f2a20] text-[#FAF6F0] shadow-sm transition-all transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A83226]"
          >
            Request Prayer
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#FAF6F0] hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99B26]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer Sync */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B132B] border-b border-[#D99B26]/20 px-6 py-6 space-y-4 animate-fade-in shadow-xl text-[#FAF6F0]">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className={`block text-base font-serif font-bold ${isHome ? 'text-[#D99B26]' : 'text-[#FAF6F0]'}`}
          >
            Home
          </Link>
          <Link
            href="/#stories"
            onClick={closeMobileMenu}
            className="block text-base font-serif font-bold text-[#FAF6F0] hover:text-[#D99B26]"
          >
            Devotionals
          </Link>
          <Link
            href="/topics"
            onClick={closeMobileMenu}
            className={`block text-base font-serif font-bold ${isTopics ? 'text-[#D99B26]' : 'text-[#FAF6F0]'}`}
          >
            Topics Index
          </Link>
          <Link
            href="/prayer"
            onClick={closeMobileMenu}
            className={`block text-base font-serif font-bold ${isPrayer ? 'text-[#D99B26]' : 'text-[#FAF6F0]'}`}
          >
            Prayer Requests
          </Link>
          <button
            onClick={() => {
              closeMobileMenu();
              openAssistant();
            }}
            className="w-full text-left font-serif font-bold text-base text-[#FAF6F0] hover:text-[#D99B26] flex items-center justify-between py-1"
          >
            <span>Faith Assistant</span>
            <span className="text-xs text-[#D99B26]">✨ AI Assistant</span>
          </button>
          <Link
            href="/admin"
            onClick={closeMobileMenu}
            className="block text-sm font-bold uppercase tracking-wider text-[#D99B26]"
          >
            CMS Admin
          </Link>
        </div>
      )}
    </header>
  );
}
