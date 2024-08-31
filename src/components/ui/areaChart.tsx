"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Candle } from "@/types/types";

const chartConfig = {
  profit: {
    label: "Profit",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function AreaCharts({ stockData }: { stockData: Candle[] }) {
  const [timeRange, setTimeRange] = React.useState("90d");

  // Calculate the profit for each day
  const calculateProfitPerDay = (data: Candle[]) => {
    const profitMap: { [key: string]: number } = {};

    data.forEach((item) => {
      const date = item.timestamp.split("T")[0]; // Extract date from timestamp
      const profit = item.profit;

      if (profitMap[date]) {
        profitMap[date] += profit;
      } else {
        profitMap[date] = profit;
      }
    });

    return Object.keys(profitMap).map((date) => ({
      timestamp: date,
      profit: profitMap[date],
    }));
  };

  const filteredData = calculateProfitPerDay(stockData).filter((item) => {
    const timestamp = new Date(item.timestamp);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return timestamp >= now;
  });

  return (
    <Card className="bg-gray-900 text-white border-none">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Wishlist Performance</CardTitle>
          <CardDescription>
            Showing total profit for the selected time range
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto bg-black text-white"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-0 pt-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData.reverse()}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const timestamp = new Date(value);
                return timestamp.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
              tick={{ stroke: "#ffffff" }}

            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={24}
              tickCount={5}
              tick={{ stroke: "#ffffff" }} // Replace with your desired color
            />

            <Area
              dataKey="profit"
              type="natural"
              fill="#1ae7e3"
              stroke="#ffffff"
              stackId="a"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
