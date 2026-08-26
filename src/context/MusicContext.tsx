'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Song, ListenerReaction, ListenerJoinEvent } from '@/types';
import { initialSongs } from '@/data/songs';
import { initialArtists } from '@/data/artists';

interface MusicContextType {
  // Current track & queue
  currentSong: Song;
  queue: Song[];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffle: boolean;
  repeatMode: 'off' | 'all' | 'one';
  
  // Room state
  isRoomBroadcast: boolean;
  listenerCount: number;
  reactions: ListenerReaction[];
  recentJoins: ListenerJoinEvent[];
  
  // Actions
  playSong: (song: Song) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  seekTo: (time: number) => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  cycleRepeatMode: () => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (songId: string) => void;
  clearQueue: () => void;
  toggleRoomBroadcast: () => void;
  sendReaction: (emoji: string, label: string) => void;

  // Modals & Drawers
  isLyricsOpen: boolean;
  setIsLyricsOpen: (open: boolean) => void;
  isQueueOpen: boolean;
  setIsQueueOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Custom audio playback methods
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const MusicContext = createContext<MusicContextType | null>(null);

const DEFAULT_DISTRICTS = ['Koraput', 'Malkangiri', 'Nabarangpur', 'Rayagada', 'Kandhamal', 'Bhubaneswar', 'Cuttack', 'Sambalpur', 'Rourkela', 'Delhi', 'Bengaluru'];
const VISITOR_NAMES = ['Subrat', 'Puspa', 'Damodar', 'Gurubari', 'Laxman', 'Sunil', 'Jyoti', 'Kuna', 'Ranjan', 'Minati', 'Sukanti', 'Bikash'];

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [songsList, setSongsList] = useState<Song[]>(initialSongs);
  const [queue, setQueue] = useState<Song[]>(initialSongs);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(initialSongs[0]?.duration || 28);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('all');
  const [isRoomBroadcast, setIsRoomBroadcast] = useState<boolean>(true);

  // Live listener metrics
  const [listenerCount, setListenerCount] = useState<number>(27);
  const [reactions, setReactions] = useState<ListenerReaction[]>([]);
  const [recentJoins, setRecentJoins] = useState<ListenerJoinEvent[]>([]);

  // Modals / Panels
  const [isLyricsOpen, setIsLyricsOpen] = useState<boolean>(false);
  const [isQueueOpen, setIsQueueOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = queue[currentSongIndex] || initialSongs[0];

  // Set up audio element and event handlers
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;
    audio.volume = isMuted ? 0 : volume;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || currentSong.duration || 28);
    };

    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        handleNextSong();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSongIndex, queue, repeatMode, volume, isMuted]);

  // Load new song when currentSong changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    // Check if source changed
    const currentSrc = audio.src.replace(window?.location?.origin || '', '');
    if (currentSrc !== currentSong.audioUrl) {
      audio.src = currentSong.audioUrl;
      audio.load();
      if (isPlaying) {
        audio.play().catch((err) => {
          console.warn('Auto-play prevented or awaiting user interaction:', err);
          setIsPlaying(false);
        });
      }
    }
  }, [currentSong]);

  // Handle Play/Pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (!audio.src || audio.src === '') {
        audio.src = currentSong.audioUrl;
      }
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Playback error:', err);
      });
    }
  };

  const playSong = (song: Song) => {
    let index = queue.findIndex(s => s.id === song.id);
    if (index === -1) {
      // Add to queue and play
      const newQueue = [...queue, song];
      setQueue(newQueue);
      index = newQueue.length - 1;
    }
    setCurrentSongIndex(index);
    setIsPlaying(true);

    const audio = audioRef.current;
    if (audio) {
      audio.src = song.audioUrl;
      audio.currentTime = 0;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Error playing song:', err);
      });
    }
  };

  const handleNextSong = () => {
    if (queue.length === 0) return;
    let nextIndex = 0;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = (currentSongIndex + 1) % queue.length;
    }
    setCurrentSongIndex(nextIndex);
    const nextTrack = queue[nextIndex];
    if (audioRef.current && nextTrack) {
      audioRef.current.src = nextTrack.audioUrl;
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const nextSong = () => handleNextSong();

  const prevSong = () => {
    if (queue.length === 0) return;
    let prevIndex = (currentSongIndex - 1 + queue.length) % queue.length;
    setCurrentSongIndex(prevIndex);
    const prevTrack = queue[prevIndex];
    if (audioRef.current && prevTrack) {
      audioRef.current.src = prevTrack.audioUrl;
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const seekTo = (time: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolume = (val: number) => {
    setVolumeState(val);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : val;
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.volume = nextMuted ? 0 : volume;
    }
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const cycleRepeatMode = () => {
    if (repeatMode === 'off') setRepeatMode('all');
    else if (repeatMode === 'all') setRepeatMode('one');
    else setRepeatMode('off');
  };

  const addToQueue = (song: Song) => {
    setQueue(prev => [...prev, song]);
  };

  const removeFromQueue = (songId: string) => {
    setQueue(prev => {
      const filtered = prev.filter(s => s.id !== songId);
      return filtered.length > 0 ? filtered : initialSongs;
    });
  };

  const clearQueue = () => {
    setQueue([currentSong]);
    setCurrentSongIndex(0);
  };

  const toggleRoomBroadcast = () => {
    setIsRoomBroadcast(!isRoomBroadcast);
  };

  // Live Listener simulation & heartbeat
  useEffect(() => {
    // Periodically fluctuate listener count naturally between 24 and 35
    const listenerInterval = setInterval(() => {
      setListenerCount(prev => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
        const next = prev + delta;
        return Math.max(18, Math.min(42, next));
      });
    }, 8000);

    // Periodically simulate recent joiners from Odisha districts
    const joinInterval = setInterval(() => {
      const randomName = VISITOR_NAMES[Math.floor(Math.random() * VISITOR_NAMES.length)];
      const randomDistrict = DEFAULT_DISTRICTS[Math.floor(Math.random() * DEFAULT_DISTRICTS.length)];
      const newJoin: ListenerJoinEvent = {
        id: `join-${Date.now()}`,
        name: randomName,
        district: randomDistrict,
        timestamp: Date.now()
      };
      setRecentJoins(prev => [newJoin, ...prev.slice(0, 3)]);
    }, 14000);

    return () => {
      clearInterval(listenerInterval);
      clearInterval(joinInterval);
    };
  }, []);

  // Keyboard shortcuts (Space to play/pause, M to mute, Left/Right for tracks)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        toggleMute();
      } else if (e.code === 'KeyL') {
        e.preventDefault();
        setIsLyricsOpen(!isLyricsOpen);
      } else if (e.code === 'KeyQ') {
        e.preventDefault();
        setIsQueueOpen(!isQueueOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted, isLyricsOpen, isQueueOpen, volume]);

  const sendReaction = (emoji: string, label: string) => {
    const newReaction: ListenerReaction = {
      id: `rx-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      emoji,
      label,
      timestamp: Date.now(),
      senderDistrict: 'You'
    };
    setReactions(prev => [newReaction, ...prev.slice(0, 15)]);
  };

  return (
    <MusicContext.Provider
      value={{
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
        reactions,
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
        addToQueue,
        removeFromQueue,
        clearQueue,
        toggleRoomBroadcast,
        sendReaction,
        isLyricsOpen,
        setIsLyricsOpen,
        isQueueOpen,
        setIsQueueOpen,
        isSearchOpen,
        setIsSearchOpen,
        audioRef
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
