'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Olá! Sou a IA do portfólio. Analisei os dados do Leonardo (commits, projetos e stack). O que você gostaria de saber?'
      }
    ]
  });

  const suggestions = [
    "Qual a stack favorita de Leonardo?",
    "Resuma sua experiência com Backend",
    "Como foi feito este portfólio?"
  ];

  const handleSuggestionClick = (text: string) => {
    append({
      role: 'user',
      content: text
    });
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">

      {isOpen && (
        <div className="mb-4 w-[90vw] sm:w-[380px] h-[70vh] sm:h-[500px] max-h-[calc(100dvh-120px)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">

          {/* Header */}
            <div className="p-4 flex justify-between items-center bg-primary text-primary-foreground border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-white/10 rounded-lg">
                  <Sparkles size={16} className="text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Leonardo AI Assistant</h3>
                <p className="text-[10px] text-current opacity-75 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"/>
                  Llama-3.1-8B-instant Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-current opacity-70 hover:opacity-100 transition-opacity"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30 scrollbar-thin scrollbar-thumb-border">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-border
                  ${m.role === 'user' ? 'bg-accent/10' : 'bg-accent/20'}`}>
                  {m.role === 'user' ? <User size={14} className="text-accent"/> : <Bot size={14} className="text-accent"/>}
                </div>

                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[85%] shadow-sm overflow-hidden
                  ${m.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-sm'
                    : 'bg-card border border-border text-foreground rounded-tl-sm'}`}>
                  
                  {m.role === 'user' ? (
                    m.content
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                        ul: ({children}) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                        ol: ({children}) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                        li: ({children}) => <li className="pl-1">{children}</li>,
                        a: ({href, children}) => (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline font-medium break-all">
                            className="text-accent hover:underline font-medium break-all"
                            {children}
                          </a>
                        ),
                        strong: ({children}) => <span className="font-bold text-foreground">{children}</span>,
                        code: ({children, className, ...props}) => {
                          const isInline = !className?.includes('language-');
                          return isInline ? (
                            <code className="bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono border border-border/50 text-emerald-600 dark:text-emerald-400">
                              {children}
                            </code>
                          ) : (
                            <div className="my-2 rounded-lg overflow-hidden border border-border/50 bg-zinc-950">
                              <div className="bg-zinc-900 px-3 py-1 border-b border-zinc-800 text-[10px] text-zinc-400">
                                Code
                              </div>
                              <code className="block p-3 text-xs font-mono text-zinc-300 overflow-x-auto">
                                {children}
                              </code>
                            </div>
                          )
                        }
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  )}
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

          {messages.length === 1 && !isLoading && (
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none fade-in slide-in-from-bottom-2 duration-500">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="whitespace-nowrap flex items-center gap-1.5 text-xs bg-muted border border-border hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all rounded-full px-3 py-1.5 text-muted-foreground"
                >
                  {suggestion}
                  <ArrowRight size={10} className="opacity-50" />
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-3 bg-background border-t border-border flex gap-2">
            <input
              className="flex-1 bg-muted/50 border border-border hover:border-border focus:border-primary rounded-xl px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground"
              value={input}
              onChange={handleInputChange}
              placeholder="Pergunte sobre meus projetos..."
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-primary text-primary-foreground p-2.5 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center w-10 h-10"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center border border-border"
      >
        <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping opacity-0 group-hover:opacity-100 duration-1000" />
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}

        {!isOpen && (
          <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
          </span>
        )}
      </button>
    </div>
  );
}