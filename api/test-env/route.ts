import { NextResponse } from 'next/server';

export async function GET() {
  const envCheck = {
    supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    openaiKey: !!process.env.OPENAI_API_KEY,
  };

  return NextResponse.json({
    message: 'Environment variables check',
    envCheck,
    timestamp: new Date().toISOString()
  });
} 