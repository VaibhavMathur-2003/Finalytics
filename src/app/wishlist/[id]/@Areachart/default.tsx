"use client"
import { AreaCharts } from "@/components/ui/areaChart";
import { useStockContext } from '@/actions/data';

function AreachartPage() {
  const { filteredStockData } = useStockContext();

  return (
    <div className="my-8">
      <AreaCharts stockData={filteredStockData} />
    </div>
  );
}

export default AreachartPage;