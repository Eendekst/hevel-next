
import NewsletterForm from "@/components/ui/NewsletterForm";

export default function SubscribePage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-[#F0F0F0] p-6">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter">THE SIGNAL</h1>
                    <p className="opacity-60 text-sm font-mono uppercase tracking-widest">
                        Intelligence for the Digital Ghost.
                    </p>
                    <p className="opacity-80">
                        Join the Sodality. Receive the daily dispatch from Jason.
                        <br />No spam. Only signal.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
                    <NewsletterForm />
                </div>

                <p className="text-center text-xs opacity-40 font-mono">
                    SECURED BY HEVEL PROTOCOL
                </p>
            </div>
        </main>
    );
}
