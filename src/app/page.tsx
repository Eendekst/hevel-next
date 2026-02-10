import { SocialCard } from '@/components/network/SocialCard';
import { SOCIAL_LINKS } from '@/lib/constants';
import { Twitter, Instagram, Youtube, Facebook, ArrowRight } from 'lucide-react';
import { Video, Hash, FileText, Pin, MessagesSquare } from 'lucide-react';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { getPostBySlug } from '@/lib/mdx';

export default async function Home() {
  // Vapor Protocol: Fetch Dynamic Discount
  let discount = "";
  try {
    const { meta } = await getPostBySlug('ath-m50xbt2', 'shop');
    const currentPrice = meta.currentPrice ? parseFloat(meta.currentPrice.replace(/[^0-9.]/g, '')) : 0;
    const originalPrice = meta.originalPrice ? parseFloat(meta.originalPrice) : 0; // Assuming number in MD

    if (currentPrice > 0 && originalPrice > 0 && currentPrice < originalPrice) {
      const discountVal = Math.round((1 - (currentPrice / originalPrice)) * 100);
      discount = discountVal.toString();
    }
  } catch (error) {
    // Fail silently if file not found or parse error, just don't show bar
    console.error("Vapor Protocol Error:", error);
  }

  return (
    <main className="min-h-screen bg-[#F0F0F0] flex flex-col pt-20 lg:pt-0">

      {/* Marketing Announcement - Connected to Vapor Data */}
      <AnnouncementBar discount={discount} label="Audio-Technica ATH-M50xBT2" />

      <div className="p-6 lg:p-12 flex flex-col">

        {/* Header */}
        <div className="max-w-7xl mx-auto w-full mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-4">
            The Network
          </h1>
          <p className="text-sm md:text-base font-mono uppercase tracking-widest opacity-60">
            Intelligence for the Digital Ghost.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-4">

          {/* 1. TWITTER (Large Item) */}
          <SocialCard
            href={SOCIAL_LINKS.x}
            label="X / Twitter"
            subLabel="The Voice"
            icon={<Twitter className="w-5 h-5" />}
            className="md:col-span-2 md:row-span-2"
            backgroundImage="/socials/twitter.jpg"
            delay={0.1}
          />

          {/* 2. INSTAGRAM */}
          <SocialCard
            href={SOCIAL_LINKS.instagram}
            label="Instagram"
            subLabel="The Visual"
            icon={<Instagram className="w-5 h-5" />}
            backgroundImage="/socials/instagram.jpg"
            delay={0.2}
          />

          {/* 3. YOUTUBE */}
          <SocialCard
            href={SOCIAL_LINKS.youtube}
            label="YouTube"
            subLabel="The Broadcast"
            icon={<Youtube className="w-5 h-5" />}
            backgroundImage="/socials/youtube.jpg"
            delay={0.3}
          />

          {/* 4. TIKTOK */}
          <SocialCard
            href={SOCIAL_LINKS.tiktok}
            label="TikTok"
            subLabel="The Clip"
            icon={<Video className="w-5 h-5" />} // Generic Video Icon
            className="md:row-span-2"
            backgroundImage="/socials/tiktok.jpg"
            delay={0.4}
          />

          {/* 5. MEDIUM */}
          <SocialCard
            href={SOCIAL_LINKS.medium}
            label="Medium"
            subLabel="The Thought"
            icon={<FileText className="w-5 h-5" />} // Generic Text Icon
            backgroundImage="/socials/medium.jpg"
            delay={0.5}
          />

          {/* 6. REDDIT */}
          <SocialCard
            href={SOCIAL_LINKS.reddit}
            label="Reddit"
            subLabel="The Guild"
            icon={<MessagesSquare className="w-5 h-5" />} // Generic Forum Icon
            delay={0.6}
            variant="black"
            backgroundImage="/socials/reddit.png"
          />

          {/* 7. PINTEREST */}
          <SocialCard
            href={SOCIAL_LINKS.pinterest}
            label="Pinterest"
            subLabel="The Moodboard"
            icon={<Pin className="w-5 h-5" />}
            backgroundImage="/socials/pinterest.jpg"
            delay={0.7}
          />

          {/* 8. FACEBOOK (Wide) */}
          <SocialCard
            href={'https://www.facebook.com/profile.php?id=100095074751442'}
            label="Facebook"
            subLabel="The Connection"
            icon={<Facebook className="w-5 h-5" />}
            className="md:col-span-2"
            backgroundImage="/socials/facebook.jpg"
            delay={0.8}
          />

        </div>

        {/* Footer / CTA to Shop */}
        <div className="max-w-7xl mx-auto w-full mt-12 flex justify-end">
          <a href="/shop" className="group flex items-center space-x-2 text-sm font-bold uppercase tracking-widest hover:opacity-60 transition-opacity">
            <span>Enter The Shop</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </main>
  );
}
