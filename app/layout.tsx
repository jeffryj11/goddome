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
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
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
        <FaithAssistantProvider>
          {children}
        </FaithAssistantProvider>
      </body>
    </html>
  );
}
