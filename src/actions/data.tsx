"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { GET_WISHLIST } from '@/components/functions/gql';
import { fetchCandlesForStock } from '@/types/api';
import { Candle } from '@/types/types';
import { DateRange } from 'react-day-picker';

type StockContextType = {
  stockData: Candle[];
  filteredStockData: Candle[];
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  loading: boolean;
  totalProfit: number;
};

const StockContext = createContext<StockContextType | undefined>(undefined);

export const useStockContext = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStockContext must be used within a StockProvider');
  }
  return context;
};

export const StockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = useParams();
  const id = params.id as string;
  const [stockData, setStockData] = useState<Candle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredStockData, setFilteredStockData] = useState<Candle[]>([]);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });

  const { data: wishlistData, loading: wishlistLoading } = useQuery(GET_WISHLIST, {
    variables: { id },
    skip: !id,
  });

  const fetchWishlistData = async (wishlist: any) => {
    try {
      setLoading(true);
      const stockDataPromises = wishlist.stocks.map(async (stock: any) => {
        const candleData = await fetchCandlesForStock(stock.symbol, stock.quantity);
        return candleData;
      });
      const candleData = await Promise.all(stockDataPromises);
      setStockData(candleData.flat());
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (wishlistData && !wishlistLoading) {
      fetchWishlistData(wishlistData.wishlist);
    }
  }, [wishlistData, wishlistLoading]);

  useEffect(() => {
    if (stockData.length > 0 && date?.from && date?.to) {
      const filteredData = stockData.filter(
        (candle) =>
          new Date(candle.timestamp) >= (date.from ?? new Date(0)) &&
          new Date(candle.timestamp) <= (date.to ?? new Date())
      );
      setFilteredStockData(filteredData);
    } else {
      setFilteredStockData(stockData);
    }
  }, [stockData, date]);

  const totalProfit = filteredStockData.reduce(
    (acc, candle) => acc + (candle.close - candle.open),
    0
  );

  return (
    <StockContext.Provider value={{ stockData, filteredStockData, date, setDate, loading, totalProfit }}>
      {children}
    </StockContext.Provider>
  );
};