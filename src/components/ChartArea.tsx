"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CartesianGrid, XAxis, Line, LineChart, Pie, PieChart } from "recharts";
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
} from "@/components/ui/chart";
import { ReactNode } from "react";
import { AnimationControls } from "framer-motion";
import { RefObject, useEffect, useRef } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

function AnimatedSection({ children, className }: AnimatedSectionProps) {
  const controls: AnimationControls = useAnimation();
  const ref: RefObject<HTMLDivElement> = useRef(null);
  const isInView: boolean = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
const stocks = [
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

export default function ChartArea() {
  return (
    <div className="flex flex-col min-h-[100dvh] max-w-7xl mb-12 rounded-b-[50px] px-4 sm:px-6 lg:px-8 overflow-hidden">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Manage Your Stock Wishlist
                </h2>
                <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Add, remove, and track the stocks youre interested in. Our
                  platform makes it easy to stay on top of your portfolio.
                </p>
              </div>
            </AnimatedSection>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <AnimatedSection className="flex flex-col justify-center space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Stock Wishlist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <CardContent>
                        <div className="grid gap-4">
                          {stocks.map((stock, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <StoreIcon className="h-6 w-6" />
                                <div>
                                  <div className="font-medium">
                                    {stock.name}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {stock.symbol}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div
                                  className={`text-sm font-medium ${stock.changeColor}`}
                                >
                                  {stock.change}
                                </div>
                                <Button aria-label="button" variant="ghost" size="icon">
                                  <XIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
              <AnimatedSection className="flex flex-col justify-center space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Wishlist Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LinechartChart className="aspect-[9/4]" />
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white sm:rounded-b-[50px]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <AnimatedSection className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                  <motion.h1
                    className="text-3xl font-semibold tracking-tight sm:text-5xl xl:text-6xl/none"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    Unlock the Power of Finance Analytics
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-gray-300 md:text-xl"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    Create a personalized stock wishlist and get real-time
                    insights into its performance with our interactive charts
                    and visualizations.
                  </motion.p>
                </div>
               
              </AnimatedSection>
              <div className="">
                <Card>
                  <CardContent>
                    <PiechartcustomChart className="" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
function LinechartChart(props: any) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
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
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

function StoreIcon(props: any) {
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

function XIcon(props: any) {
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

function PiechartcustomChart(props: any) {
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
