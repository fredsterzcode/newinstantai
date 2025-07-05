'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { LogOut, Sparkles, User } from '@/lib/icons';

export function Header() {
  const { user, signOut, credits } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <span className="relative flex items-center">
            <Sparkles className="h-9 w-9 text-primary group-hover:scale-110 transition-transform" />
            <span className="absolute -right-2 -top-2 h-3 w-3 rounded-full bg-gradient-to-tr from-primary to-secondary animate-pulse" />
          </span>
          <span className="text-2xl font-extrabold tracking-tight group-hover:text-primary transition-colors">
            instantlist<span className="text-primary">.ai</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-lg font-semibold">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/#pricing" className="nav-link">Pricing</Link>
          <Link href="/#about" className="nav-link">About</Link>
          {user && <Link href="/dashboard" className="nav-link">Dashboard</Link>}
        </nav>

        {/* Auth/Account */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="hidden md:flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full">
                <span className="text-sm font-medium">{credits} credits</span>
              </div>
              <div className="hidden md:flex items-center space-x-2 bg-muted px-3 py-1 rounded-full">
                <User className="h-4 w-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              <button
                onClick={signOut}
                className="btn-ghost p-2 hover:bg-destructive/10 rounded-full"
                title="Sign out"
              >
                <LogOut className="h-5 w-5 text-destructive" />
              </button>
            </>
          ) : (
            <Link href="/auth" className="btn-primary px-6 py-2 text-base font-bold shadow-md">
              Sign In
            </Link>
          )}
        </div>
      </div>
      <style jsx global>{`
        .nav-link {
          position: relative;
          color: inherit;
          transition: color 0.2s;
        }
        .nav-link:after {
          content: '';
          display: block;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--tw-gradient-stops));
          transition: width 0.3s;
          position: absolute;
          left: 0;
          bottom: -4px;
        }
        .nav-link:hover {
          color: var(--tw-prose-links);
        }
        .nav-link:hover:after {
          width: 100%;
        }
      `}</style>
    </header>
  );
} 