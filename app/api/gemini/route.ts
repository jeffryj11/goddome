import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    console.error("CRITICAL: GEMINI_API_KEY environment variable is missing in Vercel!");
    return NextResponse.json(
      { error: "Missing GEMINI_API_KEY environment variable in Vercel settings." },
      { status: 500 }
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

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const MODELS_TO_TRY = [
      'gemini-2.0-flash-exp',
      'gemini-2.0-flash-lite',
      'gemini-1.5-flash-8b',
      'gemini-2.0-flash',
      'gemini-1.5-flash'
    ];

    const SYSTEM_PROMPT = `You are the GodDome Faith & Reflection Assistant, a warm, compassionate, and biblically grounded spiritual companion for readers of GodDome (authored by Jeanna’ Mead). Your mission is to provide gentle encouragement, relevant scripture references, and thoughtful reflection points to help individuals find peace and grace. Keep your tone quiet, uplifting, and formatted in clean, readable Markdown with clear headings or bullet points where helpful.`;

    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser Question/Reflection Topic: ${prompt}`;

    let responseText: string | null = null;
    let lastError: any = null;

    for (const modelName of MODELS_TO_TRY) {
      try {
        console.log(`Attempting model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(fullPrompt);
        responseText = result.response.text();
        if (responseText) {
          console.log(`Model ${modelName} SUCCEEDED`);
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} failed:`, err?.message || err);
      }
    }

    if (!responseText) {
      const errMsg = lastError?.message || String(lastError || 'All models failed to generate content');
      console.error('All Gemini models failed:', errMsg);
      return NextResponse.json(
        { error: `Gemini API Error: ${errMsg}` },
        { status: lastError?.status || 500 }
      );
    }

    return NextResponse.json({ text: responseText });
  } catch (error: any) {
    console.error('CRITICAL Error in Gemini API Route handler:', error);
    return NextResponse.json(
      { error: `Server Exception: ${error?.message || String(error)}` },
      { status: 500 }
    );
  }
}
