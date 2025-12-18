'use client';

import { X, Github, ExternalLink, Calendar, Star, GitFork } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Project } from '../../types';
import { useEffect } from 'react';

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
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
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:text-zinc-50
              prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              prose-img:rounded-lg prose-img:border prose-img:border-border"
            >
              <ReactMarkdown>{project.readme}</ReactMarkdown>
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