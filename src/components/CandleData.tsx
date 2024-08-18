import { Candle } from '@/types/types';

interface CandleDataProps {
  candles: Candle[];
}

export default function CandleData({ candles }: CandleDataProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Stock Key</th>
          <th>Timestamp</th>
          <th>Open</th>
          <th>High</th>
          <th>Low</th>
          <th>Close</th>
          <th>Volume</th>
        </tr>
      </thead>
      <tbody>
        {candles.map((candle) => (
          <tr key={`${candle.stockKey}-${candle.timestamp}`}>
            <td>{candle.stockKey}</td>
            <td>{candle.timestamp}</td>
            <td>{candle.open}</td>
            <td>{candle.high}</td>
            <td>{candle.low}</td>
            <td>{candle.close}</td>
            <td>{candle.volume}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}