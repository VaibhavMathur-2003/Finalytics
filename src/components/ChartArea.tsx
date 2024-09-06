"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { AnimationControls } from "framer-motion";
import { RefObject, useEffect, useRef } from "react";
import { LinechartChart, PiechartcustomChart, stocks, StoreIcon, XIcon } from "./functions/icons";

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



