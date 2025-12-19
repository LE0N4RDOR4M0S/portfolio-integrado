import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { buildPortfolioContext } from '@/lib/ai-context';

// Configuração do cliente Groq
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemContext = await buildPortfolioContext();

    const response = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant', 
      stream: true,
      messages: [
        { role: 'system', content: systemContext },
        ...messages
      ],
      temperature: 0.6,
      max_tokens: 1024,
      top_p: 0.9,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);

  } catch (error: any) {
    console.error("🔴 ERRO API CHAT:", error);
    return new Response(JSON.stringify({ error: 'Erro ao processar mensagem.' }), { 
      status: 500 
    });
  }
}