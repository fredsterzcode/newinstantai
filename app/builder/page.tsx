'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Header } from '@/components/header';
import { WebsiteBuilder } from '@/components/website-builder';

function BuilderContent() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth');
    }
  }, [user, loading, router]);

  if (loading) return null;
  if (!user) return null;

  return <WebsiteBuilder />;
}

export default function BuilderPage() {
  return (
    <>
      <Header />
      <BuilderContent />
    </>
  );
} 