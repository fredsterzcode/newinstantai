import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid authentication' }, { status: 401 });
    }
    const { userId, credits } = await req.json();
    if (!userId || typeof credits !== 'number') {
      return NextResponse.json({ error: 'userId and credits required' }, { status: 400 });
    }
    // Only allow the authenticated user to update their own credits
    if (user.id !== userId) {
      return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
    }
    const { error } = await supabase
      .from('users')
      .update({ credits })
      .eq('id', userId);
    if (error) {
      return NextResponse.json({ error: 'Failed to update credits' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 