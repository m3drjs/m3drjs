import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { initialArtists } from '@/data/artists';
import { initialSongs } from '@/data/songs';
import { ArtistClientView } from './ArtistClientView';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return initialArtists.map((artist) => ({
    slug: artist.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = initialArtists.find((a) => a.slug === slug);

  if (!artist) {
    return {
      title: 'Artist Not Found | DESIA DHEMSA',
    };
  }

  const title = `${artist.name} - Desia Folk Artist | DESIA DHEMSA`;
  const description = `${artist.name} (${artist.tribalAffiliation}, ${artist.district}, Odisha). ${artist.bio.slice(0, 140)}...`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: artist.avatarUrl,
          width: 400,
          height: 400,
          alt: artist.name,
        },
      ],
    },
  };
}

export default async function ArtistDetailPage({ params }: Props) {
  const { slug } = await params;
  const artist = initialArtists.find((a) => a.slug === slug);

  if (!artist) {
    notFound();
  }

  const allSongs = initialSongs.filter((s) => s.artistId === artist.id);
  const popularSongs = allSongs.slice(0, 3);

  // JSON-LD structured data for MusicGroup/Person
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: artist.name,
    description: artist.bio,
    image: artist.avatarUrl,
    genre: 'Desia Folk, Dhemsa',
    locationCreated: {
      '@type': 'Place',
      name: `${artist.district}, Odisha, India`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtistClientView artist={artist} popularSongs={popularSongs} allSongs={allSongs} />
    </>
  );
}
