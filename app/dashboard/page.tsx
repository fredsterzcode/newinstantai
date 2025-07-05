'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Header } from '@/components/header';
import Link from 'next/link';

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
    </div>
  );
}

function DashboardContent() {
  const { user, loading, credits } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth');
    }
  }, [user, loading, router]);

  if (loading) return <LoadingSpinner />;
  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.email}!</h1>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0 mb-8">
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold text-lg">
          Credits: {credits}
        </div>
        <Link href="/builder" className="btn-primary text-lg px-6 py-2 font-bold shadow-md">Open Builder</Link>
        <Link href="/buy-credits" className="btn-secondary text-lg px-6 py-2 font-bold shadow">Buy Credits</Link>
      </div>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title text-2xl font-bold">Your Generated Websites</h2>
          <p className="card-description">History of your website generations will appear here.</p>
        </div>
        <div className="card-content">
          <div className="text-muted-foreground">(Coming soon: List of generated websites with preview and download links.)</div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <>
      <Header />
      <DashboardContent />
    </>
  );
} 