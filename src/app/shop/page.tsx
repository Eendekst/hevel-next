import { getAllPosts } from "@/lib/mdx";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

// Calculate Discount Helper
function getDiscount(meta: any) {
    if (!meta.currentPrice || !meta.originalPrice) return 0;
    const current = parseFloat(meta.currentPrice.replace(/[^0-9.]/g, ''));
    const original = parseFloat(meta.originalPrice);
    if (!original) return 0;
    return Math.round((1 - (current / original)) * 100);
}

export default async function ShopIndex() {
    const products = await getAllPosts("shop");

    // Sort by Discount for Hero
    const sortedByDiscount = [...products].sort((a: any, b: any) => {
        return getDiscount(b.meta) - getDiscount(a.meta);
    });

    const featured = sortedByDiscount[0]; // Highest Discount
    const featuredDiscount = getDiscount(featured?.meta);

    return (
        <main className="min-h-screen bg-[#F0F0F0] text-[#0A0A0A] pt-20 lg:pt-0">
            {/* Context Announcement for Shop */}
            {featured && featuredDiscount > 0 && (
                <AnnouncementBar discount={featuredDiscount.toString()} label={featured.meta.title} />
            )}

            <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 space-y-24">

                {/* HERO SECTION (Featured Protocol) */}
                {featured && (
                    <section className="relative w-full h-[60vh] md:h-[70vh] rounded-sm overflow-hidden group">
                        <Image
                            src={featured.meta.rickyImage || featured.meta.heroImage}
                            alt={featured.meta.title}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12 text-white">
                            <div className="space-y-4 max-w-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex items-center space-x-3">
                                    <span className="bg-white text-black px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm">
                                        FEATURED PROTOCOL
                                    </span>
                                    {featuredDiscount > 0 && (
                                        <span className="text-green-400 font-mono text-sm tracking-widest">
                                            -{featuredDiscount}% DETECTED
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">
                                    {featured.meta.title}
                                </h1>
                                <p className="text-lg md:text-xl font-light opacity-80 max-w-lg">
                                    {featured.meta.subtitle}
                                </p>
                                <div className="pt-4">
                                    <Link
                                        href={`/shop/${featured.slug}`}
                                        className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 font-bold tracking-tight hover:bg-gray-200 transition-colors"
                                    >
                                        <span>INSPECT PROTOCOL</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* THE GRID (Playcards) */}
                <section>
                    <div className="flex items-center justify-between mb-8 border-b border-black/10 pb-4">
                        <h2 className="text-2xl font-bold uppercase tracking-tight">Protocol Archive</h2>
                        <span className="font-mono text-sm opacity-50">{products.length} ASSETS</span>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((p: any) => {
                            const discount = getDiscount(p.meta);
                            const image = p.meta.rickyImage || p.meta.heroImage;

                            return (
                                <div key={p.slug} className="group relative w-full aspect-[4/5] perspective-1000">
                                    <div className="relative w-full h-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180">

                                        {/* FRONT (Image + Name) */}
                                        <div className="absolute inset-0 backface-hidden bg-black rounded-sm overflow-hidden">
                                            <Image
                                                src={image}
                                                alt={p.meta.title}
                                                fill
                                                className="object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                                            <div className="absolute bottom-6 left-6 right-6">
                                                <h3 className="text-3xl font-bold text-white uppercase tracking-tighter leading-none">
                                                    {p.meta.title}
                                                </h3>
                                                {discount > 0 && (
                                                    <div className="mt-2 inline-block bg-white/20 backdrop-blur px-2 py-0.5 text-xs text-white font-mono rounded-sm">
                                                        -{discount}%
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* BACK (Stats + CTA + Disclaimer) */}
                                        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#0A0A0A] text-white p-8 flex flex-col justify-between rounded-sm border border-white/10">

                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-2xl font-bold uppercase tracking-tight mb-1">
                                                        {p.meta.title}
                                                    </h3>
                                                    <div className="flex items-center space-x-1 text-yellow-500 text-sm">
                                                        <Star className="w-4 h-4 fill-current" />
                                                        <span className="font-bold">{p.meta.rating}</span>
                                                        <span className="text-gray-500 font-mono ml-2">({p.meta.reviews})</span>
                                                    </div>
                                                </div>

                                                <p className="text-lg font-light leading-relaxed text-gray-300">
                                                    Asymmetric Opportunity detected.
                                                    High-fidelity signal processing verified.
                                                </p>

                                                <div className="space-y-2 font-mono text-sm opacity-60">
                                                    {p.meta.features?.slice(0, 3).map((f: string, i: number) => (
                                                        <div key={i} className="flex items-center space-x-2">
                                                            <div className="w-1 h-1 bg-white" />
                                                            <span>{f}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <Link
                                                    href={`/shop/${p.slug}`}
                                                    className="flex items-center justify-center space-x-2 w-full bg-white text-black py-4 font-bold tracking-tight hover:bg-gray-200 transition-colors"
                                                >
                                                    <span>SECURE THE ASSET</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </Link>
                                                <p className="text-[10px] text-center text-gray-600 font-mono leading-tight">
                                                    Use of this link supports the protocol.
                                                </p>
                                            </div>

                                            {/* Mobile Reveal (Usually hidden on desktop, but this is the 'Back' face so it works for Touch Tap if configured, 
                                                but user requested Static Reveal for Mobile. 
                                                To handle Mobile Static Reveal, we need CSS Logic to disable flip and show this content below.
                                                For now, implementing Flip Logic as requested for Desktop. Mobile overrides below.)
                                            */}
                                        </div>
                                    </div>

                                    {/* MOBILE STATIC REVEAL OVERRIDE */}
                                    {/* On mobile, we hide the flippy card and show a static vertical layout */}
                                    <div className="lg:hidden absolute inset-0 bg-white z-50 flex flex-col">
                                        <div className="relative h-2/3 w-full bg-black">
                                            <Image src={image} alt={p.meta.title} fill className="object-cover" />
                                            <div className="absolute bottom-4 left-4">
                                                <h3 className="text-2xl font-bold text-white uppercase">{p.meta.title}</h3>
                                            </div>
                                        </div>
                                        <div className="flex-1 p-4 bg-[#0A0A0A] text-white flex flex-col justify-center space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-1 text-yellow-500 text-xs">
                                                    <Star className="w-3 h-3 fill-current" />
                                                    <span>{p.meta.rating}</span>
                                                </div>
                                                {discount > 0 && <span className="text-green-400 font-mono text-xs">-{discount}%</span>}
                                            </div>
                                            <Link
                                                href={`/shop/${p.slug}`}
                                                className="bg-white text-black py-3 text-center text-sm font-bold uppercase w-full"
                                            >
                                                SECURE THE ASSET
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
}
