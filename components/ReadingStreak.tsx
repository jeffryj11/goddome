'use client';

import { useState, useEffect } from 'react';

export default function ReadingStreak() {
  const [streak, setStreak] = useState(1);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const todayStr = new Date().toISOString().split('T')[0];
    const lastVisitStr = localStorage.getItem('goddome_last_read_date');
    const savedStreak = parseInt(localStorage.getItem('goddome_reading_streak') || '0', 10);

    if (!lastVisitStr) {
      localStorage.setItem('goddome_last_read_date', todayStr);
      localStorage.setItem('goddome_reading_streak', '1');
      setStreak(1);
    } else if (lastVisitStr === todayStr) {
      setStreak(savedStreak || 1);
    } else {
      const lastVisitDate = new Date(lastVisitStr);
      const todayDate = new Date(todayStr);
      const diffDays = Math.round((todayDate.getTime() - lastVisitDate.getTime()) / (1000 * 3600 * 24));

      if (diffDays === 1) {
        const newStreak = savedStreak + 1;
        localStorage.setItem('goddome_last_read_date', todayStr);
        localStorage.setItem('goddome_reading_streak', newStreak.toString());
        setStreak(newStreak);
      } else if (diffDays > 1) {
        localStorage.setItem('goddome_last_read_date', todayStr);
        localStorage.setItem('goddome_reading_streak', '1');
        setStreak(1);
      }
    }
  }, []);

  return (
    <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#D99B26]/15 border border-[#D99B26]/30 text-[#2C221E] text-xs font-semibold shadow-2xs">
      <span className="text-sm">🔥</span>
      <span>{streak} Day {streak === 1 ? 'Reading Habit' : 'Streak'}</span>
    </div>
  );
}
