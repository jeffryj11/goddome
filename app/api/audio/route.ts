import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text, storyId } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide story text for voice synthesis.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceId = process.env.JEANNA_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'; // Fallback Voice ID

    if (!apiKey) {
      return NextResponse.json(
        { 
          error: 'ElevenLabs API key not configured in Vercel environment variables.',
          demoNotice: 'Please set ELEVENLABS_API_KEY and JEANNA_VOICE_ID in Vercel Settings.'
        },
        { status: 503 }
      );
    }

    // Clean markdown formatting / HTML tags from text before sending to ElevenLabs
    const cleanText = text
      .replace(/<[^>]*>?/gm, '')
      .replace(/#+\s/g, '')
      .replace(/[*_~`]/g, '')
      .slice(0, 4500); // Character limit for single request

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
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
      console.error('ElevenLabs API error:', errText);
      return NextResponse.json(
        { error: 'Failed to synthesize audio with ElevenLabs.' },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new Response(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    console.error('ElevenLabs Route error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during audio generation.' },
      { status: 500 }
    );
  }
}
