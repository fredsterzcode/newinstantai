'use client';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16 text-black">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">This is a placeholder privacy policy. Replace with your actual legal text before going live.</p>
        <p className="mb-2">We respect your privacy and are committed to protecting your personal data. This policy explains how we handle your information.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>We only collect data necessary to provide our service.</li>
          <li>We do not sell your data to third parties.</li>
          <li>You can request deletion of your data at any time.</li>
        </ul>
        <p className="mt-6 text-gray-500">Last updated: July 2025</p>
      </main>
      <Footer />
    </>
  );
} 