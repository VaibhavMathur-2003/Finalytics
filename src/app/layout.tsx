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
        <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm border-b border-black">
  <div className="w-full max-w-7xl mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      {/* Logo & Home Link */}
      <Link
        href="/"
        className="flex items-center space-x-2"
        prefetch={false}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-black"
        >
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
        <span className="sr-only">Finalytics Logo</span>
      </Link>

      {/* Wishlist (Visible only on md and up) */}
      <div className="hidden md:flex space-x-6">
        <Link
          href="/wishlist"
          className="text-sm font-medium hover:underline transition"
          prefetch={false}
        >
          Wishlist
        </Link>
      </div>

      {/* Right Auth Section */}
      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link href="/signin">
              <Button variant="outline" size="sm" aria-label="Sign in">
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" aria-label="Sign up">
                Sign up
              </Button>
            </Link>
          </>
        ) : (
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/signin" });
            }}
          >
            <Button type="submit" variant="ghost" aria-label="Sign out">
              <Image
                src="/assets/logout.webp"
                alt="Sign out"
                width={28}
                height={28}
                className="rounded-full"
              />
            </Button>
          </form>
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
