'use client';

import { useState } from 'react';

export default function HomePage() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');

  async function generateSite() {
    const res = await fetch('/api/generate-site', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResult(data.html);
  }

  return (
    <main>
      <h1>Instant List AI</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
        placeholder="Enter prompt for website..."
      />
      <button onClick={generateSite}>Generate</button>

      <div dangerouslySetInnerHTML={{ __html: result }} />
    </main>
  );
}
