import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    console.error("CRITICAL: GEMINI_API_KEY environment variable is missing in Vercel!");
    return NextResponse.json(
      { error: "Faith Assistant is warming up. Please ensure GEMINI_API_KEY is configured in Vercel settings." },
      { status: 503 }
    );
  }

  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json(
        { error: 'Please provide a valid prompt or spiritual question.' },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const MODELS_TO_TRY = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-2.5-flash'];
    const SYSTEM_PROMPT = `You are the GodDome Faith & Reflection Assistant, a warm, compassionate, and biblically grounded spiritual companion for readers of GodDome (authored by Jeanna’ Mead). Your mission is to provide gentle encouragement, relevant scripture references, and thoughtful reflection points to help individuals find peace and grace. Keep your tone quiet, uplifting, and formatted in clean, readable Markdown with clear headings or bullet points where helpful.`;

    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser Question/Reflection Topic: ${prompt}`;
    let lastError: any = null;

    for (const modelName of MODELS_TO_TRY) {
      try {
        console.log(`Attempting Gemini model: ${modelName}`);
        const response = await ai.models.generateContent({
          model: modelName,
          contents: fullPrompt,
        });

        if (response?.text) {
          console.log(`Gemini model ${modelName} SUCCEEDED`);
          return NextResponse.json({ text: response.text });
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Gemini model ${modelName} failed:`, err?.message || err);
      }
    }

    // Return a clean, user-friendly message if Google's API key needs updating in Vercel
    const errString = String(lastError?.message || lastError || '');
    if (errString.includes('404') || errString.includes('NOT_FOUND') || errString.includes('API key')) {
      return NextResponse.json(
        { error: "Faith Assistant is temporarily undergoing maintenance. Please verify your GEMINI_API_KEY in Vercel." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Our Faith Assistant is currently receiving high volume. Please wait a moment and try again." },
      { status: 429 }
    );
  } catch (error: any) {
    console.error('Error in Gemini API route:', error);
    return NextResponse.json(
      { error: "Unable to connect to Faith Assistant right now. Please try again in a few moments." },
      { status: 500 }
    );
  }
}
