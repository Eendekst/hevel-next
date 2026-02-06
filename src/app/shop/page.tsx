'use client';
import { heroProduct } from '@/lib/products';
import { motion } from 'framer-motion';
import { ArrowRight, Battery, Globe } from 'lucide-react'; // Added Globe icon
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// QUEBEC COMPLIANCE (Bill 96):
// Content must be available in French.
const content = {
    en: {
        signal: "Signal Strength: 100%",
        headline: <>MUTE THE <br /> <span className="text-gray-400">MATRIX.</span></>,
        description: heroProduct.description,
        features: heroProduct.features,
        cta: heroProduct.priceLabel,
        battery: "50H RESERVE",
        batteryText: "Marathon grade power cells. Outlasts standard civilian grade equipment.",
        lifestyleOverlay: "SILENCE",
        lifestyleAlt: "Deep Work Desk with Headphones",
        disclaimer: "Hevel is a participant in the Amazon Services LLC Associates Program. As an Amazon Associate, we earn from qualifying purchases."
    },
    fr: {
        signal: "Signal : 100%",
        headline: <>ÉTEINDRE LE <br /> <span className="text-gray-400">BRUIT.</span></>, // "Shut down the Noise/Matrix"
        description: "La référence pour le monitoring studio, maintenant sans fil. Connectivité hybride : passez du Bluetooth au mode filaire pour vos consoles et instruments. Pas de basses artificielles. Juste la vérité brute de votre signal.",
        features: [
            'Autonomie 50 Heures',
            'Son Studio Neutre',
            'Bluetooth Multipoint',
            'Latence Zéro',
            'Contrôles Physiques'
        ],
        cta: "Acquérir le Silence",
        battery: "RÉSERVE 50H",
        batteryText: "Cellules d'énergie de qualité marathon. Surpasse l'équipement civil standard.",
        lifestyleOverlay: "SILENCE",
        lifestyleAlt: "Bureau Deep Work avec Casque",
        disclaimer: "Hevel participe au programme d'Associés Amazon Services LLC. En tant qu'Associé Amazon, nous réalisons un bénéfice sur les achats remplissant les conditions requises."
    }
};

export default function ShopPage() {
    const [lang, setLang] = useState<'en' | 'fr'>('en');
    const t = content[lang];

    return (
        <main className="min-h-screen bg-[#F0F0F0] text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-[#F0F0F0] overflow-x-hidden flex flex-col">
            {/* GLOW ACCENT BACKGROUND */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-100/30 blur-[120px] rounded-full mix-blend-multiply" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-100/30 blur-[120px] rounded-full mix-blend-multiply" />
            </div>

            {/* LANGUAGE TOGGLE (Quebec Compliance) */}
            <div className="absolute top-6 right-20 md:right-6 z-50">
                <button
                    onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/50 backdrop-blur border border-black/5 rounded-full hover:bg-white transition-colors text-sm font-mono"
                >
                    <Globe className="w-4 h-4" />
                    <span>{lang.toUpperCase()}</span>
                </button>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center flex-grow">

                {/* LEFT COLUMN: TEXT & PROTOCOL */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-8"
                >
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2 opacity-50 text-sm font-mono tracking-widest uppercase">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span>{t.signal}</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
                            {t.headline}
                        </h1>
                    </div>

                    <p className="text-xl md:text-2xl font-light max-w-lg leading-relaxed opacity-80">
                        {t.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 py-6 border-t border-black/10 border-b">
                        {t.features.map((feature, i) => (
                            <div key={i} className="flex items-center space-x-3 text-sm font-medium opacity-70">
                                <div className="w-1.5 h-1.5 bg-black rotate-45" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link
                            href={heroProduct.affiliateLink}
                            target="_blank"
                            rel="nofollow" // Amazon Compliance: Nofollow for affiliate links
                            className="group flex items-center justify-center space-x-3 bg-[#0A0A0A] text-[#F0F0F0] px-8 py-4 text-lg font-bold tracking-tight hover:bg-black/80 transition-all border border-transparent hover:scale-[1.02]"
                        >
                            <span>{t.cta}</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <div className="flex items-center justify-center px-8 py-4 border border-black/10 text-sm font-mono opacity-60">
                            PROT-ID: {heroProduct.id}
                        </div>
                    </div>
                </motion.div>


                {/* RIGHT COLUMN: THE ARTIFACT (2.5D IMAGE) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative aspect-square flex items-center justify-center"
                >
                    {/* "Halo" Circle behind */}
                    <div className="absolute inset-0 border border-black/5 rounded-full scale-[0.8]" />
                    <div className="absolute inset-0 border border-black/5 rounded-full scale-[1.2] opacity-50" />

                    <div className="relative w-full h-full drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out cursor-cell">
                        <Image
                            src={heroProduct.images.hero}
                            alt={heroProduct.title}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Floating Badge */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-10 -right-4 bg-white/80 backdrop-blur border border-black/10 p-4 shadow-xl max-w-[200px]"
                    >
                        <div className="flex items-center space-x-2 mb-1">
                            <Battery className="w-4 h-4" />
                            <span className="font-bold text-xs">{t.battery}</span>
                        </div>
                        <p className="text-[10px] leading-tight opacity-60">
                            {t.batteryText}
                        </p>
                    </motion.div>

                </motion.div>

            </div>

            {/* LIFESTYLE STRIP */}
            <Link
                href={heroProduct.affiliateLink}
                target="_blank"
                rel="nofollow"
                className="relative w-full h-[60vh] mt-24 grayscale hover:grayscale-0 transition-all duration-700 block group cursor-pointer"
            >
                <Image
                    src={heroProduct.images.lifestyle}
                    alt={t.lifestyleAlt}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-transparent transition-all">
                    <h2 className="text-white font-bold text-4xl tracking-[1em] opacity-80 mix-blend-overlay group-hover:scale-110 transition-transform duration-700">{t.lifestyleOverlay}</h2>
                </div>
            </Link>

            {/* COMPLIANCE FOOTER */}
            <footer className="w-full py-12 text-center opacity-80 text-sm px-6 font-mono mix-blend-multiply">
                <p className="max-w-xl mx-auto border-t border-black/10 pt-4">{t.disclaimer}</p>
            </footer>

        </main>
    );
}
