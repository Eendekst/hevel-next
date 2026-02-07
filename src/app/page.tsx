'use client';

import { SocialCard } from '@/components/network/SocialCard';
import { SOCIAL_LINKS } from '@/lib/constants';
import { Twitter, Instagram, Youtube, Facebook, ArrowRight } from 'lucide-react';
// Note: Lucide might not have Tiktok/Medium/Reddit icons by default in all versions. 
// Using Text fallback or generic icons if needed, but assuming standard set or Lucide equivalents.
// For specific brand icons not in Lucide, we can use SVG or text. 
// Lucide has: Twitter, Instagram, Youtube, Facebook. 
// Missing: Tiktok, Medium, Reddit, Pinterest.
// I will use generic shapes or lucide equivalents for now or simple SVGs inline if strictly needed, 
// but to keep it simple and consistent with the "Paper" aesthetic, I will use Lucide geometric shapes for the missing ones 
// or import them if available. 
import { Video, Hash, FileText, Pin, MessagesSquare } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F0F0F0] p-6 lg:p-12 flex flex-col pt-20 lg:pt-12">

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

    </main>
  );
}
