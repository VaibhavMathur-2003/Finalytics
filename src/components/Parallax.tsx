"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";


const LandingPage: React.FC = () => {
  return (
    <div className="landing-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Hero />
    </div>
  );
};

const Hero: React.FC = () => {
  const text = "Welcome To Finalytics".split(" ");

  const { scrollYProgress } = useScroll();

  const scaleStocks = useTransform(scrollYProgress, [0, 1], [0.7, 1.8]);
  const scaleLaptop = useTransform(scrollYProgress, [0, 1], [0.8, 1.8]);

  return (
    <div className="text-white bg-black rounded-t-[50px]  mx-auto mt-20 flex flex-col items-center relative overflow-hidden">
      <div className="relative z-10 mt-12 text-center px-4 tracking-tighter">
        {text.map((el, i) => (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: i * 0.1,
              ease: "easeOut",
            }}
            key={i}
            className={`inline-block text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider ${
              el === "Finalytics"
                ? "text-[#36fb73] brightness-120"
                : "text-white"
            }`}
          >
            {el}&nbsp;
          </motion.span>
        ))}
      </div>
      <Button aria-label="button" className="absolute mt-32 bg-gray-900 rounded-xl border border-white hover:bg-green-700  cursor-pointer bg-black">
        <Link
          href="/wishlist"
          className="cursor-pointer z-50 sm:p-3 p-1 hover:text-lg tracking-wide sm:text-base text-sm"
          prefetch={false}
        >
          Get Started
        </Link>
      </Button>

      <section className="hero min-[640px]:min-h-screen w-full flex max-[640px]:mt-12 flex-col sm:justify-center justify-start items-center text-center relative">
        <motion.img
          src="/assets/stocks.webp"
          alt="Stocks"
          className="sm:absolute brightness-105 w-[60%] sm:w-[40%] lg:w-[30%]"
          style={{ scale: scaleStocks }}
        />

        <motion.img
          src="/assets/laptop.webp"
          alt="Laptop"
          className="hidden sm:flex absolute w-full max-w-4xl"
          style={{ scale: scaleLaptop }}
        />
      </section>
    </div>
  );
};

export default LandingPage;
