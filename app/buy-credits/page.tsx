'use client';
import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

// Example: OpenAI cost per prompt (e.g., £0.01)
const OPENAI_COST_PER_PROMPT = 0.01;
const PROFIT_MARGIN = 0.5; // 50%
const PRICE_PER_CREDIT = +(OPENAI_COST_PER_PROMPT * (1 + PROFIT_MARGIN)).toFixed(2); // e.g., £0.02

export default function BuyCreditsPage() {
  const [credits, setCredits] = useState(10);
  const total = +(credits * PRICE_PER_CREDIT).toFixed(2);

  return (
    <>
      <Header />
      <main className="max-w-xl mx-auto px-4 py-16 text-black">
        <h1 className="text-4xl font-bold mb-6">Buy Credits</h1>
        <p className="mb-4 text-lg">1 credit = 1 prompt = <span className="font-bold">£{PRICE_PER_CREDIT.toFixed(2)}</span></p>
        <div className="bg-white rounded-xl shadow p-6 mb-8 border">
          <label className="block mb-2 font-semibold">How many credits?</label>
          <input
            type="number"
            min={1}
            max={1000}
            value={credits}
            onChange={e => setCredits(Math.max(1, Math.min(1000, Number(e.target.value))))}
            className="input w-full text-lg mb-4 border-2 border-primary/30 focus:border-primary"
          />
          <div className="flex items-center justify-between text-lg font-medium mb-2">
            <span>Total:</span>
            <span className="text-2xl font-bold">£{total.toFixed(2)}</span>
          </div>
          <button className="btn-primary w-full text-lg h-12 font-bold shadow-md mt-4" disabled>
            Purchase (Coming Soon)
          </button>
        </div>
        <p className="text-gray-500 text-sm">Payments coming soon. Credits will be added to your account instantly after purchase.</p>
      </main>
      <Footer />
    </>
  );
} 