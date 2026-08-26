export type CategoryType = 
  | 'Dhemsa' 
  | 'Desia Folk' 
  | 'Festival / Parab' 
  | 'Wedding / Baha' 
  | 'Traditional' 
  | 'Dance' 
  | 'Ritual / Jagar'
  | 'New Releases';

export type DistrictType = 
  | 'Koraput' 
  | 'Malkangiri' 
  | 'Nabarangpur' 
  | 'Rayagada' 
  | 'Kandhamal';

export interface LyricsSection {
  odia: string;
  transliteration: string;
  translation: string;
}

export interface Song {
  id: string;
  slug: string;
  title: string;
  desiaTitle?: string;
  artist: string;
  artistId: string;
  album: string;
  category: CategoryType;
  district: DistrictType;
  duration: number; // in seconds
  audioUrl: string;
  artworkUrl: string;
  lyrics: LyricsSection[];
  culturalStory: string;
  instruments: string[];
  danceType?: string;
  tempoBpm: number;
  playCount: number;
  featured: boolean;
  year: number;
}

export interface Artist {
  id: string;
  slug: string;
  name: string;
  title: string;
  district: DistrictType;
  tribalAffiliation: string;
  bio: string;
  instruments: string[];
  avatarUrl: string;
  monthlyListeners: number;
  popularSongIds: string[];
  featured: boolean;
}

export interface ListenerReaction {
  id: string;
  emoji: string;
  label: string;
  timestamp: number;
  senderDistrict?: string;
}

export interface ListenerJoinEvent {
  id: string;
  name: string;
  district: string;
  timestamp: number;
}

export interface RoomBroadcastState {
  currentSongId: string;
  serverPlaybackSeconds: number;
  isPlaying: boolean;
  listenerCount: number;
  activeDistricts: string[];
  announcement?: string;
  lastUpdated: number;
}
