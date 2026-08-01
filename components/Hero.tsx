import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[600px] bg-gradient-to-b from-[#1E1715] via-[#2C221E] to-[#FAF6F0] text-[#FAF6F0] pt-24 pb-20 px-6 sm:px-12 text-center overflow-hidden flex flex-col justify-center items-center">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0 opacity-30 overflow-hidden">
        <Image
          src="/images/hero-boots-fire.jpg"
          alt="Campfire view with warm coffee mug"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E1715]/80 via-[#2C221E]/90 to-[#FAF6F0]" />
      </div>

      {/* Soft glowing ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D99B26]/20 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Overlay Content */}
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D99B26]/20 border border-[#D99B26]/40 text-[#D99B26] text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#D99B26] animate-pulse" />
          Faithful Words • GodDome Sanctuary
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-md">
          Porch-Side Devotionals & Stories
        </h1>

        <p className="text-lg sm:text-xl text-[#FAF6F0]/90 max-w-2xl mx-auto font-light leading-relaxed mb-8 drop-shadow">
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
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all backdrop-blur-md"
          >
            Faith & Reflection Assistant
          </a>
        </div>
      </div>
    </section>
  );
}
