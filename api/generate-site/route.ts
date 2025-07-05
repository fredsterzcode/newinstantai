import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });
  }

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
          content:
            "You are a professional website copywriter and designer. Generate a complete, styled, responsive HTML5 landing page for the user's prompt. Use embedded CSS. No scripts. Keep it mobile-friendly.",
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    }),
  });

  const json = await openaiRes.json();
  let html = json.choices?.[0]?.message?.content || '';

  // Clean up markdown if present
  if (html.startsWith('```html')) {
    html = html.replace(/^```html/, '').replace(/```$/, '').trim();
  }

  // Save to Supabase
  const { error } = await supabase.from('websites').insert([{ prompt, html }]);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ html });
}
