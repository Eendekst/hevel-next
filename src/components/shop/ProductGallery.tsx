'use client';

import Image from 'next/image';

interface ProductGalleryProps {
    images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
    if (!images || images.length === 0) return null;

    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-bold uppercase tracking-tight">Product Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative aspect-square bg-gray-100 rounded-sm overflow-hidden group cursor-pointer">
                        <Image
                            src={image}
                            alt={`Product image ${index + 1}`}
                            fill
                            className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
