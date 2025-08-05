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
    <Card className="bg-gray-900 text-white border border-gray-800 rounded-2xl shadow-md">
  <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800 px-6 py-4">
    <div className="flex flex-col gap-1 text-left">
      <CardTitle className="text-xl font-semibold tracking-tight">
        Wishlist Performance
      </CardTitle>
      <CardDescription className="text-gray-400 text-sm">
        Showing total profit for the selected time range
      </CardDescription>
    </div>
    <Select value={timeRange} onValueChange={setTimeRange}>
      <SelectTrigger
        className="w-[160px] rounded-xl border border-gray-700 bg-gray-800 text-white hover:border-gray-600 focus:ring-1 focus:ring-cyan-400 transition"
        aria-label="Select a value"
      >
        <SelectValue placeholder="Last 3 months" />
      </SelectTrigger>
      <SelectContent className="rounded-xl bg-gray-800 border border-gray-700 text-white shadow-lg">
        <SelectItem value="90d" className="hover:bg-gray-700 rounded-md px-2 py-1">
          Last 3 months
        </SelectItem>
        <SelectItem value="30d" className="hover:bg-gray-700 rounded-md px-2 py-1">
          Last 30 days
        </SelectItem>
        <SelectItem value="7d" className="hover:bg-gray-700 rounded-md px-2 py-1">
          Last 7 days
        </SelectItem>
      </SelectContent>
    </Select>
  </CardHeader>

  <CardContent className="lg:px-6 lg:pb-6 lg:pt-4 p-0">
    <ChartContainer
      config={chartConfig}
      className="aspect-[2/1] h-[250px] w-full"
    >
      <AreaChart data={filteredData.reverse()}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#2d2d2d" />
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
          tick={{ fill: "#ffffff" }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={24}
          tickCount={5}
          tick={{ fill: "#ffffff" }}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
              indicator="dot"
            />
          }
        />
        <Area
          dataKey="profit"
          type="natural"
          fill="#1ae7e3"
          stroke="#ffffff"
          strokeWidth={2}
          stackId="a"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  </CardContent>
</Card>

  );
}
