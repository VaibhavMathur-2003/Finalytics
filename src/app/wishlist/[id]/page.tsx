"use client"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCandles } from '@/types/api';
import { Candle } from '@/types/types';
import { gql, useQuery } from '@apollo/client';

const GET_WISHLIST = gql`
  query GetWishlist($id: ID!) {
    wishlist(id: $id) {
      id
      name
      stocks {
        id
        symbol
        name
      }
    }
  }
`;

export default function WishlistData() {
  const params = useParams();
  const id = params.id as string;
  const [stockData, setStockData] = useState<Candle[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: wishlistData, loading: wishlistLoading } = useQuery(GET_WISHLIST, {
    variables: { id },
    skip: !id,
  });

  useEffect(() => {
    if (wishlistData && !wishlistLoading) {
      fetchWishlistData(wishlistData.wishlist);
    }
  }, [wishlistData, wishlistLoading]);

  const fetchWishlistData = async (wishlist: any) => {
    try {
      setLoading(true);
      const stockSymbols = wishlist.stocks.map((stock: any) => stock.symbol);
      const candleData = await fetchCandles(stockSymbols);
      setStockData(candleData);
    } catch (error) {
      console.error('Error fetching wishlist data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || wishlistLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{wishlistData.wishlist.name} Data</h1>
      {stockData.map((candle, index) => (
        <div key={index}>
          <h2>{candle.stockKey}</h2>
          <p>Open: {candle.open}</p>
          <p>Close: {candle.close}</p>
          <p>High: {candle.high}</p>
          <p>Low: {candle.low}</p>
          <p>Volume: {candle.volume}</p>
          <p>Timestamp: {new Date(candle.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}