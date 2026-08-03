import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return Response.json(
        { error: 'Please provide a valid prompt or spiritual question.' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: 'Server configuration error: GEMINI_API_KEY environment variable is missing.' },
        { status: 500 }
      );
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are the GodDome Faith & Reflection Assistant, a warm, compassionate, and biblically grounded spiritual companion for readers of GodDome (authored by Jeanna’ Mead). Your mission is to provide gentle encouragement, relevant scripture references, and thoughtful reflection points to help individuals find peace and grace. Keep your tone quiet, uplifting, and formatted in clean, readable Markdown with clear headings or bullet points where helpful.`,
      },
    });

    const responseText = response.text;

    if (!responseText) {
      return Response.json(
        { error: 'Gemini returned an empty response.' },
        { status: 500 }
      );
    }

    return Response.json({ text: responseText });
  } catch (err: any) {
    console.error('[Gemini API Error]:', err);
    return Response.json(
      { error: `Gemini Error: ${err.message || 'An unexpected error occurred.'}` },
      { status: 500 }
    );
  }
}
