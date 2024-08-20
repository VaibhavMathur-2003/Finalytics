"use client"
import { useState, useEffect } from 'react';
import { Candle } from '@/types/types';
import { fetchCandles } from '@/types/api';
import CandleData from '../components/CandleData';

// This would typically come from an API or a large JSON file
const STOCK_OPTIONS = [
  { value: 'NSE_EQ|INE848E01016', label: 'TCS' },
  { value: 'NSE_EQ|INE009A01021', label: 'Infosys' },
  { value: 'NSE_EQ|INE062A01020', label: 'HDFC Bank' },
  // Add more stock options here
];

export default function CandleDataClient() {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stockKeys, setStockKeys] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState('');

  const handleAddStock = () => {
    if (selectedStock && !stockKeys.includes(selectedStock)) {
      setStockKeys([...stockKeys, selectedStock]);
      setSelectedStock('');
      setSearchTerm('');
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    const selectedOption = STOCK_OPTIONS.find(
      option => option.label.toLowerCase() === value.toLowerCase() || option.value === value
    );
    if (selectedOption) {
      setSelectedStock(selectedOption.value);
    } else {
      setSelectedStock('');
    }
  };

  const filteredOptions = STOCK_OPTIONS.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
    option.value.includes(searchTerm)
  );

  return (
    <>
      <div>
        <input
          list="stock-options"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a stock"
        />
        <datalist id="stock-options">
          {filteredOptions.map(option => (
            <option key={option.value} value={option.label}>
              {option.value}
            </option>
          ))}
        </datalist>
        <button onClick={handleAddStock} disabled={!selectedStock}>Add Stock</button>
      </div>
      <ul>
        {stockKeys.map((key) => (
          <li key={key}>
            {STOCK_OPTIONS.find(option => option.value === key)?.label || key}
            <button onClick={() => handleRemoveStock(key)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleFetchData} disabled={loading}>
        Fetch Data
      </button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {candles.length > 0 && <CandleData candles={candles} />}
    </>
  );
}