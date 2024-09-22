"use client"
import { ReactNode } from "react";
import { StockProvider } from '@/actions/data';

type LayoutProps = {
  children: ReactNode;
  Areachart: React.ReactNode
  Calendar: React.ReactNode
  Piechart: React.ReactNode
};

export default function Layout({ children, Areachart, Calendar, Piechart }: LayoutProps) {
  return (
    <StockProvider>
      <div className="bg-gray-900 min-h-screen">
    <div className="flex flex-col max-w-6xl mx-auto text-white p-4">
      <h1 className="mt-20 mb-5 font-semibold text-3xl md:text-4xl font-serif">
        Dashboard
      </h1>
      {Calendar}
        {Areachart}
        {Piechart}

    </div>
  </div>
       
    </StockProvider>
  );
}