import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StoryCard from '@/components/StoryCard';
import FaithAssistant from '@/components/FaithAssistant';
import { getSortedStoriesData } from '@/lib/stories';
import Link from 'next/link';

export default function Home() {
  const allStories = getSortedStoriesData();

  return (
    <main className="min-h-screen bg-[#FAF6F0] text-[#2C221E] flex flex-col font-sans">
      {/* Navigation Header */}
      <Navbar />

      {/* Campfire / Fireside Hero Visual */}
      <Hero />

      {/* Main Stories Grid Section */}
      <section id="stories" className="max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-[#D99B26] uppercase tracking-widest">
            Fireside Devotionals
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E] mt-2 mb-3">
            Writings by Jeanna’ Mead
          </h2>
          <p className="text-[#2C221E]/70 text-base sm:text-lg max-w-xl mx-auto font-light">
            Take a moment to pause, rest, and pull up a chair with uplifting Christian stories and devotionals.
          </p>
        </div>

        {/* Responsive Grid of Stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* Interactive Faith & Reflection Assistant */}
      <section id="assistant" className="py-16 px-6 max-w-5xl mx-auto w-full">
        <FaithAssistant />
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2C221E]/15 py-12 px-6 mt-auto bg-[#FAF6F0]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#2C221E]/70">
          <div className="flex items-center space-x-3">
            <img
              src="/images/logo.png"
              alt="GodDome Badge"
              className="w-8 h-8 rounded-lg border border-[#D99B26]/30 shadow-xs"
            />
            <span className="font-serif font-bold text-[#2C221E] text-sm">GodDome</span>
            <span>—</span>
            <span>Faithful Words: Christian Stories by Jeanna’ Mead</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/admin" className="hover:text-[#A83226] font-semibold">
              Admin CMS
            </Link>
            <p>&copy; 2026 GodDome — All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
