import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { buildPortfolioContext } from '@/lib/ai-context';

const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 5;

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

function checkRateLimit(ip: string) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count += 1;
  return true;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now - data.lastReset > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(ip);
    }
  }
}, 10 * 60 * 1000);

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    
    const isAllowed = checkRateLimit(ip);

    if (!isAllowed) {
      return new Response(JSON.stringify({ 
        error: "Muitas requisições. Por favor, aguarde 1 minuto." 
      }), { 
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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

    const stream = OpenAIStream(response as any);
    return new StreamingTextResponse(stream);

  } catch (error: any) {
    console.error("🔴 ERRO API CHAT:", error);
    return new Response(JSON.stringify({ error: 'Erro ao processar mensagem.' }), { 
      status: 500 
    });
  }
}