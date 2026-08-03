import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Use active Gemini 2.x model identifiers
const MODELS_TO_TRY = [
  'gemini-2.5-flash',
  'gemini-2.0-flash'
];

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return Response.json(
        { error: 'Please provide a valid prompt or spiritual question.' },
        { status: 400 }
      );
    }

    const SYSTEM_PROMPT = `You are the GodDome Faith & Reflection Assistant, a warm, compassionate, and biblically grounded spiritual companion for readers of GodDome (authored by Jeanna’ Mead). Your mission is to provide gentle encouragement, relevant scripture references, and thoughtful reflection points to help individuals find peace and grace. Keep your tone quiet, uplifting, and formatted in clean, readable Markdown with clear headings or bullet points where helpful.`;

    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser Question/Reflection Topic: ${prompt}`;

    let responseText = null;
    let lastError: any = null;

    for (const modelName of MODELS_TO_TRY) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(fullPrompt);
        responseText = result.response.text();
        if (responseText) {
          console.log(`[Gemini API] Successfully generated using model: ${modelName}`);
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`[Gemini API] Model ${modelName} failed: ${err.message}`);
      }
    }

    if (!responseText) {
      return Response.json(
        { error: `Gemini API Error: ${lastError?.message || 'All fallback models failed.'}` },
        { status: 500 }
      );
    }

    return Response.json({ text: responseText });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
