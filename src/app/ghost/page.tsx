// import { auth, currentUser } from "@clerk/nextjs/server";
// import { RedirectToSignIn } from "@clerk/nextjs"; 

export default async function GhostPage() {
    // const user = await currentUser();

    // if (!user) return <RedirectToSignIn />;

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
            <div className="mb-6 p-4 border border-black/10 rounded-full bg-black/5">
                <span className="text-2xl">🔒</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">The Vault is Locked</h1>
            <p className="text-muted max-w-md mb-8">
                Access to the Ghost Protocol is restricted to initiated members.
            </p>

            <button className="bg-black text-white px-6 py-2 rounded-md text-sm hover:bg-black/80 transition-opacity">
                Enter Password / Sign In
            </button>
        </div>
    );
}
