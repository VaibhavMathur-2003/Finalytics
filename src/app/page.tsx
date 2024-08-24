import Link from "next/link";
import { Button } from "@/components/ui/button";
import LandingPage from "@/components/Parallax";
import ChartArea from "@/components/ChartArea";

export default function Component() {
  return (
    <div className="max-w-7xl md:w-[80%] mx-auto overflow-hidden">
      <nav className="fixed inset-x-0 top-0 z-20 bg-white z-50 shadow-sm dark:bg-gray-950/90 border-b-2 border-solid border-black">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-14 items-center">
            <Link href="#" className="flex items-center" prefetch={false}>
              <svg
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
                <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
              </svg>
              <span className="sr-only">Acme Inc</span>
            </Link>
            <nav className="hidden md:flex gap-4">
              <Link
                href="#"
                className="font-medium flex items-center text-sm transition-colors hover:underline"
                prefetch={false}
              >
                Your Wishlist
              </Link>
              
              
            </nav>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                Sign in
              </Button>
              <Button size="sm">Sign up</Button>
            </div>
          </div>
        </div>
      </nav>

      <LandingPage />
      <ChartArea />
    </div>
  );
}
