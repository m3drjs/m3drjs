import { NextResponse } from 'next/server';
import { initialSongs } from '@/data/songs';

export async function GET() {
  const currentSong = initialSongs[0];
  const now = Date.now();
  // Room clock calculation (loops through 28 seconds)
  const roomElapsed = Math.floor((now / 1000) % 28);

  return NextResponse.json({
    currentSongId: currentSong.id,
    currentSongTitle: currentSong.title,
    roomElapsedSeconds: roomElapsed,
    durationSeconds: currentSong.duration,
    listenerCount: 27,
    activeDistricts: ['Koraput', 'Malkangiri', 'Nabarangpur', 'Rayagada', 'Kandhamal', 'Bhubaneswar'],
    roomMode: 'broadcast',
    lastSync: now,
  });
}
