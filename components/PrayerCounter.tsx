'use client';

import { useState, useEffect } from 'react';

interface PrayerCounterProps {
  itemId?: string;
  initialCount?: number;
  label?: string;
}

export default function PrayerCounter({
  itemId = 'global_community',
  initialCount = 42,
  label = 'Prayers Offered',
}: PrayerCounterProps) {
  const [count, setCount] = useState(initialCount);
  const [hasPrayed, setHasPrayed] = useState(false);

  const storageKey = `goddome_prayed_${itemId}`;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prayedState = localStorage.getItem(storageKey);
      if (prayedState === 'true') {
        setHasPrayed(true);
      }
      const savedCount = localStorage.getItem(`goddome_prayer_count_${itemId}`);
      if (savedCount) {
        setCount(parseInt(savedCount, 10));
      }
    }
  }, [storageKey, itemId]);

  const handlePray = () => {
    if (typeof window !== 'undefined') {
      if (hasPrayed) {
        const newCount = Math.max(0, count - 1);
        setCount(newCount);
        setHasPrayed(false);
        localStorage.setItem(storageKey, 'false');
        localStorage.setItem(`goddome_prayer_count_${itemId}`, newCount.toString());
      } else {
        const newCount = count + 1;
        setCount(newCount);
        setHasPrayed(true);
        localStorage.setItem(storageKey, 'true');
        localStorage.setItem(`goddome_prayer_count_${itemId}`, newCount.toString());
      }
    }
  };

  return (
    <div className="inline-flex items-center space-x-3 bg-white border border-[#2C221E]/10 rounded-full px-5 py-2 shadow-2xs">
      <button
        onClick={handlePray}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
          hasPrayed
            ? 'bg-[#A83226] text-[#FAF6F0] shadow-xs scale-105'
            : 'bg-[#FAF6F0] hover:bg-[#D99B26]/20 text-[#2C221E] border border-[#2C221E]/10'
        }`}
      >
        <span className="text-sm">🙏</span>
        <span>{hasPrayed ? 'Prayed Amen' : 'I Prayed'}</span>
      </button>

      <div className="text-xs font-semibold text-[#2C221E]/70">
        <span className="font-serif text-sm font-bold text-[#A83226]">{count}</span> {label}
      </div>
    </div>
  );
}
