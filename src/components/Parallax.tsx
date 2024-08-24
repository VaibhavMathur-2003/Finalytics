"use client";
import React from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page max-w-7xl mx-auto">
      <Hero />
    </div>
  );
};

const Hero: React.FC = () => {
  const text = "Welcome To Bulls & Cents".split(" ");

  const { scrollYProgress } = useViewportScroll();

  const scaleStocks = useTransform(scrollYProgress, [0, 1], [0.8, 1.8]);
  const scaleLaptop = useTransform(scrollYProgress, [0, 1], [0.7, 1.8]);

  return (
    <div className="text-white bg-black sm:rounded-t-[50px] font-semibold mx-auto mt-20 flex flex-col items-center">
      <div className="text-5xl z-10 absolute mt-10 font-bold tracking-tighter font-mono">
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
      <section className="hero min-h-screen w-full flex flex-col justify-center items-center text-center">
        {/* Image 1: Stocks */}
        <motion.img
          src="/assets/stocks.png"
          alt=""
          className="absolute brightness-105 w-[30%]"
          style={{ scale: scaleStocks }}
        />

        {/* Image 2: Laptop */}
        <motion.img
          src="/assets/laptop.png"
          alt=""
          className="absolute w-[70%] "
          style={{ scale: scaleLaptop }}
        />
      </section>
    </div>
  );
};

export default LandingPage;
