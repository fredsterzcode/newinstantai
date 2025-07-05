'use client';

import { useState } from 'react';

export default function HomePage() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function generateSite() {
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('/api/generate-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();

      if (res.ok) {
        setResult(data.html);
      } else {
        setResult(`Error: ${data.error || 'Something went wrong'}`);
      }
    } catch (error) {
      setResult('Error: Unable to reach API');
    }
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      <h1>InstantList AI</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
        placeholder="Enter prompt for website..."
        style={{ width: '100%', padding: 10, fontSize: 16, marginBottom: 10 }}
      />

      <button onClick={generateSite} disabled={loading || !prompt.trim()}>
        {loading ? 'Generating...' : 'Generate'}
      </button>

      <div
        style={{
          marginTop: 30,
          padding: 20,
          border: '1px solid #ccc',
          borderRadius: 8,
          minHeight: 200,
          backgroundColor: '#f9f9f9',
        }}
        dangerouslySetInnerHTML={{ __html: result }}
      />
    </main>
  );
}
