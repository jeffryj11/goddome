import Hero from '@/components/Hero';
import StoryCard from '@/components/StoryCard';
import FaithAssistant from '@/components/FaithAssistant';
import { getSortedStoriesData } from '@/lib/stories';

export default function Home() {
  const allStories = getSortedStoriesData();

  return (
    <main className="min-h-screen bg-[#FAF6F0] text-[#2C221E] flex flex-col font-sans">
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
      <footer className="border-t border-[#2C221E]/15 py-10 px-6 mt-auto bg-[#FAF6F0]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#2C221E]/60">
          <div className="flex items-center space-x-2">
            <span className="text-[#A83226] font-bold">GodDome</span>
            <span>—</span>
            <span>Faithful Words: Christian Stories by Jeanna’ Mead</span>
          </div>

          <div>
            <p>&copy; 2026 GodDome — Faithful Words: Christian Stories by Jeanna’ Mead. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
