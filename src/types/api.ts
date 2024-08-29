import { CandleResponse, Candle } from '@/types/types';

const BASE_URL = 'https://api.upstox.com/v2/historical-candle';

function getDateRange(): { startDate: string; endDate: string } {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 1);

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
  };
}

export async function fetchCandlesForStock(stockKey: string, quantity: number): Promise<Candle[]> {
  const { startDate, endDate } = getDateRange();
  const url = `${BASE_URL}/${encodeURIComponent(stockKey)}/day/${endDate}/${startDate}`;

  const response = await fetch(url);
  const data: CandleResponse = await response.json();

  if (data.status !== 'success') {
    throw new Error(`Failed to fetch candle data for ${stockKey}`);
  }

  return data.data.candles.map(([timestamp, open, high, low, close, volume, unknown]) => {
    const date = timestamp.split('T')[0];
    const profit = (close - open) * quantity;  // Calculate actual profit by multiplying with quantity
    return {
      timestamp: date,
      open,
      high,
      low,
      close,
      volume,
      unknown,
      stockKey,
      profit,  // Actual profit
    };
  });
}

export async function fetchCandles(stockKeys: string[]): Promise<Candle[]> {
  const candlePromises = stockKeys.map(fetchCandlesForStock);
  const candleArrays = await Promise.all(candlePromises);
  return candleArrays.flat();
}
