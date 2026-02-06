'use client';
import { heroProduct } from '@/lib/products';
import { motion } from 'framer-motion';
import { ArrowRight, Battery, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// QUEBEC COMPLIANCE (Bill 96):
const content = {
  en: {
    signal: "Signal Strength: 100%",
    headline: <>MUTE THE <br /> <span className="text-gray-400">MATRIX.</span></>,
    description: heroProduct.description,
    features: heroProduct.features,
    cta: heroProduct.priceLabel,
    battery: "50H RESERVE",
    batteryText: "Marathon grade power cells.",
    lifestyleOverlay: "SILENCE",
    lifestyleAlt: "Deep Work Desk with Headphones",
    disclaimer: "Hevel is a participant in the Amazon Services LLC Associates Program. As an Amazon Associate, we earn from qualifying purchases."
  },
  fr: {
    signal: "Signal : 100%",
    headline: <>ÉTEINDRE LE <br /> <span className="text-gray-400">BRUIT.</span></>,
    description: "La référence pour le monitoring studio, maintenant sans fil. Connectivité hybride : passez du Bluetooth au mode filaire pour vos consoles et instruments.",
    features: [
      'Autonomie 50 Heures',
      'Son Studio Neutre',
      'Bluetooth Multipoint',
      'Latence Zéro',
      'Contrôles Physiques'
    ],
    cta: "Acquérir le Silence",
    battery: "RÉSERVE 50H",
    batteryText: "Cellules d'énergie de qualité marathon.",
    lifestyleOverlay: "SILENCE",
    lifestyleAlt: "Bureau Deep Work avec Casque",
    disclaimer: "Hevel participe au programme d'Associés Amazon Services LLC. En tant qu'Associé Amazon, nous réalisons un bénéfice sur les achats remplissant les conditions requises."
  }
};

export default function Home() {
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const t = content[lang];

  return (
    // Added pt-20 on mobile to account for fixed MobileNav
    <main className="min-h-screen bg-[#F0F0F0] text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-[#F0F0F0] overflow-x-hidden flex flex-col pt-20 lg:pt-0">
      {/* GLOW ACCENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-100/30 blur-[120px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-100/30 blur-[120px] rounded-full mix-blend-multiply" />
      </div>

      {/* LANGUAGE TOGGLE */}
      <div className="absolute top-6 right-20 md:top-4 md:right-4 z-50">
        <button
          onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
          className="flex items-center space-x-2 px-3 py-1.5 bg-white/50 backdrop-blur border border-black/5 rounded-full hover:bg-white transition-colors text-xs font-mono"
        >
          <Globe className="w-3 h-3" />
          <span>{lang.toUpperCase()}</span>
        </button>
      </div>

      {/* HERO SECTION */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center flex-grow">

        {/* 1. TEXT COLUMN (Order 2 on Mobile, Order 1 on Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 order-2 lg:order-1 text-center lg:text-left"
        >
          <div className="inline-flex items-center space-x-2 opacity-50 text-xs font-mono tracking-widest uppercase bg-white/40 px-3 py-1 rounded-full mx-auto lg:mx-0">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span>{t.signal}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] -ml-0.5">
            {t.headline}
          </h1>

          <p className="text-lg md:text-xl font-light max-w-lg mx-auto lg:mx-0 leading-relaxed opacity-80">
            {t.description}
          </p>

          <div className="grid grid-cols-2 gap-3 py-6 border-t border-black/10 border-b max-w-md mx-auto lg:mx-0">
            {t.features.map((feature, i) => (
              <div key={i} className="flex items-center space-x-2 text-xs md:text-sm font-medium opacity-70">
                <div className="w-1 h-1 bg-black rotate-45" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
            <Link
              href={heroProduct.affiliateLink}
              target="_blank"
              rel="nofollow"
              className="group flex items-center justify-center space-x-3 bg-[#0A0A0A] text-[#F0F0F0] px-8 py-4 text-base font-bold tracking-tight hover:bg-black/80 transition-all border border-transparent hover:scale-[1.02]"
            >
              <span>{t.cta}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* 2. ARTIFACT COLUMN (Order 1 on Mobile, Order 2 on Desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative aspect-square flex items-center justify-center order-1 lg:order-2 max-w-md mx-auto lg:max-w-none w-full"
        >
          {/* Concentric Circles */}
          <div className="absolute inset-0 border border-black/5 rounded-full scale-[0.8]" />
          <div className="absolute inset-0 border border-black/5 rounded-full scale-[1.2] opacity-50" />

          {/* The Product Image */}
          <div className="relative w-full h-full drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out">
            <Image
              src={heroProduct.images.hero}
              alt={heroProduct.title}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Floating Battery Badge */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -right-4 lg:-bottom-10 lg:-right-4 bg-white/90 backdrop-blur border border-black/10 p-3 shadow-xl max-w-[160px] rounded-sm text-left"
          >
            <div className="flex items-center space-x-2 mb-1">
              <Battery className="w-4 h-4" />
              <span className="font-bold text-xs">{t.battery}</span>
            </div>
            <p className="text-[10px] leading-tight opacity-60 hidden sm:block">
              {t.batteryText}
            </p>
          </motion.div>
        </motion.div>

      </div>

      {/* SEO / ACCESSIBILITY PRODUCT LINK (Requested) */}
      <div className="max-w-7xl mx-auto px-6 pb-8 -mt-8 relative z-20 text-center lg:text-left">
        <Link
          href={heroProduct.affiliateLink}
          target="_blank"
          className="text-[10px] uppercase font-mono tracking-widest text-black/30 hover:text-black/60 transition-colors border-b border-transparent hover:border-black/20"
        >
          Audio-Technica ATH-M50xBT2 Wireless Over-Ear Headphones
        </Link>
      </div>

      {/* LIFESTYLE STRIP */}
      <Link
        href={heroProduct.affiliateLink}
        target="_blank"
        rel="nofollow"
        className="relative w-full h-[40vh] md:h-[60vh] mt-12 lg:mt-24 grayscale hover:grayscale-0 transition-all duration-700 block group cursor-pointer"
      >
        <Image
          src={heroProduct.images.lifestyle}
          alt={t.lifestyleAlt}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-transparent transition-all">
          <h2 className="text-white font-bold text-3xl md:text-4xl tracking-[0.5em] md:tracking-[1em] opacity-80 mix-blend-overlay group-hover:scale-110 transition-transform duration-700">{t.lifestyleOverlay}</h2>
        </div>
      </Link>

      {/* COMPLIANCE FOOTER */}
      <footer className="w-full py-8 md:py-12 text-center opacity-80 text-xs md:text-sm px-6 font-mono mix-blend-multiply">
        <p className="max-w-xl mx-auto border-t border-black/10 pt-4">{t.disclaimer}</p>
      </footer>

    </main>
  );
}
