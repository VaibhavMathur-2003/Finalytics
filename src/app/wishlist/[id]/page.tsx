"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchCandlesForStock } from "@/types/api";
import { Candle } from "@/types/types";
import { useQuery } from "@apollo/client";
import { Calendar } from "@/components/ui/calendar";
import { PieCharts } from "@/components/ui/piechart";
import { AreaCharts } from "@/components/ui/areaChart";
import { Topers } from "@/components/ui/topers";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GET_WISHLIST } from "@/components/functions/gql";
import { pieData } from "@/components/functions/icons";

export default function WishlistData() {
  const params = useParams();
  const id = params.id as string;
  const [stockData, setStockData] = useState<Candle[]>([]);
  const [filteredStockData, setFilteredStockData] = useState<Candle[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)), 
  to: new Date(),
  });

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
  

  if (loading || wishlistLoading) {
    return <div>Loading...</div>;
  }

  const totalProfit = filteredStockData.reduce(
    (acc, candle) => acc + (candle.close - candle.open),
    0
  );


  

  return (
    <div className="bg-gray-900 min-h-screen">
    <div className="flex flex-col max-w-6xl mx-auto text-white p-4">
      <h1 className="mt-20 mb-5 font-semibold text-3xl md:text-4xl font-serif">
        Dashboard
      </h1>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="bg-gradient-to-r my-3 from-blue-500 to-indigo-600 rounded-xl shadow-lg w-full md:w-2/3 flex flex-col justify-center p-6">
          <div className="flex items-center justify-center w-full">
            <Popover>
              <PopoverTrigger asChild>
                <Button aria-label="button"
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full md:w-[300px] justify-center font-normal text-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:text-blue-200",
                    !date && "text-muted-background"
                  )}
                >
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={1}
                  className="bg-gray-900 text-white rounded-lg shadow-md"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="bg-gradient-to-r my-3 from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg w-full md:w-1/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Profit Card</h2>
            <span className="text-lg">💳</span>
          </div>
          <div className="mb-4">
            <p className="text-sm">Total Profit</p>
            <p
              className={`text-3xl font-bold ${
                totalProfit >= 0 ? "text-green-500" : "text-red-400"
              }`}
            >
              {totalProfit.toFixed(2)} INR
            </p>
          </div>
          <div className="flex justify-between items-center text-sm">
            <p></p>
            <p>{new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
      <div className="my-8">
        <AreaCharts stockData={filteredStockData} />
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
        <PieCharts
          profit={pieData(filteredStockData).positiveProfits}
          loss={pieData(filteredStockData).negativeProfits}
        />
        <div className="flex flex-col md:flex-row gap-5">
          <Topers
            stockData={pieData(filteredStockData).positiveProfits.slice(0, 5)}
            title="Gainers"
          />
          <Topers
            stockData={pieData(filteredStockData).negativeProfits.slice(-5)}
            title="Losers"
          />
        </div>
      </div>
    </div>
  </div>
  
  );
}


