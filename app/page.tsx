'use client';
export const dynamic = "force-dynamic";

import Link from 'next/link';
import { Sparkles, Zap, Globe, Download, ArrowRight, Check, Eye } from '@/lib/icons';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

// Simple loading component
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  );
}

// Landing page content (no auth dependencies)
function LandingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-black">
        {/* Hero Section */}
        <section className="w-full flex flex-col md:flex-row items-center justify-between px-8 py-24 max-w-7xl mx-auto">
          <div className="flex-1 flex flex-col items-start justify-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-4">
              Instantly <span className="text-primary">Build</span> <br /> High-Converting Websites
            </h1>
            <p className="text-2xl text-gray-700 mb-6 max-w-xl">
              AI-powered website builder for creators, startups, and businesses. Describe your vision, get a live preview, and launch in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/builder" className="bg-black text-white px-8 py-4 rounded-full text-xl font-bold shadow hover:bg-primary hover:text-black transition">Try the Builder</Link>
              <Link href="/buy-credits" className="bg-primary text-black px-8 py-4 rounded-full text-xl font-bold shadow hover:bg-black hover:text-white transition">Buy Credits</Link>
            </div>
            <div className="flex items-center space-x-4 mt-8">
              {/* Example social proof avatars or logos */}
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <div className="w-10 h-10 rounded-full bg-gray-400" />
              <span className="text-gray-500 text-lg">Trusted by 1,000+ creators</span>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center mt-12 md:mt-0">
            {/* Custom hero image/graphic */}
            <div className="w-[400px] h-[400px] bg-black rounded-3xl flex items-center justify-center shadow-2xl">
              <span className="text-white text-4xl font-extrabold">AI Preview</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 bg-white border-t border-b">
          <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <Sparkles className="h-10 w-10 text-primary" />
              <h3 className="text-2xl font-bold">Instant AI Generation</h3>
              <p className="text-gray-700">Describe your idea, get a live website preview in seconds. No code, no design skills needed.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <Eye className="h-10 w-10 text-primary" />
              <h3 className="text-2xl font-bold">Live Preview & Iteration</h3>
              <p className="text-gray-700">Refine your site with chat prompts and see changes instantly. Iterate until it's perfect.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <Download className="h-10 w-10 text-primary" />
              <h3 className="text-2xl font-bold">Download & Launch</h3>
              <p className="text-gray-700">Export production-ready HTML and launch anywhere. Own your site, forever.</p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full py-20 bg-black text-white">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-4xl font-extrabold mb-6">Simple, Transparent Pricing</h2>
            <p className="text-xl mb-10">1 credit = 1 prompt = £X (OpenAI cost + 50% margin). Buy only what you need.</p>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <div className="bg-white text-black rounded-2xl p-8 flex-1 shadow-xl">
                <h3 className="text-2xl font-bold mb-2">Pay As You Go</h3>
                <div className="text-4xl font-black mb-2">£X/credit</div>
                <p className="mb-6">Perfect for individuals and small teams</p>
                <Link href="/buy-credits" className="bg-black text-white px-6 py-3 rounded-full font-bold shadow hover:bg-primary hover:text-black transition">Buy Credits</Link>
              </div>
              <div className="bg-primary text-black rounded-2xl p-8 flex-1 shadow-xl">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="text-4xl font-black mb-2">Contact Us</div>
                <p className="mb-6">Custom pricing for agencies and high volume</p>
                <a href="mailto:contact@instantlist.ai" className="bg-black text-white px-6 py-3 rounded-full font-bold shadow hover:bg-white hover:text-black transition">Contact Sales</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function HomePage() {
  return <LandingPage />;
}
