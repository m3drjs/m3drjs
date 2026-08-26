import { NextResponse } from 'next/server';
import { initialSongs } from '@/data/songs';

export async function GET() {
  return NextResponse.json({
    success: true,
    count: initialSongs.length,
    data: initialSongs,
  });
}
