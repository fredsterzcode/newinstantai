'use client';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-black text-white py-8 border-t border-gray-900 mt-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-extrabold tracking-tight">instantlist<span className="text-primary">.ai</span></span>
        </div>
        <nav className="flex flex-wrap items-center space-x-6 text-lg font-medium">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/builder" className="hover:underline">Builder</Link>
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/buy-credits" className="hover:underline">Buy Credits</Link>
        </nav>
        <nav className="flex flex-wrap items-center space-x-6 text-base">
          <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/cookies" className="hover:underline">Cookies</Link>
        </nav>
      </div>
      <div className="text-center text-gray-400 text-sm mt-4">© {new Date().getFullYear()} instantlist.ai. All rights reserved.</div>
    </footer>
  );
} 