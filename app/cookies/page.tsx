'use client';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16 text-black">
        <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
        <p className="mb-4">This is a placeholder cookie policy. Replace with your actual legal text before going live.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>We use cookies to improve your experience.</li>
          <li>Cookies are only used for authentication and analytics.</li>
          <li>You can disable cookies in your browser settings.</li>
        </ul>
        <p className="mt-6 text-gray-500">Last updated: July 2025</p>
      </main>
      <Footer />
    </>
  );
} 