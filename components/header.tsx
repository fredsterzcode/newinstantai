'use client';

import { useAuth } from '@/lib/auth-context';
import { LogOut, Sparkles, User } from '@/lib/icons';

export function Header() {
  const { user, signOut, credits } = useAuth();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">InstantList.ai</span>
          </div>
        </div>

        {user && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">{credits} credits</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 bg-muted px-3 py-1 rounded-full">
                <User className="h-4 w-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              
              <button
                onClick={signOut}
                className="btn-ghost p-2"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 