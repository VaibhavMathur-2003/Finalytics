"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!, $name: String) {
    createUser(email: $email, password: $password, name: $name) {
      id
      email
      name
    }
  }
`;
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hashedPassword = await hashPassword(password);
    createUser({ variables: { email, password: hashedPassword, name } });
  };

  if (error) return <p>Error: {error.message}</p>;
  if (data) {
    router.push("/signin");
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-900 text-white px-4 py-12 sm:px-6 lg:px-8 ">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Welcome To <span className="text-green-500">Bulls</span> &{" "}
            <span className="text-yellow-500">Cents</span>{" "}
          </CardTitle>
          <CardDescription>
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                onChange={(e) => setName(e.target.value)}
                id="name"
                type="text"
                placeholder="Name"
                name="name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="m@example.com"
                name="email"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  name="password"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-1 right-1 h-7 w-7"
                >
                  <EyeIcon className="h-4 w-4" />
                  <span className="sr-only">Toggle password visibility</span>
                </Button>
              </div>
            </div>
            {loading ? (
              <div className="w-full bg-green-500 text-white text-center rounded-md p-2">
                Submitting...
              </div>
            ) : (
              <Button type="submit" className="w-full bg-green-700">
                Sign up
              </Button>
            )}
          </CardContent>
        </form>
        <CardFooter className="text-center text-sm">
          Already have an account?&nbsp;
          <Link
            href="/signin"
            className="font-medium text-primary hover:underline"
            prefetch={false}
          >
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;

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
  );
}
