export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24 font-sans text-sm text-gray-800 leading-relaxed space-y-8">
            <h1 className="text-3xl font-bold uppercase tracking-tight">Privacy Protocol</h1>
            <p className="opacity-60 font-mono">Last Updated: {new Date().toLocaleDateString()}</p>

            <section className="space-y-4">
                <h2 className="text-xl font-bold">1. Data Collection</h2>
                <p>
                    Hevel (&quot;we&quot;, &quot;us&quot;) collects minimal data necessary for analytics and transaction facilitation.
                    We use **Google Analytics** to understand user behavior anonymously.
                    We do not sell your personal data.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold">2. Affiliate Disclosure</h2>
                <p>
                    Hevel is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold">3. Contact</h2>
                <p>
                    For any privacy concerns or protocol breaches, contact definitions at: <br />
                    <a href="mailto:jason@hevel.ca" className="font-bold underline">jason@hevel.ca</a>
                </p>
            </section>
        </div>
    );
}
