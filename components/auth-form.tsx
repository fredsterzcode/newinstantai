'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Eye, EyeOff, Loader2 } from '@/lib/icons';
import { useRouter } from 'next/navigation';

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signIn, signUp, user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (isSignUp) {
      const { error } = await signUp(email, password);
      console.log('signUp result:', error);
      if (error) {
        setError(error.message || 'Error signing up');
      } else {
        setSuccess('Account created! Check your email to confirm your account.');
      }
    } else {
      const { error } = await signIn(email, password);
      console.log('signIn result:', error);
      console.log('After signIn: user', user, 'authLoading', authLoading);
      if (error) {
        setError(error.message || 'Error signing in');
      }
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card shadow-2xl border-2 border-primary/20 bg-white/90">
        <div className="card-header text-center pb-0">
          <h1 className="card-title text-3xl font-extrabold tracking-tight mb-2 text-primary">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </h1>
          <p className="card-description text-lg text-muted-foreground mb-2">
            {isSignUp 
              ? 'Sign up to start building amazing websites with AI'
              : 'Sign in to continue building your websites'
            }
          </p>
        </div>
        <form onSubmit={handleSubmit} className="card-content space-y-5 pt-0">
          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md font-semibold">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 text-sm text-green-700 bg-green-100 rounded-md font-semibold">
              {success}
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input text-lg border-2 border-primary/30 focus:border-primary"
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pr-10 text-lg border-2 border-primary/30 focus:border-primary"
                placeholder="Enter your password"
                required
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-lg h-12 font-bold shadow-md"
          >
            {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        <div className="card-footer justify-center pt-0">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setSuccess('');
            }}
            className="btn-ghost text-base font-medium text-primary hover:underline"
          >
            {isSignUp 
              ? 'Already have an account? Sign in'
              : "Don't have an account? Create one"
            }
          </button>
        </div>
      </div>
    </div>
  );
} 