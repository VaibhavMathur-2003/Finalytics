"use client"
import { useState, useEffect } from 'react';
import { Candle } from '@/types/types';
import { fetchCandles } from '@/types/api';
import CandleData from '../components/CandleData';

export default function Home() {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stockKeys, setStockKeys] = useState<string[]>([]);
  const [inputStockKey, setInputStockKey] = useState('');

  const handleAddStock = () => {
    if (inputStockKey && !stockKeys.includes(inputStockKey)) {
      setStockKeys([...stockKeys, inputStockKey]);
      setInputStockKey('');
    }
  };

  const handleRemoveStock = (stockKey: string) => {
    setStockKeys(stockKeys.filter(key => key !== stockKey));
  };

  const handleFetchData = async () => {
    if (stockKeys.length === 0) {
      setError('Please add at least one stock key');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchCandles(stockKeys);
      setCandles(data);
    } catch (err) {
      setError('Failed to load candle data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Candle Data</h1>
      <div>
        <input
          type="text"
          value={inputStockKey}
          onChange={(e) => setInputStockKey(e.target.value)}
          placeholder="Enter stock key (e.g., NSE_EQ|INE848E01016)"
        />
        <button onClick={handleAddStock}>Add Stock</button>
      </div>
      <ul>
        {stockKeys.map((key) => (
          <li key={key}>
            {key} <button onClick={() => handleRemoveStock(key)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleFetchData} disabled={loading}>
        Fetch Data
      </button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {candles.length > 0 && <CandleData candles={candles} />}
    </main>
  );
}