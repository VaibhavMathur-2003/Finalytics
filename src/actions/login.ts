"use server";

import { signIn } from "@/auth";

const loginHandler = async (email: string, password: string) => {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      console.log("SignIn Error:", result.error);
      return result.error;
    }
    return null;
  } catch (error) {
    console.log("Catch Error:", error);
    return "An unexpected error occurred";
  }
};

export { loginHandler };
