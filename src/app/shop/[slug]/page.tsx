import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { AmazonWidget } from "@/components/shop/AmazonWidget";
import { ProductGallery } from "@/components/shop/ProductGallery";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

// Generate static pages for all products
export async function generateStaticParams() {
    const posts = await getAllPosts("shop");
    return posts
        .filter((p) => p.slug !== 'The Shop') // Exclude shop landing page
        .map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
    try {
        const { meta, content } = await getPostBySlug(params.slug, "shop");

        const discount = meta.discount || 0;

        return (
            <>
                {/* Announcement Bar with Discount */}
                {discount > 0 && (
                    <AnnouncementBar discount={discount.toString()} label={meta.title} />
                )}

                <main className="min-h-screen bg-[#F0F0F0] text-[#0A0A0A] pt-20 lg:pt-0">
                    <div className="max-w-6xl mx-auto px-6 py-12 lg:py-24 space-y-16">

                        {/* Hero Section */}
                        {meta.heroImage && (
                            <section className="relative w-full h-[60vh] rounded-sm overflow-hidden">
                                <Image
                                    src={meta.heroImage}
                                    alt={meta.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                                        {meta.title}
                                    </h1>
                                    {meta.subtitle && (
                                        <p className="text-xl text-white/80 mt-4">{meta.subtitle}</p>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Amazon Widget - CTA #1 */}
                        <AmazonWidget
                            productName={meta.title}
                            affiliateLink={meta.affiliateLink}
                            discount={discount}
                            rating={meta.rating}
                            reviews={meta.reviews}
                        />

                        {/* Product Description */}
                        {meta.description && (
                            <section className="prose prose-lg max-w-none">
                                <p className="text-lg leading-relaxed">{meta.description}</p>
                            </section>
                        )}

                        {/* Features Grid */}
                        {meta.features && meta.features.length > 0 && (
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold uppercase tracking-tight">Key Features</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {meta.features.map((feature: string, index: number) => (
                                        <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-sm">
                                            <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Product Gallery */}
                        {meta.gallery && meta.gallery.length > 0 && (
                            <ProductGallery images={meta.gallery} />
                        )}

                        {/* MDX Content */}
                        {content && (
                            <section className="prose prose-lg max-w-none">
                                <MDXRemote source={content} />
                            </section>
                        )}

                        {/* Second CTA */}
                        <section className="bg-black text-white p-12 rounded-sm text-center space-y-6">
                            <h2 className="text-3xl font-bold uppercase">Ready to Upgrade?</h2>
                            <Link
                                href={meta.affiliateLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-white text-black px-12 py-4 font-bold text-lg tracking-tight hover:bg-gray-200 transition-colors rounded-sm"
                            >
                                Secure The Asset
                            </Link>
                        </section>
                    </div>
                </main>
            </>
        );

    } catch (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F0F0F0] text-black font-mono">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">SIGNAL LOST</h1>
                    <p className="opacity-60">PRODUCT NOT FOUND: {params.slug}</p>
                </div>
            </div>
        );
    }
}
