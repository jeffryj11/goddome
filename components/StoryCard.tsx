import Link from 'next/link';
import { StoryMeta } from '@/lib/stories';

interface StoryCardProps {
  story: StoryMeta;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <div className="group relative flex flex-col justify-between h-full w-full overflow-hidden rounded-2xl border border-[#2C221E]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer">
      <div>
        {/* Story Cover Image */}
        {story.image && (
          <div className="relative h-48 w-full overflow-hidden bg-slate-900">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 z-10">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2C221E]/80 text-[#FAF6F0] backdrop-blur-md shadow-xs">
                {story.category || 'Devotional'}
              </span>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center gap-2 text-xs font-medium text-[#2C221E]/60 mb-2">
            <span>By {story.author || 'Jeanna’ Mead'}</span>
            {story.readTime && (
              <>
                <span>•</span>
                <span>{story.readTime}</span>
              </>
            )}
          </div>

          {/* Title with stretch overlay link covering entire card area */}
          <h3 className="font-serif text-xl font-bold text-[#2C221E] group-hover:text-[#A83226] transition-colors mb-3 leading-snug">
            <Link href={`/stories/${story.id}`}>
              <span className="absolute inset-0 z-0" aria-hidden="true" />
              {story.title}
            </Link>
          </h3>

          <p className="text-[#2C221E]/75 text-sm leading-relaxed line-clamp-3 font-light">
            {story.excerpt}
          </p>
        </div>
      </div>

      {/* Footer / Read More Indicator */}
      <div className="p-6 pt-0 mt-auto">
        <span className="inline-flex items-center text-sm font-semibold text-[#A83226] group-hover:text-[#8f2a20] transition-colors">
          Read Devotional 
          <span className="ml-1.5 transform group-hover:translate-x-1.5 transition-transform duration-200">→</span>
        </span>
      </div>
    </div>
  );
}
