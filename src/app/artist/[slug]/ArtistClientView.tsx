'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Artist, Song } from '@/types';
import { useMusic } from '@/context/MusicContext';
import { 
  Play, 
  Pause, 
  MapPin, 
  Users, 
  Drum, 
  Music, 
  ChevronLeft, 
  Share2, 
  ListPlus,
  Radio
} from 'lucide-react';

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function ArtistClientView({
  artist,
  popularSongs,
  allSongs,
}: {
  artist: Artist;
  popularSongs: Song[];
  allSongs: Song[];
}) {
  const { currentSong, isPlaying, playSong, togglePlay, addToQueue } = useMusic();

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Back button */}
      <div>
        <Link
          href="/artists"
          className="inline-flex items-center gap-1.5 text-xs text-desia-clay hover:text-desia-sand transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Artists</span>
        </Link>
      </div>

      {/* Artist Profile Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-desia-surface/70 via-desia-surface/40 to-desia-card/50 border border-desia-border/60 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-left">
          
          {/* Avatar */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-2 border-desia-ochre/40 shadow-2xl flex-shrink-0">
            <Image
              src={artist.avatarUrl}
              alt={artist.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="space-y-3 flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-3 py-1 rounded-full bg-desia-red/40 text-desia-gold text-xs font-bold uppercase tracking-wider border border-desia-ochre/30">
                Verified Folk Master
              </span>
              <span className="flex items-center gap-1 text-xs text-desia-sand px-3 py-1 rounded-full bg-desia-card border border-desia-border">
                <MapPin className="w-3.5 h-3.5 text-desia-ochre" />
                {artist.district}, Odisha
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-desia-sand tracking-wide">
              {artist.name}
            </h1>

            <p className="text-sm text-desia-gold font-medium">
              {artist.title} • <span className="text-desia-clay">{artist.tribalAffiliation}</span>
            </p>

            <p className="text-xs sm:text-sm text-desia-sand/80 leading-relaxed max-w-2xl pt-1">
              {artist.bio}
            </p>

            {/* Instruments */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              <span className="text-xs text-desia-clay flex items-center gap-1">
                <Drum className="w-3.5 h-3.5 text-desia-ochre" />
                Instruments:
              </span>
              {artist.instruments.map((inst) => (
                <span
                  key={inst}
                  className="px-2.5 py-0.5 rounded-lg bg-desia-card border border-desia-border text-xs text-desia-sand font-medium"
                >
                  {inst}
                </span>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Popular Songs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-desia-border/60">
          <h2 className="text-xl font-serif font-bold text-desia-sand flex items-center gap-2">
            <Music className="w-5 h-5 text-desia-gold" />
            <span>Popular Songs</span>
          </h2>
          <span className="text-xs text-desia-clay font-mono">{popularSongs.length} tracks</span>
        </div>

        <div className="space-y-2.5">
          {popularSongs.map((song, index) => {
            const isThisCurrent = currentSong.id === song.id;
            const isThisPlaying = isThisCurrent && isPlaying;

            return (
              <div
                key={song.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  isThisCurrent
                    ? 'bg-desia-red/20 border-desia-ochre/50 shadow-md'
                    : 'bg-desia-surface/40 hover:bg-desia-surface border-desia-border/50'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <button
                    onClick={() => {
                      if (isThisCurrent) togglePlay();
                      else playSong(song);
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                      isThisPlaying
                        ? 'bg-desia-ochre text-black'
                        : 'bg-desia-card hover:bg-desia-red text-desia-sand border border-desia-border'
                    }`}
                    aria-label="Play song"
                  >
                    {isThisPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>

                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-desia-border flex-shrink-0">
                    <Image
                      src={song.artworkUrl}
                      alt={song.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1 truncate">
                    <Link
                      href={`/song/${song.slug}`}
                      className={`text-sm font-serif font-bold hover:underline truncate block ${
                        isThisCurrent ? 'text-desia-gold' : 'text-desia-sand'
                      }`}
                    >
                      {song.title}
                    </Link>
                    <p className="text-xs text-desia-clay truncate">
                      {song.album} • {song.danceType || song.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs font-mono text-desia-clay">
                    {formatTime(song.duration)}
                  </span>
                  <button
                    onClick={() => addToQueue(song)}
                    className="p-2 text-desia-clay hover:text-desia-gold transition-colors"
                    title="Add to queue"
                    aria-label="Add to queue"
                  >
                    <ListPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* All Discography Section */}
      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-serif font-bold text-desia-sand">
          Complete Discography & Field Recordings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allSongs.map((song) => (
            <div
              key={song.id}
              onClick={() => playSong(song)}
              className="p-4 rounded-2xl bg-desia-surface/40 hover:bg-desia-surface border border-desia-border/50 hover:border-desia-ochre/40 cursor-pointer transition-all space-y-3 group"
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-desia-border">
                <Image
                  src={song.artworkUrl}
                  alt={song.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-desia-ochre text-black flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-desia-ochre">
                  {song.category}
                </span>
                <h3 className="text-sm font-serif font-bold text-desia-sand group-hover:text-desia-gold truncate mt-0.5">
                  {song.title}
                </h3>
                <p className="text-xs text-desia-clay mt-1">
                  {song.tempoBpm} BPM • {formatTime(song.duration)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
