"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  profit: {
    label: "profit",
  },
} satisfies ChartConfig


export function PieCharts({profit, loss}:{profit: any, loss: any}) {
  return (
    <Card className="flex flex-col bg-gray-900 border-none text-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>Profit-Loss Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelKey="profit"
                  nameKey="stockKey"
                  indicator="line"
                  labelFormatter={(_, payload) => {
                    return chartConfig[
                      payload?.[0].dataKey as keyof typeof chartConfig
                    ].label
                  }}
                />
              }
            />
            <Pie data={profit} dataKey="profit" outerRadius={60} />
            <Pie
              data={loss}
              dataKey="profit"
              innerRadius={70}
              outerRadius={90}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
