import { getAllPosts } from "@/lib/mdx";
import { ShopClient } from "./ShopClient";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function ShopPage() {
    // Get all products from the 'shop' collection
    const products = await getAllPosts("shop");

    // For now, valid the "One Product" strategy, we take the first one.
    // In the future, we can add logic to route to /shop/[slug] or list all.
    const product = products[0];

    if (!product) {
        return <div>No products found.</div>;
    }

    return (
        <ShopClient
            meta={product.meta as any}
            content={<MDXRemote source={product.content} />}
        />
    );
}
