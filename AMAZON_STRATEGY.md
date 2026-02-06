# Amazon Integration Strategy: Manual Mode (No PA-API)

Since we do not yet have 3 qualifying sales, we cannot use the Amazon Product Advertising API (PA-API) to fetch prices/images automatically.

## The Workaround: "Static Rich Links"

We will hardcode product data into our catalog, but use a strict `link_builder` utility to ensure every click is attributed to your Store ID (`hevel03-20`).

### 1. The Data Structure
Instead of fetching from Amazon, we define products in a JSON/TS file:
```typescript
{
  id: "asin_123",
  title: "Logitech MX Master 3S",
  image: "/products/mx-master.jpg", // We must host the image ourselves or use a static asset
  price: "Check Price", // We cannot show live price legally without API, so we use a CTA
  link: "https://amazon.ca/dp/B0B1...",
}
```

### 2. The Link Builder
We wrap every link to append the tag automatically.
`https://amazon.ca/dp/xyz` -> `https://amazon.ca/dp/xyz?tag=hevel03-20`

### 3. Compliance Rule
**Do not display specific prices (e.g., "$129.99") manually.** Prices change, and showing the wrong price violates the Operating Agreement.
**Safe CTA**: "Check Price on Amazon" or "View Deal".

---
**Status**: Active
**Next Step**: Implement `lib/amazon.ts`
