import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ApolloWrapper } from "@/components/ApolloWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import Image from "next/image";
import {IBM_Plex_Serif} from 'next/font/google';
import { Analytics } from "@vercel/analytics/react"

const newsreader = IBM_Plex_Serif({
  weight: ['400', '700'],
  subsets: ['latin'],
});


export const metadata: Metadata = {
  title: "Finalytics",
  description: "Made by Vaibhav",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = session?.user.id;
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={cn(
          "min-h-screen bg-background overflow-x-hidden antialiased",
          newsreader.className
        )}
      >
        <nav className="fixed inset-x-0 top-0 z-20 bg-white z-50 shadow-sm  border-b-2 border-solid border-black">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-14 items-center">
              <Link
                href="/"
                className="flex items-center cursor-pointer"
                prefetch={false}
              >
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
                  className="cursor-pointer"
                >
                  <path
                    d="m8 3 4 8 5-5 5 15H2L8 3z"
                    className="cursor-pointer"
                  />
                </svg>
                <span className="sr-only curosor-pointer">B&C</span>
              </Link>

              <nav className=" items-center justify-center flex gap-4 absolute right-0 left-0">
                <Link
                  href="/wishlist"
                  className="font-medium flex font-semibold tracking-wide items-center text-sm transition-colors hover:underline hover:scale-110"
                  prefetch={false}
                >
                  Wishlist
                </Link>
              </nav>
              <div>
                {!user ? (
                  <div className="flex items-center gap-4">
                    <Link href="/signin">
                      <Button aria-label="button" variant="outline" size="sm">
                        Sign in
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button aria-label="button" size="sm">Sign up</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center justify-between rounded-lg  py-4">
                    <form
                      action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/signin" });
                      }}
                      className="cursor-pointer"
                    >
                      <Button aria-label="button"
                        type="submit"
                        className="cursor-pointer hover:bg-white bg-white flex items-center justify-between"
                      >
                       <Image height={36} width={36} src="/assets/logout.webp" alt="SignOut" />
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        <ApolloWrapper>{children}</ApolloWrapper>
        <Analytics />
      </body>
    </html>
  );
}
