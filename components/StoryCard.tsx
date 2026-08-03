'use client';

import Link from 'next/link';
import { StoryMeta } from '@/lib/stories';
import { ChristianCrossIcon, MenorahIcon } from './FaithIcons';
import { useAudio } from '@/context/AudioContext';

interface StoryCardProps {
  story: StoryMeta;
}

export default function StoryCard({ story }: StoryCardProps) {
  const { playTrack, currentTrack, isPlaying } = useAudio();
  const altText = story.title ? `${story.title} devotional cover` : 'GodDome devotional cover image';
  const isThisTrackPlaying = currentTrack?.id === story.id && isPlaying;

  const handleListenClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playTrack({
      id: story.id,
      title: story.title,
      author: story.author || 'Jeanna’ Mead',
      src: `/api/audio?id=${encodeURIComponent(story.id)}`,
    });
  };

  return (
    <div className="group relative flex flex-col justify-between h-full w-full overflow-hidden rounded-2xl border border-[#D99B26]/30 bg-[#0B132B]/90 text-[#FAF6F0] shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#D99B26]/60 cursor-pointer focus-within:ring-2 focus-within:ring-[#D99B26]">
      <div>
        {/* Story Cover Image */}
        {story.image && (
          <div className="relative h-48 w-full overflow-hidden bg-slate-950">
            <img
              src={story.image}
              alt={altText}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
            />
            <div className="absolute top-3 left-3 z-10 flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#030712]/80 text-[#D99B26] border border-[#D99B26]/40 backdrop-blur-md shadow-xs">
              <ChristianCrossIcon className="w-3 h-3 text-[#D99B26]" />
              <span>{story.category || 'Devotional'}</span>
              <MenorahIcon className="w-3 h-3 text-[#D99B26]" />
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-[#FAF6F0]/70 mb-2">
            <span>By {story.author || 'Jeanna’ Mead'}</span>
            {story.readTime && (
              <span className="bg-[#030712] px-2.5 py-0.5 rounded-md border border-[#D99B26]/30 text-[11px] font-semibold text-[#D99B26]">
                {story.readTime}
              </span>
            )}
          </div>

          {/* Title with stretch overlay link covering card area */}
          <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#D99B26] transition-colors mb-2 leading-snug">
            <Link href={`/stories/${story.id}`} className="focus:outline-none">
              <span className="absolute inset-0 z-0" aria-hidden="true" />
              {story.title}
            </Link>
          </h3>

          {/* Scripture Reference Tag if present */}
          {story.scripture && (
            <p className="text-xs font-serif italic text-[#F3E5AB] mb-3">
              📖 {story.scripture}
            </p>
          )}

          <p className="text-[#FAF6F0]/80 text-sm leading-relaxed line-clamp-3 font-light mb-3">
            {story.excerpt}
          </p>

          {/* Hashtag Footer */}
          <p className="text-[11px] font-mono text-[#D99B26]/70">
            #wordsforthesoul #jeannasoul
          </p>
        </div>
      </div>

      {/* Footer Actions: Read Devotional & Listen Audio Button */}
      <div className="p-6 pt-0 mt-auto flex items-center justify-between gap-2 relative z-10">
        <Link
          href={`/stories/${story.id}`}
          className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#D99B26] hover:text-[#F3E5AB] transition-colors"
        >
          Read Devotional 
          <span className="ml-1.5 transform group-hover:translate-x-1.5 transition-transform duration-200" aria-hidden="true">→</span>
        </Link>

        {/* Global Listen Trigger Button */}
        <button
          onClick={handleListenClick}
          className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#D99B26]/20 hover:bg-[#D99B26] text-[#D99B26] hover:text-[#030712] border border-[#D99B26]/40 transition-all cursor-pointer flex items-center gap-1.5"
          title={`Listen to ${story.title} audio narration`}
        >
          {isThisTrackPlaying ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Playing</span>
            </>
          ) : (
            <>
              <span>🎙️ Listen</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
