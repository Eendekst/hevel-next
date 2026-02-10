'use client';

import { Star, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface AmazonWidgetProps {
    productName: string;
    affiliateLink: string;
    discount?: number;
    rating?: number;
    reviews?: string;
}

export function AmazonWidget({
    productName,
    affiliateLink,
    discount = 0,
    rating = 0,
    reviews = ''
}: AmazonWidgetProps) {
    return (
        <div className="relative bg-gradient-to-br from-black to-gray-900 text-white p-8 rounded-sm border border-white/10">

            {/* Discount Badge */}
            {discount > 0 && (
                <div className="absolute top-4 right-4 bg-green-500 text-black px-4 py-2 rounded-sm font-bold text-lg">
                    -{discount}%
                </div>
            )}

            <div className="space-y-6">

                {/* Rating & Reviews */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-5 h-5 ${i < Math.floor(rating)
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-600'
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-xl font-bold">{rating}</span>
                    <span className="text-gray-400">{reviews}</span>
                </div>

                {/* CTA Button */}
                <Link
                    href={affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3 bg-white text-black px-8 py-4 font-bold text-lg tracking-tight hover:bg-gray-200 transition-colors w-full justify-center rounded-sm"
                >
                    <span>Buy {productName}</span>
                    <ExternalLink className="w-5 h-5" />
                </Link>

                <p className="text-xs text-gray-500 text-center">
                    As an Amazon Associate, Hevel earns from qualifying purchases
                </p>
            </div>
        </div>
    );
}
