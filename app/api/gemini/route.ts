import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log("Attempting Gemini model call...");
  
  if (!process.env.GEMINI_API_KEY) {
    console.error("CRITICAL: GEMINI_API_KEY environment variable is missing in Vercel!");
    return NextResponse.json(
      { error: "Missing GEMINI_API_KEY environment variable in Vercel settings." },
      { status: 500 }
    );
  }

  console.log("GEMINI_API_KEY is present. Key length:", process.env.GEMINI_API_KEY.length);

  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json(
        { error: 'Please provide a valid prompt or spiritual question.' },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const MODELS_TO_TRY = ['gemini-2.0-flash', 'gemini-1.5-flash-latest', 'gemini-1.5-flash', 'gemini-1.5-pro'];
    const SYSTEM_PROMPT = `You are the GodDome Faith & Reflection Assistant, a warm, compassionate, and biblically grounded spiritual companion for readers of GodDome (authored by Jeanna’ Mead). Your mission is to provide gentle encouragement, relevant scripture references, and thoughtful reflection points to help individuals find peace and grace. Keep your tone quiet, uplifting, and formatted in clean, readable Markdown with clear headings or bullet points where helpful.`;

    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser Question/Reflection Topic: ${prompt}`;
    let lastError: any = null;

    for (const modelName of MODELS_TO_TRY) {
      try {
        console.log(`Attempting Gemini API call with model: ${modelName}`);
        const response = await ai.models.generateContent({
          model: modelName,
          contents: fullPrompt,
        });

        if (response?.text) {
          console.log(`Gemini API call SUCCEEDED with model: ${modelName}`);
          return NextResponse.json({ text: response.text });
        }
      } catch (modelError: any) {
        console.error(`Failed with model ${modelName}:`, modelError?.message || modelError);
        lastError = modelError;
        const errString = String(modelError?.message || modelError);
        
        if (
          modelError?.status === 429 ||
          errString.includes('429') ||
          errString.includes('RESOURCE_EXHAUSTED') ||
          errString.includes('Quota') ||
          modelError?.status === 404 ||
          errString.includes('not found')
        ) {
          continue;
        }
      }
    }

    const lastErrMessage = lastError?.message || String(lastError || 'Unknown Gemini API error');
    console.error('CRITICAL: All Gemini models failed. Last error:', lastErrMessage);

    return NextResponse.json(
      { error: `Gemini API Error: ${lastErrMessage}` },
      { status: lastError?.status || 500 }
    );
  } catch (error: any) {
    console.error('CRITICAL Error in Gemini API Route handler:', error);
    return NextResponse.json(
      { error: `Server Exception: ${error?.message || String(error)}` },
      { status: 500 }
    );
  }
}
