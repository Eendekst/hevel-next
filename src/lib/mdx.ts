import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const contentDir = path.join(root, 'src', 'content');

// Helper to recursively find a file by slug (filename)
function findFileBySlug(dir: string, slug: string): string | null {
    if (!fs.existsSync(dir)) return null;
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            const found = findFileBySlug(fullPath, slug);
            if (found) return found;
        } else if (file === `${slug}.md`) {
            return fullPath;
        }
    }
    return null;
}

// Helper to recursively get all MD files
function getAllFilesRecursively(dir: string): string[] {
    if (!fs.existsSync(dir)) return [];
    let results: string[] = [];
    const list = fs.readdirSync(dir);

    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            /* Recurse into a subdirectory */
            results = results.concat(getAllFilesRecursively(fullPath));
        } else {
            /* Is a file */
            if (file.endsWith('.md')) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

// Updated to support subdirectories (collections) and .md extension for Obsidian compatibility
export async function getPostBySlug(slug: string, collection: string = 'pages') {
    const realSlug = slug.replace(/\.md$/, '');

    // First try flat path (legacy)
    let filePath = path.join(contentDir, collection, `${realSlug}.md`);

    // If not found, try deep search (recursive)
    if (!fs.existsSync(filePath)) {
        const collectionPath = path.join(contentDir, collection);
        const deepPath = findFileBySlug(collectionPath, realSlug);
        if (deepPath) {
            filePath = deepPath;
        } else {
            throw new Error(`Content not found: ${collection}/${realSlug}.md`);
        }
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Auto-detect Assets for Single Post
    const fileDir = path.dirname(filePath);
    if (fs.existsSync(fileDir)) {
        const assets = fs.readdirSync(fileDir);
        const parentFolder = path.basename(fileDir);

        assets.forEach(asset => {
            const lower = asset.toLowerCase();
            const publicUrl = `/products/${encodeURIComponent(parentFolder)}/${encodeURIComponent(asset)}`;

            if (lower.startsWith('hero') && /\.(png|jpg|webp)$/.test(lower)) {
                data.heroImage = publicUrl;
            } else if (lower.startsWith('card') && /\.(png|jpg|webp)$/.test(lower)) {
                data.cardImage = publicUrl;
            }
        });
    }

    return { meta: data as any, content, slug: realSlug, collection };
}

export async function getAllPosts(collection: string = 'pages') {
    const collectionDir = path.join(contentDir, collection);
    const files = getAllFilesRecursively(collectionDir);

    const posts = files.map((filePath) => {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        const slug = path.basename(filePath, '.md');
        const fileDir = path.dirname(filePath);

        // Auto-detect Assets (Hero *.png, Card *.png)
        // We look in the same directory as the MD file.
        // If found, we map them to the public URL structure: /products/<FolderName>/<FileName>

        let heroImage = data.heroImage;
        let cardImage = data.cardImage;
        let gallery = data.gallery || [];

        if (fs.existsSync(fileDir)) {
            const assets = fs.readdirSync(fileDir);
            const parentFolder = path.basename(fileDir); // e.g. "ATH m50xbt2"

            assets.forEach(asset => {
                const lower = asset.toLowerCase();
                // Public URL construction
                // Note: We need to encodeURI for spaces in folder names
                const publicUrl = `/products/${encodeURIComponent(parentFolder)}/${encodeURIComponent(asset)}`;

                if (lower.startsWith('hero') && /\.(png|jpg|webp)$/.test(lower)) {
                    heroImage = publicUrl;
                } else if (lower.startsWith('card') && /\.(png|jpg|webp)$/.test(lower)) {
                    cardImage = publicUrl;
                } else if (/\.(png|jpg|webp)$/.test(lower)) {
                    // Add other images to gallery if not already present
                    if (!gallery.includes(publicUrl) && publicUrl !== heroImage && publicUrl !== cardImage) {
                        gallery.push(publicUrl);
                    }
                }
            });
        }

        return {
            meta: {
                ...data,
                heroImage,
                cardImage,
                gallery
            } as any, // Explicit cast to allow dynamic frontmatter access
            content,
            slug,
            collection
        };
    });

    return posts;
}
