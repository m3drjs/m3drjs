import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { initialArtists } from '@/data/artists';
import { initialSongs } from '@/data/songs';
import { MapPin, Users, Music2, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Artists & Custodians | DESIA DHEMSA',
  description: 'Meet the folk masters, Mahuri players, and Dhemsa circle leads preserving indigenous Desia music across Koraput, Malkangiri, Nabarangpur, and Rayagada.',
};

export default function ArtistsPage() {
  return (
    <div className="min-h-screen pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-desia-surface border border-desia-border text-xs text-desia-gold">
          <span>ଦେଶିଆ କଳାକାର</span>
          <span>•</span>
          <span>Desia Folk Artists & Masters</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-desia-sand tracking-wide">
          Masters of Desia Rhythm
        </h1>
        <p className="text-sm text-desia-clay max-w-2xl">
          The living voices, flute masters, and percussionists keeping ancestral tribal musical heritage vibrant across the highlands of Odisha.
        </p>
      </div>

      {/* Artists Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialArtists.map((artist) => {
          const artistSongs = initialSongs.filter((s) => s.artistId === artist.id);

          return (
            <div
              key={artist.id}
              className="group p-5 rounded-3xl bg-desia-surface/40 border border-desia-border/60 hover:border-desia-ochre/40 transition-all hover:-translate-y-1 shadow-lg shadow-black/20 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Avatar and Badges */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-desia-border group-hover:border-desia-gold transition-colors flex-shrink-0">
                    <Image
                      src={artist.avatarUrl}
                      alt={artist.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold text-desia-gold tracking-wider bg-desia-card px-2 py-0.5 rounded border border-desia-border">
                      {artist.district}
                    </span>
                    <h2 className="text-lg font-serif font-bold text-desia-sand group-hover:text-desia-gold transition-colors truncate mt-1">
                      {artist.name}
                    </h2>
                    <p className="text-xs text-desia-clay truncate">{artist.tribalAffiliation}</p>
                  </div>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-desia-sand/80 line-clamp-3 leading-relaxed">
                  {artist.bio}
                </p>

                {/* Instruments */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {artist.instruments.map((inst) => (
                    <span
                      key={inst}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-desia-card text-desia-clay border border-desia-border/40"
                    >
                      {inst}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer info & Profile link */}
              <div className="pt-5 mt-5 border-t border-desia-border/40 flex items-center justify-between">
                <span className="text-[11px] font-mono text-desia-clay">
                  {artistSongs.length} {artistSongs.length === 1 ? 'song' : 'songs'} in library
                </span>
                <Link
                  href={`/artist/${artist.slug}`}
                  className="inline-flex items-center gap-1 text-xs text-desia-ochre hover:text-desia-gold font-medium transition-colors"
                >
                  <span>View Artist</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
