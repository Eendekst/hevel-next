/**
 * HEVEL PRODUCT REGISTRY (SINGLE HERO MODE)
 * -----------------------------------------
 * The official registry for the "One Product" Store.
 * Currently featuring: Audio-Technica ATH-M50xBT2
 */

export type Product = {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    priceLabel: string;
    images: {
        hero: string;
        lifestyle: string;
    };
    affiliateLink: string; // Direct override for amzn.to links
};

export const heroProduct: Product = {
    id: 'ATH-M50xBT2',
    title: 'Protocol Interface',
    subtitle: 'Audio-Technica ATH-M50xBT2',
    description: 'The industry standard for studio monitoring, now wireless. Hybrid capabilities: Switch seamlessly between Bluetooth for deep work and wired mode for consoles or instruments. No artificial bass boost. Just the raw, objective truth of your signal.',
    features: [
        '50-Hour Battery Life',
        'Studio-Grade Neutral Sound',
        'Multipoint Bluetooth Pairing',
        'Zero-Latency Mode',
        'Physical Control Buttons'
    ],
    priceLabel: 'Acquire Silence',
    images: {
        hero: '/products/hero-m50x.png',
        lifestyle: '/products/lifestyle-m50x.png'
    },
    affiliateLink: 'https://amzn.to/49YWKiF'
};
