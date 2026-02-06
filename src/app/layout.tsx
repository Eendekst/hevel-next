import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import GoogleAnalytics from "@/components/GoogleAnalytics"; // Imported

import { MobileNav } from "@/components/layout/MobileNav"; // Imported

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Hevel | High-Fidelity Audio & Digital Protocols",
  description: "Sovereignty through system. The Digital Ghost Protocol. Monitor your signal, mute the noise.",
  metadataBase: new URL('https://hevel.ca'),
  openGraph: {
    images: '/og-image.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased flex h-screen overflow-hidden`}>
        {/* Analytics (GA4) */}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />

        {/* Mobile Navigation (Visible only on small screens) */}
        <MobileNav />

        {/* Sidebar: Fixed Left Rail (Hidden on Mobile) */}
        <div className="hidden md:block h-full">
          <Sidebar />
        </div>

        {/* Main Content Area: Scrollable Canvas */}
        <main className="flex-1 relative overflow-y-auto no-scrollbar">
          {children}
        </main>
      </body>
    </html>
  );
}
