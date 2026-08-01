import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-[#1E1715] via-[#2C221E] to-[#FAF6F0] text-[#FAF6F0] pt-24 pb-20 px-6 sm:px-12 text-center overflow-hidden">
      {/* Soft glowing ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D99B26]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D99B26]/20 border border-[#D99B26]/40 text-[#D99B26] text-xs font-semibold uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-[#D99B26] animate-pulse" />
          Faithful Words • GodDome Sanctuary
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
          Porch-Side Devotionals & Stories
        </h1>

        <p className="text-lg sm:text-xl text-[#FAF6F0]/80 max-w-2xl mx-auto font-light leading-relaxed mb-8">
          Take a moment to pause and pull up a chair with warm, encouraging writings authored by <strong className="text-[#D99B26] font-semibold">Jeanna’ Mead</strong>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#stories"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#A83226] hover:bg-[#8f2a20] text-[#FAF6F0] font-semibold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Explore Devotionals
          </a>
          <a
            href="#assistant"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
          >
            Faith & Reflection Assistant
          </a>
        </div>
      </div>
    </section>
  );
}
