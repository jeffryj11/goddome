import { getStoryData, getSortedStoriesData } from '@/lib/stories';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
    
    const title = story.seoTitle || story.metaTitle || story.title;
    const fullTitle = `${title} | GodDome`;
    const description = story.seoDescription || story.metaDescription || story.excerpt || story.summary || "A spiritual journey and devotional reflection on GodDome.";
    const image = story.featuredImage || story.ogImage || story.image || '/images/image_ef9498.jpg';
    const url = `https://goddome.org/stories/${resolvedParams.id}`;

    return {
      title: fullTitle,
      description,
      openGraph: {
        title: fullTitle,
        description,
        url,
        siteName: 'GodDome',
        type: 'article',
        publishedTime: story.date,
        authors: [story.author || 'Jeanna’ Mead'],
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
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

  return (
    <article className="min-h-screen bg-[#FAF6F0] text-[#2C221E] py-16 px-6 sm:px-12">
      <div className="max-w-3xl mx-auto">
        {/* Navigation Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-semibold text-[#A83226] hover:text-[#8f2a20] transition-colors mb-10 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform mr-2">←</span> 
          Back to Stories
        </Link>

        {/* Story Header */}
        <header className="border-b border-[#2C221E]/15 pb-8 mb-10">
          <div className="flex items-center gap-3 text-sm font-semibold text-[#D99B26] uppercase tracking-wider mb-3">
            <span>{story.category || "Devotional"}</span>
            {story.date && (
              <>
                <span>•</span>
                <time>{story.date}</time>
              </>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-[#2C221E] mb-4">
            {story.title}
          </h1>

          <p className="text-[#2C221E]/70 italic text-base sm:text-lg">
            By Jeanna’ Mead
          </p>

          {/* Topic Tags Badges if available */}
          {story.tags && story.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {story.tags.map((tag: string, index: number) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-[#2C221E]/5 text-[#2C221E]/80 text-xs font-semibold rounded-full border border-[#2C221E]/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Story Body (Rendered HTML from Markdown) */}
        <div 
          className="prose prose-lg max-w-none text-[#2C221E]/90 leading-relaxed font-serif
                     prose-headings:font-sans prose-headings:text-[#2C221E]
                     prose-p:mb-6 prose-p:text-lg sm:prose-p:text-xl sm:prose-p:leading-8
                     prose-blockquote:border-l-4 prose-blockquote:border-[#D99B26] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-[#2C221E]/80
                     prose-a:text-[#A83226] prose-a:underline hover:prose-a:text-[#8f2a20]"
          dangerouslySetInnerHTML={{ __html: story.contentHtml }}
        />

        {/* Story Footer Sign-off & Donation Callout */}
        <footer className="mt-16 pt-8 border-t border-[#2C221E]/15 text-center">
          <div className="bg-[#FAF6F0] border border-[#2C221E]/10 rounded-2xl p-8 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#2C221E] mb-2">
              Thank you for resting a while at GodDome
            </h3>
            <p className="text-sm text-[#2C221E]/70 mb-6 max-w-md mx-auto">
              If this message encouraged you today, feel free to share it with someone who might need a quiet word of grace, or support our non-profit ministry.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="px-6 py-3 bg-[#A83226] hover:bg-[#8f2a20] text-[#FAF6F0] text-sm font-semibold rounded-full shadow-sm transition-all transform hover:-translate-y-0.5 w-full sm:w-auto"
              >
                Read More Devotionals
              </Link>
              <a
                href={paypalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#D99B26] hover:bg-[#c28a21] text-[#2C221E] text-sm font-semibold rounded-full shadow-sm transition-all transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <svg className="w-4 h-4 fill-current text-[#2C221E]" viewBox="0 0 24 24">
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
