import Navbar from '@/components/Navbar';
import StoryCard from '@/components/StoryCard';
import { getSortedStoriesData } from '@/lib/stories';
import Link from 'next/link';
import { notFound } from 'next/navigation';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function generateStaticParams() {
  const stories = getSortedStoriesData();
  const slugSet = new Set<string>();

  stories.forEach((story) => {
    const topics = story.topics || story.tags || [];
    topics.forEach((t: string) => slugSet.add(slugify(t)));
  });

  return Array.from(slugSet).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const rawSlug = resolvedParams.slug;
  const stories = getSortedStoriesData();

  let matchedTopicName = rawSlug.replace(/-/g, ' ');
  stories.forEach((story) => {
    const topics = story.topics || story.tags || [];
    topics.forEach((t: string) => {
      if (slugify(t) === rawSlug) {
        matchedTopicName = t;
      }
    });
  });

  return {
    title: `${matchedTopicName} Devotionals | GodDome`,
    description: `Read Christian devotionals and stories on ${matchedTopicName} by Jeanna’ Mead on GodDome.`,
  };
}

export default async function TopicSlugPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const targetSlug = resolvedParams.slug;
  const stories = getSortedStoriesData();

  let matchedTopicName = targetSlug.replace(/-/g, ' ');
  const filteredStories = stories.filter((story) => {
    const topics = story.topics || story.tags || [];
    return topics.some((t: string) => {
      if (slugify(t) === targetSlug) {
        matchedTopicName = t;
        return true;
      }
      return false;
    });
  });

  if (filteredStories.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FAF6F0] text-[#2C221E] flex flex-col font-sans">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-16 w-full flex-grow">
        <Link 
          href="/topics" 
          className="inline-flex items-center text-sm font-semibold text-[#A83226] hover:text-[#8f2a20] transition-colors mb-8 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform mr-2">←</span> 
          Back to All Topics
        </Link>

        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#D99B26] uppercase tracking-widest">
            Topic Filter
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C221E] mt-2 mb-3">
            {matchedTopicName}
          </h1>
          <p className="text-[#2C221E]/75 text-base sm:text-lg max-w-xl mx-auto font-light">
            Showing {filteredStories.length} {filteredStories.length === 1 ? 'devotional' : 'devotionals'} categorized under "{matchedTopicName}".
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

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
