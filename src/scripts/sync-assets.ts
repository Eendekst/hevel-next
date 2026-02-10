import fs from 'fs';
import path from 'path';

// Source: src/content/shop/Products
// Dest: public/products

const SOURCE_DIR = path.join(process.cwd(), 'src', 'content', 'shop', 'Products');
const DEST_DIR = path.join(process.cwd(), 'public', 'products');

function copyRecursive(src: string, dest: string) {
    if (!fs.existsSync(src)) return;

    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyRecursive(srcPath, destPath);
        } else if (entry.isFile()) {
            // Check for image extensions
            if (/\.(png|jpg|jpeg|webp|gif)$/i.test(entry.name)) {
                fs.copyFileSync(srcPath, destPath);
                console.log(`[SYNC] Copied: ${entry.name}`);
            }
        }
    }
}

console.log(`[SYNC] syncing assets from ${SOURCE_DIR} to ${DEST_DIR}...`);
copyRecursive(SOURCE_DIR, DEST_DIR);
console.log(`[SYNC] Complete.`);
