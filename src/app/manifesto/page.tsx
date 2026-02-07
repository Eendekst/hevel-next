'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight, Globe } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import NewsletterForm from '@/components/ui/NewsletterForm';

const content = {
    fr: {
        headline: "IL FAUT OBÉIR À DIEU",
        subheadline: "PLUTÔT QU'AUX HOMMES.",
        reference: "Actes 5:29",
        body1: "Parce que le monde digital est désormais le miroir de notre espèce et parce que nous sommes passionnés par l'innovation, Hevel, une marque chrétienne, est née.",
        body2: "J'y cultive ma curiosité et ma foi. Originaire de Laval et amoureux de la mixité montréalaise, je reste ancré dans le réel tout en explorant le virtuel.",
        definitionTerm: "Hevel",
        definitionMeaning: "signifie vapeur ou vanité en hébreu.",
        definitionContext: "Ce nom nous rappelle de ne pas nous attacher au passage éphémère de ce monde, mais de fixer nos regards sur la promesse de la manifestation glorieuse de notre Sauveur.",
        toolsTitle: "L'ARCHITECTURE",
        tools: [
            { name: "Antigravity", link: "https://antigravity.google/", role: "Structure" },
            { name: "Obsidian", link: "https://obsidian.md", role: "Pensée" }
        ],
        footer: "Je partage mon apprentissage sur mon jardin digital. C'est ici que je sème pour demain.",
        gardenLink: "ACCÉDER AU JARDIN"
    },
    en: {
        headline: "WE MUST OBEY GOD",
        subheadline: "RATHER THAN MEN.",
        reference: "Acts 5:29",
        body1: "Because the digital world is now the mirror of our species and because we are passionate about innovation, Hevel—a Christian brand—was born.",
        body2: "Here I cultivate my curiosity and my faith. Originally from Laval and in love with Montreal's diversity, I remain anchored in the real while exploring the virtual.",
        definitionTerm: "Hevel",
        definitionMeaning: "means vapor or vanity in Hebrew.",
        definitionContext: "This name reminds us not to attach ourselves to the ephemeral passage of this world, but to fix our eyes on the promise of our Savior's glorious manifestation.",
        toolsTitle: "THE ARCHITECTURE",
        tools: [
            { name: "Antigravity", link: "https://antigravity.google/", role: "Structure" },
            { name: "Obsidian", link: "https://obsidian.md", role: "Thought" }
        ],
        footer: "I share my learning in real-time on my digital garden. This is where I sow for tomorrow.",
        gardenLink: "ENTER THE GARDEN"
    }
};

export default function ManifestoPage() {
    const [lang, setLang] = useState<'fr' | 'en'>('fr');
    const t = content[lang];

    return (
        <main className="min-h-screen bg-[#F0F0F0] text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-[#F0F0F0] font-sans">

            {/* LANGUAGE TOGGLE */}
            <div className="fixed top-6 right-20 md:top-6 md:right-6 z-50 mix-blend-difference text-white">
                <button
                    onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                    className="flex items-center space-x-2 hover:opacity-70 transition-opacity font-mono text-sm"
                >
                    <Globe className="w-4 h-4" />
                    <span>{lang.toUpperCase()}</span>
                </button>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-24 md:py-40 space-y-24">

                {/* HEADER SECTION */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-2"
                >
                    <div className="flex flex-col items-start">
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
                            {t.headline} <br />
                            <span className="text-gray-300 transition-colors duration-500 hover:text-black cursor-default">
                                {t.subheadline}
                            </span>
                        </h1>
                        <Link
                            href="https://www.jw.org/fr/biblioth%C3%A8que/bible/nwt/livres/actes/5/#:~:text=%C2%AB%C2%A0Nous%20devons%20ob%C3%A9ir*%20%C3%A0%20Dieu%20plut%C3%B4t%20qu%E2%80%99aux%20hommes"
                            target="_blank"
                            className="mt-4 text-xs font-mono opacity-40 uppercase tracking-widest border border-black/10 px-2 py-1 rounded-full hover:bg-black hover:text-white transition-colors"
                        >
                            {t.reference}
                        </Link>
                    </div>
                </motion.header>

                {/* BODY TEXT */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="grid md:grid-cols-2 gap-12 text-lg md:text-xl font-light leading-relaxed"
                >
                    <div className="space-y-8">
                        <p>{t.body1}</p>
                        <p>{t.body2}</p>
                    </div>

                    <div className="space-y-8 md:pl-12 border-l border-black/10">
                        <div>
                            <p className="font-bold text-2xl mb-2">{t.definitionTerm} <span className="font-serif italic font-normal opacity-60">{t.definitionMeaning}</span></p>
                            <p className="opacity-80 text-base">{t.definitionContext}</p>
                        </div>

                        <div className="pt-8">
                            <h3 className="text-xs font-mono uppercase tracking-widest opacity-40 mb-4">{t.toolsTitle}</h3>
                            <ul className="space-y-4">
                                {t.tools.map((tool) => (
                                    <li key={tool.name} className="flex items-center justify-between group border-b border-black/5 pb-2">
                                        <Link href={tool.link} target="_blank" className="flex items-center space-x-2 font-bold group-hover:pl-2 transition-all">
                                            <span>{tool.name}</span>
                                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                        <span className="font-mono text-xs opacity-50">{tool.role}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.section>

                {/* THE SIGNAL (NEWSLETTER) */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="max-w-md border-t border-black/10 pt-12"
                >
                    <h3 className="font-mono text-xs uppercase tracking-widest opacity-40 mb-4">The Signal</h3>
                    <p className="mb-6 opacity-80">Join the Sodality. Receive the daily dispatch from the Ghost.</p>
                    <NewsletterForm />
                </motion.section>

                {/* FOOTER / CTA */}
                <motion.footer
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="pt-12 flex flex-col items-start space-y-8"
                >
                    <p className="text-2xl md:text-3xl max-w-2xl font-serif italic">
                        &quot;{t.footer}&quot;
                    </p>

                    <Link
                        href="https://garden.hevel.ca"
                        className="inline-flex items-center space-x-4 bg-black text-white px-8 py-4 font-bold tracking-tight hover:bg-black/80 transition-colors"
                    >
                        <span>{t.gardenLink}</span>
                        <ArrowUpRight className="w-5 h-5" />
                    </Link>
                </motion.footer>

            </div>
        </main>
    );
}
