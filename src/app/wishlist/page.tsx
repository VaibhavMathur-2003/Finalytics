import { auth } from "@/auth";
import WishlistsPart from "@/components/carous";
import WishlistManager from "@/components/WishLists";
import { redirect } from 'next/navigation'



const Page = async () => {
    const session = await auth();
    if(!session) {
        redirect("/signin");
    }
    const user=session.user.id;
    return (
            <WishlistsPart/>
    );
}

export default Page;



