'use client';

import { useState } from 'react';
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

  const generateWebsite = async () => {
    if (!prompt.trim()) return;
    if (credits < 1) {
      setError('Insufficient credits. Please purchase more credits to continue.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const response = await fetch('/api/generate-site', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setCurrentWebsite(data.website);
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
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Input and Controls */}
        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Website Builder</span>
              </h2>
              <p className="card-description">
                Describe your website and watch AI create it instantly
              </p>
            </div>
            
            <div className="card-content space-y-4">
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {currentWebsite ? 'Improve your website' : 'Describe your website'}
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="input min-h-[120px] resize-none"
                  placeholder={
                    currentWebsite 
                      ? "Describe what you'd like to improve about your website..."
                      : "e.g., Create a modern landing page for a tech startup with a hero section, features, and contact form..."
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Credits remaining: {credits}
                </div>
                
                <div className="flex space-x-2">
                  {currentWebsite && (
                    <button
                      onClick={improveWebsite}
                      disabled={loading || credits < 1}
                      className="btn-secondary"
                    >
                      {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="mr-2 h-4 w-4" />
                      )}
                      Improve
                    </button>
                  )}
                  
                  <button
                    onClick={generateWebsite}
                    disabled={loading || !prompt.trim() || credits < 1}
                    className="btn-primary"
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    {currentWebsite ? 'Regenerate' : 'Generate Website'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {currentWebsite && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Website Actions</h3>
              </div>
              <div className="card-content space-y-3">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="btn-secondary w-full"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
                
                <button
                  onClick={downloadWebsite}
                  className="btn-primary w-full"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download HTML
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Preview */}
        <div className="space-y-6">
          {currentWebsite && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Generated Website</h3>
                <p className="card-description">
                  Created on {new Date(currentWebsite.created_at).toLocaleDateString()}
                </p>
              </div>
              
              <div className="card-content">
                {showPreview ? (
                  <div className="border rounded-lg overflow-hidden">
                    <iframe
                      srcDoc={currentWebsite.html}
                      className="w-full h-[600px] border-0"
                      title="Website Preview"
                    />
                  </div>
                ) : (
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Click "Show Preview" to see your website in action
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {!currentWebsite && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Preview</h3>
                <p className="card-description">
                  Your generated website will appear here
                </p>
              </div>
              <div className="card-content">
                <div className="bg-muted p-8 rounded-lg text-center">
                  <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Start by describing your website above
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 