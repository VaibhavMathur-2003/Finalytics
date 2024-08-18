"use client"
import { useEffect, useState } from 'react';
import { Candle } from '@/types/types';
import { fetchCandles } from '@/types/api';
import CandleData from '@/components/CandleData';

export default function Home() {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCandles() {
      try {
        const data = await fetchCandles();
        setCandles(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load candle data');
        setLoading(false);
      }
    }

    loadCandles();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      <h1>Candle Data</h1>
      <CandleData candles={candles} />
    </main>
  );
}