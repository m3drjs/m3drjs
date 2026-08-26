import type { Metadata } from 'next';
import './globals.css';
import { MusicProvider } from '@/context/MusicContext';
import { Navbar } from '@/components/Navbar';
import { FloatingReactions } from '@/components/FloatingReactions';
import { LyricsDrawer } from '@/components/LyricsDrawer';
import { QueueSheet } from '@/components/QueueSheet';
import { SearchModal } from '@/components/SearchModal';
import { GlobalAudioPlayer } from '@/components/GlobalAudioPlayer';

export const metadata: Metadata = {
  metadataBase: new URL('https://desia-dhemsa.odisha.org'),
  title: 'DESIA DHEMSA | Where Desia Rhythm Never Stops',
  description: 'An immersive live online music room celebrating Desia folk songs and Dhemsa dance music from Odisha. Discover the living sounds of Koraput, Malkangiri, Nabarangpur, and Rayagada.',
  keywords: [
    'Desia songs',
    'Dhemsa dance',
    'Odisha tribal music',
    'Koraput folk songs',
    'Mahuri music',
    'Tamak rhythm',
    'Nishan drums',
    'Odisha folk culture',
    'Desia Dhemsa music room'
  ],
  authors: [{ name: 'Desia Dhemsa Cultural Initiative' }],
  openGraph: {
    title: 'DESIA DHEMSA | Live Online Dhemsa Music Room',
    description: 'Enter the live online Dhemsa music room. Listen together to authentic Desia songs, Mahuri melodies, and hypnotic tribal percussion from Odisha.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'DESIA DHEMSA',
    images: [
      {
        url: '/images/artwork/koraputia-chokda.svg',
        width: 1200,
        height: 630,
        alt: 'DESIA DHEMSA - Where Desia Rhythm Never Stops',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DESIA DHEMSA | Live Online Dhemsa Music Room',
    description: 'Listen to authentic Desia folk and Dhemsa dance rhythms from Odisha in real-time.',
    images: ['/images/artwork/koraputia-chokda.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-desia-bg text-desia-sand min-h-screen selection:bg-desia-red selection:text-desia-gold">
        <MusicProvider>
          <Navbar />
          {children}
          <FloatingReactions />
          <LyricsDrawer />
          <QueueSheet />
          <SearchModal />
          <GlobalAudioPlayer />
        </MusicProvider>
      </body>
    </html>
  );
}
