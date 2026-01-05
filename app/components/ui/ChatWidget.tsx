'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Olá! Sou a IA do portfólio. Analisei os dados do Leonardo (commits, projetos e stack). O que você gostaria de saber?'
      }
    ]
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">

      {isOpen && (
        <div className="mb-4 w-[90vw] sm:w-[380px] h-[500px] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">

          <div className="p-4 bg-zinc-900 text-white flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-white/10 rounded-lg">
                <Sparkles size={16} className="text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Leonardo AI Assistant</h3>
                <p className="text-[10px] text-zinc-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/>
                  Llama-3.1-8B-instant Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/50 scrollbar-thin scrollbar-thumb-border">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-border
                  ${m.role === 'user' ? 'bg-zinc-100 dark:bg-zinc-800' : 'bg-emerald-100 dark:bg-emerald-900/30'}`}>
                  {m.role === 'user' ? <User size={14} className="text-zinc-600 dark:text-zinc-300"/> : <Bot size={14} className="text-emerald-600 dark:text-emerald-400"/>}
                </div>

                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[85%] shadow-sm
                  ${m.role === 'user'
                    ? 'bg-zinc-900 text-white rounded-tr-sm'
                    : 'bg-card border border-border text-foreground rounded-tl-sm'}`}>
                  {m.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 border border-border">
                  <Bot size={14} className="text-emerald-600 dark:text-emerald-400"/>
                </div>
                <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 bg-background border-t border-border flex gap-2">
            <input
              className="flex-1 bg-muted/50 border border-border hover:border-zinc-400 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground"
              value={input}
              onChange={handleInputChange}
              placeholder="Pergunte sobre meus projetos..."
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-zinc-900 text-white p-2.5 rounded-xl hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center w-10 h-10"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative h-14 w-14 rounded-full bg-zinc-900 text-white shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center border border-zinc-700/50"
      >
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-0 group-hover:opacity-100 duration-1000" />
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        
        {!isOpen && (
          <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
          </span>
        )}
      </button>
    </div>
  );
}