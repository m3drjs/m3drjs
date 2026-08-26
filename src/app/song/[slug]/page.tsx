import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { initialSongs } from '@/data/songs';
import { initialArtists } from '@/data/artists';
import { SongClientView } from './SongClientView';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return initialSongs.map((song) => ({
    slug: song.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const song = initialSongs.find((s) => s.slug === slug);

  if (!song) {
    return {
      title: 'Song Not Found | DESIA DHEMSA',
    };
  }

  const title = `${song.title} - ${song.artist} | DESIA DHEMSA`;
  const description = `Listen to "${song.title}", authentic Desia ${song.category} song from ${song.district}, Odisha. Features traditional ${song.instruments.join(', ')}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'music.song',
      images: [
        {
          url: song.artworkUrl,
          width: 600,
          height: 600,
          alt: song.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [song.artworkUrl],
    },
  };
}

export default async function SongDetailPage({ params }: Props) {
  const { slug } = await params;
  const song = initialSongs.find((s) => s.slug === slug);

  if (!song) {
    notFound();
  }

  const artist = initialArtists.find((a) => a.id === song.artistId) || initialArtists[0];
  const relatedSongs = initialSongs.filter((s) => s.id !== song.id && (s.district === song.district || s.category === song.category));

  // JSON-LD Structured Data for Schema.org MusicRecording
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicRecording',
    name: song.title,
    alternateName: song.desiaTitle,
    byArtist: {
      '@type': 'MusicGroup',
      name: song.artist,
    },
    inAlbum: {
      '@type': 'MusicAlbum',
      name: song.album,
    },
    duration: `PT${song.duration}S`,
    genre: song.category,
    image: song.artworkUrl,
    description: song.culturalStory,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SongClientView song={song} artist={artist} relatedSongs={relatedSongs} />
    </>
  );
}
