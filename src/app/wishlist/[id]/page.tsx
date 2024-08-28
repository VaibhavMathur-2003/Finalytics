"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchCandles } from "@/types/api";
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
      console.error("Error fetching wishlist data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || wishlistLoading) {
    return <div>Loading...</div>;
  }

  const totalProfit = stockData.reduce(
    (acc, candle) => acc + (candle.close - candle.open),
    0
  );

  return (
    <div className="flex">
      {/* <Calendar
            mode="single"
            className="rounded-md border border-[#39FF14] bg-black text-white shadow-white shadow-lg"
          /> */}
{/*       
      <DualRangeSlider
        label={(value) => value}
        value={values}
        onValueChange={setValues}
        min={0}
        max={100}
        step={1}
      />
      <div className="mt-40 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg mx-auto">
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
      <div className="mt-40 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg mx-auto">
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
      </div> */}
      <PieCharts/>
      <AreaCharts/>
      <Topers/>
    </div>
  );
}
