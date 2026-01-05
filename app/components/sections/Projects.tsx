'use client';

import { useState } from 'react';
import { Terminal, FileText, Activity, Grid3x3, List } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { Project } from '../../types';
import { ProjectModal } from '../ui/ProjectModal';

export function Projects({ data }: { data: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const sortedProjects = [...data]
    .sort((a, b) => (b.projectScore?.finalScore ?? 0) - (a.projectScore?.finalScore ?? 0));
  
  const visibleProjects = sortedProjects.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProjects.length;

  return (
    <section id="projects" className="scroll-mt-24">
      <SectionTitle title="Projetos (Data-Driven)" icon={Terminal} />
      
      <div className="flex justify-between items-start mb-6 -mt-2">
        <p className="text-sm text-muted-foreground">
          Top projetos sincronizados automaticamente do GitHub. Classificação de saúde gerada via algoritmo baseado em frequência de commits e consistência.
        </p>
        
        <div className="flex gap-1 bg-secondary/50 p-1 rounded-lg border border-border ml-4">
        <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition-all ${
              viewMode === 'list' 
                ? 'bg-background text-primary shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title="Visualização em lista"
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition-all ${
              viewMode === 'grid' 
                ? 'bg-background text-primary shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title="Visualização em grade"
          >
            <Grid3x3 size={16} />
          </button>
        </div>
      </div>
      
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
        : "flex flex-col gap-3"
      }>
        {visibleProjects.map((repo) => (
          <div 
            key={repo.id} 
            onClick={() => setSelectedProject(repo)}
            className={`group relative block bg-card border border-border rounded-xl hover:border-primary/40 hover:shadow-md transition-all cursor-pointer overflow-hidden ${
              viewMode === 'grid' ? 'p-5' : 'p-4 flex items-start gap-4'
            }`}
          >
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/2 transition-colors" />

            <div className={`relative ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className={`flex ${viewMode === 'list' ? 'items-center' : 'justify-between items-start'} mb-2`}>
                <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                  {repo.name}
                  <FileText size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground" />
                </h3>
                
                {repo.projectScore && (
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shadow-sm whitespace-nowrap ${viewMode === 'list' ? 'ml-auto' : ''}
                    ${repo.projectScore.status.includes('Fogo') || repo.projectScore.status.includes('Fire') 
                      ? 'bg-orange-500/10 text-orange-600 border-orange-500/20' 
                      : repo.projectScore.status.includes('Consistente') || repo.projectScore.status.includes('Ativo') 
                      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                      : repo.projectScore.status.includes('Experimental') 
                      ? 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                      : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
                    }`}>
                    {repo.projectScore.status}
                  </span>
                )}
              </div>
              
              <p className={`text-sm text-muted-foreground mb-5 leading-relaxed ${viewMode === 'grid' ? 'line-clamp-2' : 'line-clamp-1'}`}>
                {repo.description || "Clique para ver os detalhes técnicos e documentação."}
              </p>
              
              {repo.projectScore && (
                <div className={viewMode === 'list' ? 'flex items-center gap-6' : 'space-y-1.5'}>
                  {viewMode === 'grid' && (
                    <div className="flex justify-between items-end text-xs">
                      <span className="font-medium text-muted-foreground flex items-center gap-1">
                        <Activity size={12} /> Score
                      </span>
                      <span className="font-mono font-bold text-foreground">
                        {repo.projectScore.finalScore.toFixed(0)}<span className="text-muted-foreground/60">/100</span>
                      </span>
                    </div>
                  )}
                  
                  <div className={viewMode === 'list' ? 'flex-1' : 'h-2 w-full'}>
                    {viewMode === 'list' && (
                      <div className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                        <Activity size={12} /> Score: <span className="font-mono font-bold text-foreground">{repo.projectScore.finalScore.toFixed(0)}</span>
                      </div>
                    )}
                    <div className="h-2 w-full bg-secondary/80 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out 
                          ${repo.projectScore.finalScore > 80 ? 'bg-linear-to-r from-orange-500 to-red-500' : 
                            repo.projectScore.finalScore > 50 ? 'bg-linear-to-r from-emerald-500 to-teal-500' : 
                            'bg-zinc-500'}`} 
                        style={{ width: `${repo.projectScore.finalScore}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className={`flex ${viewMode === 'list' ? 'gap-4' : 'justify-between'} text-[10px] text-muted-foreground ${viewMode === 'grid' ? 'pt-1 opacity-0 group-hover:opacity-100 transition-opacity' : ''}`}>
                    <span>Atividade: {repo.projectScore.activityScore.toFixed(0)}%</span>
                    <span>Consistência: {repo.projectScore.consistencyScore.toFixed(0)}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisibleCount(prev => prev + 3)}
            className="cursor-pointer px-4 py-2 text-primary font-medium rounded-lg border border-primary/20 hover:bg-primary/20 transition"
          >
            Ver mais projetos...
          </button>
        </div>
      )}

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}