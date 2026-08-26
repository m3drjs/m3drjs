'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { initialSongs } from '@/data/songs';
import { initialArtists } from '@/data/artists';
import { Song, Artist, CategoryType, DistrictType } from '@/types';
import { useMusic } from '@/context/MusicContext';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Flame, 
  Radio, 
  Cloud, 
  Music, 
  Users, 
  CheckCircle2, 
  Sliders, 
  Lock, 
  Unlock,
  Play,
  Layers,
  ArrowUpDown
} from 'lucide-react';

export default function AdminPage() {
  const { playSong } = useMusic();

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [adminKey, setAdminKey] = useState('');
  const [activeTab, setActiveTab] = useState<'songs' | 'artists' | 'room' | 'storage'>('songs');

  // State for songs and artists in admin
  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const [artists, setArtists] = useState<Artist[]>(initialArtists);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // New Song Form State
  const [showAddSongModal, setShowAddSongModal] = useState(false);
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongDesiaTitle, setNewSongDesiaTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('Gurubari Muduli & Koraput Dhemsa Dal');
  const [newSongArtistId, setNewSongArtistId] = useState('artist-1');
  const [newSongAlbum, setNewSongAlbum] = useState('Dhemsa Sessions 2026');
  const [newSongCategory, setNewSongCategory] = useState<CategoryType>('Dhemsa');
  const [newSongDistrict, setNewSongDistrict] = useState<DistrictType>('Koraput');
  const [newSongDuration, setNewSongDuration] = useState('28');
  const [newSongTempo, setNewSongTempo] = useState('128');
  const [newSongDanceType, setNewSongDanceType] = useState('Chokda Dhemsa');
  const [newSongInstruments, setNewSongInstruments] = useState('Mahuri, Tamak, Nishan');
  const [newSongOdiaLyrics, setNewSongOdiaLyrics] = useState('');
  const [newSongTranslit, setNewSongTranslit] = useState('');
  const [newSongMeaning, setNewSongMeaning] = useState('');
  const [newSongStory, setNewSongStory] = useState('');
  const [newSongFeatured, setNewSongFeatured] = useState(true);

  // New Artist Form State
  const [showAddArtistModal, setShowAddArtistModal] = useState(false);
  const [newArtistName, setNewArtistName] = useState('');
  const [newArtistTitle, setNewArtistTitle] = useState('');
  const [newArtistDistrict, setNewArtistDistrict] = useState<DistrictType>('Koraput');
  const [newArtistTribe, setNewArtistTribe] = useState('');
  const [newArtistBio, setNewArtistBio] = useState('');
  const [newArtistInstruments, setNewArtistInstruments] = useState('Mahuri, Tamak');

  // Room broadcast controller state
  const [broadcastMessage, setBroadcastMessage] = useState('Welcome to the live Koraput Dhemsa evening circle!');
  const [baselineCount, setBaselineCount] = useState('27');

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSongTitle.trim()) return;

    const slug = newSongTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newSong: Song = {
      id: `song-${Date.now()}`,
      slug: slug || `dhemsa-song-${Date.now()}`,
      title: newSongTitle,
      desiaTitle: newSongDesiaTitle || undefined,
      artist: newSongArtist,
      artistId: newSongArtistId,
      album: newSongAlbum,
      category: newSongCategory,
      district: newSongDistrict,
      duration: parseInt(newSongDuration, 10) || 28,
      audioUrl: '/audio/koraputia-chokda-dhemsa.wav',
      artworkUrl: '/images/artwork/koraputia-chokda.svg',
      tempoBpm: parseInt(newSongTempo, 10) || 128,
      danceType: newSongDanceType,
      year: 2026,
      playCount: 1,
      featured: newSongFeatured,
      instruments: newSongInstruments.split(',').map((s) => s.trim()).filter(Boolean),
      culturalStory: newSongStory || 'A vibrant celebratory track from the Desia highlands.',
      lyrics: [
        {
          odia: newSongOdiaLyrics || 'ହୋରେ ଆମୋର କୋରାପୁଟ ମାଟି ରେ...',
          transliteration: newSongTranslit || 'Hore aamor Koraput maati re...',
          translation: newSongMeaning || 'O beloved people of our soil, come join the rhythm!'
        }
      ]
    };

    setSongs([newSong, ...songs]);
    setShowAddSongModal(false);
    triggerToast(`Added song "${newSong.title}" successfully!`);

    // Reset form
    setNewSongTitle('');
    setNewSongDesiaTitle('');
  };

  const handleDeleteSong = (id: string) => {
    if (confirm('Are you sure you want to remove this song from the library?')) {
      setSongs(songs.filter((s) => s.id !== id));
      triggerToast('Song deleted from catalogue.');
    }
  };

  const handleToggleFeatured = (id: string) => {
    setSongs(
      songs.map((s) => (s.id === id ? { ...s, featured: !s.featured } : s))
    );
    triggerToast('Updated featured status.');
  };

  const handleAddArtist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArtistName.trim()) return;

    const slug = newArtistName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newArt: Artist = {
      id: `artist-${Date.now()}`,
      slug: slug || `artist-${Date.now()}`,
      name: newArtistName,
      title: newArtistTitle || 'Folk Musician',
      district: newArtistDistrict,
      tribalAffiliation: newArtistTribe || 'Desia Community',
      bio: newArtistBio || 'Dedicated folk artist preserving Odisha tribal sounds.',
      instruments: newArtistInstruments.split(',').map(s => s.trim()).filter(Boolean),
      avatarUrl: '/images/artists/gurubari-muduli.svg',
      monthlyListeners: 1200,
      popularSongIds: [],
      featured: false,
    };

    setArtists([...artists, newArt]);
    setShowAddArtistModal(false);
    triggerToast(`Added artist "${newArt.name}"!`);
  };

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Success Toast */}
      {successToast && (
        <div className="fixed top-16 right-6 z-50 bg-emerald-950 border border-emerald-500 text-emerald-200 px-4 py-2 rounded-xl text-xs shadow-2xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-desia-border/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-desia-red/30 border border-desia-ochre/30 text-xs text-desia-gold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Desia Dhemsa Admin Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-desia-sand">
            Cultural Archive & Broadcast Control
          </h1>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 bg-desia-surface p-1.5 rounded-2xl border border-desia-border">
          {[
            { id: 'songs', label: 'Songs', icon: Music },
            { id: 'artists', label: 'Artists', icon: Users },
            { id: 'room', label: 'Live Room', icon: Radio },
            { id: 'storage', label: 'Storage Arch', icon: Cloud },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-desia-card text-desia-gold border border-desia-border shadow-sm'
                    : 'text-desia-clay hover:text-desia-sand'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-desia-surface/50 border border-desia-border space-y-1">
          <span className="text-xs text-desia-clay">Songs in Library</span>
          <p className="text-2xl font-serif font-bold text-desia-sand">{songs.length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-desia-surface/50 border border-desia-border space-y-1">
          <span className="text-xs text-desia-clay">Registered Artists</span>
          <p className="text-2xl font-serif font-bold text-desia-sand">{artists.length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-desia-surface/50 border border-desia-border space-y-1">
          <span className="text-xs text-desia-clay">Current Room Listeners</span>
          <p className="text-2xl font-serif font-bold text-desia-gold">● {baselineCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-desia-surface/50 border border-desia-border space-y-1">
          <span className="text-xs text-desia-clay">Audio Storage Engine</span>
          <p className="text-xs font-mono font-medium text-emerald-400 pt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Cloud/PCM Online
          </p>
        </div>
      </div>

      {/* TAB 1: SONGS MANAGEMENT */}
      {activeTab === 'songs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-serif font-bold text-desia-sand">Songs Catalog</h2>
              <p className="text-xs text-desia-clay">Manage track metadata, audio assets, and featured songs.</p>
            </div>
            <button
              onClick={() => setShowAddSongModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-desia-red to-desia-ochre text-white text-xs font-semibold flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Song</span>
            </button>
          </div>

          {/* Songs Table */}
          <div className="bg-desia-surface/40 border border-desia-border rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-desia-sand">
                <thead className="bg-desia-card/80 text-desia-clay uppercase tracking-wider text-[10px] border-b border-desia-border">
                  <tr>
                    <th className="py-3.5 px-4">Track</th>
                    <th className="py-3.5 px-4">Artist</th>
                    <th className="py-3.5 px-4">District</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">BPM / Dur</th>
                    <th className="py-3.5 px-4 text-center">Featured</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-desia-border/40">
                  {songs.map((song) => (
                    <tr key={song.id} className="hover:bg-desia-card/50 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-desia-border flex-shrink-0">
                          <Image src={song.artworkUrl} alt={song.title} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-desia-sand truncate">{song.title}</p>
                          <p className="text-[10px] text-desia-clay font-serif">{song.desiaTitle}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-desia-clay truncate">{song.artist}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-desia-card text-desia-ochre border border-desia-border">
                          {song.district}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-desia-clay">{song.category}</td>
                      <td className="py-3 px-4 font-mono text-desia-clay">
                        {song.tempoBpm} BPM / {song.duration}s
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleToggleFeatured(song.id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            song.featured
                              ? 'bg-desia-red/30 border-desia-ochre text-desia-gold'
                              : 'bg-desia-card border-desia-border text-desia-clay'
                          }`}
                          title="Toggle featured"
                        >
                          <Flame className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => playSong(song)}
                          className="p-1.5 rounded-lg bg-desia-card hover:bg-desia-red text-desia-sand transition-colors"
                          title="Play in Room"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                        <button
                          onClick={() => handleDeleteSong(song.id)}
                          className="p-1.5 rounded-lg bg-desia-card hover:bg-red-900/50 text-desia-clay hover:text-red-300 transition-colors"
                          title="Delete song"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ARTISTS MANAGEMENT */}
      {activeTab === 'artists' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-serif font-bold text-desia-sand">Artists & Custodians</h2>
              <p className="text-xs text-desia-clay">Manage artist profiles, biographies, and tribal affiliations.</p>
            </div>
            <button
              onClick={() => setShowAddArtistModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-desia-red to-desia-ochre text-white text-xs font-semibold flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Artist</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {artists.map((artist) => (
              <div
                key={artist.id}
                className="p-4 rounded-2xl bg-desia-surface/50 border border-desia-border space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-desia-border flex-shrink-0">
                    <Image src={artist.avatarUrl} alt={artist.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-serif font-bold text-desia-sand truncate">{artist.name}</h3>
                    <p className="text-[11px] text-desia-ochre">{artist.district} • {artist.tribalAffiliation}</p>
                  </div>
                </div>
                <p className="text-xs text-desia-clay line-clamp-2 leading-relaxed">{artist.bio}</p>
                <div className="flex items-center justify-between pt-2 border-t border-desia-border/40 text-[11px] text-desia-clay">
                  <span>{artist.instruments.join(', ')}</span>
                  <span className="text-desia-gold">Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: LIVE ROOM BROADCAST CONTROLLER */}
      {activeTab === 'room' && (
        <div className="space-y-6 max-w-2xl bg-desia-surface/40 p-6 rounded-3xl border border-desia-border">
          <div>
            <h2 className="text-lg font-serif font-bold text-desia-sand flex items-center gap-2">
              <Radio className="w-4 h-4 text-red-500 animate-pulse" />
              <span>Live Room Broadcast Operations</span>
            </h2>
            <p className="text-xs text-desia-clay">Control real-time room presence, announcements, and baseline listeners.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-desia-sand block mb-1">
                Room Announcement Banner
              </label>
              <input
                type="text"
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                className="w-full px-4 py-2.5 bg-desia-card rounded-xl border border-desia-border text-xs text-desia-sand focus:outline-none focus:border-desia-ochre"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-desia-sand block mb-1">
                Baseline Concurrent Listeners (Simulated)
              </label>
              <input
                type="number"
                value={baselineCount}
                onChange={(e) => setBaselineCount(e.target.value)}
                className="w-36 px-4 py-2 bg-desia-card rounded-xl border border-desia-border text-xs text-desia-sand font-mono focus:outline-none focus:border-desia-ochre"
              />
            </div>

            <button
              onClick={() => triggerToast('Broadcast state pushed to all listening rooms!')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-desia-red to-desia-ochre text-white text-xs font-medium shadow-md hover:scale-105 transition-transform"
            >
              Push Broadcast Update
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: STORAGE & CLOUD ARCHITECTURE */}
      {activeTab === 'storage' && (
        <div className="space-y-6 max-w-3xl bg-desia-surface/40 p-6 sm:p-8 rounded-3xl border border-desia-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-desia-card border border-desia-border flex items-center justify-center text-desia-gold">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-desia-sand">Audio Streaming Architecture</h2>
              <p className="text-xs text-desia-clay">Object storage and delivery specifications for Desia Dhemsa.</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-desia-sand/80 leading-relaxed">
            <div className="p-4 rounded-xl bg-desia-card/50 border border-desia-border space-y-2">
              <h3 className="font-semibold text-desia-gold text-sm">Object Storage Configuration</h3>
              <p>
                The platform is configured with an abstracted audio streaming engine compatible with AWS S3, Cloudflare R2, or Supabase Storage buckets.
              </p>
              <ul className="list-disc list-inside space-y-1 text-desia-clay pt-1">
                <li>Primary bucket: <code className="text-desia-sand">desia-dhemsa-audio-master</code></li>
                <li>Content-Type: <code className="text-desia-sand">audio/wav</code>, <code className="text-desia-sand">audio/mpeg</code>, <code className="text-desia-sand">audio/ogg</code></li>
                <li>Edge CDN Cache-Control: <code className="text-desia-sand">public, max-age=31536000, immutable</code></li>
                <li>Range Request (RFC 7233) enabled for scrub seeking</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-desia-card/50 border border-desia-border space-y-2">
              <h3 className="font-semibold text-desia-gold text-sm">Client Buffer Strategy</h3>
              <p>
                The Web Audio / HTML5 Audio player uses progressive range-request buffering. Only the currently playing track buffers audio bytes on demand, ensuring near-instant page load and low bandwidth overhead.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Song Form */}
      {showAddSongModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-desia-bg border border-desia-border rounded-3xl p-6 overflow-y-auto space-y-4 shadow-2xl">
            <h3 className="text-lg font-serif font-bold text-desia-sand">Add New Desia Track</h3>
            
            <form onSubmit={handleAddSong} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-desia-sand font-medium mb-1">Song Title</label>
                  <input
                    type="text"
                    required
                    value={newSongTitle}
                    onChange={(e) => setNewSongTitle(e.target.value)}
                    placeholder="e.g. Koraput Ghungroo Dhemsa"
                    className="w-full px-3 py-2 bg-desia-card rounded-xl border border-desia-border text-desia-sand focus:outline-none focus:border-desia-ochre"
                  />
                </div>
                <div>
                  <label className="block text-desia-sand font-medium mb-1">Desia Odia Title</label>
                  <input
                    type="text"
                    value={newSongDesiaTitle}
                    onChange={(e) => setNewSongDesiaTitle(e.target.value)}
                    placeholder="e.g. କୋରାପୁଟ ଘୁଙ୍ଗୁରୁ ଢେମ୍ସା"
                    className="w-full px-3 py-2 bg-desia-card rounded-xl border border-desia-border text-desia-sand focus:outline-none focus:border-desia-ochre"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-desia-sand font-medium mb-1">Category</label>
                  <select
                    value={newSongCategory}
                    onChange={(e) => setNewSongCategory(e.target.value as CategoryType)}
                    className="w-full px-3 py-2 bg-desia-card rounded-xl border border-desia-border text-desia-sand focus:outline-none"
                  >
                    <option value="Dhemsa">Dhemsa</option>
                    <option value="Desia Folk">Desia Folk</option>
                    <option value="Festival / Parab">Festival / Parab</option>
                    <option value="Wedding / Baha">Wedding / Baha</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Dance">Dance</option>
                    <option value="Ritual / Jagar">Ritual / Jagar</option>
                    <option value="New Releases">New Releases</option>
                  </select>
                </div>
                <div>
                  <label className="block text-desia-sand font-medium mb-1">District</label>
                  <select
                    value={newSongDistrict}
                    onChange={(e) => setNewSongDistrict(e.target.value as DistrictType)}
                    className="w-full px-3 py-2 bg-desia-card rounded-xl border border-desia-border text-desia-sand focus:outline-none"
                  >
                    <option value="Koraput">Koraput</option>
                    <option value="Malkangiri">Malkangiri</option>
                    <option value="Nabarangpur">Nabarangpur</option>
                    <option value="Rayagada">Rayagada</option>
                    <option value="Kandhamal">Kandhamal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-desia-sand font-medium mb-1">Tempo (BPM)</label>
                  <input
                    type="number"
                    value={newSongTempo}
                    onChange={(e) => setNewSongTempo(e.target.value)}
                    className="w-full px-3 py-2 bg-desia-card rounded-xl border border-desia-border text-desia-sand focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-desia-sand font-medium mb-1">Instruments (comma separated)</label>
                <input
                  type="text"
                  value={newSongInstruments}
                  onChange={(e) => setNewSongInstruments(e.target.value)}
                  className="w-full px-3 py-2 bg-desia-card rounded-xl border border-desia-border text-desia-sand focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-desia-sand font-medium mb-1">Cultural Lore & Dance Steps</label>
                <textarea
                  rows={2}
                  value={newSongStory}
                  onChange={(e) => setNewSongStory(e.target.value)}
                  placeholder="Describe the occasion, tribal traditions, and dance choreography..."
                  className="w-full px-3 py-2 bg-desia-card rounded-xl border border-desia-border text-desia-sand focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-desia-border">
                <button
                  type="button"
                  onClick={() => setShowAddSongModal(false)}
                  className="px-4 py-2 rounded-xl bg-desia-card text-desia-clay hover:text-desia-sand"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-desia-red to-desia-ochre text-white font-semibold"
                >
                  Save & Publish Track
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Artist Form */}
      {showAddArtistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-desia-bg border border-desia-border rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-serif font-bold text-desia-sand">Register New Folk Artist</h3>
            
            <form onSubmit={handleAddArtist} className="space-y-4 text-xs">
              <div>
                <label className="block text-desia-sand font-medium mb-1">Artist / Ensemble Name</label>
                <input
                  type="text"
                  required
                  value={newArtistName}
                  onChange={(e) => setNewArtistName(e.target.value)}
                  placeholder="e.g. Kondh Baunsi Dal"
                  className="w-full px-3 py-2 bg-desia-card rounded-xl border border-desia-border text-desia-sand focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-desia-sand font-medium mb-1">District</label>
                  <select
                    value={newArtistDistrict}
                    onChange={(e) => setNewArtistDistrict(e.target.value as DistrictType)}
                    className="w-full px-3 py-2 bg-desia-card rounded-xl border border-desia-border text-desia-sand focus:outline-none"
                  >
                    <option value="Koraput">Koraput</option>
                    <option value="Malkangiri">Malkangiri</option>
                    <option value="Nabarangpur">Nabarangpur</option>
                    <option value="Rayagada">Rayagada</option>
                    <option value="Kandhamal">Kandhamal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-desia-sand font-medium mb-1">Tribe / Tradition</label>
                  <input
                    type="text"
                    value={newArtistTribe}
                    onChange={(e) => setNewArtistTribe(e.target.value)}
                    placeholder="e.g. Paroja / Gadaba"
                    className="w-full px-3 py-2 bg-desia-card rounded-xl border border-desia-border text-desia-sand focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-desia-sand font-medium mb-1">Biography</label>
                <textarea
                  rows={3}
                  value={newArtistBio}
                  onChange={(e) => setNewArtistBio(e.target.value)}
                  placeholder="Musical lineage and background..."
                  className="w-full px-3 py-2 bg-desia-card rounded-xl border border-desia-border text-desia-sand focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-desia-border">
                <button
                  type="button"
                  onClick={() => setShowAddArtistModal(false)}
                  className="px-4 py-2 rounded-xl bg-desia-card text-desia-clay hover:text-desia-sand"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-desia-red to-desia-ochre text-white font-semibold"
                >
                  Save Artist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
