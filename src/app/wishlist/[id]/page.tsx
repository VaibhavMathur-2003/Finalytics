"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchCandlesForStock } from "@/types/api";
import { Candle } from "@/types/types";
import { gql, useQuery } from "@apollo/client";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { DualRangeSlider } from "@/components/ui/dualrangeslider";
import { PieCharts } from "@/components/ui/piechart";
import { AreaCharts } from "@/components/ui/areaChart";
import { Topers } from "@/components/ui/topers";

const GET_WISHLIST = gql`
  query GetWishlist($id: ID!) {
    wishlist(id: $id) {
      id
      name
      stocks {
        id
        symbol
        name
        quantity
      }
    }
  }
`;

export default function WishlistData() {
  const params = useParams();
  const id = params.id as string;
  const [stockData, setStockData] = useState<Candle[]>([]);
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState([0, 100]);

  const { data: wishlistData, loading: wishlistLoading } = useQuery(
    GET_WISHLIST,
    {
      variables: { id },
      skip: !id,
    }
  );
  const fetchWishlistData = async (wishlist: any) => {
    try {
      setLoading(true);
      const stockDataPromises = wishlist.stocks.map(async (stock: any) => {
        const candleData = await fetchCandlesForStock(
          stock.symbol,
          stock.quantity
        );
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

  if (loading || wishlistLoading) {
    return <div>Loading...</div>;
  }

  if (loading || wishlistLoading) {
    return <div>Loading...</div>;
  }

  const totalProfit = stockData.reduce(
    (acc, candle) => acc + (candle.close - candle.open),
    0
  );

  interface StockProfit {
    stockKey: string;
    profit: number;
    fill: string;
  }
  
  const generateRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  const pieData = (data: Candle[]): { positiveProfits: StockProfit[], negativeProfits: StockProfit[] } => {
    const profitMap: { [key: string]: number } = {};
  
    data.forEach((item) => {
      const profit = item.profit;
  
      if (profitMap[item.stockKey]) {
        profitMap[item.stockKey] += profit;
      } else {
        profitMap[item.stockKey] = profit;
      }
    });
  
    const stockProfits = Object.keys(profitMap).map((stockKey) => ({
      stockKey,
      profit: Math.abs(profitMap[stockKey]),
      fill: generateRandomColor(),
    }));
  
    const positiveProfits = stockProfits.filter((stock) => stock.profit > 0);
    const negativeProfits = stockProfits.filter((stock) => stock.profit < 0);
  
    return {
      positiveProfits,
      negativeProfits,
    };
  };
  
  

  return (
    <div className="bg-gray-900 h-full">
      <div className="flex flex-col max-w-6xl mx-auto text-white">
        <h1 className="mt-20 mb-5 font-semibold text-4xl font-serif">
          Dashboard
        </h1>
        <div className="flex">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg w-full flex flex-col justify-center p-8">
            <DualRangeSlider
              className=""
              label={(value) => value}
              value={values}
              onValueChange={setValues}
              min={0}
              max={100}
              step={1}
            />
          </div>
          <div className="w-3/4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg mx-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Profit Card</h2>
              <span className="text-lg">💳</span>
            </div>
            <div className="mb-4">
              <p className="text-sm">Total Profit</p>
              <p className="text-3xl font-bold">{totalProfit.toFixed(2)} USD</p>
            </div>
            <div className="flex justify-between items-center text-sm">
              <p>Vaibhav Mathur</p>
              <p>{new Date().getFullYear()}</p>
            </div>
          </div>
          <div className="w-3/4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg mx-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Profit Card</h2>
              <span className="text-lg">💳</span>
            </div>
            <div className="mb-4">
              <p className="text-sm">Total Profit</p>
              <p className="text-3xl font-bold">{totalProfit.toFixed(2)} USD</p>
            </div>
            <div className="flex justify-between items-center text-sm">
              <p>Vaibhav Mathur</p>
              <p>{new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
        <AreaCharts stockData={stockData} />

        <div className="flex justify-between">
          <PieCharts stockData={pieData(stockData).positiveProfits}/>
          <PieCharts stockData={pieData(stockData).negativeProfits}/>
          <div className="flex">
            {/* <Topers />
            <Topers /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
