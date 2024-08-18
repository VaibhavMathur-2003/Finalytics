export interface Candle {
    timestamp: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    unknown: number;
  }
  
  export interface CandleResponse {
    status: string;
    data: {
      candles: [string, number, number, number, number, number, number][];
    };
  }