export type ProductType = 'AFFILIATE' | 'DIRECT';

export interface Product {
    id: string;
    name: string;
    description: string;
    price?: number;
    type: ProductType;
    link?: string; // For Affiliate
    image: string;
    rating?: number;
    category: 'Desk' | 'Gym' | 'Library' | 'Wardrobe';
}

export const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Hevel Black Notebook',
        description: 'The standard issue archive for your thoughts.',
        type: 'DIRECT',
        price: 25.00,
        image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Notebook', // Placeholder
        category: 'Desk'
    },
    {
        id: '2',
        name: 'Kindle Scribe',
        description: 'Digital paper. Distraction free.',
        type: 'AFFILIATE',
        link: 'https://amazon.com',
        rating: 5,
        image: 'https://placehold.co/600x400/e0e0e0/1a1a1a?text=Kindle',
        category: 'Desk'
    },
    {
        id: '3',
        name: 'Minimalist Gym Bag',
        description: 'For the commute and the iron.',
        type: 'AFFILIATE',
        link: 'https://amazon.com',
        rating: 4.8,
        image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Gym+Bag',
        category: 'Gym'
    }
];
