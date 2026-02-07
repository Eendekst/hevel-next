'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface SocialCardProps {
    href: string;
    label: string;
    subLabel?: string;
    icon?: React.ReactNode;
    className?: string; // For Grid Spanning
    delay?: number;
    variant?: 'black' | 'white'; // Style variants
}

export function SocialCard({
    href,
    label,
    subLabel,
    icon,
    className = "",
    delay = 0,
    variant = 'white'
}: SocialCardProps) {

    // Style configurations
    const isBlack = variant === 'black';
    const baseClasses = "relative flex flex-col justify-between p-6 rounded-sm border transition-colors duration-500 overflow-hidden group";
    const colorClasses = isBlack
        ? "bg-[#0A0A0A] border-[#0A0A0A] text-[#F0F0F0]"
        : "bg-white border-black/10 text-[#0A0A0A] hover:border-black";

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={`${baseClasses} ${colorClasses} ${className}`}
        >
            {/* Background Hover Effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${isBlack ? 'bg-white' : 'bg-black'}`} />

            {/* Top Row: Icon & Arrow */}
            <div className="flex justify-between items-start relative z-10">
                <div className="p-2 border border-current rounded-full opacity-80 group-hover:opacity-100 transition-opacity">
                    {icon}
                </div>
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </div>

            {/* Bottom Row: Text */}
            <div className="relative z-10 mt-8">
                <h3 className="text-xl font-bold tracking-tight uppercase">{label}</h3>
                {subLabel && (
                    <p className={`text-xs font-mono tracking-widest uppercase mt-1 ${isBlack ? 'text-gray-400' : 'text-gray-500'}`}>
                        {subLabel}
                    </p>
                )}
            </div>
        </motion.a>
    );
}
