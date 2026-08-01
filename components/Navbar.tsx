import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#2C221E]/10 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo & Title */}
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
          <Link href="/" className="hover:text-[#A83226] transition-colors">
            Home
          </Link>
          <a href="#stories" className="hover:text-[#A83226] transition-colors">
            Devotionals
          </a>
          <a href="#assistant" className="hover:text-[#A83226] transition-colors">
            Faith Assistant
          </a>
          <Link href="/admin" className="hover:text-[#A83226] transition-colors text-xs font-bold uppercase tracking-wider text-[#D99B26]">
            CMS Admin
          </Link>
        </div>

        {/* CTA Button */}
        <div>
          <a
            href="#assistant"
            className="inline-flex items-center px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#A83226] hover:bg-[#8f2a20] text-[#FAF6F0] shadow-sm transition-all transform hover:-translate-y-0.5"
          >
            Reflect Now
          </a>
        </div>
      </div>
    </nav>
  );
}
