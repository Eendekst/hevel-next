import { getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function PrivacyPage() {
    const { meta, content } = await getPostBySlug("privacy", "legal");

    return (
        <div className="max-w-4xl mx-auto px-6 py-24 font-sans text-sm text-gray-800 leading-relaxed space-y-8">
            <h1 className="text-3xl font-bold uppercase tracking-tight">{meta.title}</h1>
            <p className="opacity-60 font-mono">Last Updated: {meta.date}</p>

            <article className="prose prose-sm prose-gray max-w-none">
                <MDXRemote source={content} />
            </article>
        </div>
    );
}
