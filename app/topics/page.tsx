import Navbar from '@/components/Navbar';
import { getSortedStoriesData } from '@/lib/stories';
import Link from 'next/link';

export const metadata = {
  title: 'Devotional Topics & Scripture Index | GodDome',
  description: 'Explore Christian devotionals and stories by Jeanna’ Mead organized by topic, spiritual themes, and scripture reflection.',
  alternates: {
    canonical: 'https://goddome.org/topics',
  },
  openGraph: {
    title: 'Devotional Topics & Scripture Index | GodDome',
    description: 'Explore Christian devotionals and stories by Jeanna’ Mead organized by topic, spiritual themes, and scripture reflection.',
    url: 'https://goddome.org/topics',
    siteName: 'GodDome',
    type: 'website',
  },
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function TopicsPage() {
  const stories = getSortedStoriesData();

  // Aggregate topics and count stories
  const topicMap: Record<string, { name: string; count: number; slug: string }> = {};

  stories.forEach((story) => {
    const topics = story.topics || story.tags || [];
    topics.forEach((topic: string) => {
      const slug = slugify(topic);
      if (!topicMap[slug]) {
        topicMap[slug] = { name: topic, count: 0, slug };
      }
      topicMap[slug].count += 1;
    });
  });

  const topicList = Object.values(topicMap).sort((a, b) => b.count - a.count);

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Devotional Topics & Themes',
    description: 'Index of Christian devotional topics and scripture themes by Jeanna’ Mead.',
    itemListElement: topicList.map((topic, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: topic.name,
      url: `https://goddome.org/topics/${topic.slug}`,
    })),
  };

  return (
    <main id="main-content" className="min-h-screen bg-[#FAF6F0] text-[#2C221E] flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-16 w-full flex-grow">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#D99B26] uppercase tracking-widest">
            Topic Index
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C221E] mt-2 mb-4">
            Devotional Topics & Themes
          </h1>
          <p className="text-[#2C221E]/75 text-base sm:text-lg max-w-xl mx-auto font-light">
            Browse Jeanna’ Mead’s devotionals organized by spiritual themes, comfort, scripture reflection, and grace.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {topicList.map((topic) => (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className="group bg-white border border-[#2C221E]/10 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#D99B26]/40 transition-all transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A83226]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A83226] group-hover:text-[#8f2a20] transition-colors">
                  Topic
                </span>
                <span className="bg-[#FAF6F0] text-[#2C221E]/80 text-xs font-semibold px-2.5 py-1 rounded-full border border-[#2C221E]/10">
                  {topic.count} {topic.count === 1 ? 'story' : 'stories'}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2C221E] group-hover:text-[#A83226] transition-colors">
                {topic.name}
              </h3>
            </Link>
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
