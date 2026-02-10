
import { getAllPosts } from "../lib/mdx";

async function main() {
    try {
        console.log("Scanning 'shop' collection...");
        const posts = await getAllPosts("shop");
        console.log(`Found ${posts.length} posts.`);

        posts.forEach(p => {
            console.log(`Slug: [${p.slug}] | Title: ${p.meta.title} | Path (inferred): /shop/${p.slug}`);
        });
    } catch (e) {
        console.error("Error:", e);
    }
}

main();
