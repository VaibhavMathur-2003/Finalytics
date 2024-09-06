import { CartesianGrid, Line, LineChart, Pie, PieChart, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Candle, StockProfit } from "@/types/types";

export function PencilIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
      </svg>
    );
  }
  
  export function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </svg>
    );
  }
  

  export function StoreIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
        <path d="M2 7h20" />
        <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
      </svg>
    );
  }
  
  export function XIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    );
  }
  
  export function PiechartcustomChart(props: any) {
    return (
      <div {...props}>
        <ChartContainer
          config={{
            visitors: {
              label: "Stocks",
            },
            chrome: {
              label: "IRFC",
              color: "hsl(var(--chart-1))",
            },
            safari: {
              label: "Infosys",
              color: "hsl(var(--chart-2))",
            },
            firefox: {
              label: "Zomato",
              color: "hsl(var(--chart-3))",
            },
            edge: {
              label: "Reliance",
              color: "hsl(var(--chart-4))",
            },
            other: {
              label: "Other",
              color: "hsl(var(--chart-5))",
            },
          }}
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={[
                { browser: "IRFC", visitors: 275, fill: "var(--color-chrome)" },
                {
                  browser: "Infosys",
                  visitors: 200,
                  fill: "var(--color-safari)",
                },
                {
                  browser: "Zomato",
                  visitors: 187,
                  fill: "var(--color-firefox)",
                },
                { browser: "Reliance", visitors: 173, fill: "var(--color-edge)" },
                { browser: "other", visitors: 90, fill: "var(--color-other)" },
              ]}
              dataKey="visitors"
              nameKey="browser"
            />
          </PieChart>
        </ChartContainer>
      </div>
    );
  }

  export function LinechartChart(props: any) {
    return (
      <div {...props}>
        <ChartContainer
          config={{
            profit: {
              label: "profit",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <LineChart
            accessibilityLayer
            data={[
              { month: "January", profit: 186 },
              { month: "February", profit: 305 },
              { month: "March", profit: 237 },
              { month: "April", profit: 73 },
              { month: "May", profit: 209 },
              { month: "June", profit: 214 },
            ]}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="profit"
              type="natural"
              stroke="var(--color-profit)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    );
  }

  export const stocks = [
    {
      name: "Apple Inc.",
      symbol: "AAPL",
      change: "+2.5%",
      changeColor: "text-green-500",
    },
    {
      name: "Microsoft Corp.",
      symbol: "MSFT",
      change: "-1.2%",
      changeColor: "text-red-500",
    },
    {
      name: "Amazon.com, Inc.",
      symbol: "AMZN",
      change: "+3.8%",
      changeColor: "text-green-500",
    },
    {
      name: "Tesla, Inc.",
      symbol: "TSLA",
      change: "-0.9%",
      changeColor: "text-red-500",
    },
  ];

  const generateRandomColor = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  export const pieData = (
    data: Candle[]
  ): { positiveProfits: StockProfit[]; negativeProfits: StockProfit[] } => {
    const profitMap: { [key: string]: number } = {};

    data.forEach((item) => {
      const profit = item.close - item.open; // Assuming this calculates profit

      if (profitMap[item.stockKey]) {
        profitMap[item.stockKey] += profit;
      } else {
        profitMap[item.stockKey] = profit;
      }
    });

    const positiveProfits: StockProfit[] = [];
    const negativeProfits: StockProfit[] = [];

    Object.keys(profitMap).forEach((stockKey) => {
      const profit = profitMap[stockKey];
      const stockProfit = {
        stockKey,
        profit: Math.abs(profit),
        fill: generateRandomColor(),
      };

      if (profit >= 0) {
        positiveProfits.push(stockProfit);
      } else {
        negativeProfits.push(stockProfit);
      }
    });

    positiveProfits.sort((a, b) => b.profit - a.profit);
    negativeProfits.sort((a, b) => b.profit - a.profit);

    return { positiveProfits, negativeProfits };
  };