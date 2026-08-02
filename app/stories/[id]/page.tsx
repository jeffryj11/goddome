import { getStoryData, getSortedStoriesData } from '@/lib/stories';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import NewsletterSignup from '@/components/NewsletterSignup';
import ShareableQuote from '@/components/ShareableQuote';
import ReflectionJournal from '@/components/ReflectionJournal';
import AudioPlayer from '@/components/AudioPlayer';
import ReadingStreak from '@/components/ReadingStreak';
import PrayerCounter from '@/components/PrayerCounter';

export async function generateStaticParams() {
  const stories = getSortedStoriesData();
  return stories.map((story) => ({
    id: story.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const story = await getStoryData(resolvedParams.id);
    
    const category = story.category || 'Faith';
    const rawTitle = story.seoTitle || story.metaTitle || story.title;
    const fullTitle = `${rawTitle} — Daily Devotional on ${category} | GodDome`;
    const defaultDesc = "Discover inspiring Christian stories, spiritual reflections, and faith guidance authored by Jeanna’ Mead.";
    const description = story.featuredQuote || story.excerpt || story.seoDescription || story.metaDescription || story.summary || defaultDesc;
    const image = story.heroImage || story.featuredImage || story.ogImage || story.image || '/images/image_ef9498.jpg';
    const canonicalUrl = `https://goddome.org/stories/${resolvedParams.id}`;

    return {
      title: fullTitle,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: fullTitle,
        description,
        url: canonicalUrl,
        siteName: 'GodDome',
        type: 'article',
        publishedTime: story.date,
        authors: [story.author || 'Jeanna’ Mead'],
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: rawTitle,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: fullTitle,
        description,
        images: [image],
      },
    };
  } catch {
    return { title: 'Story Not Found | GodDome' };
  }
}

export default async function StoryPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  let story;
  try {
    const resolvedParams = await Promise.resolve(params);
    story = await getStoryData(resolvedParams.id);
  } catch (e) {
    notFound();
  }

  const paypalUrl = process.env.NEXT_PUBLIC_PAYPAL_DONATE_URL || 'https://www.paypal.com/ncp/payment/3L3XFTP7UATMJ';
  const canonicalUrl = `https://goddome.org/stories/${story.id}`;

  // Article & BlogPosting Schema (JSON-LD)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: story.title,
    description: story.excerpt || story.summary,
    url: canonicalUrl,
    datePublished: story.date || '2026-01-01',
    author: {
      '@type': 'Person',
      name: story.author || 'Jeanna’ Mead',
      url: 'https://goddome.org',
    },
    publisher: {
      '@type': 'Organization',
      name: 'GodDome',
      logo: {
        '@type': 'ImageObject',
        url: 'https://goddome.org/images/logo.png',
      },
    },
    image: story.image ? `https://goddome.org${story.image}` : 'https://goddome.org/images/image_ef9498.jpg',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  // Audio Object Schema (JSON-LD)
  const audioJsonLd = story.audioUrl
    ? {
        '@context': 'https://schema.org',
        '@type': 'AudioObject',
        name: `${story.title} Audio Devotional`,
        description: `Narrated devotional by Jeanna’ Mead: ${story.title}`,
        contentUrl: story.audioUrl.startsWith('http') ? story.audioUrl : `https://goddome.org${story.audioUrl}`,
        encodingFormat: 'audio/mpeg',
        author: {
          '@type': 'Person',
          name: story.author || 'Jeanna’ Mead',
        },
      }
    : null;

  return (
    <article className="min-h-screen bg-[#FAF6F0] text-[#2C221E] py-16 px-6 sm:px-12">
      {/* Schema.org Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {audioJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(audioJsonLd) }}
        />
      )}

      <div className="max-w-3xl mx-auto">
        {/* Top Header Navigation & Reading Streak Widget */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm font-semibold text-[#A83226] hover:text-[#8f2a20] transition-colors group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A83226]"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform mr-2" aria-hidden="true">←</span> 
            Back to Stories
          </Link>

          <ReadingStreak />
        </div>

        {/* Story Header */}
        <header className="border-b border-[#2C221E]/15 pb-8 mb-10">
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[#D99B26] tracking-wider mb-3">
            <span className="uppercase">{story.category || "Devotional"}</span>
            {story.date && (
              <>
                <span>•</span>
                <time dateTime={story.date}>{story.date}</time>
              </>
            )}
            {story.readTime && (
              <>
                <span>•</span>
                <span className="text-[#2C221E]/60 font-normal">{story.readTime}</span>
              </>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-[#2C221E] mb-4">
            {story.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[#2C221E]/70 italic text-base sm:text-lg">
              By {story.author || 'Jeanna’ Mead'}
            </p>

            <PrayerCounter itemId={story.id} initialCount={28} label="Prayers Offered" />
          </div>

          {/* Scripture Reference Tag */}
          {story.scripture && (
            <p className="text-sm font-serif italic text-[#D99B26] mt-4">
              📖 Scripture: {story.scripture}
            </p>
          )}

          {/* Topic Tags Badges */}
          {story.tags && story.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {story.tags.map((tag: string, index: number) => (
                <Link
                  key={index}
                  href={`/topics/${tag.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-')}`}
                  className="px-3 py-1 bg-[#2C221E]/5 hover:bg-[#D99B26]/20 text-[#2C221E]/80 text-xs font-semibold rounded-full border border-[#2C221E]/10 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* ElevenLabs AI Audio Devotional Player */}
        <AudioPlayer 
          src={story.audioUrl} 
          storyId={story.id}
          storyText={story.excerpt || story.title}
          title={story.title} 
          author={story.author || 'Jeanna’ Mead'} 
        />

        {/* Featured Pull-Quote Component if present in frontmatter */}
        {story.featuredQuote && (
          <ShareableQuote 
            quote={story.featuredQuote} 
            author={story.author || 'Jeanna’ Mead'} 
            storyTitle={story.title} 
          />
        )}

        {/* Story Body (Rendered HTML from Markdown) */}
        <div 
          className="prose prose-lg max-w-none text-[#2C221E]/90 leading-relaxed font-serif
                     prose-headings:font-sans prose-headings:text-[#2C221E]
                     prose-p:mb-6 prose-p:text-lg sm:prose-p:text-xl sm:prose-p:leading-8
                     prose-blockquote:border-l-4 prose-blockquote:border-[#D99B26] prose-blockquote:pl-5 prose-blockquote:py-1 prose-blockquote:italic prose-blockquote:text-[#2C221E]/85 prose-blockquote:bg-[#2C221E]/[0.02] prose-blockquote:rounded-r-lg
                     prose-hr:border-[#2C221E]/20 prose-hr:my-10
                     prose-a:text-[#A83226] prose-a:underline hover:prose-a:text-[#8f2a20]"
          dangerouslySetInnerHTML={{ __html: story.contentHtml }}
        />

        {/* Quiet Reflection Journal Component */}
        <ReflectionJournal storySlug={story.id} storyId={story.id} storyTitle={story.title} />

        {/* Newsletter Subscription Box */}
        <NewsletterSignup />

        {/* Story Footer Sign-off & Donation Callout */}
        <footer className="mt-12 pt-8 border-t border-[#2C221E]/15 text-center">
          <div className="bg-[#FAF6F0] border border-[#2C221E]/10 rounded-2xl p-8 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#2C221E] mb-2">
              Thank you for resting a while at GodDome
            </h3>
            <p className="text-sm text-[#2C221E]/70 mb-6 max-w-md mx-auto">
              If this message encouraged you today, feel free to share it with someone who might need a quiet word of grace, or support our non-profit ministry.
            </p>

            <div className="mb-6 flex justify-center">
              <PrayerCounter itemId={`${story.id}_footer`} initialCount={45} label="Joined in Prayer" />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="px-6 py-3 bg-[#A83226] hover:bg-[#8f2a20] text-[#FAF6F0] text-sm font-semibold rounded-full shadow-sm transition-all transform hover:-translate-y-0.5 w-full sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A83226]"
              >
                Read More Devotionals
              </Link>
              <a
                href={paypalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#D99B26] hover:bg-[#c28a21] text-[#2C221E] text-sm font-semibold rounded-full shadow-sm transition-all transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 w-full sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99B26]"
              >
                <svg className="w-4 h-4 fill-current text-[#2C221E]" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                Donate via PayPal
              </a>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
