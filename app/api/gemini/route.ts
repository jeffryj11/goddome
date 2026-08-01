import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

const MODELS_TO_TRY = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-3-flash'];

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'A valid prompt string is required.' },
        { status: 400 }
      );
    }

    let lastError: any = null;
    for (const model of MODELS_TO_TRY) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
        });

        if (response?.text) {
          return NextResponse.json({ text: response.text });
        }
      } catch (err: any) {
        lastError = err;
        if (err?.status === 404 || err?.message?.includes('not found')) {
          continue;
        }
        break;
      }
    }

    return NextResponse.json(
      { error: lastError?.message || 'Failed to generate reflection.' },
      { status: lastError?.status || 500 }
    );
  } catch (error: any) {
    console.error('Error generating reflection with Gemini API:', error);
    return NextResponse.json(
      { error: error?.message || 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
