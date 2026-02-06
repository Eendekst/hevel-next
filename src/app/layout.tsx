import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import GoogleAnalytics from "@/components/GoogleAnalytics"; // Imported

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Hevel | High-Fidelity Audio & Digital Protocols", // Updated
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
        <GoogleAnalytics gaId="G-XXXXXXXXXX" /> {/* Placeholder - User to provide G-Tag or use Env */}

        {/* Sidebar: Fixed Left Rail */}
        <Sidebar />

        {/* Main Content Area: Scrollable Canvas */}
        <main className="flex-1 relative overflow-y-auto no-scrollbar">
          {children}
        </main>
      </body>
    </html>
  );
}
