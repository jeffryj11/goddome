import Link from 'next/link';
import { StoryMeta } from '@/lib/stories';

interface StoryCardProps {
  story: StoryMeta;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <Link
      href={`/stories/${story.id}`}
      className="group block bg-white border border-[#2C221E]/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 cursor-pointer h-full"
    >
      <div>
        {/* Story Cover Image */}
        {story.image && (
          <div className="relative h-48 w-full overflow-hidden bg-slate-900">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3">
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

          <h3 className="font-serif text-xl font-bold text-[#2C221E] group-hover:text-[#A83226] transition-colors mb-3 leading-snug">
            {story.title}
          </h3>

          <p className="text-[#2C221E]/75 text-sm leading-relaxed line-clamp-3 font-light">
            {story.excerpt}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0 mt-auto">
        <span className="inline-flex items-center text-sm font-semibold text-[#A83226] group-hover:text-[#8f2a20] transition-colors">
          Read Devotional 
          <span className="ml-1.5 transform group-hover:translate-x-1.5 transition-transform duration-200">→</span>
        </span>
      </div>
    </Link>
  );
}
