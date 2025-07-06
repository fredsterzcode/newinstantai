import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: NextRequest) {
  try {
    // Check environment variables
    const envCheck = {
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      openaiApiKey: !!process.env.OPENAI_API_KEY,
    };

    // Test Supabase connection
    let supabaseTest = null;
    if (envCheck.supabaseUrl && envCheck.supabaseAnonKey) {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        
        // Test basic connection
        const { data, error } = await supabase.from('users').select('count').limit(1);
        supabaseTest = {
          success: !error,
          error: error?.message || null,
          data: data ? 'Connected' : null
        };
      } catch (err) {
        supabaseTest = {
          success: false,
          error: err instanceof Error ? err.message : 'Unknown error',
          data: null
        };
      }
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      environment: envCheck,
      supabase: supabaseTest,
      message: 'Test environment check completed'
    });
  } catch (error) {
    console.error('Test environment error:', error);
    return NextResponse.json({ 
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 