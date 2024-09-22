"use client"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useStockContext } from '@/actions/data';

export default function Page() {
    const { date, setDate, totalProfit } = useStockContext();
    
    return (
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
    );
}