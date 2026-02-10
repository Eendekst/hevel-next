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

    return { meta: data, content, slug: realSlug, collection };
}

export async function getAllPosts(collection: string = 'pages') {
    const collectionDir = path.join(contentDir, collection);
    const files = getAllFilesRecursively(collectionDir);

    const posts = files.map((filePath) => {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        const slug = path.basename(filePath, '.md');

        return {
            meta: data,
            content,
            slug,
            collection
        };
    });

    return posts;
}
