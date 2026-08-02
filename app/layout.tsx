import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FaithAssistantProvider } from "@/components/FaithAssistantContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://goddome.org'),
  title: "GodDome — Faithful Words: Christian Stories by Jeanna’ Mead",
  description: "Discover inspiring Christian stories, spiritual reflections, and faith guidance authored by Jeanna’ Mead.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/logo.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/images/logo.png',
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF6F0] text-[#2C221E]">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[#A83226] focus:text-[#FAF6F0] focus:font-bold focus:rounded-lg focus:shadow-lg focus:top-4 focus:left-4"
        >
          Skip to main content
        </a>
        <FaithAssistantProvider>
          {children}
        </FaithAssistantProvider>
      </body>
    </html>
  );
}
