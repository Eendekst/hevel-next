/**
 * HEVEL AMAZON LINK BUILDER
 * -------------------------
 * Enforces the Amazon Associates Tag on all outbound links.
 * Prevents "naked" links that lose commission.
 */

// Your confirmed Store ID
const STORE_ID = process.env.NEXT_PUBLIC_AMAZON_STORE_ID || 'hevel03-20';

export const buildAmazonLink = (asin: string): string => {
  if (!asin) return '#';
  // Standard format: https://amazon.ca/dp/[ASIN]?tag=[STORE_ID]
  return `https://www.amazon.ca/dp/${asin}?tag=${STORE_ID}`;
};


export const getProductImage = (asin: string): string => {
   // Placeholder strategy until PA-API is active.
   // Once active, this function will swap to fetch from Amazon.
   // For now, we expect local images in /public/products/[ASIN].jpg
   // or a generic placeholder.
   return `/products/${asin}.jpg`;
}
