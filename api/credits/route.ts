import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// GET: Return the current user's credits
export async function GET(req: NextRequest) {
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
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('credits')
      .eq('id', user.id)
      .single();
    if (error || !data) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ credits: data.credits });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST: Update a user's credits (admin only for now)
export async function POST(req: NextRequest) {
  try {
    const { userId, credits } = await req.json();
    if (!userId || typeof credits !== 'number') {
      return NextResponse.json({ error: 'userId and credits required' }, { status: 400 });
    }
    // In production, check for admin privileges here!
    const { error } = await supabaseAdmin
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