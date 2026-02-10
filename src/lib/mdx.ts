import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const contentDir = path.join(root, 'src', 'content');

// Updated to support subdirectories (collections) and .md extension for Obsidian compatibility
export async function getPostBySlug(slug: string, collection: string = 'pages') {
    const realSlug = slug.replace(/\.md$/, ''); // Changed from .mdx to .md
    const filePath = path.join(contentDir, collection, `${realSlug}.md`); // Changed to .md

    if (!fs.existsSync(filePath)) {
        throw new Error(`Content not found: ${collection}/${realSlug}.md`);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return { meta: data, content, slug: realSlug, collection };
}

export async function getAllPosts(collection: string = 'pages') {
    const collectionDir = path.join(contentDir, collection);

    if (!fs.existsSync(collectionDir)) {
        return [];
    }

    const files = fs.readdirSync(collectionDir);

    const posts = files.map((file) => {
        // Only process markdown files
        if (!file.endsWith('.md')) return null;

        const fileContent = fs.readFileSync(path.join(collectionDir, file), 'utf8');
        const { data, content } = matter(fileContent);

        return {
            meta: data,
            content,
            slug: file.replace(/\.md$/, ''), // Changed to .md
            collection
        };
    }).filter(Boolean) as any[]; // Filter out nulls

    return posts;
}
