import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json(
        { error: 'Please provide a valid prompt or spiritual question.' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Faith Assistant is warming up. Please set GEMINI_API_KEY in Vercel environment variables.' },
        { status: 503 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const MODELS_TO_TRY = ['gemini-2.0-flash', 'gemini-1.5-flash-latest', 'gemini-1.5-flash', 'gemini-1.5-pro'];
    const SYSTEM_PROMPT = `You are the GodDome Faith & Reflection Assistant, a warm, compassionate, and biblically grounded spiritual companion for readers of GodDome (authored by Jeanna’ Mead). Your mission is to provide gentle encouragement, relevant scripture references, and thoughtful reflection points to help individuals find peace and grace. Keep your tone quiet, uplifting, and formatted in clean, readable Markdown with clear headings or bullet points where helpful.`;

    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser Question/Reflection Topic: ${prompt}`;
    let lastError: any = null;

    for (const model of MODELS_TO_TRY) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: fullPrompt,
        });

        if (response?.text) {
          return NextResponse.json({ text: response.text });
        }
      } catch (err: any) {
        console.error(`Gemini API error with model ${model}:`, err?.message || err);
        lastError = err;
        const errString = String(err?.message || err);
        
        if (
          err?.status === 429 ||
          errString.includes('429') ||
          errString.includes('RESOURCE_EXHAUSTED') ||
          errString.includes('Quota') ||
          err?.status === 404 ||
          errString.includes('not found')
        ) {
          continue;
        }
      }
    }

    const lastErrString = String(lastError?.message || lastError);
    if (
      lastError?.status === 429 ||
      lastErrString.includes('429') ||
      lastErrString.includes('RESOURCE_EXHAUSTED') ||
      lastErrString.includes('Quota')
    ) {
      return NextResponse.json(
        { error: 'Our Faith Assistant is currently receiving high volume. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Unable to connect to Faith Assistant right now. Please try again in a few moments.' },
      { status: 500 }
    );
  } catch (error: any) {
    console.error('Error generating reflection with Gemini API:', error);
    return NextResponse.json(
      { error: 'Unable to connect to Faith Assistant right now. Please try again in a few moments.' },
      { status: 500 }
    );
  }
}
