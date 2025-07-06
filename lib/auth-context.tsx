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

  // Fetch credits from API
  const fetchCredits = async () => {
    if (!session?.access_token) {
      setCredits(null);
      return;
    }
    try {
      const res = await fetch('/api/credits', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${session.access_token}` },
      });
      const data = await res.json();
      if (res.ok && typeof data.credits === 'number') {
        setCredits(data.credits);
      } else {
        setCredits(null);
      }
    } catch (err) {
      setCredits(null);
    }
  };

  // Update credits via API (admin only for now)
  const updateCredits = async (newCredits: number) => {
    if (!user || !session?.access_token) return;
    try {
      const res = await fetch('/api/credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
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
    console.log('AuthProvider useEffect running');
    let timeoutId: NodeJS.Timeout;
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setLoading(false);
      console.log('Supabase env vars missing');
      return;
    }
    // Fallback: always set loading to false after 5 seconds
    timeoutId = setTimeout(() => {
      setLoading(false);
      console.log('AuthProvider fallback: loading set to false after timeout');
    }, 5000);
    supabase.auth.getSession().then(({ data: { session } }) => {
      clearTimeout(timeoutId);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      console.log('Initial session:', session);
      console.log('After getSession: user', session?.user, 'session', session, 'loading', false);
      if (session?.user) fetchCredits();
    }).catch((err) => {
      clearTimeout(timeoutId);
      setLoading(false);
      console.error('Error fetching session:', err);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      console.log('Auth state changed:', event, session);
      console.log('After onAuthStateChange: user', session?.user, 'session', session, 'loading', false);
      if (session?.user) fetchCredits();
      else setCredits(null);
    });
    return () => {
      clearTimeout(timeoutId);
      subscription.unsubscribe();
      console.log('AuthProvider useEffect cleanup');
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

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