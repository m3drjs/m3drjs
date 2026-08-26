'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Song, Artist } from '@/types';
import { useMusic } from '@/context/MusicContext';
import { 
  Play, 
  Pause, 
  MapPin, 
  Drum, 
  Music, 
  Sparkles, 
  Clock, 
  Radio, 
  Share2, 
  ListPlus, 
  ChevronLeft 
} from 'lucide-react';

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function SongClientView({
  song,
  artist,
  relatedSongs,
}: {
  song: Song;
  artist: Artist;
  relatedSongs: Song[];
}) {
  const { currentSong, isPlaying, playSong, togglePlay, addToQueue } = useMusic();
  const isThisCurrent = currentSong.id === song.id;
  const isThisPlaying = isThisCurrent && isPlaying;

  const handlePlayNow = () => {
    if (isThisCurrent) {
      togglePlay();
    } else {
      playSong(song);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Back button */}
      <div>
        <Link
          href="/songs"
          className="inline-flex items-center gap-1.5 text-xs text-desia-clay hover:text-desia-sand transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Songs</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-desia-surface/40 p-6 sm:p-8 rounded-3xl border border-desia-border/60">
        
        {/* Artwork */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border border-desia-border shadow-[0_12px_40px_rgba(0,0,0,0.7)] group">
            <Image
              src={song.artworkUrl}
              alt={song.title}
              fill
              priority
              className="object-cover"
            />
            {/* Play button overlay */}
            <button
              onClick={handlePlayNow}
              className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Play song"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-desia-red to-desia-ochre text-white flex items-center justify-center shadow-lg">
                {isThisPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
              </div>
            </button>
          </div>
        </div>

        {/* Song Info & Controls */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-desia-red/40 text-desia-gold text-xs font-bold uppercase tracking-wider border border-desia-ochre/30">
              {song.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-desia-clay px-3 py-1 rounded-full bg-desia-card border border-desia-border">
              <MapPin className="w-3.5 h-3.5 text-desia-ochre" />
              {song.district} District
            </span>
            <span className="text-xs font-mono text-desia-clay">
              {song.tempoBpm} BPM • {formatTime(song.duration)}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-desia-sand leading-tight">
            {song.title}
          </h1>

          {song.desiaTitle && (
            <p className="text-lg sm:text-xl text-desia-gold font-serif">
              {song.desiaTitle}
            </p>
          )}

          <div className="flex items-center gap-3 pt-1">
            <Link
              href={`/artist/${artist.slug}`}
              className="flex items-center gap-2 group"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-desia-border">
                <Image
                  src={artist.avatarUrl}
                  alt={artist.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium text-desia-sand group-hover:text-desia-gold transition-colors underline-offset-4 group-hover:underline">
                {song.artist}
              </span>
            </Link>
            <span className="text-desia-clay">•</span>
            <span className="text-xs text-desia-clay">{song.album}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={handlePlayNow}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-desia-red to-desia-ochre text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-desia-red/20 hover:scale-105 active:scale-95 transition-all"
            >
              {isThisPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause Track</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                  <span>Listen Now</span>
                </>
              )}
            </button>

            <button
              onClick={() => addToQueue(song)}
              className="px-4 py-3 rounded-full bg-desia-card hover:bg-desia-surface border border-desia-border text-xs text-desia-sand font-medium flex items-center gap-2 transition-colors"
            >
              <ListPlus className="w-4 h-4" />
              <span>Add to Queue</span>
            </button>

            <Link
              href="/"
              className="px-4 py-3 rounded-full bg-desia-surface hover:bg-desia-card border border-desia-border text-xs text-desia-gold font-medium flex items-center gap-2 transition-colors"
            >
              <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>Play in Dhemsa Room</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Cultural Story & Instruments */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Cultural Context */}
        <div className="md:col-span-7 space-y-6">
          
          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-desia-sand flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-desia-gold" />
              <span>The Story Behind The Song</span>
            </h2>
            <p className="text-sm text-desia-sand/80 leading-relaxed bg-desia-surface/40 p-5 rounded-2xl border border-desia-border">
              {song.culturalStory}
            </p>
          </div>

          {/* Lyrics breakdown */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-desia-sand flex items-center gap-2">
              <Music className="w-5 h-5 text-desia-gold" />
              <span>Lyrics & Verses</span>
            </h2>

            <div className="space-y-4">
              {song.lyrics.map((lyric, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-desia-surface/50 border border-desia-border space-y-2"
                >
                  <p className="text-base font-serif font-semibold text-desia-sand leading-relaxed">
                    {lyric.odia}
                  </p>
                  <p className="text-xs font-mono text-desia-gold/90 italic">
                    “{lyric.transliteration}”
                  </p>
                  <p className="text-xs text-desia-clay pt-2 border-t border-desia-border/40">
                    <strong className="text-desia-sand/80">Translation:</strong> {lyric.translation}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar: Instruments, Dance, & Artist info */}
        <div className="md:col-span-5 space-y-6">
          
          {/* Instruments */}
          <div className="p-5 rounded-2xl bg-desia-surface/50 border border-desia-border space-y-3">
            <h3 className="text-sm font-serif font-bold text-desia-sand flex items-center gap-2">
              <Drum className="w-4 h-4 text-desia-gold" />
              <span>Featured Instruments</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {song.instruments.map((inst) => (
                <span
                  key={inst}
                  className="px-3 py-1.5 rounded-xl bg-desia-card border border-desia-border text-xs text-desia-sand font-medium"
                >
                  {inst}
                </span>
              ))}
            </div>
          </div>

          {/* Dance Steps */}
          {song.danceType && (
            <div className="p-5 rounded-2xl bg-desia-surface/50 border border-desia-border space-y-2">
              <h3 className="text-sm font-serif font-bold text-desia-gold">
                Dhemsa Dance Type
              </h3>
              <p className="text-xs font-medium text-desia-sand">{song.danceType}</p>
              <p className="text-xs text-desia-clay leading-relaxed">
                Step with the group in continuous linked circular formation. Match the lead dancer&apos;s heel-toe accents as the Tamak tempo accelerates.
              </p>
            </div>
          )}

          {/* Artist Card preview */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-desia-card to-desia-surface border border-desia-border space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-desia-clay">
              About the Artist
            </h3>
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-desia-border flex-shrink-0">
                <Image
                  src={artist.avatarUrl}
                  alt={artist.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-serif font-bold text-desia-sand truncate">
                  {artist.name}
                </h4>
                <p className="text-[11px] text-desia-clay">{artist.title}</p>
              </div>
            </div>
            <p className="text-xs text-desia-sand/70 line-clamp-3 leading-relaxed">
              {artist.bio}
            </p>
            <Link
              href={`/artist/${artist.slug}`}
              className="inline-block text-xs text-desia-ochre hover:text-desia-gold font-medium transition-colors"
            >
              View Full Profile →
            </Link>
          </div>

        </div>

      </div>

      {/* Related songs */}
      {relatedSongs.length > 0 && (
        <div className="pt-8 border-t border-desia-border/60 space-y-4">
          <h2 className="text-xl font-serif font-bold text-desia-sand">
            More Songs from {song.district} & {song.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedSongs.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => playSong(item)}
                className="group p-3.5 rounded-2xl bg-desia-surface/50 border border-desia-border/40 hover:bg-desia-card hover:border-desia-ochre/40 cursor-pointer transition-all flex items-center gap-3.5"
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-desia-border flex-shrink-0">
                  <Image
                    src={item.artworkUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-medium text-desia-sand group-hover:text-desia-gold truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-desia-clay truncate">{item.artist}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-desia-card group-hover:bg-desia-red text-desia-sand flex items-center justify-center transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
