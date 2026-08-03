import Image from 'next/image';
import { ChristianCrossIcon, MenorahIcon } from './FaithIcons';

export default function Hero() {
  return (
    <section className="w-full pt-20 pb-8 px-6 sm:px-12 flex flex-col items-center text-center star-twinkle-bg text-[#FAF6F0] relative overflow-hidden mt-0">
      {/* Background Hero Image with Dark Midnight Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/hero-boots-fire.jpg"
          alt="Campfire view with warm coffee mug"
          fill
          priority
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/80 via-[#0B132B]/80 to-[#030712]" />
      </div>

      {/* Ambient Starlight Glow */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-[#D99B26]/15 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Overlay Content */}
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0B132B]/90 border border-[#D99B26]/40 text-[#D99B26] text-xs font-semibold uppercase tracking-widest mb-3 backdrop-blur-md shadow-lg">
          <ChristianCrossIcon className="w-3.5 h-3.5 text-[#D99B26]" />
          <span>+ WORDS FOR YOUR SOUL +</span>
          <MenorahIcon className="w-3.5 h-3.5 text-[#D99B26]" />
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4 leading-tight drop-shadow-lg">
          Fireside Devotionals & Stories
        </h1>

        {/* Featured Starry Night Quote */}
        <blockquote className="my-4 p-5 rounded-2xl bg-[#0B132B]/60 border border-[#D99B26]/30 backdrop-blur-md max-w-2xl mx-auto shadow-xl">
          <p className="font-serif italic text-lg sm:text-xl text-[#F3E5AB] leading-relaxed">
            “God&apos;s love is like starry nights. Too vast and beautiful... comforting and magnified into infinity.”
          </p>
          <cite className="block mt-2 text-xs uppercase tracking-widest text-[#D99B26] font-sans font-bold not-italic">
            — Jeanna’ Mead
          </cite>
        </blockquote>

        <p className="text-base sm:text-lg text-[#FAF6F0]/90 max-w-xl mx-auto font-light leading-relaxed mb-6">
          Take a quiet moment to pause, rest, and pull up a chair with uplifting Christian stories and meditations.
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
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#D99B26]/20 hover:bg-[#D99B26]/30 border border-[#D99B26]/40 text-[#D99B26] font-semibold text-sm transition-all backdrop-blur-md"
          >
            Faith & Reflection Assistant ✨
          </a>
        </div>
      </div>
    </section>
  );
}
