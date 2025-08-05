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
  <div className="bg-gray-900 min-h-screen text-white">
    <div className="flex flex-col max-w-6xl mx-auto px-0 sm:px-6 lg:px-8 py-12">
      <h1 className="my-8 font-serif text-3xl md:text-4xl font-semibold tracking-tight">
        Dashboard
      </h1>

      <section className="mb-8">
        {Calendar}
      </section>

      <section className="mb-8">
        {Areachart}
      </section>

      <section className="mb-8">
        {Piechart}
      </section>
    </div>
  </div>
</StockProvider>

  );
}