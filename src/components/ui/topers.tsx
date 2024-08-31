"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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


const chartConfig = {
  profit: {
    label: "profit",
  },
  
} satisfies ChartConfig;

export function Topers({ stockData, title }: { stockData: any, title: string}) {
  return (
    <Card className="bg-gray-900 text-white border-none">
      <CardHeader>
        <CardTitle>Top {title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[180px]">
        {stockData.length!==0 ?
          <BarChart
            accessibilityLayer
            data={stockData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="stockKey"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              
            />
            <XAxis dataKey="profit" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="profit" layout="vertical" radius={5} />
          </BarChart>
          : <div className="w-full flex justify-center align-center h-full"><h1 className="text-gray-400 text-xl">No {title}</h1></div>}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
