import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Layout({ children }: { children: React.ReactNode }) {

    // const auth = await onAuthenticateUser();

    // if (!auth.user) {
    //     redirect("/sign-in");
    // }
    
    return (
        <div className="w-full min-h-screen">
            {children}
        </div>
    );
}