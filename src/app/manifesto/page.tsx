import { getPostBySlug } from "@/lib/mdx";
import { ManifestoClient } from "./ManifestoClient";

export default async function ManifestoPage() {
    const { meta } = await getPostBySlug("manifesto", "brand");

    return <ManifestoClient content={meta as any} />;
}
