import { NextResponse } from 'next/server';

async function synthesizeStream(rawText: string) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID || process.env.JEANNA_VOICE_ID || '21m00Tcm4TlvDq8ikWAM';

  if (!apiKey) {
    return NextResponse.json(
      { 
        error: 'ElevenLabs API key not configured in environment variables.',
        demoNotice: 'Please set ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID in Vercel Settings.'
      },
      { status: 503 }
    );
  }

  // Mandatory Text Sanitization: strip raw HTML tags, Markdown elements, and excess whitespace
  const cleanText = rawText
    .replace(/<[^>]*>?/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/#+\s/g, '')
    .replace(/[*_~`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 4500);

  // Call ElevenLabs HTTP streaming endpoint (/v1/text-to-speech/{voice_id}/stream)
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
    {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text: cleanText,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    console.error('[ElevenLabs API Error]:', errText);
    return NextResponse.json(
      { error: 'Failed to synthesize audio with ElevenLabs.' },
      { status: response.status }
    );
  }

  // Stream chunked audio response directly back to the client
  return new Response(response.body, {
    status: 200,
    headers: {
      'Content-Type': 'audio/mpeg',
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'no-cache, no-transform',
    },
  });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const storyId = searchParams.get('id') || searchParams.get('storyId');
    let rawText = searchParams.get('text') || searchParams.get('content') || '';

    if (!rawText && storyId) {
      try {
        const { getStoryData } = await import('@/lib/stories');
        const story = await getStoryData(storyId);
        rawText = story.content || story.contentHtml || story.title;
      } catch (err) {
        console.warn('Could not fetch story for audio GET stream:', err);
      }
    }

    if (!rawText || rawText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide story text or valid id for voice synthesis.' },
        { status: 400 }
      );
    }

    return synthesizeStream(rawText);
  } catch (error: any) {
    console.error('[ElevenLabs Route GET Error]:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during audio generation.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawText = body.content || body.text || '';

    if (!rawText || typeof rawText !== 'string' || rawText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide story or devotional text for voice synthesis.' },
        { status: 400 }
      );
    }

    return synthesizeStream(rawText);
  } catch (error: any) {
    console.error('[ElevenLabs Route POST Error]:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during audio generation.' },
      { status: 500 }
    );
  }
}
