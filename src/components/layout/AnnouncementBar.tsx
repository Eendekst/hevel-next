'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function AnnouncementBar() {
    return (
        <div className="w-full bg-black text-white py-3 px-4 flex justify-center items-center z-40 relative">
            <Link href="/shop" className="group flex items-center space-x-2 text-xs md:text-sm font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
                <span className="bg-white text-black px-2 py-0.5 rounded-sm">-22%</span>
                <span>Audio-Technica ATH-M50xBT2</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    );
}
