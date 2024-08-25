/**
 * v0 by Vercel.
 * @see https://v0.dev/t/UPzpusCE7B0
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "./ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  CartesianGrid,
  XAxis,
  Line,
  LineChart,
  Pie,
  PieChart,
} from "recharts";
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
} from "./ui/chart"

export default function WishlistsPart() {
  const wishlists = [
    {
      id: 1,
      title: "Save for Vacation",
      description: "Save $5,000 for a summer vacation",
      progress: 40,
      currentAmount: 2000,
      targetAmount: 5000,
    },
    {
      id: 3,
      title: "Pay Off Debt",
      description: "Pay off $15,000 in credit card debt",
      progress: 60,
      currentAmount: 9000,
      targetAmount: 15000,
    },
    {
      id: 4,
      title: "Save for Vacation",
      description: "Save $5,000 for a summer vacation",
      progress: 40,
      currentAmount: 2000,
      targetAmount: 5000,
    },
    {
      id: 5,
      title: "Pay Off Debt",
      description: "Pay off $15,000 in credit card debt",
      progress: 60,
      currentAmount: 9000,
      targetAmount: 15000,
    },
    {
      id: 6,
      title: "Save for Vacation",
      description: "Save $5,000 for a summer vacation",
      progress: 40,
      currentAmount: 2000,
      targetAmount: 5000,
    },
    {
      id: 7,
      title: "Pay Off Debt",
      description: "Pay off $15,000 in credit card debt",
      progress: 60,
      currentAmount: 9000,
      targetAmount: 15000,
    },
    {
      id: 8,
      title: "Pay Off Debt",
      description: "Pay off $15,000 in credit card debt",
      progress: 60,
      currentAmount: 9000,
      targetAmount: 15000,
    },
  ];

  return (
    <div className="overflow-hidden bg-gray-900 h-screen">
      <div className="flex flex-col justify-center">
        <div className="absolute w-full flex justify-center ">
          <div className="absolute top-[50px] bg-white h-14 left-40 w-px"></div>
        </div>

        <div className="absolute top-[100px] left-10">
          <Calendar
            mode="single"
            className="rounded-md border transform rotate-12 border-[#39FF14] bg-black text-white shadow-white shadow-lg"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="absolute w-full flex justify-center ">
          <div className="absolute top-[50px] bg-white h-14 right-40 w-px"></div>
        </div>

        <div className="absolute top-[100px] right-10">
          <PiechartcustomChart className="" />
        </div>
      </div>

      <div className="bg-gray-900 mt-20 mx-auto p-8">
        <div className="flex items-center justify-between max-w-4xl mx-auto pb-8">
          <Input
            type="text"
            placeholder="Name your Wishlist"
            className="flex-grow mr-4"
          />
          <Button className="bg-white text-black font-bold text-2xl p-4 rounded-full shadow-lg hover:bg-gray-100 transition">
            +
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6  max-w-4xl mx-auto overflow-y-scroll max-h-[500px] no-scrollbar">
          {wishlists.map((wishlist) => (
            <Card
              key={wishlist.id}
              className="relative overflow-hidden rounded-xl border-4 border-blue-500 shadow-lg transition-all hover:shadow-2xl hover:border-red-600 transform hover:-translate-y-1 cursor-pointer"
            >
              <CardContent className="p-4 flex flex-col gap-2 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {wishlist.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition"
                    >
                      <PencilIcon
                        className="w-4 h-4 text-gray-600"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Edit {wishlist.title}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-gray-100 transition"
                    >
                      <TrashIcon
                        className="w-4 h-4 text-gray-600"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Delete {wishlist.title}</span>
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600">{wishlist.description}</p>
                <div className="flex items-center justify-between text-sm font-medium text-gray-600">
                  <span>Progress: {wishlist.progress}%</span>
                  <span>
                    ${wishlist.currentAmount.toLocaleString()} / $
                    {wishlist.targetAmount.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={wishlist.progress}
                  className="w-full bg-green-500 rounded-full"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function PencilIcon(props) {
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

function TrashIcon(props) {
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
