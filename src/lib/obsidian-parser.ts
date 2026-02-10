import fs from 'fs';
import path from 'path';

export interface ParsedImages {
    hero: string | null;
    card: string | null;
    gallery: string[];
}

/**
 * Parse Obsidian wikilinks from markdown content
 * Example: ![[Hero ATH.png]] → /products/ATH%20m50xbt2/Hero%20ATH.png
 */
export function parseWikilinks(content: string, productFolder: string): ParsedImages {
    const wikilinks: string[] = [];

    // Match ![[filename.ext]] pattern
    const wikilinkRegex = /!\[\[([^\]]+\.(png|jpg|jpeg|webp|gif))\]\]/gi;
    let match;

    while ((match = wikilinkRegex.exec(content)) !== null) {
        wikilinks.push(match[1]); // Extract filename
    }

    const result: ParsedImages = {
        hero: null,
        card: null,
        gallery: []
    };

    // Categorize images based on filename
    wikilinks.forEach(filename => {
        const publicUrl = `/products/${encodeURIComponent(productFolder)}/${encodeURIComponent(filename)}`;

        const lowerFilename = filename.toLowerCase();

        if (lowerFilename.includes('hero')) {
            result.hero = publicUrl;
        } else if (lowerFilename.includes('card')) {
            result.card = publicUrl;
        } else {
            result.gallery.push(publicUrl);
        }
    });

    return result;
}

/**
 * Extract product folder name from file path
 * Example: /path/to/Products/ATH m50xbt2/file.md → "ATH m50xbt2"
 */
export function getProductFolderName(filePath: string): string {
    const parts = filePath.split(path.sep);
    const productsIndex = parts.findIndex(p => p === 'Products');

    if (productsIndex !== -1 && productsIndex < parts.length - 1) {
        return parts[productsIndex + 1];
    }

    return path.basename(path.dirname(filePath));
}
