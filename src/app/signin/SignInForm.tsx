"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginHandler } from '@/actions/login';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white px-4 py-12 sm:px-6 lg:px-8 ">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome To <span className='text-green-500'>Bulls</span>  & <span className='text-yellow-500'>Cents</span> </CardTitle>
          <CardDescription>Enter your email and password to access your account.</CardDescription>
        </CardHeader>
        <form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
          setError("Fill all details");
          return;
        }

        const signInError = await loginHandler(email, password);
        if (signInError) {
          setError(signInError);
        } else {
          router.refresh()
        }
      }}
    >
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" name="email" />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
             
            </div>
            <div className="relative">
              <Input id="password" type="password" name="password"/>
              <Button variant="ghost" size="icon" className="absolute bottom-1 right-1 h-7 w-7">
                <EyeIcon className="h-4 w-4" />
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full bg-green-700">
            Sign in
          </Button>
        </CardContent>
        </form>
        <CardFooter className="text-center text-sm">
          Don&apos;t have an account?&nbsp;
          <Link href="/signup" className="font-medium text-primary hover:underline" prefetch={false}>
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

function EyeIcon(props: any) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}