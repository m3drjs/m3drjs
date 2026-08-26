'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { initialSongs } from '@/data/songs';
import { Song, CategoryType } from '@/types';
import { useMusic } from '@/context/MusicContext';
import { 
  Play, 
  Pause, 
  Search, 
  Filter, 
  ListPlus, 
  Clock, 
  Disc, 
  MapPin, 
  BookOpen, 
  ChevronRight,
  Flame
} from 'lucide-react';

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

const CATEGORIES: ('All' | CategoryType)[] = [
  'All',
  'Dhemsa',
  'Desia Folk',
  'Festival / Parab',
  'Wedding / Baha',
  'Traditional',
  'Dance',
  'Ritual / Jagar',
  'New Releases'
];

const DISTRICTS = ['All Districts', 'Koraput', 'Malkangiri', 'Nabarangpur', 'Rayagada', 'Kandhamal'];

export default function SongsPage() {
  const { currentSong, isPlaying, playSong, togglePlay, addToQueue, setIsLyricsOpen } = useMusic();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Districts');
  const [sortBy, setSortBy] = useState<'popular' | 'duration' | 'bpm' | 'title'>('popular');
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const filteredSongs = useMemo(() => {
    return initialSongs
      .filter((song) => {
        const matchesQuery = 
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.album.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.instruments.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCat = 
          selectedCategory === 'All' || 
          song.category === selectedCategory ||
          (selectedCategory === 'Dance' && song.category === 'Dhemsa');

        const matchesDist = 
          selectedDistrict === 'All Districts' || 
          song.district === selectedDistrict;

        return matchesQuery && matchesCat && matchesDist;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.playCount - a.playCount;
        if (sortBy === 'duration') return b.duration - a.duration;
        if (sortBy === 'bpm') return b.tempoBpm - a.tempoBpm;
        return a.title.localeCompare(b.title);
      });
  }, [searchQuery, selectedCategory, selectedDistrict, sortBy]);

  const handleAddToQueue = (song: Song) => {
    addToQueue(song);
    setAddedToast(song.title);
    setTimeout(() => setAddedToast(null), 2000);
  };

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Toast Alert */}
      {addedToast && (
        <div className="fixed top-16 right-6 z-50 bg-desia-surface border border-desia-gold px-4 py-2 rounded-xl text-xs text-desia-gold shadow-xl animate-fadeIn">
          Added &quot;{addedToast}&quot; to queue!
        </div>
      )}

      {/* Page Header */}
      <div className="mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-desia-surface border border-desia-border text-xs text-desia-gold">
          <span>ମ୍ୟୁଜିକ ଲାଇବ୍ରେରୀ</span>
          <span>•</span>
          <span>Desia Sound Archive</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-desia-sand tracking-wide">
          Desia & Dhemsa Songs
        </h1>
        <p className="text-sm text-desia-clay max-w-2xl">
          Explore authentic recordings, festival chants, and timeless dance rhythms from the southern tribal highlands of Odisha.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4 mb-8 bg-desia-surface/50 p-4 sm:p-5 rounded-2xl border border-desia-border/60 backdrop-blur-sm">
        
        {/* Search input + District + Sort */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-desia-clay absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by song name, singer, instruments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-desia-card rounded-xl border border-desia-border text-sm text-desia-sand placeholder:text-desia-clay/60 focus:outline-none focus:border-desia-ochre"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full py-2 px-3 bg-desia-card rounded-xl border border-desia-border text-sm text-desia-sand focus:outline-none focus:border-desia-ochre cursor-pointer"
            >
              {DISTRICTS.map((d) => (
                <option key={d} value={d} className="bg-desia-card text-desia-sand">
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2 px-3 bg-desia-card rounded-xl border border-desia-border text-sm text-desia-sand focus:outline-none focus:border-desia-ochre cursor-pointer"
            >
              <option value="popular">Most Listened</option>
              <option value="bpm">Fastest Tempo (BPM)</option>
              <option value="duration">Longest Duration</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-desia-red to-desia-ochre text-desia-sand shadow-sm'
                  : 'bg-desia-card hover:bg-desia-border/50 text-desia-clay hover:text-desia-sand border border-desia-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Song List Results */}
      {filteredSongs.length === 0 ? (
        <div className="text-center py-16 bg-desia-surface/30 rounded-2xl border border-desia-border/40">
          <Disc className="w-12 h-12 text-desia-clay/40 mx-auto mb-3" />
          <h3 className="text-base font-serif font-bold text-desia-sand">No songs found</h3>
          <p className="text-xs text-desia-clay mt-1">Try broadening your search or resetting category filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedDistrict('All Districts');
            }}
            className="mt-4 px-4 py-1.5 rounded-full bg-desia-red/40 hover:bg-desia-red text-xs text-desia-sand font-medium transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredSongs.map((song, idx) => {
            const isThisPlaying = isPlaying && currentSong.id === song.id;
            const isThisCurrent = currentSong.id === song.id;

            return (
              <div
                key={song.id}
                className={`group p-3 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  isThisCurrent
                    ? 'bg-desia-red/20 border-desia-ochre/50 shadow-lg shadow-black/40'
                    : 'bg-desia-surface/40 hover:bg-desia-surface border-desia-border/50 hover:border-desia-border'
                }`}
              >
                {/* Left: Index + Play button + Artwork + Metadata */}
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  
                  {/* Track Number / Play trigger button */}
                  <button
                    onClick={() => {
                      if (isThisCurrent) togglePlay();
                      else playSong(song);
                    }}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                      isThisPlaying
                        ? 'bg-desia-ochre text-black shadow-[0_0_12px_rgba(245,158,11,0.6)]'
                        : 'bg-desia-card hover:bg-desia-red text-desia-sand border border-desia-border hover:border-desia-ochre'
                    }`}
                    aria-label={isThisPlaying ? 'Pause song' : 'Play song'}
                  >
                    {isThisPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>

                  {/* Artwork thumbnail */}
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-desia-border/80 flex-shrink-0">
                    <Image
                      src={song.artworkUrl}
                      alt={song.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Song Title & Artist Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/song/${song.slug}`}
                        className={`text-sm sm:text-base font-serif font-bold hover:underline truncate ${
                          isThisCurrent ? 'text-desia-gold' : 'text-desia-sand'
                        }`}
                      >
                        {song.title}
                      </Link>
                      {song.featured && (
                        <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-desia-red/40 text-[9px] font-bold text-desia-gold uppercase tracking-wider">
                          <Flame className="w-2.5 h-2.5" /> Featured
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-desia-clay mt-0.5 flex-wrap">
                      <Link
                        href={`/artist/${song.artistId === 'artist-1' ? 'gurubari-muduli' : song.artistId === 'artist-2' ? 'laxman-bhatra' : song.artistId === 'artist-4' ? 'master-damodar-majhi' : 'gurubari-muduli'}`}
                        className="hover:text-desia-gold transition-colors truncate"
                      >
                        {song.artist}
                      </Link>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[11px] text-desia-ochre">
                        <MapPin className="w-3 h-3" />
                        {song.district}
                      </span>
                      <span className="hidden md:inline">•</span>
                      <span className="hidden md:inline text-[11px] text-desia-clay/80">
                        {song.instruments.slice(0, 2).join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Category badge, Duration, Add to Queue, Details */}
                <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                  <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-desia-card border border-desia-border text-[10px] uppercase font-bold text-desia-clay">
                    {song.category}
                  </span>

                  <span className="text-xs font-mono text-desia-clay">
                    {formatTime(song.duration)}
                  </span>

                  {/* Add to queue button */}
                  <button
                    onClick={() => handleAddToQueue(song)}
                    className="p-2 rounded-lg text-desia-clay hover:text-desia-gold hover:bg-desia-card transition-colors"
                    title="Add to queue"
                    aria-label="Add to queue"
                  >
                    <ListPlus className="w-4 h-4" />
                  </button>

                  {/* Link to song details */}
                  <Link
                    href={`/song/${song.slug}`}
                    className="p-2 rounded-lg text-desia-clay hover:text-desia-sand hover:bg-desia-card transition-colors hidden sm:block"
                    title="View lyrics and cultural details"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Play Room Banner */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-desia-red/20 via-desia-surface to-desia-surface border border-desia-ochre/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h3 className="text-base font-serif font-bold text-desia-sand">
            Experience Dhemsa in the Live Room
          </h3>
          <p className="text-xs text-desia-clay mt-1">
            Listen in sync with other listeners across the globe with visual ambient lighting.
          </p>
        </div>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-desia-red to-desia-ochre text-white font-medium text-xs shadow-lg hover:shadow-desia-ochre/30 hover:scale-105 transition-all whitespace-nowrap"
        >
          Enter Live Room
        </Link>
      </div>

    </div>
  );
}
