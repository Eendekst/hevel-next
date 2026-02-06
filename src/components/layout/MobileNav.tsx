'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, SOCIAL_LINKS } from '@/lib/constants';

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden fixed top-0 left-0 right-0 z-[100] p-6 flex justify-between items-center pointer-events-none">

            {/* 1. Logo (Always visible) */}
            <div className="pointer-events-auto">
                <h1 className="text-xl font-bold tracking-tighter uppercase text-black/80 backdrop-blur-sm bg-white/30 px-2 rounded-sm">
                    Hevel
                </h1>
            </div>

            {/* 2. Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto p-2 bg-white/80 backdrop-blur shadow-sm rounded-full active:scale-95 transition-transform"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* 3. Full Screen Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-[#EAEAEA] pointer-events-auto flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-200">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-bold tracking-tight uppercase hover:text-gray-500 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="h-px w-12 bg-black/10 my-8" />

                    <a href="mailto:jason@hevel.ca" className="text-sm font-mono opacity-50">jason@hevel.ca</a>
                </div>
            )}

        </div>
    );
}
