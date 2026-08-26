'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useMusic } from '@/context/MusicContext';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Radio, 
  Maximize2,
  ListMusic,
  BookOpen
} from 'lucide-react';

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function GlobalAudioPlayer() {
  const pathname = usePathname();
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    listenerCount,
    togglePlay,
    nextSong,
    prevSong,
    seekTo,
    setVolume,
    toggleMute,
    setIsLyricsOpen,
    setIsQueueOpen
  } = useMusic();

  // If on the homepage '/', the full music room is displayed, so we hide the bottom mini-player to avoid duplication
  if (pathname === '/') {
    return null;
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = (parseFloat(e.target.value) / 100) * duration;
    seekTo(time);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-desia-bg/95 backdrop-blur-xl border-t border-desia-border shadow-[0_-8px_30px_rgba(0,0,0,0.7)] animate-slideUp">
      
      {/* Interactive top progress bar */}
      <div className="relative group w-full h-1 bg-desia-surface cursor-pointer">
        <div 
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-desia-red via-desia-ochre to-desia-gold"
          style={{ width: `${progressPercent}%` }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={progressPercent}
          onChange={handleSeek}
          aria-label="Progress bar"
          className="absolute inset-0 opacity-0 cursor-pointer w-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Left: Track Information & Artwork */}
        <div className="flex items-center gap-3 min-w-0 max-w-[280px] sm:max-w-xs">
          <Link href="/" className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-desia-border/80 flex-shrink-0 group">
            <Image
              src={currentSong.artworkUrl}
              alt={currentSong.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="flex items-end gap-0.5 h-3">
                  <div className="w-0.5 bg-desia-gold h-full animate-wave-bar"></div>
                  <div className="w-0.5 bg-desia-gold h-2/3 animate-wave-bar" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-0.5 bg-desia-gold h-4/5 animate-wave-bar" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
          </Link>

          <div className="truncate">
            <Link 
              href="/"
              className="text-xs sm:text-sm font-medium text-desia-sand hover:text-desia-gold truncate block transition-colors"
            >
              {currentSong.title}
            </Link>
            <p className="text-[11px] text-desia-clay truncate">
              {currentSong.artist} • <span className="text-desia-ochre">{currentSong.district}</span>
            </p>
          </div>
        </div>

        {/* Center: Playback Controls */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={prevSong}
              className="p-1.5 text-desia-clay hover:text-desia-sand transition-colors"
              aria-label="Previous"
            >
              <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </button>

            <button
              onClick={togglePlay}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-desia-red to-desia-ochre text-white flex items-center justify-center shadow-[0_0_16px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 transition-all"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current pl-0.5" />
              )}
            </button>

            <button
              onClick={nextSong}
              className="p-1.5 text-desia-clay hover:text-desia-sand transition-colors"
              aria-label="Next"
            >
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-desia-clay">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Controls & Room Jump */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Lyrics button */}
          <button
            onClick={() => setIsLyricsOpen(true)}
            className="p-2 text-desia-clay hover:text-desia-gold transition-colors hidden sm:block"
            title="Lyrics & Lore"
            aria-label="Lyrics"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Queue toggle */}
          <button
            onClick={() => setIsQueueOpen(true)}
            className="p-2 text-desia-clay hover:text-desia-gold transition-colors"
            title="Queue"
            aria-label="Queue"
          >
            <ListMusic className="w-4 h-4" />
          </button>

          {/* Volume slider */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-desia-clay hover:text-desia-sand"
              aria-label="Toggle mute"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              aria-label="Volume"
              className="w-16 h-1 bg-desia-surface rounded-lg appearance-none cursor-pointer accent-desia-ochre"
            />
          </div>

          {/* Fullscreen Room link */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-desia-surface hover:bg-desia-card border border-desia-border text-xs text-desia-gold font-medium transition-colors"
            title="Return to live Music Room"
          >
            <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span className="hidden sm:inline">Enter Room</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
