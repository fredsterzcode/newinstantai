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
  updateCredits: (credits: number) => Promise<void>;
  credits: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState(0);

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
      if (session?.user) {
        fetchUserCredits(session.user.id);
      }
      setLoading(false);
      console.log('Initial session:', session);
      console.log('After getSession: user', session?.user, 'session', session, 'loading', false);
    }).catch((err) => {
      clearTimeout(timeoutId);
      setLoading(false);
      console.error('Error fetching session:', err);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserCredits(session.user.id);
      } else {
        setCredits(0);
      }
      setLoading(false);
      console.log('Auth state changed:', event, session);
      console.log('After onAuthStateChange: user', session?.user, 'session', session, 'loading', false);
    });
    return () => {
      clearTimeout(timeoutId);
      subscription.unsubscribe();
      console.log('AuthProvider useEffect cleanup');
    };
  }, []);

  useEffect(() => {
    if (user) {
      console.log('User changed, fetching credits for:', user.id);
      fetchUserCredits(user.id);
    }
  }, [user]);

  const fetchUserCredits = async (userId: string) => {
    console.log('Fetching credits for user:', userId);
    const { data, error } = await supabase
      .from('users')
      .select('credits')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setCredits(data.credits);
      console.log('Fetched credits:', data.credits);
    } else if (error) {
      setCredits(0);
      console.error('Error fetching credits:', error);
    }
  };

  const updateCredits = async (newCredits: number) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('users')
      .update({ credits: newCredits })
      .eq('id', user.id);

    if (!error) {
      setCredits(newCredits);
    }
  };

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
    updateCredits,
    credits,
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