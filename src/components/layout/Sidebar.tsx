import Link from 'next/link';
import { SOCIAL_LINKS, NAV_ITEMS } from '@/lib/constants';
import { Twitter, Instagram, Youtube } from 'lucide-react';

import Image from 'next/image';

export function Sidebar() {
    return (
        <aside className="w-64 h-full bg-[#EAEAEA] border-r border-[#D0D0D0] flex flex-col justify-between p-6 z-50 shadow-sm relative">
            {/* Header / Logo */}
            <div>
                <Link href="/" className="block hover:opacity-70 transition-opacity mb-12">
                    <div className="relative w-32 h-8">
                        <Image
                            src="/logo-volcano.jpg"
                            alt="Hevel"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                </Link>

                {/* Navigation */}
                <nav className="space-y-4">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="block text-sm font-medium hover:text-accent transition-colors duration-200 uppercase tracking-wide opacity-70 hover:opacity-100"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Footer / Socials */}
            <div className="space-y-6">
                <div className="flex gap-4 opacity-60">
                    {/* Using text links for now to keep it minimal as per 'Paper' aesthetic, or simple icons */}
                    <a href={SOCIAL_LINKS.x} target="_blank" className="hover:text-black transition-colors"><Twitter size={16} /></a>
                    <a href={SOCIAL_LINKS.instagram} target="_blank" className="hover:text-black transition-colors"><Instagram size={16} /></a>
                    <a href={SOCIAL_LINKS.youtube} target="_blank" className="hover:text-black transition-colors"><Youtube size={16} /></a>
                </div>
                {/* Contact Email */}
                <a href="mailto:jason@hevel.ca" className="block text-xs font-mono opacity-50 hover:opacity-100 transition-opacity">
                    jason@hevel.ca
                </a>
                <div className="text-[10px] text-muted uppercase tracking-wider">
                    © 2026 Hevel.ca<br />
                    Digital Ghost Protocol
                </div>
            </div>
        </aside>
    );
}
