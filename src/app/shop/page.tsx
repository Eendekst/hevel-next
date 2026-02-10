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
                                <div key={p.slug} className="relative w-full">

                                    {/* DESKTOP: 3D FLIP CARD (Hidden on Mobile) */}
                                    <div className="hidden lg:block group relative w-full aspect-[3/4] perspective-1000">
                                        <div className="relative w-full h-full transition-all duration-500 transform-style-3d group-hover:rotate-y-180">

                                            {/* FRONT */}
                                            <div className="absolute inset-0 backface-hidden bg-white border border-black/5 rounded-sm overflow-hidden">
                                                <div className="relative w-full h-full p-6 flex flex-col items-center justify-between">
                                                    <div className="relative w-full flex-1 min-h-0">
                                                        <Image
                                                            src={image}
                                                            alt={p.meta.title}
                                                            fill
                                                            className="object-contain p-4"
                                                            priority
                                                        />
                                                    </div>
                                                    <div className="w-full text-center pt-4 border-t border-black/5">
                                                        <h3 className="text-lg font-bold uppercase tracking-tight text-black/90 leading-tight">{p.meta.title}</h3>
                                                        {discount > 0 && (
                                                            <div className="mt-2 text-xs font-mono text-red-600 bg-red-50 inline-block px-2 py-1 rounded">
                                                                SAVE {discount}%
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* BACK */}
                                            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#0A0A0A] text-white p-8 flex flex-col justify-between rounded-sm border border-white/10 overflow-hidden">
                                                <div className="space-y-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold uppercase tracking-tight mb-2 text-white">
                                                            {p.meta.title}
                                                        </h3>
                                                        <div className="flex items-center space-x-1 text-[#FFD700] text-sm">
                                                            <Star className="w-4 h-4 fill-current" />
                                                            <span className="font-bold">{p.meta.rating}</span>
                                                            <span className="text-zinc-500 font-mono ml-2">({p.meta.reviews})</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-full h-px bg-white/10" />
                                                    <p className="text-sm font-light leading-relaxed text-zinc-300">
                                                        {p.meta.description}
                                                    </p>
                                                </div>
                                                <Link href={`/shop/${p.slug}`} className="block w-full">
                                                    <div className="w-full bg-white text-black py-4 font-bold tracking-tight hover:bg-zinc-200 transition-colors flex items-center justify-center space-x-2 rounded-sm cursor-pointer">
                                                        <span>SECURE THE ASSET</span>
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* MOBILE: STATIC STACK (Visible only on Mobile) */}
                                    <div className="lg:hidden w-full bg-white border border-black/5 rounded-sm overflow-hidden flex flex-col">
                                        <div className="relative w-full aspect-square bg-[#F5F5F5]">
                                            <Image
                                                src={image}
                                                alt={p.meta.title}
                                                fill
                                                className="object-contain p-8"
                                            />
                                            {discount > 0 && (
                                                <div className="absolute top-4 right-4 text-xs font-mono text-white bg-red-600 px-2 py-1 rounded-sm">
                                                    -{discount}%
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 space-y-4 bg-white">
                                            <div>
                                                <h3 className="text-xl font-bold uppercase tracking-tight leading-tight mb-2">{p.meta.title}</h3>
                                                <div className="flex items-center space-x-1 text-black/60 text-sm">
                                                    <Star className="w-4 h-4 fill-black" />
                                                    <span className="font-bold text-black">{p.meta.rating}</span>
                                                    <span className="font-mono">({p.meta.reviews})</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                                                {p.meta.description}
                                            </p>
                                            <Link href={`/shop/${p.slug}`} className="block w-full">
                                                <div className="w-full bg-black text-white py-4 font-bold tracking-tight flex items-center justify-center space-x-2 rounded-sm">
                                                    <span>SECURE THE ASSET</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
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
