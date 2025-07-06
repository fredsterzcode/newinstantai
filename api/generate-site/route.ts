import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create a Supabase client with service role key for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Service role client (server-side only, never expose to client)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Regular client for auth verification
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });
    }

    // Get user from Authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      console.error('Auth error:', authError);
      return NextResponse.json({ error: 'Invalid authentication' }, { status: 401 });
    }

    console.log('Authenticated user:', user.id);

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key not configured');
      return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 500 });
    }

    // Generate website with OpenAI
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a professional web developer and designer. Create a complete, modern, responsive HTML5 website based on the user's description. 

Requirements:
- Use modern HTML5 semantic elements
- Include embedded CSS for styling
- Make it fully responsive (mobile-first)
- Use a clean, professional design
- Include proper meta tags
- Use modern CSS features (flexbox, grid, custom properties)
- Ensure accessibility standards
- No external dependencies or scripts
- Optimize for performance

The website should be production-ready and visually appealing.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!openaiRes.ok) {
      const errorData = await openaiRes.json();
      console.error('OpenAI API error:', errorData);
      return NextResponse.json({ error: 'Failed to generate website' }, { status: 500 });
    }

    const json = await openaiRes.json();
    let html = json.choices?.[0]?.message?.content || '';

    // Clean up markdown if present
    if (html.startsWith('```html')) {
      html = html.replace(/^```html/, '').replace(/```$/, '').trim();
    }

    if (!html) {
      return NextResponse.json({ error: 'Failed to generate website content' }, { status: 500 });
    }

    console.log('Generated HTML length:', html.length);

    // Save website to database using service role client
    const { data: website, error: saveError } = await supabaseAdmin
      .from('websites')
      .insert([{ 
        user_id: user.id,
        prompt, 
        html,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (saveError) {
      console.error('Database save error:', saveError);
      return NextResponse.json({ error: 'Failed to save website' }, { status: 500 });
    }

    console.log('Website saved with ID:', website.id);

    return NextResponse.json({ website });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
