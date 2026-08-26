'use client';

import React from 'react';
import Image from 'next/image';
import { useMusic } from '@/context/MusicContext';
import { X, BookOpen, Music2, Drum, Sparkles, MapPin } from 'lucide-react';

export function LyricsDrawer() {
  const { currentSong, isLyricsOpen, setIsLyricsOpen } = useMusic();

  if (!isLyricsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop click to close */}
      <div 
        className="absolute inset-0"
        onClick={() => setIsLyricsOpen(false)}
      />

      {/* Drawer panel */}
      <div className="relative w-full max-w-lg bg-desia-bg border-l border-desia-border shadow-2xl flex flex-col h-full z-10 overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-desia-border flex items-center justify-between bg-desia-surface/80">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-desia-gold" />
            <h2 className="text-base font-serif font-bold text-desia-sand tracking-wide">
              Desia Lyrics & Lore
            </h2>
          </div>
          <button
            onClick={() => setIsLyricsOpen(false)}
            className="p-1.5 rounded-full text-desia-clay hover:text-desia-sand hover:bg-desia-card transition-colors"
            aria-label="Close lyrics drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin scrollbar-thumb-desia-border">
          
          {/* Song Overview */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-desia-surface/50 border border-desia-border/60">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-desia-border flex-shrink-0">
              <Image
                src={currentSong.artworkUrl}
                alt={currentSong.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-desia-gold tracking-wider bg-desia-red/40 px-2 py-0.5 rounded">
                {currentSong.category}
              </span>
              <h3 className="text-base font-serif font-bold text-desia-sand truncate mt-1">
                {currentSong.title}
              </h3>
              <p className="text-xs text-desia-clay truncate">{currentSong.artist}</p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-desia-clay/80">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-desia-ochre" />
                  {currentSong.district}
                </span>
                <span>•</span>
                <span>{currentSong.tempoBpm} BPM</span>
              </div>
            </div>
          </div>

          {/* Cultural Lore & Context */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-desia-gold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cultural Significance</span>
            </div>
            <p className="text-xs sm:text-sm text-desia-sand/80 leading-relaxed font-sans bg-desia-card/50 p-4 rounded-xl border border-desia-border/40">
              {currentSong.culturalStory}
            </p>
          </div>

          {/* Dance Style & Choreography */}
          {currentSong.danceType && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-desia-gold">
                <Music2 className="w-3.5 h-3.5" />
                <span>Dhemsa Choreography</span>
              </div>
              <div className="bg-desia-card/50 p-3.5 rounded-xl border border-desia-border/40 text-xs text-desia-sand/80">
                <p className="font-medium text-desia-ochre mb-1">{currentSong.danceType}</p>
                <p className="text-desia-clay text-[11px] leading-relaxed">
                  In Dhemsa, dancers hold waist or shoulders in an interlocking link. The right foot leads with a forward stomp followed by a left drag, pivoting synchronously to the Nishan accents.
                </p>
              </div>
            </div>
          )}

          {/* Instruments Used */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-desia-gold">
              <Drum className="w-3.5 h-3.5" />
              <span>Instruments Featured</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentSong.instruments.map((inst) => (
                <span
                  key={inst}
                  className="px-3 py-1 rounded-full bg-desia-surface border border-desia-border text-xs text-desia-sand"
                >
                  {inst}
                </span>
              ))}
            </div>
          </div>

          {/* Desia Song Verses */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between pb-1 border-b border-desia-border/60">
              <span className="text-xs font-semibold uppercase tracking-wider text-desia-gold">
                Song Verses & Translations
              </span>
              <span className="text-[10px] text-desia-clay">Desia Odia • Roman • English</span>
            </div>

            <div className="space-y-4">
              {currentSong.lyrics.map((verse, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl bg-desia-surface/70 border border-desia-border/60 space-y-2 hover:border-desia-ochre/40 transition-colors"
                >
                  <p className="text-sm sm:text-base font-serif font-semibold text-desia-sand leading-relaxed">
                    {verse.odia}
                  </p>
                  <p className="text-xs font-mono text-desia-gold/90 italic">
                    “{verse.transliteration}”
                  </p>
                  <p className="text-xs text-desia-clay pt-1 border-t border-desia-border/30">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-desia-clay/80 block mb-0.5">Meaning:</span>
                    {verse.translation}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-desia-border bg-desia-surface/80 flex items-center justify-between">
          <span className="text-[11px] text-desia-clay">Preserving Desia Oral Traditions</span>
          <button
            onClick={() => setIsLyricsOpen(false)}
            className="px-4 py-1.5 rounded-full bg-desia-red/40 hover:bg-desia-red border border-desia-ochre/40 text-xs text-desia-sand transition-colors font-medium"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
