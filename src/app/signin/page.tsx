import { auth } from "@/auth";
import SignInForm from "./SignInForm";
import { redirect } from "next/navigation";

async function page() {
  const session= await auth();
  const user=session?.user.id;
  if(user) redirect("/wishlist")
  return (
    <div>
      <SignInForm/>
    </div>
  );
}

export default page;