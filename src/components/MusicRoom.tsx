'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMusic } from '@/context/MusicContext';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Repeat1, 
  Volume2, 
  VolumeX, 
  ListMusic, 
  BookOpen, 
  Radio, 
  Sparkles, 
  Heart, 
  Flame, 
  Share2,
  Trash2,
  Disc3,
  MapPin,
  Music2,
  ChevronRight,
  Info
} from 'lucide-react';

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function MusicRoom() {
  const {
    currentSong,
    queue,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    isRoomBroadcast,
    listenerCount,
    recentJoins,
    playSong,
    togglePlay,
    nextSong,
    prevSong,
    seekTo,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeatMode,
    removeFromQueue,
    toggleRoomBroadcast,
    sendReaction,
    setIsLyricsOpen,
    setIsQueueOpen,
  } = useMusic();

  const [copiedToast, setCopiedToast] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = (parseFloat(e.target.value) / 100) * duration;
    seekTo(time);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] pt-14 flex flex-col justify-between overflow-x-hidden select-none">
      
      {/* Dynamic Atmospheric Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-desia-bg">
        {/* Soft radial atmospheric glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-radial from-desia-red/20 via-desia-terracotta/10 to-transparent blur-3xl opacity-80 animate-pulse-subtle"></div>
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-gradient-radial from-desia-ochre/15 via-transparent to-transparent blur-3xl opacity-60"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-gradient-radial from-desia-darkred/25 via-transparent to-transparent blur-3xl opacity-70"></div>
        
        {/* Subtle Dhemsa Dance & Odisha Tribal Geometric Silhouette Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035] mix-blend-screen"
          style={{
            backgroundImage: `url('/images/artwork/koraputia-chokda.svg')`,
            backgroundSize: '800px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Subtle grain overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.015]"></div>
      </div>

      {/* Main Responsive Music Room Layout */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 flex-1 flex flex-col justify-center">
        
        {/* Desktop 3-Column Layout & Mobile Single Stream Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: BRANDING, ROOM STATE & LIVE REACTIONS (Desktop) */}
          {/* ======================================================== */}
          <div className="hidden lg:flex lg:col-span-3 flex-col space-y-6 text-left">
            
            {/* Branding Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-desia-red/20 border border-desia-red/30 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-[11px] uppercase tracking-wider text-desia-gold font-medium">
                  Live Dhemsa Room
                </span>
              </div>
              <h1 className="text-2xl xl:text-3xl font-serif font-bold text-desia-sand tracking-wide">
                DESIA DHEMSA
              </h1>
              <p className="text-xs text-desia-clay mt-1.5 leading-relaxed italic">
                “Where Desia Rhythm Never Stops.”
              </p>
            </div>

            {/* Live Listener Information Card */}
            <div className="p-4 rounded-2xl bg-desia-surface/60 border border-desia-border/60 backdrop-blur-md space-y-3 shadow-lg shadow-black/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-desia-sand/90 flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-desia-gold animate-pulse" />
                  Live Room Presence
                </span>
                <span className="text-xs font-mono font-bold text-desia-gold bg-desia-card px-2 py-0.5 rounded-full border border-desia-border">
                  ● {listenerCount}
                </span>
              </div>

              {/* Dynamic activity toast stream */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] text-desia-sand/70 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Circle synchronized across Odisha</span>
                </div>
                {recentJoins.slice(0, 2).map((join) => (
                  <div key={join.id} className="text-[10px] text-desia-clay flex items-center gap-1 truncate animate-fadeIn">
                    <span className="text-desia-ochre">↳</span>
                    <span><strong className="text-desia-sand/80">{join.name}</strong> from {join.district} joined</span>
                  </div>
                ))}
              </div>

              {/* Broadcast Sync Toggle */}
              <div className="pt-2 border-t border-desia-border/40 flex items-center justify-between text-[11px]">
                <span className="text-desia-clay">Stream Mode:</span>
                <button
                  onClick={toggleRoomBroadcast}
                  className={`px-2.5 py-1 rounded-md font-medium text-[10px] transition-colors ${
                    isRoomBroadcast
                      ? 'bg-desia-red/30 text-desia-gold border border-desia-red/50'
                      : 'bg-desia-card text-desia-clay border border-desia-border'
                  }`}
                  title="Synchronized with live room broadcast"
                >
                  {isRoomBroadcast ? 'Synced Live' : 'Personal Control'}
                </button>
              </div>
            </div>

            {/* Live Interactive Reactions */}
            <div className="p-4 rounded-2xl bg-desia-surface/40 border border-desia-border/40 backdrop-blur-sm space-y-2.5">
              <span className="text-[11px] font-medium text-desia-clay uppercase tracking-wider block">
                Send Live Rhythm & Love
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { emoji: '❤️', label: 'Love' },
                  { emoji: '🪘', label: 'Tamak' },
                  { emoji: '🔥', label: 'Jagar' },
                  { emoji: '💃', label: 'Dhemsa' },
                  { emoji: '✨', label: 'Ananda' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => sendReaction(item.emoji, item.label)}
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-desia-card/70 hover:bg-desia-red/30 border border-desia-border hover:border-desia-ochre/40 transition-all hover:scale-105 active:scale-95 group"
                    title={`Send ${item.label}`}
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">{item.emoji}</span>
                    <span className="text-[8px] text-desia-clay/80 mt-0.5 group-hover:text-desia-sand">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Track Cultural Snapshot */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-desia-surface/40 to-desia-card/40 border border-desia-border/40 text-xs space-y-2">
              <div className="flex items-center justify-between text-desia-gold font-medium text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Music2 className="w-3.5 h-3.5" />
                  Dance Style
                </span>
                <span className="text-[10px] text-desia-clay">{currentSong.district}</span>
              </div>
              <p className="text-[11px] text-desia-sand/80 leading-relaxed font-sans line-clamp-3">
                {currentSong.danceType || 'Traditional circular Dhemsa step'}
              </p>
              <button
                onClick={() => setIsLyricsOpen(true)}
                className="text-[11px] text-desia-ochre hover:text-desia-gold flex items-center gap-1 font-medium transition-colors pt-1"
              >
                <span>Read song lyrics & lore</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>


          {/* ======================================================== */}
          {/* CENTER COLUMN: THE SACRED ALBUM ART & AUDIO CONTROLS */}
          {/* ======================================================== */}
          <div className="col-span-1 lg:col-span-6 flex flex-col items-center text-center max-w-md mx-auto w-full">
            
            {/* Top Live Indicator for Mobile */}
            <div className="flex lg:hidden items-center justify-between w-full mb-3 px-1">
              <div>
                <span className="text-sm font-serif font-bold text-desia-sand">DESIA DHEMSA</span>
                <p className="text-[10px] text-desia-clay italic">Where Desia Rhythm Never Stops</p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-desia-surface/90 border border-desia-border text-[11px]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="font-mono text-desia-gold font-bold">{listenerCount}</span>
                <span className="text-desia-clay text-[10px]">listening</span>
              </div>
            </div>

            {/* The Large Square Album / Song Artwork */}
            <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] mb-6 group">
              
              {/* Pulsing Aura Behind Artwork */}
              <div 
                className={`absolute -inset-2 rounded-3xl bg-gradient-to-tr from-desia-red/40 via-desia-terracotta/30 to-desia-gold/20 blur-xl opacity-75 transition-opacity duration-1000 ${
                  isPlaying ? 'opacity-90 animate-pulse-subtle' : 'opacity-40'
                }`}
              />

              {/* Rhythmic Ambient Visualizer Ring around Artwork */}
              {isPlaying && (
                <div className="absolute -inset-4 sm:-inset-6 pointer-events-none flex items-center justify-center -z-10">
                  <div className="w-full h-full rounded-full border border-desia-ochre/30 animate-spin-slow opacity-60 flex items-center justify-center">
                    <div className="w-[96%] h-[96%] rounded-full border border-dashed border-desia-gold/20" />
                  </div>
                </div>
              )}

              {/* Vinyl disc slip out effect when playing */}
              <div 
                className={`absolute -right-4 top-4 bottom-4 w-32 rounded-full bg-gradient-to-r from-neutral-900 to-black border-4 border-desia-border/80 flex items-center justify-center -z-10 shadow-2xl transition-all duration-700 ease-out hidden sm:flex ${
                  isPlaying ? 'translate-x-6 rotate-45' : 'translate-x-0'
                }`}
              >
                <div className="w-10 h-10 rounded-full border-2 border-desia-ochre/40 bg-desia-card flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-desia-gold"></div>
                </div>
              </div>

              {/* Main Artwork Container */}
              <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-desia-border/80 bg-desia-card shadow-[0_12px_40px_rgba(0,0,0,0.8)]">
                <Image
                  src={currentSong.artworkUrl}
                  alt={`${currentSong.title} artwork`}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                  className={`object-cover object-center transition-transform duration-700 ${
                    isPlaying ? 'scale-[1.03]' : 'scale-100'
                  }`}
                />
                
                {/* Subtle top subtle gradient for badge legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-desia-bg/70 via-transparent to-black/40 pointer-events-none" />

                {/* Cultural badges on top */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-desia-sand/90 font-medium flex items-center gap-1.5 shadow-sm">
                    <MapPin className="w-3 h-3 text-desia-gold" />
                    {currentSong.district}
                  </span>

                  <span className="px-2.5 py-1 rounded-full bg-desia-red/80 backdrop-blur-md border border-desia-ochre/40 text-[10px] text-desia-gold font-semibold tracking-wider uppercase shadow-sm">
                    {currentSong.category}
                  </span>
                </div>

                {/* Big play button overlay on hover / when paused */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all hover:bg-black/30 group-hover:scale-105"
                    aria-label="Play song"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-desia-red to-desia-ochre text-white flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.6)] pl-1 hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current" />
                    </div>
                  </button>
                )}

                {/* Bottom song meta overlay on art */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-desia-sand/80">
                  <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm font-mono text-[10px]">
                    {currentSong.tempoBpm} BPM
                  </span>
                  <button
                    onClick={() => setIsLyricsOpen(true)}
                    className="bg-black/60 hover:bg-desia-red/60 px-2.5 py-0.5 rounded backdrop-blur-sm text-desia-sand flex items-center gap-1 transition-colors"
                  >
                    <BookOpen className="w-3 h-3 text-desia-gold" />
                    <span>Lyrics & Story</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Song Name & Singer Information */}
            <div className="w-full space-y-1 mb-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-desia-sand tracking-wide leading-tight line-clamp-1">
                {currentSong.title}
              </h2>
              {currentSong.desiaTitle && (
                <p className="text-sm sm:text-base text-desia-gold/90 font-serif tracking-normal">
                  {currentSong.desiaTitle}
                </p>
              )}
              <div className="flex items-center justify-center gap-2 pt-0.5">
                <Link
                  href={`/artist/${currentSong.artistId === 'artist-1' ? 'gurubari-muduli' : currentSong.artistId === 'artist-2' ? 'laxman-bhatra' : currentSong.artistId === 'artist-4' ? 'master-damodar-majhi' : 'gurubari-muduli'}`}
                  className="text-xs sm:text-sm text-desia-clay hover:text-desia-gold transition-colors font-medium underline-offset-4 hover:underline"
                >
                  {currentSong.artist}
                </Link>
                <span className="text-desia-border">•</span>
                <span className="text-xs text-desia-clay/80">{currentSong.album}</span>
              </div>
            </div>

            {/* Scrub / Progress Bar */}
            <div className="w-full space-y-1.5 mb-5">
              <div className="relative group flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progressPercent}
                  onChange={handleSeek}
                  aria-label="Audio progress bar"
                  className="w-full h-1.5 sm:h-2 bg-desia-surface rounded-lg appearance-none cursor-pointer accent-desia-gold focus:outline-none"
                />
                {/* Visual custom fill */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-desia-red via-desia-ochre to-desia-gold rounded-l-lg pointer-events-none transition-all duration-100"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              
              {/* Timestamps */}
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-desia-clay">
                <span>{formatTime(currentTime)}</span>
                <span className="text-[10px] text-desia-clay/60 hidden sm:inline">
                  {isRoomBroadcast ? '● ROOM BROADCAST' : 'PERSONAL PLAY'}
                </span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Audio Player Controls */}
            <div className="flex items-center justify-between w-full max-w-sm px-2">
              
              {/* Shuffle Button */}
              <button
                onClick={toggleShuffle}
                className={`p-2.5 rounded-full transition-colors ${
                  isShuffle ? 'text-desia-gold bg-desia-surface' : 'text-desia-clay hover:text-desia-sand'
                }`}
                title="Shuffle Queue"
                aria-label="Shuffle"
              >
                <Shuffle className="w-4 h-4" />
              </button>

              {/* Previous Track */}
              <button
                onClick={prevSong}
                className="p-3 rounded-full text-desia-sand hover:text-desia-gold hover:bg-desia-surface/60 transition-all active:scale-95"
                title="Previous Song"
                aria-label="Previous track"
              >
                <SkipBack className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              </button>

              {/* Big Center Play / Pause Button */}
              <button
                onClick={togglePlay}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-desia-red to-desia-ochre text-white flex items-center justify-center shadow-[0_0_24px_rgba(245,158,11,0.5)] hover:shadow-[0_0_32px_rgba(245,158,11,0.8)] transition-all hover:scale-105 active:scale-95 pl-0.5"
                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
                ) : (
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current pl-1" />
                )}
              </button>

              {/* Next Track */}
              <button
                onClick={nextSong}
                className="p-3 rounded-full text-desia-sand hover:text-desia-gold hover:bg-desia-surface/60 transition-all active:scale-95"
                title="Next Song"
                aria-label="Next track"
              >
                <SkipForward className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              </button>

              {/* Repeat Mode */}
              <button
                onClick={cycleRepeatMode}
                className={`p-2.5 rounded-full transition-colors ${
                  repeatMode !== 'off' ? 'text-desia-gold bg-desia-surface' : 'text-desia-clay hover:text-desia-sand'
                }`}
                title={`Repeat: ${repeatMode}`}
                aria-label="Cycle repeat mode"
              >
                {repeatMode === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
              </button>
            </div>

            {/* Sub-controls: Volume slider & Queue / Lyrics drawer triggers */}
            <div className="flex items-center justify-between w-full max-w-sm mt-5 pt-3 border-t border-desia-border/40 text-desia-clay">
              
              {/* Volume Slider & Mute Toggle */}
              <div className="relative flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  className="p-2 text-desia-clay hover:text-desia-sand transition-colors"
                  aria-label="Toggle mute"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <div 
                  className={`flex items-center transition-all ${
                    showVolumeSlider ? 'opacity-100 w-24' : 'opacity-0 w-0 pointer-events-none'
                  } sm:opacity-100 sm:w-20 sm:pointer-events-auto`}
                  onMouseLeave={() => setShowVolumeSlider(false)}
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    aria-label="Volume slider"
                    className="w-full h-1 bg-desia-surface rounded-lg appearance-none cursor-pointer accent-desia-ochre"
                  />
                </div>
              </div>

              {/* Share & Feedback */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleShare}
                  className="p-2 text-desia-clay hover:text-desia-gold transition-colors relative"
                  title="Share this Dhemsa room"
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4" />
                  {copiedToast && (
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-desia-card border border-desia-ochre text-[10px] text-desia-gold px-2 py-0.5 rounded shadow whitespace-nowrap">
                      Link Copied!
                    </span>
                  )}
                </button>

                {/* Queue Toggle for Mobile & Small Screens */}
                <button
                  onClick={() => setIsQueueOpen(true)}
                  className="lg:hidden flex items-center gap-1 px-3 py-1 rounded-full bg-desia-surface border border-desia-border text-xs text-desia-sand hover:text-desia-gold transition-colors"
                  aria-label="Open queue"
                >
                  <ListMusic className="w-3.5 h-3.5" />
                  <span>Queue ({queue.length})</span>
                </button>
              </div>
            </div>

            {/* Desktop Keyboard Shortcuts Hint */}
            <div className="hidden sm:flex items-center justify-center gap-3 text-[10px] text-desia-clay/70 mt-3 font-mono">
              <span><kbd className="px-1 py-0.5 rounded bg-desia-surface border border-desia-border/60 text-desia-sand/80">Space</kbd> Play/Pause</span>
              <span>•</span>
              <span><kbd className="px-1 py-0.5 rounded bg-desia-surface border border-desia-border/60 text-desia-sand/80">M</kbd> Mute</span>
              <span>•</span>
              <span><kbd className="px-1 py-0.5 rounded bg-desia-surface border border-desia-border/60 text-desia-sand/80">L</kbd> Lyrics</span>
              <span>•</span>
              <span><kbd className="px-1 py-0.5 rounded bg-desia-surface border border-desia-border/60 text-desia-sand/80">Q</kbd> Queue</span>
            </div>

            {/* Mobile Reaction Strip */}
            <div className="flex lg:hidden items-center justify-around w-full mt-4 p-2 bg-desia-surface/40 rounded-xl border border-desia-border/40">
              {[
                { emoji: '❤️', label: 'Love' },
                { emoji: '🪘', label: 'Tamak' },
                { emoji: '🔥', label: 'Fire' },
                { emoji: '💃', label: 'Dance' },
                { emoji: '✨', label: 'Joy' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => sendReaction(item.emoji, item.label)}
                  className="p-1.5 hover:scale-125 active:scale-95 transition-transform"
                  aria-label={item.label}
                >
                  <span className="text-xl">{item.emoji}</span>
                </button>
              ))}
            </div>
          </div>


          {/* ======================================================== */}
          {/* RIGHT COLUMN: UPCOMING QUEUE (Desktop) */}
          {/* ======================================================== */}
          <div className="hidden lg:flex lg:col-span-3 flex-col space-y-4">
            
            {/* Queue Header */}
            <div className="flex items-center justify-between pb-2 border-b border-desia-border/60">
              <div className="flex items-center gap-2">
                <ListMusic className="w-4 h-4 text-desia-gold" />
                <h3 className="text-sm font-serif font-bold text-desia-sand tracking-wide">
                  Upcoming Queue
                </h3>
              </div>
              <span className="text-xs font-mono text-desia-clay bg-desia-card px-2 py-0.5 rounded-full border border-desia-border">
                {queue.length} songs
              </span>
            </div>

            {/* Queue List */}
            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-desia-border">
              {queue.map((song, index) => {
                const isCurrent = song.id === currentSong.id;
                return (
                  <div
                    key={`${song.id}-${index}`}
                    className={`group relative p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isCurrent
                        ? 'bg-desia-red/20 border-desia-ochre/50 shadow-md shadow-desia-red/10'
                        : 'bg-desia-surface/50 border-desia-border/40 hover:bg-desia-card/80 hover:border-desia-border'
                    }`}
                  >
                    {/* Track Number & Thumbnail */}
                    <div 
                      className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                      onClick={() => playSong(song)}
                    >
                      <span className="text-xs font-mono font-medium text-desia-clay w-5 text-center">
                        {isCurrent ? (
                          <span className="flex items-end justify-center gap-0.5 h-3.5">
                            <span className="w-1 bg-desia-gold h-full animate-wave-bar"></span>
                            <span className="w-1 bg-desia-gold h-2/3 animate-wave-bar" style={{ animationDelay: '0.2s' }}></span>
                            <span className="w-1 bg-desia-gold h-1/2 animate-wave-bar" style={{ animationDelay: '0.4s' }}></span>
                          </span>
                        ) : (
                          `${(index + 1).toString().padStart(2, '0')}`
                        )}
                      </span>

                      <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-desia-border flex-shrink-0">
                        <Image
                          src={song.artworkUrl}
                          alt={song.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="truncate text-left">
                        <p className={`text-xs font-medium truncate ${isCurrent ? 'text-desia-gold' : 'text-desia-sand group-hover:text-desia-sand'}`}>
                          {song.title}
                        </p>
                        <p className="text-[11px] text-desia-clay truncate">
                          {song.artist}
                        </p>
                      </div>
                    </div>

                    {/* Right side of queue item: Duration & Remove */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono text-desia-clay/80">
                        {formatTime(song.duration)}
                      </span>
                      
                      {queue.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromQueue(song.id);
                          }}
                          className="p-1 rounded text-desia-clay/40 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove from queue"
                          aria-label="Remove from queue"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Queue Footer Action */}
            <div className="pt-2 flex items-center justify-between text-xs text-desia-clay border-t border-desia-border/40">
              <button
                onClick={toggleShuffle}
                className="hover:text-desia-gold transition-colors flex items-center gap-1 text-[11px]"
              >
                <Shuffle className="w-3 h-3" />
                <span>Shuffle Queue</span>
              </button>
              <Link
                href="/songs"
                className="hover:text-desia-gold transition-colors flex items-center gap-1 text-[11px]"
              >
                <span>Browse Library</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>

      </main>

      {/* Cultural Bottom Ribbon / Live Status */}
      <footer className="w-full border-t border-desia-border/40 bg-desia-surface/30 backdrop-blur-sm py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] text-desia-clay">
          <div className="flex items-center gap-2">
            <span className="text-desia-ochre">Koraput • Nabarangpur • Malkangiri • Rayagada • Kandhamal</span>
          </div>
          <div>
            <span>Desia Folk Rhythm Archive • Handcrafted in Odisha</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
