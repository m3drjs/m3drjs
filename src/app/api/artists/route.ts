import { NextResponse } from 'next/server';
import { initialArtists } from '@/data/artists';

export async function GET() {
  return NextResponse.json({
    success: true,
    count: initialArtists.length,
    data: initialArtists,
  });
}
