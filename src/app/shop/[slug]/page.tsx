import { getPostBySlug } from "@/lib/mdx";
import { ShopClient } from "../ShopClient";
import { MDXRemote } from "next-mdx-remote/rsc";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

// Helper to calc discount
function getDiscount(meta: any) {
    if (!meta.currentPrice || !meta.originalPrice) return 0;
    const current = parseFloat(meta.currentPrice.replace(/[^0-9.]/g, ''));
    const original = parseFloat(meta.originalPrice);
    if (!original) return 0;
    return Math.round((1 - (current / original)) * 100);
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
    try {
        const { meta, content } = await getPostBySlug(params.slug, "shop");

        const discount = getDiscount(meta);

        return (
            <>
                {/* Specific Announcement Bar */}
                {discount > 0 && (
                    <AnnouncementBar discount={discount.toString()} label={meta.title} />
                )}

                <ShopClient
                    meta={meta as any}
                    content={<MDXRemote source={content} />}
                />
            </>
        );

    } catch (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F0F0F0] text-black font-mono">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">SIGNAL LOST</h1>
                    <p className="opacity-60">PROTOCOL NOT FOUND: {params.slug}</p>
                </div>
            </div>
        );
    }
}
