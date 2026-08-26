'use client';

import React from 'react';
import Image from 'next/image';
import { useMusic } from '@/context/MusicContext';
import { X, ListMusic, Trash2, Shuffle, Play } from 'lucide-react';

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function QueueSheet() {
  const { 
    queue, 
    currentSong, 
    isQueueOpen, 
    setIsQueueOpen, 
    playSong, 
    removeFromQueue, 
    toggleShuffle,
    clearQueue 
  } = useMusic();

  if (!isQueueOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end lg:justify-center lg:items-center bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Click outside to close */}
      <div 
        className="absolute inset-0"
        onClick={() => setIsQueueOpen(false)}
      />

      {/* Sheet container */}
      <div className="relative w-full lg:max-w-xl max-h-[85vh] bg-desia-bg border-t lg:border border-desia-border lg:rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-desia-border bg-desia-surface/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListMusic className="w-5 h-5 text-desia-gold" />
            <h2 className="text-base font-serif font-bold text-desia-sand tracking-wide">
              Upcoming Queue ({queue.length})
            </h2>
          </div>
          <button
            onClick={() => setIsQueueOpen(false)}
            className="p-1.5 rounded-full text-desia-clay hover:text-desia-sand hover:bg-desia-card transition-colors"
            aria-label="Close queue"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-4 py-2 bg-desia-card/50 border-b border-desia-border/40 flex items-center justify-between text-xs text-desia-clay">
          <button
            onClick={toggleShuffle}
            className="flex items-center gap-1.5 hover:text-desia-gold transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Shuffle List</span>
          </button>
          {queue.length > 1 && (
            <button
              onClick={clearQueue}
              className="hover:text-red-400 transition-colors"
            >
              Keep Current Only
            </button>
          )}
        </div>

        {/* Songs list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 scrollbar-thin scrollbar-thumb-desia-border">
          {queue.map((song, index) => {
            const isCurrent = song.id === currentSong.id;
            return (
              <div
                key={`${song.id}-${index}`}
                onClick={() => playSong(song)}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-desia-red/25 border-desia-ochre/50 shadow-sm'
                    : 'bg-desia-surface/50 border-desia-border/40 hover:bg-desia-card/80 hover:border-desia-border'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="text-xs font-mono font-bold text-desia-clay w-6 text-center">
                    {isCurrent ? '▶' : `${(index + 1).toString().padStart(2, '0')}`}
                  </span>

                  <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-desia-border flex-shrink-0">
                    <Image
                      src={song.artworkUrl}
                      alt={song.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="truncate">
                    <p className={`text-xs sm:text-sm font-medium truncate ${isCurrent ? 'text-desia-gold' : 'text-desia-sand'}`}>
                      {song.title}
                    </p>
                    <p className="text-[11px] text-desia-clay truncate">
                      {song.artist} • {song.district}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-desia-clay">
                    {formatTime(song.duration)}
                  </span>
                  {queue.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromQueue(song.id);
                      }}
                      className="p-1 text-desia-clay hover:text-red-400 transition-colors"
                      title="Remove from queue"
                      aria-label="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-desia-border bg-desia-surface/80 text-center">
          <button
            onClick={() => setIsQueueOpen(false)}
            className="w-full py-2 rounded-xl bg-desia-surface hover:bg-desia-card border border-desia-border text-xs font-medium text-desia-sand transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
