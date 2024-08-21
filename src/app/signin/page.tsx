"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginHandler } from '@/actions/login';

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  return (
    <main>
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
          router.push("/")
        }
      }}
    >
      <input className="my-4" type="email" placeholder="Email" name="email" />
      <input className="my-4" type="password" placeholder="Password" name="password" />
      <button className="my-4" type="submit">Sign In</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
    </main>
  )
}