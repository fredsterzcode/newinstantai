import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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
      return NextResponse.json({ error: 'Invalid authentication' }, { status: 401 });
    }

    // Check user credits
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('credits')
      .eq('id', user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (userData.credits < 1) {
      return NextResponse.json({ error: 'Insufficient credits' }, { status: 402 });
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

    // Save website to database
    const { data: website, error: saveError } = await supabase
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

    // Deduct credit from user
    const { error: creditError } = await supabase
      .from('users')
      .update({ credits: userData.credits - 1 })
      .eq('id', user.id);

    if (creditError) {
      console.error('Credit update error:', creditError);
      // Don't fail the request if credit update fails
    }

    return NextResponse.json({ 
      website,
      remainingCredits: userData.credits - 1
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
