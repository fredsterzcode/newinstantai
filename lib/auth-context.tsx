'use client';

console.log('AuthProvider file loaded');

import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from './supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  credits: number | null;
  fetchCredits: () => Promise<void>;
  updateCredits: (newCredits: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState<number | null>(null);

  // Fetch credits directly from Supabase
  const fetchCredits = async () => {
    if (!user) {
      setCredits(null);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('users')
        .select('credits')
        .eq('id', user.id)
        .single();
      if (!error && data && typeof data.credits === 'number') {
        setCredits(data.credits);
      } else {
        setCredits(null);
      }
    } catch (err) {
      setCredits(null);
    }
  };

  // Update credits via API route (for secure mutations)
  const updateCredits = async (newCredits: number) => {
    if (!user) return;
    try {
      const res = await fetch('/api/credits-mutate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id, credits: newCredits }),
      });
      if (res.ok) {
        setCredits(newCredits);
      }
    } catch (err) {
      // ignore
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setLoading(false);
      return;
    }
    timeoutId = setTimeout(() => setLoading(false), 5000);
    supabase.auth.getSession().then(({ data: { session } }) => {
      clearTimeout(timeoutId);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) fetchCredits();
    }).catch(() => {
      clearTimeout(timeoutId);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) fetchCredits();
      else setCredits(null);
    });
    return () => {
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };
  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    return { error };
  };
  const signOut = async () => { await supabase.auth.signOut(); };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    credits,
    fetchCredits,
    updateCredits,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 