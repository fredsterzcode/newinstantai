'use client';
import { AuthProvider } from '@/lib/auth-context';
import { AuthForm } from '@/components/auth-form';

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <AuthProvider>
          <AuthForm />
        </AuthProvider>
      </div>
    </div>
  );
} 