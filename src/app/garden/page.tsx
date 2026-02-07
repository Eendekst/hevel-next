import Link from "next/link";
import NewsletterForm from "@/components/ui/NewsletterForm";

const GARDEN_NODES = [
    {
        title: 'Head Gardener',
        date: '2026-02-04',
        summary: 'The operator of the Cybernetic Loop.',
        image: '/gallery/refinement/head-gardener.jpg', // MODIFIED
        url: 'https://garden.hevel.ca/Atomic-Notes/Head-Gardener'
    },
    {
        title: 'Money is Fertilizer',
        date: '2026-01-21',
        summary: 'Capital as a resource for growth, not the end goal.',
        image: '/gallery/simpletown/Redirecting light.png', // Unchanged
        url: 'https://garden.hevel.ca/Atomic-Notes/Money-is-Fertilizer'
    },
    {
        title: 'Big Picture View',
        date: '2026-02-01',
        summary: 'Strategic oversight of the Conglomerate.',
        image: '/gallery/simpletown/img3.jpg', // Unchanged
        url: 'https://garden.hevel.ca/Strategy/Big-Picture-View'
    },
    {
        title: 'Ricky (Agent)',
        date: '2026-02-02',
        summary: 'The Architect and builder of systems.',
        image: '/gallery/refinement/ricky.png', // MODIFIED
        url: 'https://garden.hevel.ca/AI/Hevel-Agents/Ricky/Ricky'
    },
    {
        title: 'Brand (Agent)',
        date: '2026-02-03',
        summary: 'The Voice and Identity of Hevel.',
        image: '/gallery/refinement/brand.jpg', // MODIFIED
        url: 'https://garden.hevel.ca/AI/Hevel-Agents/Brand/Brand'
    },
    {
        title: 'AI Team',
        date: '2026-02-03',
        summary: 'The collective intelligence protocol.',
        image: '/gallery/refinement/ai-team.jpg', // MODIFIED
        url: 'https://garden.hevel.ca/AI/R-and-D/AI-Team'
    },
    {
        title: 'Signal',
        date: '2026-02-04',
        summary: 'Distinguishing truth from noise in the feed.',
        image: '/gallery/refinement/signal.jpg', // MODIFIED
        url: 'https://garden.hevel.ca/Atomic-Notes/Signal'
    },
    {
        title: 'Bible',
        date: '2026-01-14',
        summary: 'The Source Code of the moral framework.',
        image: '/gallery/refinement/bible.jpg', // MODIFIED
        url: 'https://garden.hevel.ca/Atomic-Notes/Bible'
    },
    {
        title: 'The Synthesizer',
        date: '2026-02-01',
        summary: 'Merging the digital and the spiritual.',
        image: '/gallery/refinement/synthesizer.png', // MODIFIED
        url: 'https://garden.hevel.ca/Hevel/The-Synthesizer'
    }
];

export default function GardenPage() {
    return (
        <div className="max-w-6xl mx-auto p-8">
            <header className="mb-12 border-b border-black/5 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">The Garden</h1>
                    <p className="text-muted">Growing through interconnected thought.</p>
                </div>
                <div className="w-full md:w-72">
                    <NewsletterForm />
                </div>
            </header>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {GARDEN_NODES.map((node, i) => (
                    // External Link to Garden
                    <Link key={i} href={node.url} target="_blank" className="block group relative aspect-square overflow-hidden rounded-full bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                            style={{ backgroundImage: `url('${node.image}')` }}
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                        {/* Content */}
                        <article className="relative h-full flex flex-col justify-center items-center text-center p-8 text-white">
                            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2 leading-none drop-shadow-md">{node.title}</h2>
                            <span className="text-xs font-mono opacity-60 mb-3 drop-shadow-sm">{node.date}</span>
                            <p className="text-sm opacity-90 leading-relaxed font-light drop-shadow-sm line-clamp-3">{node.summary}</p>

                            {/* External Arrow */}
                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
}
