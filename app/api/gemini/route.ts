import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log('Gemini API Key exists:', !!process.env.GEMINI_API_KEY);
  console.log('Gemini API Key length:', process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0);

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
        { error: 'GEMINI_API_KEY environment variable is not set in Vercel. Please add GEMINI_API_KEY to your Vercel Environment Variables.' },
        { status: 503 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const MODELS_TO_TRY = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
    const SYSTEM_PROMPT = `You are the GodDome Faith & Reflection Assistant, a warm, compassionate, and biblically grounded spiritual companion for readers of GodDome (authored by Jeanna’ Mead). Your mission is to provide gentle encouragement, relevant scripture references, and thoughtful reflection points to help individuals find peace and grace. Keep your tone quiet, uplifting, and formatted in clean, readable Markdown with clear headings or bullet points where helpful.`;

    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser Question/Reflection Topic: ${prompt}`;
    let lastError: any = null;

    for (const model of MODELS_TO_TRY) {
      try {
        console.log(`Attempting Gemini API call with model: ${model}`);
        const response = await ai.models.generateContent({
          model,
          contents: fullPrompt,
        });

        if (response?.text) {
          console.log(`Gemini API call succeeded with model: ${model}`);
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

    const lastErrMessage = lastError?.message || String(lastError || 'Unknown Gemini API error');
    console.error('All Gemini models failed. Last error:', lastErrMessage);

    return NextResponse.json(
      { error: `Gemini API Error: ${lastErrMessage}` },
      { status: lastError?.status || 500 }
    );
  } catch (error: any) {
    console.error('Error in Gemini API Route handler:', error);
    return NextResponse.json(
      { error: `Server Error: ${error?.message || String(error)}` },
      { status: 500 }
    );
  }
}
