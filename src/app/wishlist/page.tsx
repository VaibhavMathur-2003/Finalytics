import { auth } from "@/auth";
import WishlistsPart from "@/components/carous";
import { redirect } from 'next/navigation'



const Page = async () => {
    const session = await auth();
    if(!session || !session.user.id) {
        redirect("/signin");
    }
    const user=session.user.id;
    return (
            <WishlistsPart userId={user}/>
    );
}

export default Page;



