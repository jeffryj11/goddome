'use client';

import { useAudio } from '@/context/AudioContext';
import { ChristianCrossIcon, MenorahIcon } from './FaithIcons';

export default function StickyAudioPlayer() {
  const { currentTrack, isPlaying, loading, currentTime, duration, togglePlay, seek, closePlayer } = useAudio();

  if (!currentTrack) return null;

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0 || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const hasValidDuration = duration > 0 && isFinite(duration);
  const timeRemaining = hasValidDuration && duration > currentTime ? duration - currentTime : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-t border-amber-500/20 text-[#FAF6F0] px-4 py-3 shadow-2xl animate-slide-up">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Track Metadata & Badge */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 border border-amber-500/30">
            <ChristianCrossIcon className="w-4 h-4 text-amber-400" />
          </div>
          <div className="min-w-0 flex-grow sm:flex-grow-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                ElevenLabs Voice
              </span>
              {isPlaying && (
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
                  Streaming
                </span>
              )}
            </div>
            <h5 className="font-serif text-sm font-bold text-white truncate max-w-[220px] sm:max-w-xs">
              {currentTrack.title}
            </h5>
            <p className="text-[11px] text-[#FAF6F0]/70 truncate">
              Narrated in {currentTrack.author || 'Jeanna’ Mead'}’s Voice
            </p>
          </div>
        </div>

        {/* Controls & Scrubber */}
        <div className="flex items-center space-x-4 w-full sm:max-w-md">
          <button
            onClick={togglePlay}
            disabled={loading}
            className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-md transition-transform transform active:scale-95 cursor-pointer flex-shrink-0 disabled:opacity-50"
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : isPlaying ? (
              <svg className="w-4 h-4 fill-current text-slate-950" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4 fill-current text-slate-950 ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          <div className="flex-grow flex flex-col gap-1">
            <input
              type="range"
              min={0}
              max={hasValidDuration ? duration : Math.max(currentTime + 10, 100)}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Audio seeker progress"
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-[#FAF6F0]/70 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{hasValidDuration ? `-${formatTime(timeRemaining)}` : 'Live Stream'}</span>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={closePlayer}
          className="text-[#FAF6F0]/60 hover:text-white text-xs font-bold p-1 transition-colors cursor-pointer"
          title="Close Audio Player"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
