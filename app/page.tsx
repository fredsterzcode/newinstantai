'use client';
export const dynamic = "force-dynamic";

import Link from 'next/link';
import { Sparkles, Zap, Globe, Download, ArrowRight, Check } from '@/lib/icons';

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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10"></div>
        <div className="relative container mx-auto px-4 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Website Builder</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Create Websites
              <span className="text-primary"> Instantly</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your ideas into beautiful, professional websites with just a description. 
              No coding required. No design skills needed. Just pure AI magic.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth" className="btn-primary text-lg px-8 py-4 flex items-center justify-center">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="btn-secondary text-lg px-8 py-4">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose InstantList.ai?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The most advanced AI website builder that understands your vision and brings it to life
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="card-content">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Generate complete websites in seconds, not hours. 
                  From concept to live site in under a minute.
                </p>
              </div>
            </div>
            
            <div className="card text-center">
              <div className="card-content">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional Quality</h3>
                <p className="text-muted-foreground">
                  Every website is designed with modern best practices, 
                  responsive layouts, and stunning visuals.
                </p>
              </div>
            </div>
            
            <div className="card text-center">
              <div className="card-content">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ready to Deploy</h3>
                <p className="text-muted-foreground">
                  Download clean, production-ready HTML that works 
                  perfectly on any hosting platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to your perfect website
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Describe Your Vision</h3>
              <p className="text-muted-foreground">
                Tell us what you want. Be as detailed or simple as you like.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Creates Your Site</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your requirements and generates a complete website.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Download & Deploy</h3>
              <p className="text-muted-foreground">
                Download your website and deploy it anywhere. It's that simple.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Pay only for what you use. No hidden fees, no surprises.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="card">
              <div className="card-header text-center">
                <h3 className="card-title">Pay Per Website</h3>
                <p className="card-description">
                  Perfect for individuals and small projects
                </p>
              </div>
              <div className="card-content text-center">
                <div className="text-4xl font-bold mb-2">$2</div>
                <p className="text-muted-foreground mb-6">per website generation</p>
                
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Complete HTML website</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Responsive design</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Unlimited iterations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Instant download</span>
                  </li>
                </ul>
                
                <Link href="/auth" className="btn-primary w-full flex items-center justify-center">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Build Your Website?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are building amazing websites with AI. 
            Start your journey today.
          </p>
          <Link href="/auth" className="btn-primary text-lg px-8 py-4 flex items-center justify-center">
            Start Building Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function HomePage() {
  return <LandingPage />;
}
