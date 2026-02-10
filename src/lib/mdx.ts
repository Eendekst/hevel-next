import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const contentDir = path.join(root, 'src', 'content');

// Updated to support subdirectories (collections)
export async function getPostBySlug(slug: string, collection: string = 'pages') {
    const realSlug = slug.replace(/\.mdx$/, '');
    const filePath = path.join(contentDir, collection, `${realSlug}.mdx`);

    if (!fs.existsSync(filePath)) {
        throw new Error(`Content not found: ${collection}/${realSlug}.mdx`);
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
        const fileContent = fs.readFileSync(path.join(collectionDir, file), 'utf8');
        const { data, content } = matter(fileContent);

        return {
            meta: data,
            content,
            slug: file.replace(/\.mdx$/, ''),
            collection
        };
    });

    return posts;
}
