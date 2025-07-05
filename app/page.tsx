'use client';
export const dynamic = "force-dynamic";

import Link from 'next/link';
import { Sparkles, Zap, Globe, Download, ArrowRight, Check } from '@/lib/icons';
import { Header } from '@/components/header';

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
      <main className="min-h-screen bg-gradient-to-br from-background via-white to-secondary/10">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-40">
          <div className="absolute inset-0 animate-gradient-x bg-gradient-to-tr from-primary/20 via-secondary/10 to-accent/10 blur-2xl opacity-60" />
          <div className="relative container mx-auto px-4 text-center max-w-5xl">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-5 py-2 rounded-full mb-8 shadow-lg">
              <Sparkles className="h-5 w-5 animate-bounce" />
              <span className="text-base font-semibold tracking-wide uppercase">AI Website Creation, Reimagined</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-xl">
              Build the Future. Instantly.
            </h1>
            <p className="text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto font-medium">
              The world's most advanced AI website builder. Describe your vision, and watch it become reality in seconds. No code. No limits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth" className="btn-primary text-xl px-10 py-5 flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
                Get Started Free
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
              <a href="#about" className="btn-secondary text-xl px-10 py-5 flex items-center justify-center shadow hover:scale-105 transition-transform">
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-28 bg-muted/30" id="features">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-extrabold mb-6 tracking-tight">Why Choose instantlist.ai?</h2>
              <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
                Enterprise-grade AI, stunning design, and instant results. Trusted by creators, startups, and global brands.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="card text-center shadow-xl border-2 border-primary/20 bg-white/90">
                <div className="card-content">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="h-10 w-10 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Lightning Fast</h3>
                  <p className="text-lg text-muted-foreground">
                    Generate complete, production-ready websites in seconds. From idea to launch, faster than ever.
                  </p>
                </div>
              </div>
              <div className="card text-center shadow-xl border-2 border-primary/20 bg-white/90">
                <div className="card-content">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe className="h-10 w-10 text-primary animate-spin-slow" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Enterprise Quality</h3>
                  <p className="text-lg text-muted-foreground">
                    Every site is crafted with best-in-class design, accessibility, and performance. Impress your users, every time.
                  </p>
                </div>
              </div>
              <div className="card text-center shadow-xl border-2 border-primary/20 bg-white/90">
                <div className="card-content">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Download className="h-10 w-10 text-primary animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Ready to Deploy</h3>
                  <p className="text-lg text-muted-foreground">
                    Download clean, SEO-optimized HTML and launch anywhere. Your site, your way, instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-28" id="about">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-extrabold mb-6 tracking-tight">How It Works</h2>
              <p className="text-2xl text-muted-foreground font-medium">
                Three steps. One AI. Infinite possibilities.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black shadow-lg">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-3">Describe Your Vision</h3>
                <p className="text-lg text-muted-foreground">
                  Tell us your idea. Be as detailed or as simple as you want.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black shadow-lg">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-3">AI Creates Your Site</h3>
                <p className="text-lg text-muted-foreground">
                  Our AI instantly generates a beautiful, responsive website tailored to you.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black shadow-lg">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-3">Download & Deploy</h3>
                <p className="text-lg text-muted-foreground">
                  Download your site and launch it anywhere. It's yours, forever.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-28 bg-muted/30" id="pricing">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-extrabold mb-6 tracking-tight">Simple, Transparent Pricing</h2>
              <p className="text-2xl text-muted-foreground font-medium">
                Pay only for what you use. No subscriptions. No surprises.
              </p>
            </div>
            <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="card shadow-2xl border-2 border-primary/20 bg-white/90">
                <div className="card-header text-center">
                  <h3 className="card-title text-2xl font-bold">Pay Per Website</h3>
                  <p className="card-description text-lg">Perfect for individuals and small teams</p>
                </div>
                <div className="card-content text-center">
                  <div className="text-5xl font-black mb-2">$2</div>
                  <p className="text-muted-foreground mb-6 text-lg">per website generation</p>
                  <ul className="space-y-3 text-left mb-8">
                    <li className="flex items-center space-x-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>Complete HTML website</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>Responsive, modern design</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>Unlimited AI iterations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>Instant download</span>
                    </li>
                  </ul>
                  <Link href="/auth" className="btn-primary w-full flex items-center justify-center text-lg font-bold py-3">
                    Get Started
                  </Link>
                </div>
              </div>
              <div className="card shadow-2xl border-2 border-primary/20 bg-white/90">
                <div className="card-header text-center">
                  <h3 className="card-title text-2xl font-bold">Enterprise</h3>
                  <p className="card-description text-lg">For agencies, startups, and power users</p>
                </div>
                <div className="card-content text-center">
                  <div className="text-5xl font-black mb-2">Contact Us</div>
                  <p className="text-muted-foreground mb-6 text-lg">Custom pricing for high volume and advanced needs</p>
                  <ul className="space-y-3 text-left mb-8">
                    <li className="flex items-center space-x-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>Priority AI generation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>Dedicated support</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>Team collaboration</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>Custom integrations</span>
                    </li>
                  </ul>
                  <a href="mailto:contact@instantlist.ai" className="btn-secondary w-full flex items-center justify-center text-lg font-bold py-3">
                    Contact Sales
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-28" id="about">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-extrabold mb-6 tracking-tight">About instantlist.ai</h2>
              <p className="text-2xl text-muted-foreground font-medium">
                instantlist.ai is built by a team of AI engineers, designers, and entrepreneurs passionate about empowering everyone to create on the web. Our mission: make website creation effortless, beautiful, and accessible to all.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-primary/10 rounded-2xl p-8 shadow-xl text-left">
                <h3 className="text-2xl font-bold mb-3 text-primary">Our Vision</h3>
                <p className="text-lg text-muted-foreground">
                  We believe in a world where anyone can bring their ideas to life online, instantly. No barriers. No gatekeepers. Just pure creativity, powered by AI.
                </p>
              </div>
              <div className="bg-secondary/10 rounded-2xl p-8 shadow-xl text-left">
                <h3 className="text-2xl font-bold mb-3 text-secondary">Our Technology</h3>
                <p className="text-lg text-muted-foreground">
                  instantlist.ai leverages the latest in generative AI, design systems, and cloud infrastructure to deliver the fastest, most reliable website creation experience on the planet.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default function HomePage() {
  return <LandingPage />;
}
