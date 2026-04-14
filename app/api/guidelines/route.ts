import { NextResponse } from 'next/server';
import type { Channel } from '@/types/spreadsheet';
import type { GuidelinesApiResponse } from '@/types/guidelines';
import { getCached, setCached } from '@/lib/cache';
import { fetchAndScrapeGuidelines } from '@/lib/scraper/scrapeGuidelines';

const VALID_CHANNELS: Channel[] = ['sms', 'voice', 'porting'];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country')?.toLowerCase();
  const channel = searchParams.get('channel')?.toLowerCase();

  if (!country || !channel || !VALID_CHANNELS.includes(channel as Channel)) {
    return NextResponse.json<GuidelinesApiResponse>(
      { data: null, error: 'Missing or invalid params. Required: country (ISO code) and channel (sms|voice|porting)', cached: false },
      { status: 400 },
    );
  }

  const cacheKey = `${country}:${channel}`;
  const cached = getCached<GuidelinesApiResponse['data']>(cacheKey);
  if (cached) {
    return NextResponse.json<GuidelinesApiResponse>({ data: cached, error: null, cached: true });
  }

  try {
    const data = await fetchAndScrapeGuidelines(country, channel as Channel);
    setCached(cacheKey, data);
    return NextResponse.json<GuidelinesApiResponse>({ data, error: null, cached: false });
  } catch (err) {
    return NextResponse.json<GuidelinesApiResponse>(
      { data: null, error: String(err), cached: false },
      { status: 502 },
    );
  }
}
