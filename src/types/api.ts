import { CandleResponse, Candle } from './types';

export async function fetchCandles(): Promise<Candle[]> {
  const response = await fetch('https://api.upstox.com/v2/historical-candle/NSE_EQ%7CINE848E01016/day/2024-08-13/2024-08-12');
  const data: CandleResponse = await response.json();

  if (data.status !== 'success') {
    throw new Error('Failed to fetch candle data');
  }

  return data.data.candles.map(([timestamp, open, high, low, close, volume, unknown]) => ({
    timestamp,
    open,
    high,
    low,
    close,
    volume,
    unknown,
  }));
}