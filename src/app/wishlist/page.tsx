import { auth } from "@/auth";
import WishlistManager from "@/components/WishLists";
import { redirect } from 'next/navigation'

const Page = async () => {
    const session = await auth();
    if(!session) {
        redirect("/signin");
    }
    const user=session.user.id;
    return (
        <div>
            <WishlistManager userId={user}/>
        </div>
    );
}

export default Page;