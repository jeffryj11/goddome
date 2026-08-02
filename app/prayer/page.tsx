import Navbar from '@/components/Navbar';
import PrayerRequestForm from '@/components/PrayerRequestForm';
import Link from 'next/link';

export const metadata = {
  title: 'Prayer Requests | GodDome Ministry',
  description: 'Share a prayer request or quiet reflection with Jeanna’ Mead and the GodDome ministry.',
};

export default function PrayerPage() {
  return (
    <main className="min-h-screen bg-[#FAF6F0] text-[#2C221E] flex flex-col font-sans">
      <Navbar />

      <section className="max-w-4xl mx-auto px-6 py-16 w-full flex-grow">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-semibold text-[#A83226] hover:text-[#8f2a20] transition-colors mb-8 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform mr-2">←</span> 
          Back to Stories
        </Link>

        <PrayerRequestForm />
      </section>

      <footer className="border-t border-[#2C221E]/15 py-12 px-6 mt-auto bg-[#FAF6F0]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#2C221E]/70">
          <div className="flex items-center space-x-3">
            <img
              src="/images/logo.png"
              alt="GodDome Badge"
              className="w-8 h-8 rounded-lg border border-[#D99B26]/30 shadow-xs"
            />
            <span className="font-serif font-bold text-[#2C221E] text-sm">GodDome</span>
            <span>—</span>
            <span>Faithful Words: Christian Stories by Jeanna’ Mead</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/admin" className="hover:text-[#A83226] font-semibold">
              Admin CMS
            </Link>
            <p>&copy; 2026 GodDome — All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
