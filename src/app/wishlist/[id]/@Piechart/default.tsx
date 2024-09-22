"use client"
import { useStockContext } from "@/actions/data";
import { pieData } from "@/components/functions/icons";
import { PieCharts } from "@/components/ui/piechart";
import { Topers } from "@/components/ui/topers";

export default function Page() {
  const { filteredStockData } = useStockContext();

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
      <PieCharts
        profit={pieData(filteredStockData).positiveProfits}
        loss={pieData(filteredStockData).negativeProfits}
      />
      <div className="flex flex-col md:flex-row gap-5">
        <Topers
          stockData={pieData(filteredStockData).positiveProfits.slice(0, 5)}
          title="Gainers"
        />
        <Topers
          stockData={pieData(filteredStockData).negativeProfits.slice(-5)}
          title="Losers"
        />
      </div>
    </div>
  );
}
