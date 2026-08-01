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
    return {
      title: `${story.title} | GodDome`,
      description: story.excerpt || `Read ${story.title} by Jeanna’ Mead on GodDome.`,
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

        {/* Story Footer Sign-off */}
        <footer className="mt-16 pt-8 border-t border-[#2C221E]/15 text-center">
          <div className="bg-[#FAF6F0] border border-[#2C221E]/10 rounded-2xl p-8 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-[#2C221E] mb-2">
              Thank you for resting a while at GodDome
            </h3>
            <p className="text-sm text-[#2C221E]/70 mb-6 max-w-md mx-auto">
              If this message encouraged you today, feel free to share it with someone who might need a quiet word of grace.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2.5 bg-[#A83226] hover:bg-[#8f2a20] text-[#FAF6F0] text-sm font-medium rounded-full transition-colors"
            >
              Read More Devotionals
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
