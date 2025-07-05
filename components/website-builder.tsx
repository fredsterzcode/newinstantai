'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { Sparkles, Loader2, RefreshCw, Download, Eye } from '@/lib/icons';

interface Website {
  id: string;
  prompt: string;
  html: string;
  created_at: string;
}

export function WebsiteBuilder() {
  const [prompt, setPrompt] = useState('');
  const [currentWebsite, setCurrentWebsite] = useState<Website | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const { user, credits, updateCredits } = useAuth();
  const [chat, setChat] = useState<{ role: 'user' | 'ai'; content: string; html?: string }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll chat to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const sendPrompt = async () => {
    if (!prompt.trim() || credits < 1) return;
    setLoading(true);
    setError('');
    setChat((prev) => [...prev, { role: 'user', content: prompt }]);
    setPrompt('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      const response = await fetch('/api/generate-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setCurrentWebsite(data.website);
        setChat((prev) => [...prev, { role: 'ai', content: 'Here is your website!', html: data.website.html }]);
        await updateCredits(data.remainingCredits);
      }
    } catch (err) {
      setError('Failed to generate website. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const improveWebsite = async () => {
    if (!currentWebsite || !prompt.trim()) return;
    if (credits < 1) {
      setError('Insufficient credits. Please purchase more credits to continue.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const improvementPrompt = `Improve this website based on the following feedback: ${prompt}. Current website: ${currentWebsite.html}`;
      
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const response = await fetch('/api/generate-site', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ prompt: improvementPrompt }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setCurrentWebsite(data.website);
        await updateCredits(data.remainingCredits);
      }
    } catch (err) {
      setError('Failed to improve website. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadWebsite = () => {
    if (!currentWebsite) return;
    
    const blob = new Blob([currentWebsite.html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[70vh]">
        {/* Chat Interface */}
        <div className="flex flex-col h-full bg-white/90 rounded-2xl shadow-xl border-2 border-primary/10">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {chat.length === 0 && (
              <div className="text-muted-foreground text-center mt-12">Start by describing your website idea!</div>
            )}
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-2xl px-4 py-3 max-w-[80%] shadow ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  {msg.role === 'ai' && msg.html ? (
                    <span>AI: {msg.content}</span>
                  ) : (
                    <span>{msg.content}</span>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="p-4 border-t flex items-center space-x-2">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="input flex-1 min-h-[48px] resize-none"
              placeholder="Describe your website or how to improve it..."
              disabled={loading}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendPrompt(); } }}
            />
            <button
              onClick={sendPrompt}
              disabled={loading || !prompt.trim() || credits < 1}
              className="btn-primary px-6 h-12 font-bold shadow-md"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
            </button>
          </div>
          {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md font-semibold text-center">{error}</div>}
          <div className="p-2 text-right text-xs text-muted-foreground">Credits: {credits}</div>
        </div>
        {/* Live Preview */}
        <div className="flex flex-col h-full bg-background rounded-2xl shadow-xl border-2 border-primary/10">
          <div className="p-4 flex items-center justify-between border-b">
            <h3 className="text-xl font-bold">Live Website Preview</h3>
            {currentWebsite && (
              <button onClick={downloadWebsite} className="btn-secondary flex items-center"><Download className="mr-2 h-4 w-4" />Download HTML</button>
            )}
          </div>
          <div className="flex-1 overflow-auto bg-white rounded-b-2xl">
            {currentWebsite ? (
              <iframe
                srcDoc={currentWebsite.html}
                title="Website Preview"
                className="w-full h-[60vh] rounded-b-2xl border-none"
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">No website generated yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 