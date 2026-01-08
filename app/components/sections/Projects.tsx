'use client';

import { useState } from 'react';
import { Terminal, FileText, Grid3x3, List, Info, Zap, Repeat } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { Project } from '../../types';
import { ProjectModal } from '../ui/ProjectModal';
import { ScoreExplanationModal } from '../ui/ScoreExplanationModal';

export function Projects({ data }: { data: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showScoreInfo, setShowScoreInfo] = useState(false);

  const sortedProjects = [...data]
    .sort((a, b) => (b.projectScore?.finalScore ?? 0) - (a.projectScore?.finalScore ?? 0));
  
  const visibleProjects = sortedProjects.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProjects.length;

  return (
    <section id="projects" className="scroll-mt-24 relative">
      <SectionTitle title="Projetos (Data-Driven)" icon={Terminal} />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 -mt-2">
        <p className="text-base text-muted-foreground max-w-2xl">
          Top projetos sincronizados automaticamente do GitHub. Classificação gerada via algoritmo baseado em 4 pilares de engenharia.
        </p>
        <button
            onClick={() => setShowScoreInfo(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors bg-muted/50 px-3 py-2 rounded-lg border border-border hover:border-primary/30 mr-2"
        >
            <Info size={14} />
            <span className="hidden sm:inline">Como funciona?</span>
        </button>
        <div className="flex items-center gap-2 self-end md:self-auto">

            <div className="flex gap-1 bg-muted p-1 rounded-lg border border-border">
                <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded transition-all ${
                    viewMode === 'list' 
                        ? 'bg-background text-foreground shadow-sm' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title="Visualização em lista"
                >
                    <List size={18} />
                </button>
                <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded transition-all ${
                    viewMode === 'grid' 
                        ? 'bg-background text-foreground shadow-sm' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title="Visualização em grade"
                >
                    <Grid3x3 size={18} />
                </button>
            </div>
        </div>
      </div>
      {showScoreInfo && <ScoreExplanationModal onClose={() => setShowScoreInfo(false)} />}

      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" 
        : "flex flex-col gap-4"
      }>
        {visibleProjects.map((repo) => (
          <div 
            key={repo.id} 
            onClick={() => setSelectedProject(repo)}
            className={`relative block bg-card border border-border rounded-lg hover:bg-muted/40 hover:shadow-md transition-all cursor-pointer group ${
              viewMode === 'grid' ? 'p-5' : 'p-4 flex items-start gap-4'
            }`}
          >

            <div className={`relative ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className={`flex ${viewMode === 'list' ? 'items-center' : 'justify-between items-start'} mb-3`}>
                <h3 className="font-semibold text-foreground text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                  {repo.name}
                  {/* Ícone sutil indicando clique */}
                  <FileText size={14} className="text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                
                {repo.projectScore && (
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border whitespace-nowrap ${viewMode === 'list' ? 'ml-auto' : ''}
                    ${repo.projectScore.status.includes('Fogo') || repo.projectScore.status.includes('Fire') 
                      ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20' 
                      : repo.projectScore.status.includes('Consistente') 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                      : repo.projectScore.status.includes('Manutenção') 
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                      : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
                    }`}>
                    {repo.projectScore.status}
                  </span>
                )}
              </div>
              
              <p className={`text-sm text-muted-foreground mb-4 ${viewMode === 'grid' ? 'line-clamp-2' : 'line-clamp-1'}`}>
                {repo.description || "Clique para ver os detalhes deste projeto."}
              </p>
              
              {repo.projectScore && (
                <div className={viewMode === 'list' ? 'flex items-center gap-6' : 'space-y-3'}>
                  {viewMode === 'grid' && (
                    <div className="flex justify-between items-end text-xs">
                      <span className="font-medium text-muted-foreground">Technical Score</span>
                      <span className="font-bold text-foreground text-lg">{repo.projectScore.finalScore.toFixed(0)}</span>
                    </div>
                  )}
                  
                  <div className={viewMode === 'list' ? 'flex-1' : 'h-1.5 w-full'}>
                    {viewMode === 'list' && (
                      <div className="text-xs font-semibold text-muted-foreground mb-1.5 flex justify-between">
                         <span>Technical Score</span>
                         <span className="font-bold text-foreground">{repo.projectScore.finalScore.toFixed(0)}/100</span>
                      </div>
                    )}
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ease-out rounded-full
                          ${repo.projectScore.finalScore >= 80 ? 'bg-orange-500' : 
                            repo.projectScore.finalScore >= 60 ? 'bg-emerald-500' : 
                            repo.projectScore.finalScore >= 40 ? 'bg-blue-500' :
                            'bg-zinc-500'}`} 
                        style={{ width: `${repo.projectScore.finalScore}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className={`flex ${viewMode === 'list' ? 'gap-6' : 'justify-between'} text-[10px] font-medium text-muted-foreground ${viewMode === 'grid' ? 'pt-1' : ''}`}>
                    <span className="flex items-center gap-1">
                        <Zap size={10} /> {repo.projectScore.activityScore.toFixed(0)}% Atv.
                    </span>
                    <span className="flex items-center gap-1">
                        <Repeat size={10} /> {repo.projectScore.consistencyScore.toFixed(0)}% Cons.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount(prev => prev + 3)}
            className="px-6 py-2.5 bg-card hover:bg-muted text-foreground font-medium text-sm rounded-lg border border-border transition-all shadow-sm hover:shadow"
          >
            Carregar mais projetos
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