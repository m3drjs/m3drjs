'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useMusic } from '@/context/MusicContext';
import { initialSongs } from '@/data/songs';
import { initialArtists } from '@/data/artists';
import { Search, X, Play, User, Music, MapPin } from 'lucide-react';
import Link from 'next/link';

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, playSong } = useMusic();
  const [query, setQuery] = useState('');

  // Keyboard shortcut Cmd+K or Ctrl+K to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const filteredSongs = useMemo(() => {
    if (!query.trim()) return initialSongs;
    const q = query.toLowerCase();
    return initialSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(q) ||
        song.artist.toLowerCase().includes(q) ||
        song.album.toLowerCase().includes(q) ||
        song.category.toLowerCase().includes(q) ||
        song.district.toLowerCase().includes(q) ||
        song.instruments.some((inst) => inst.toLowerCase().includes(q))
    );
  }, [query]);

  const filteredArtists = useMemo(() => {
    if (!query.trim()) return initialArtists.slice(0, 3);
    const q = query.toLowerCase();
    return initialArtists.filter(
      (artist) =>
        artist.name.toLowerCase().includes(q) ||
        artist.district.toLowerCase().includes(q) ||
        artist.title.toLowerCase().includes(q) ||
        artist.tribalAffiliation.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Click backdrop to close */}
      <div 
        className="absolute inset-0"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-desia-bg border border-desia-border rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-desia-border bg-desia-surface flex items-center gap-3">
          <Search className="w-5 h-5 text-desia-gold" />
          <input
            type="text"
            placeholder="Search songs, artists, districts, instruments (e.g. Mahuri, Koraput)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base text-desia-sand placeholder:text-desia-clay/60 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-desia-clay hover:text-desia-sand px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-full text-desia-clay hover:text-desia-sand hover:bg-desia-card"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 scrollbar-thin scrollbar-thumb-desia-border">
          
          {/* Quick Categories chips if no query */}
          {!query && (
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-desia-clay">
                Popular Categories & Districts
              </span>
              <div className="flex flex-wrap gap-2">
                {['Koraput', 'Dhemsa', 'Mahuri', 'Malkangiri', 'Nabarangpur', 'Parab', 'Festival', 'Rayagada'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 rounded-full bg-desia-surface border border-desia-border hover:border-desia-ochre/50 text-xs text-desia-sand transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Songs Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-desia-border/50">
              <span className="text-xs font-semibold uppercase tracking-wider text-desia-gold flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5" />
                Desia Songs ({filteredSongs.length})
              </span>
            </div>

            {filteredSongs.length === 0 ? (
              <p className="text-xs text-desia-clay italic py-3 text-center">
                No songs match &quot;{query}&quot;
              </p>
            ) : (
              <div className="space-y-2">
                {filteredSongs.map((song) => (
                  <div
                    key={song.id}
                    onClick={() => {
                      playSong(song);
                      setIsSearchOpen(false);
                    }}
                    className="group p-3 rounded-xl bg-desia-surface/50 border border-desia-border/40 hover:bg-desia-card hover:border-desia-ochre/40 flex items-center justify-between gap-3 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-desia-border flex-shrink-0">
                        <Image
                          src={song.artworkUrl}
                          alt={song.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="truncate">
                        <p className="text-xs sm:text-sm font-medium text-desia-sand group-hover:text-desia-gold truncate">
                          {song.title}
                        </p>
                        <p className="text-[11px] text-desia-clay truncate">
                          {song.artist} • <span className="text-desia-ochre">{song.district}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold text-desia-clay bg-desia-card px-2 py-0.5 rounded border border-desia-border/60">
                        {song.category}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-desia-red/40 group-hover:bg-desia-red text-desia-sand flex items-center justify-center transition-colors">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Artists Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-desia-border/50">
              <span className="text-xs font-semibold uppercase tracking-wider text-desia-gold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Featured Artists ({filteredArtists.length})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredArtists.map((artist) => (
                <Link
                  key={artist.id}
                  href={`/artist/${artist.slug}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="p-3 rounded-xl bg-desia-surface/40 border border-desia-border/40 hover:bg-desia-card hover:border-desia-ochre/40 flex items-center gap-3 transition-colors"
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-desia-border flex-shrink-0">
                    <Image
                      src={artist.avatarUrl}
                      alt={artist.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-medium text-desia-sand hover:text-desia-gold truncate">
                      {artist.name}
                    </p>
                    <p className="text-[10px] text-desia-clay flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-desia-ochre" />
                      {artist.district} • {artist.tribalAffiliation}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-desia-border bg-desia-surface/90 text-center text-[11px] text-desia-clay">
          Press <kbd className="px-1.5 py-0.5 rounded bg-desia-card border border-desia-border text-desia-sand font-mono">ESC</kbd> to exit search
        </div>

      </div>
    </div>
  );
}
