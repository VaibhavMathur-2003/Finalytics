import { Suspense } from 'react';
import CandleDataClient from '@/components/FetchData';

export default function Home() {
  return (
    <main>
      <h1>Candle Data</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CandleDataClient />
      </Suspense>
    </main>
  );
}