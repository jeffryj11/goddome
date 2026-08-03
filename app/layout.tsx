import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FaithAssistantProvider } from "@/components/FaithAssistantContext";
import { AudioProvider } from "@/context/AudioContext";
import StickyAudioPlayer from "@/components/StickyAudioPlayer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#030712",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://goddome.org'),
  title: "GodDome — Words For Your Soul: Christian Stories by Jeanna’ Mead",
  description: "Discover inspiring Christian stories, spiritual reflections, and faith guidance authored by Jeanna’ Mead.",
  manifest: "/manifest.json",
  icons: {
    icon: "/praying-hands.svg",
    shortcut: "/praying-hands.svg",
    apple: "/praying-hands.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-[#030712] text-[#FAF6F0] antialiased">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[#A83226] focus:text-[#FAF6F0] focus:font-bold focus:rounded-lg focus:shadow-lg focus:top-4 focus:left-4"
        >
          Skip to main content
        </a>
        <AudioProvider>
          <FaithAssistantProvider>
            {children}
            <StickyAudioPlayer />
          </FaithAssistantProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
