"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import stocksData from "../../../public/assets/stocks.json";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const stockNames = Object.fromEntries(
  stocksData.map((stock: { symbol: string; name: string }) => [
    stock.symbol,
    stock.name.slice(0, 15),
  ])
);

const chartConfig = {
  profit: {
    label: "profit",
  },
} satisfies ChartConfig;

export function Topers({ stockData, title }: { stockData: any; title: string }) {
  console.log(stockData, title);

  const transformedData = stockData.map((stock: { stockKey: string; profit: number }) => ({
    ...stock,
    stockName: stockNames[stock.stockKey] || stock.stockKey,
  }));

  return (
    <Card className="bg-gray-900 w-full text-white border-none">
      <CardHeader>
        <CardTitle className="my-4">Top {title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[280px] w-full">
          {stockData.length !== 0 ? (
            <BarChart
              accessibilityLayer
              data={transformedData}
              layout="vertical"
              margin={{
                left: 0,
              }}
            >
              <YAxis
                dataKey="stockName"
                type="category"
                className="w-full"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <XAxis dataKey="profit" type="number" hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="profit" layout="vertical" radius={5} />
            </BarChart>
          ) : (
            <div className="w-full flex justify-center align-center h-full">
              <h1 className="text-gray-400 text-xl">No {title}</h1>
            </div>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
