'use client';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16 text-black">
        <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
        <p className="mb-4">This is a placeholder terms & conditions page. Replace with your actual legal text before going live.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use of this service is at your own risk.</li>
          <li>All content generated is owned by the user.</li>
          <li>We reserve the right to terminate accounts for abuse.</li>
        </ul>
        <p className="mt-6 text-gray-500">Last updated: July 2025</p>
      </main>
      <Footer />
    </>
  );
} 