import React from 'react';

// Delicate Christian Cross Icon
export function ChristianCrossIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M10.5 2h3v6h6v3h-6v11h-3V11h-6V8h6V2z" />
    </svg>
  );
}

// Delicate Jewish Menorah Candelabra Icon
export function MenorahIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* Base & Main Stem */}
      <path d="M12 21v-8M9 21h6" />
      {/* Central Flame */}
      <circle cx="12" cy="4" r="1" fill="currentColor" />
      {/* Outer Branches */}
      <path d="M4 8a8 8 0 0 0 16 0" />
      <circle cx="4" cy="4" r="1" fill="currentColor" />
      <circle cx="20" cy="4" r="1" fill="currentColor" />
      {/* Middle Branches */}
      <path d="M6.5 10a5.5 5.5 0 0 0 11 0" />
      <circle cx="6.5" cy="4" r="1" fill="currentColor" />
      <circle cx="17.5" cy="4" r="1" fill="currentColor" />
      {/* Inner Branches */}
      <path d="M9 12a3 3 0 0 0 6 0" />
      <circle cx="9" cy="4" r="1" fill="currentColor" />
      <circle cx="15" cy="4" r="1" fill="currentColor" />
    </svg>
  );
}

// Combined Faith Accent Badge
export function FaithBadge({ label = "Devotional" }: { label?: string }) {
  return (
    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D99B26]/15 border border-[#D99B26]/30 text-[#FAF6F0] text-xs font-semibold">
      <ChristianCrossIcon className="w-3.5 h-3.5 text-[#D99B26]" />
      <span className="uppercase tracking-widest text-[11px] text-[#D99B26] font-bold">{label}</span>
      <MenorahIcon className="w-3.5 h-3.5 text-[#D99B26]" />
    </div>
  );
}
