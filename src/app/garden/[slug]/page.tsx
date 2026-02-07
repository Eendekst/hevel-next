import Link from 'next/link';

export default async function GardenNodePage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug

    return (
        <div className="max-w-2xl mx-auto p-8 py-20">
            <article className="prose prose-neutral prose-headings:font-normal prose-p:text-muted/80">
                <span className="text-xs font-mono text-muted uppercase tracking-widest block mb-4">Node: {slug}</span>
                <h1 className="text-3xl font-bold tracking-tighter mb-8">The Cybernetic Loop</h1>

                <p className="lead">
                    (This is placeholder content for Node: {slug})
                </p>

                <p>
                    The system feeds itself. Output becomes input. The Ghost observes the feedback loop and adjusts parameters without emotional attachment.
                </p>

                <hr className="my-8 border-black/10" />

                <h3>Related Nodes</h3>
                <ul>
                    <li><Link href="/garden/node-02">Money as Fertilizer</Link></li>
                </ul>
            </article>
        </div>
    );
}
