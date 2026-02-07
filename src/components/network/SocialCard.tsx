'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import Image from 'next/image';

interface SocialCardProps {
    href: string;
    label: string;
    subLabel?: string;
    icon?: React.ReactNode;
    className?: string; // For Grid Spanning
    delay?: number;
    variant?: 'black' | 'white'; // Style variants
    backgroundImage?: string; // New Prop
}

export function SocialCard({
    href,
    label,
    subLabel,
    icon,
    className = "",
    delay = 0,
    variant = 'white',
    backgroundImage
}: SocialCardProps) {

    // Style configurations
    const isBlack = variant === 'black';
    const baseClasses = "relative flex flex-col justify-between p-6 rounded-sm border transition-colors duration-500 overflow-hidden group";

    // If background image exists, force specific text colors for visibility
    const colorClasses = backgroundImage
        ? "text-white border-transparent"
        : (isBlack ? "bg-[#0A0A0A] border-[#0A0A0A] text-[#F0F0F0]" : "bg-white border-black/10 text-[#0A0A0A] hover:border-black");

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
            {/* Background Image Layer */}
            {backgroundImage && (
                <>
                    <Image
                        src={backgroundImage}
                        alt={label}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 z-0 transition-opacity duration-500 group-hover:opacity-80" />
                </>
            )}

            {/* Background Hover Effect (Only if no image) */}
            {!backgroundImage && (
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${isBlack ? 'bg-white' : 'bg-black'}`} />
            )}

            {/* Top Row: Icon & Arrow */}
            <div className="flex justify-between items-start relative z-10">
                <div className={`p-2 border border-current rounded-full opacity-80 group-hover:opacity-100 transition-opacity ${backgroundImage ? 'bg-black/20 backdrop-blur-sm' : ''}`}>
                    {icon}
                </div>
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 drop-shadow-md" />
            </div>

            {/* Bottom Row: Text */}
            <div className="relative z-10 mt-8">
                <h3 className="text-xl font-bold tracking-tight uppercase drop-shadow-md">{label}</h3>
                {subLabel && (
                    <p className={`text-xs font-mono tracking-widest uppercase mt-1 drop-shadow-sm ${backgroundImage ? 'text-gray-300' : (isBlack ? 'text-gray-400' : 'text-gray-500')}`}>
                        {subLabel}
                    </p>
                )}
            </div>
        </motion.a>
    );
}
