'use client';

import { X, Github, ExternalLink, Calendar, Star, GitFork } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Link from 'next/link';
import { Project } from '../../types';
import { useEffect, useState } from 'react';

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(darkModeQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    darkModeQuery.addEventListener('change', handleChange);
    
    return () => darkModeQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    if (isOpen) document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="relative bg-background w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl border border-border flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="flex items-start justify-between p-5 border-b border-border bg-muted/30">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex flex-wrap items-center gap-3">
              {project.name}
              {project.language && (
                <span className="text-xs font-normal font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  {project.language}
                </span>
              )}
            </h2>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(project.updatedAt).toLocaleDateString()}</span>
              <span className="flex items-center gap-1"><Star size={12}/> {project.stars} stars</span>
            </div>
          </div>
          
          <button 
            onClick={onClose} 
            className="p-2 -mr-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          {project.readme ? (
            <div className="prose dark:prose-invert prose-zinc max-w-none 
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:border-b prose-headings:border-border/50 prose-headings:pb-2
              prose-h1:text-3xl prose-h1:mt-0 prose-h1:mb-6
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:border-0
              prose-h4:text-lg prose-h4:mt-4 prose-h4:border-0
              prose-p:leading-7 prose-p:my-4
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
              prose-strong:text-foreground prose-strong:font-semibold
              prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-muted/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0
              prose-blockquote:border-l-4 prose-blockquote:border-primary/40 prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic
              prose-ul:my-4 prose-ol:my-4 prose-li:my-1
              prose-table:border-collapse prose-table:w-full prose-table:my-6
              prose-thead:bg-muted
              prose-th:border prose-th:border-border prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold
              prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2
              prose-tr:border-b prose-tr:border-border
              prose-img:rounded-lg prose-img:border prose-img:border-border prose-img:shadow-md prose-img:my-6 prose-img:mx-auto
              prose-hr:border-border prose-hr:my-8"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    const language = match ? match[1] : '';
                    
                    return !inline && language ? (
                      <div className="my-4 rounded-lg overflow-hidden border border-border shadow-sm">
                        <div className="bg-muted/80 px-4 py-2 border-b border-border flex items-center justify-between">
                          <span className="text-xs font-mono text-muted-foreground uppercase">{language}</span>
                        </div>
                        <SyntaxHighlighter
                          style={isDark ? oneDark : oneLight}
                          language={language}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            borderRadius: 0,
                            background: isDark ? '#1e1e1e' : '#fafafa',
                            fontSize: '0.875rem',
                            padding: '1rem',
                          }}
                          codeTagProps={{
                            style: {
                              fontFamily: 'var(--font-mono), ui-monospace, monospace',
                            }
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  a({ node, children, href, ...props }: any) {
                    const isExternal = href?.startsWith('http');
                    return (
                      <a
                        href={href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        {...props}
                      >
                        {children}
                        {isExternal && <ExternalLink className="inline ml-1 w-3 h-3" />}
                      </a>
                    );
                  },
                  img({ node, src, alt, ...props }: any) {
                    return (
                      <img
                        src={src}
                        alt={alt || ''}
                        loading="lazy"
                        {...props}
                      />
                    );
                  },
                  table({ node, children, ...props }: any) {
                    return (
                      <div className="overflow-x-auto my-6">
                        <table {...props}>{children}</table>
                      </div>
                    );
                  },
                  input({ node, type, checked, ...props }: any) {
                    if (type === 'checkbox') {
                      return (
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled
                          className="mr-2 accent-primary"
                          {...props}
                        />
                      );
                    }
                    return <input type={type} {...props} />;
                  },
                }}
              >
                {project.readme}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground text-center">
              <GitFork size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-medium">Readme não disponível</p>
              <p className="text-sm">Este projeto não possui documentação detalhada no repositório.</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-3 z-10">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
          >
            Fechar
          </button>
          <Link 
            href={project.url} 
            target="_blank"
            className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 transition-opacity shadow-sm"
          >
            <Github size={18} />
            Ver código fonte
          </Link>
        </div>
      </div>
    </div>
  );
}