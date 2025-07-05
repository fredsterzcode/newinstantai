'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/lib/auth-context';
import { Header } from '@/components/header';

function DashboardContent() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth');
    }
  }, [user, loading, router]);

  if (loading) return null;
  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.email}!</h1>
      <p className="mb-8">This is your dashboard. You can view your generated websites and credits here.</p>
      {/* Add dashboard content here */}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthProvider>
      <Header />
      <DashboardContent />
    </AuthProvider>
  );
} 