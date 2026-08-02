'use client';

import { useState } from 'react';
import { StoryMeta } from '@/lib/stories';
import StoryCard from './StoryCard';

interface StoryGridWithFilterProps {
  stories: StoryMeta[];
}

const AVAILABLE_TAGS = [
  'All',
  'Faith & Trust',
  'Comfort & Healing',
  'Encouragement',
  'Everyday Grace',
  'Scripture Reflection',
  'Poetry',
];

export default function StoryGridWithFilter({ stories }: StoryGridWithFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const filteredStories = stories.filter((story) => {
    if (selectedTag === 'All') return true;
    if (story.tags && Array.isArray(story.tags)) {
      return story.tags.includes(selectedTag);
    }
    if (story.category) {
      return story.category === selectedTag;
    }
    return false;
  });

  return (
    <div>
      {/* Tag Taxonomy Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
        {AVAILABLE_TAGS.map((tag) => {
          const isActive = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#A83226] text-[#FAF6F0] shadow-sm scale-105'
                  : 'bg-white border border-[#2C221E]/15 text-[#2C221E]/80 hover:bg-[#2C221E]/5 hover:text-[#2C221E]'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Grid of Filtered Stories */}
      {filteredStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-6 bg-white/60 border border-[#2C221E]/10 rounded-2xl max-w-md mx-auto">
          <p className="font-serif text-lg font-bold text-[#2C221E] mb-1">
            No devotionals found under "{selectedTag}"
          </p>
          <p className="text-xs text-[#2C221E]/70 mb-4">
            Select another topic tag above to explore more stories by Jeanna’ Mead.
          </p>
          <button
            onClick={() => setSelectedTag('All')}
            className="px-4 py-2 bg-[#D99B26] text-[#2C221E] text-xs font-semibold rounded-full hover:bg-[#c28a21] transition-colors"
          >
            Show All Devotionals
          </button>
        </div>
      )}
    </div>
  );
}
