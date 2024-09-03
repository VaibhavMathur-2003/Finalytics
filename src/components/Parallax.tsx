"use client";
import React from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Hero />
    </div>
  );
};

const Hero: React.FC = () => {
  const text = "Welcome To Bulls & Cents".split(" ");

  const { scrollYProgress } = useViewportScroll();

  const scaleStocks = useTransform(scrollYProgress, [0, 1], [0.7, 1.8]);
  const scaleLaptop = useTransform(scrollYProgress, [0, 1], [0.8, 1.8]);

  return (
    <div className="text-white bg-black rounded-t-[50px] font-semibold mx-auto mt-20 flex flex-col items-center relative overflow-hidden">
      <div className="text-3xl sm:text-5xl z-10 mt-10 font-bold tracking-tighter font-mono text-center px-2">
        {text.map((el, i) => (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
            key={i}
            className={`inline-block ${
              el === "Bulls" ? "text-[#36fb73]" : el === "Cents" ? "text-[#FFFF00]" : ""
            }`}
          >
            {el}&nbsp;
          </motion.span>
        ))}
      </div>
      <section className="hero min-h-screen w-full flex flex-col justify-center items-center text-center relative">
        {/* Image 1: Stocks */}
        <motion.img
          src="/assets/stocks.png"
          alt="Stocks"
          className="absolute brightness-105 w-[60%] sm:w-[40%] lg:w-[30%]"
          style={{ scale: scaleStocks }}
        />

        {/* Image 2: Laptop */}
        <motion.img
          src="/assets/laptop.png"
          alt="Laptop"
          className="absolute w-full  max-w-4xl"
          style={{ scale: scaleLaptop }}
        />
      </section>
    </div>
  );
};

export default LandingPage;
