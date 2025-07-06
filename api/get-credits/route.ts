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

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      console.log('No auth header provided');
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      console.log('Empty token provided');
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    console.log('Token provided:', token ? '[REDACTED]' : 'none');
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    console.log('User lookup result:', user ? `User ID: ${user.id}` : 'No user', 'Auth error:', authError);
    
    if (authError || !user) {
      console.error('Authentication failed:', authError);
      return NextResponse.json({ error: 'Invalid authentication' }, { status: 401 });
    }
    
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('credits')
      .eq('id', user.id)
      .single();
      
    console.log('DB query result:', data, 'DB error:', error);
    
    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
    }
    
    if (!data) {
      console.error('User not found in database:', user.id);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    if (typeof data.credits !== 'number') {
      console.error('Invalid credits data:', data.credits);
      return NextResponse.json({ error: 'Invalid credits data' }, { status: 500 });
    }
    
    console.log('Successfully fetched credits:', data.credits, 'for user:', user.id);
    return NextResponse.json({ credits: data.credits });
    
  } catch (error) {
    console.error('Unexpected API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 