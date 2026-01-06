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
      
      <div className="flex justify-between items-start mb-8 -mt-2">
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl">
          Top projetos sincronizados automaticamente do GitHub. Classificação gerada via algoritmo baseado em frequência de commits.
        </p>
        
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 ml-4">
        <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'list' 
                ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' 
                : 'text-slate-600 dark:text-slate-400'
            }`}
            title="Visualização em lista"
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'grid' 
                ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' 
                : 'text-slate-600 dark:text-slate-400'
            }`}
            title="Visualização em grade"
          >
            <Grid3x3 size={16} />
          </button>
        </div>
      </div>
      
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" 
        : "flex flex-col gap-4"
      }>
        {visibleProjects.map((repo) => (
          <div 
            key={repo.id} 
            onClick={() => setSelectedProject(repo)}
            className={`relative block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md transition-shadow cursor-pointer ${
              viewMode === 'grid' ? 'p-5' : 'p-4 flex items-start gap-4'
            }`}
          >

            <div className={`relative ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className={`flex ${viewMode === 'list' ? 'items-center' : 'justify-between items-start'} mb-3`}>
                <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
                  {repo.name}
                  <FileText size={16} className="text-slate-400" />
                </h3>
                
                {repo.projectScore && (
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded border whitespace-nowrap ${viewMode === 'list' ? 'ml-auto' : ''}
                    ${repo.projectScore.status.includes('Fogo') || repo.projectScore.status.includes('Fire') 
                      ? 'bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-700/50' 
                      : repo.projectScore.status.includes('Consistente') || repo.projectScore.status.includes('Ativo') 
                      ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700/50' 
                      : repo.projectScore.status.includes('Experimental') 
                      ? 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700/50'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600'
                    }`}>
                    {repo.projectScore.status}
                  </span>
                )}
              </div>
              
              <p className={`text-sm text-slate-600 dark:text-slate-400 mb-4 ${viewMode === 'grid' ? 'line-clamp-2' : 'line-clamp-1'}`}>
                {repo.description || "Clique para ver os detalhes."}
              </p>
              
              {repo.projectScore && (
                <div className={viewMode === 'list' ? 'flex items-center gap-6' : 'space-y-2'}>
                  {viewMode === 'grid' && (
                    <div className="flex justify-between items-end text-xs">
                      <span className="font-semibold text-slate-600 dark:text-slate-400">Score</span>
                      <span className="font-bold text-foreground text-lg">{repo.projectScore.finalScore.toFixed(0)}</span>
                    </div>
                  )}
                  
                  <div className={viewMode === 'list' ? 'flex-1' : 'h-2 w-full'}>
                    {viewMode === 'list' && (
                      <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                        Score: <span className="font-bold text-foreground">{repo.projectScore.finalScore.toFixed(0)}</span>
                      </div>
                    )}
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ease-out 
                          ${repo.projectScore.finalScore > 80 ? 'bg-orange-500' : 
                            repo.projectScore.finalScore > 50 ? 'bg-emerald-500' : 
                            'bg-primary'}`} 
                        style={{ width: `${repo.projectScore.finalScore}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className={`flex ${viewMode === 'list' ? 'gap-6' : 'justify-between'} text-xs text-slate-600 dark:text-slate-400 ${viewMode === 'grid' ? 'pt-1' : ''}`}>
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
            className="px-6 py-2.5 text-primary font-semibold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Ver mais projetos
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