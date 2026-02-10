import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import * as cheerio from 'cheerio';

const SHOP_DIR = path.join(process.cwd(), 'src/content/shop');

// User-Agents to rotate (Sovereign Defense)
const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0'
];

async function scanProduct(filePath: string) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    if (!data.affiliateLink) {
        console.warn(`[SKIP] No affiliate link found for ${path.basename(filePath)}`);
        return;
    }

    console.log(`[SCAN] Scanning ${data.title} (${data.affiliateLink})...`);

    try {
        const agent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
        const response = await fetch(data.affiliateLink, {
            headers: {
                'User-Agent': agent,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // --- SCRAPING LOGIC (AMAZON SPECIFIC) ---
        // Price: usually #corePrice_feature_div .a-offscreen OR #priceblock_ourprice
        // This is fragile and will need updates as Amazon changes UI.
        let priceText = $('.a-price .a-offscreen').first().text().trim();
        if (!priceText) {
            priceText = $('#price_inside_buybox').text().trim();
        }

        // Rating: Usually #acrPopover
        let ratingText = $('#acrPopover').attr('title') || $('span[data-hook="rating-out-of-text"]').text();
        // Example: "4.4 out of 5 stars" -> "4.4"

        // Reviews: #acrCustomerReviewText
        let reviewText = $('#acrCustomerReviewText').first().text().trim();
        // Example: "33,459 ratings"

        console.log(`[DATA] Price: ${priceText} | Rating: ${ratingText} | Reviews: ${reviewText}`);

        // --- UPDATE FRONTMATTER ---
        let updated = false;

        if (priceText) {
            data.currentPrice = priceText;
            updated = true;
        }

        if (ratingText) {
            const ratingMatch = ratingText.match(/([0-9.]+)/);
            if (ratingMatch) {
                data.rating = parseFloat(ratingMatch[1]);
                updated = true;
            }
        }

        if (reviewText) {
            data.reviews = reviewText;
            updated = true;
        }

        data.lastScanned = new Date().toISOString();

        if (updated) {
            const newContent = matter.stringify(content, data);
            fs.writeFileSync(filePath, newContent);
            console.log(`[UPDATE] Updated ${path.basename(filePath)}`);
        } else {
            console.log(`[NO CHANGE] Could not extract new data.`);
        }

    } catch (error) {
        console.error(`[ERROR] Failed to scan ${data.title}:`, error);
    }
}

async function getAllFilesRecursively(dir: string): Promise<string[]> {
    if (!fs.existsSync(dir)) return [];
    let results: string[] = [];
    const list = fs.readdirSync(dir);

    for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(await getAllFilesRecursively(fullPath));
        } else {
            if (file.endsWith('.md')) {
                results.push(fullPath);
            }
        }
    }
    return results;
}

async function main() {
    if (!fs.existsSync(SHOP_DIR)) {
        console.error(`[ERROR] Shop directory not found: ${SHOP_DIR}`);
        return;
    }

    const files = await getAllFilesRecursively(SHOP_DIR);

    console.log(`[VAPOR] Starting scan for ${files.length} products...`);

    for (const filePath of files) {
        await scanProduct(filePath);
        // Random delay to be polite
        await new Promise(r => setTimeout(r, 2000 + Math.random() * 3000));
    }

    console.log(`[VAPOR] Scan complete.`);
}

main();
