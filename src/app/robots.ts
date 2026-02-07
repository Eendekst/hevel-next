import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/ghost/'], // Hide the Ghost Protocol page
        },
        sitemap: 'https://hevel.ca/sitemap.xml',
    };
}
