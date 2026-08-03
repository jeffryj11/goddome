import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StoryGridWithFilter from '@/components/StoryGridWithFilter';
import FaithAssistant from '@/components/FaithAssistant';
import NewsletterSignup from '@/components/NewsletterSignup';
import { getSortedStoriesData } from '@/lib/stories';
import { ChristianCrossIcon, MenorahIcon } from '@/components/FaithIcons';
import Link from 'next/link';

export const metadata = {
  title: 'GodDome — Words For Your Soul: Christian Stories by Jeanna’ Mead',
  description: 'Discover inspiring Christian stories, spiritual reflections, and faith guidance authored by Jeanna’ Mead.',
  alternates: {
    canonical: 'https://goddome.org',
  },
  openGraph: {
    title: 'GodDome — Words For Your Soul: Christian Stories by Jeanna’ Mead',
    description: 'Discover inspiring Christian stories, spiritual reflections, and faith guidance authored by Jeanna’ Mead.',
    url: 'https://goddome.org',
    siteName: 'GodDome',
    type: 'website',
    images: [
      {
        url: 'https://goddome.org/images/logo.png',
        width: 800,
        height: 800,
        alt: 'GodDome Logo',
      },
    ],
  },
};

export default function Home() {
  const allStories = getSortedStoriesData();

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GodDome',
    url: 'https://goddome.org',
    description: 'Words For Your Soul: Christian Stories by Jeanna’ Mead.',
    publisher: {
      '@type': 'Organization',
      name: 'GodDome Ministry',
      logo: 'https://goddome.org/images/logo.png',
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NonprofitOrganization',
    name: 'GodDome Ministry',
    url: 'https://goddome.org',
    logo: 'https://goddome.org/images/logo.png',
    founder: {
      '@type': 'Person',
      name: 'Jeanna’ Mead',
    },
    sameAs: ['https://www.paypal.com/ncp/payment/3L3XFTP7UATMJ'],
  };

  return (
    <main id="main-content" className="min-h-screen star-twinkle-bg text-[#FAF6F0] flex flex-col font-sans pt-[80px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* Fixed Navigation Header */}
      <Navbar />

      {/* Hero Visual with Starry Night Quote */}
      <Hero />

      {/* Main Stories Grid Section with Tag Filtering */}
      <section id="stories" className="max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D99B26]/15 border border-[#D99B26]/30 text-[#FAF6F0] text-xs font-semibold mb-3">
            <ChristianCrossIcon className="w-3.5 h-3.5 text-[#D99B26]" />
            <span className="uppercase tracking-widest text-[11px] text-[#D99B26] font-bold">Fireside Devotionals</span>
            <MenorahIcon className="w-3.5 h-3.5 text-[#D99B26]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2 mb-3">
            Words For Your Soul
          </h2>
          <p className="text-[#FAF6F0]/80 text-base sm:text-lg max-w-xl mx-auto font-light">
            Take a moment to pause, rest, and pull up a chair with uplifting Christian stories and devotionals authored by Jeanna’ Mead.
          </p>
        </div>

        {/* Responsive Grid with Interactive Taxonomy Tag Filters */}
        <StoryGridWithFilter stories={allStories} />
      </section>

      {/* Newsletter Subscription Box */}
      <section className="max-w-6xl mx-auto px-6 w-full">
        <NewsletterSignup />
      </section>

      {/* Interactive Faith & Reflection Assistant */}
      <section id="assistant" className="py-16 px-6 max-w-5xl mx-auto w-full">
        <FaithAssistant />
      </section>

      {/* Footer */}
      <footer className="border-t border-[#D99B26]/20 py-12 px-6 mt-auto bg-[#030712] text-[#FAF6F0]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#FAF6F0]/70">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
            <div className="flex items-center space-x-2">
              <ChristianCrossIcon className="w-4 h-4 text-[#D99B26]" />
              <span className="font-serif font-bold text-white text-base">GodDome</span>
              <MenorahIcon className="w-4 h-4 text-[#D99B26]" />
            </div>
            <span className="hidden sm:inline">•</span>
            <span>Words For Your Soul by Jeanna’ Mead</span>
            <span className="hidden sm:inline">•</span>
            <span className="font-mono text-[#D99B26]/90">#writingmyheartout #jeannasoul #wordsforthesoul #myownwords</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/admin" className="hover:text-[#D99B26] font-semibold text-[#D99B26]">
              Admin CMS
            </Link>
            <p>&copy; 2026 GodDome — All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
