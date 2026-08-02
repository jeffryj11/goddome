'use client';

import { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  src?: string;
  storyId?: string;
  storyText?: string;
  title?: string;
  author?: string;
}

export default function AudioPlayer({
  src,
  storyId,
  storyText,
  title = "Listen to Devotional",
  author = "Jeanna’ Mead",
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | undefined>(src);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (src) {
      setAudioSrc(src);
    }
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioSrc]);

  const handleGenerateAudio = async () => {
    if (!storyText) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: storyText, storyId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to synthesize audio with ElevenLabs.');
      }

      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      setAudioSrc(objectUrl);

      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }, 300);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'ElevenLabs API key not configured yet.');
    } finally {
      setLoading(false);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audioSrc && storyText) {
      handleGenerateAudio();
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = Number(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIndex = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const newRate = speeds[nextIndex];
    setPlaybackRate(newRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="my-8 bg-gradient-to-r from-[#2C221E] to-[#3D2F2A] text-[#FAF6F0] rounded-2xl p-6 shadow-md border border-[#D99B26]/30 relative overflow-hidden">
      {audioSrc && <audio ref={audioRef} src={audioSrc} preload="metadata" />}

      {/* Header Info */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#D99B26]/20 text-[#D99B26] flex items-center justify-center shadow-xs">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#D99B26]">
              ElevenLabs AI Voice
            </span>
            <h4 className="font-serif text-lg font-bold text-[#FAF6F0] leading-tight">
              {title}
            </h4>
            <p className="text-xs text-[#FAF6F0]/70 font-light">
              Narrated in {author}’s Cloned Voice
            </p>
          </div>
        </div>

        {audioSrc && (
          <button
            onClick={toggleSpeed}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-[#D99B26] text-xs font-semibold rounded-full transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99B26]"
            title="Playback Speed"
          >
            {playbackRate}x
          </button>
        )}
      </div>

      {/* Player Controls & Scrubber */}
      {audioSrc ? (
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-[#D99B26] hover:bg-[#c28a21] text-[#2C221E] flex items-center justify-center shadow-md transition-transform transform active:scale-95 cursor-pointer flex-shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99B26]"
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            {isPlaying ? (
              <svg className="w-5 h-5 fill-current text-[#2C221E]" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-current text-[#2C221E] ml-0.5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          <div className="flex-grow flex flex-col gap-1">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              aria-label="Audio seeker progress"
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#D99B26]"
            />
            <div className="flex justify-between text-[11px] text-[#FAF6F0]/70 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/10">
          <p className="text-xs text-[#FAF6F0]/80">
            Listen to Jeanna narrate this devotional using ElevenLabs voice technology.
          </p>

          <button
            onClick={handleGenerateAudio}
            disabled={loading}
            className="px-5 py-2.5 bg-[#D99B26] hover:bg-[#c28a21] text-[#2C221E] font-bold text-xs rounded-full shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap disabled:opacity-50"
          >
            {loading ? 'Synthesizing Voice...' : '🎙️ Play AI Audio'}
          </button>
        </div>
      )}

      {error && (
        <p className="text-xs text-[#A83226] bg-[#A83226]/10 p-2.5 rounded-lg mt-3 font-semibold">
          {error}
        </p>
      )}
    </div>
  );
}
