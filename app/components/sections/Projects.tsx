'use client';

import { useState } from 'react';
import { Terminal, ArrowUpRight, FileText, Activity } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { Project } from '../../types';
import { ProjectModal } from '../ui/ProjectModal';

export function Projects({ data }: { data: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="scroll-mt-24">
      <SectionTitle title="Projetos (Data-Driven)" icon={Terminal} />
      
      <p className="text-sm text-muted-foreground mb-6 -mt-2">
        Projetos sincronizados automaticamente do GitHub. Classificação de saúde ("Status") gerada via algoritmo baseado em frequência de commits e consistência.
      </p>
      
      <div className="flex flex-col gap-4">
        {data.map((repo) => (
          <div 
            key={repo.id} 
            onClick={() => setSelectedProject(repo)}
            className="group relative block p-5 bg-card border border-border rounded-xl hover:border-primary/40 hover:shadow-md transition-all cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.02] transition-colors" />

            <div className="relative">
              {/* Header do Card */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                  {repo.name}
                  <FileText size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground" />
                </h3>
                
                {repo.projectScore && (
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shadow-sm
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
                  </div>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
                 {repo.description || "Clique para ver os detalhes técnicos e documentação."}
              </p>
              
              {repo.projectScore && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-end text-xs">
                    <span className="font-medium text-muted-foreground flex items-center gap-1">
                      <Activity size={12} /> Score
                    </span>
                    <span className="font-mono font-bold text-foreground">
                      {repo.projectScore.finalScore.toFixed(0)}<span className="text-muted-foreground/60">/100</span>
                    </span>
                  </div>
                  
                  <div className="h-2 w-full bg-secondary/80 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out 
                        ${repo.projectScore.finalScore > 80 ? 'bg-gradient-to-r from-orange-500 to-red-500' : 
                          repo.projectScore.finalScore > 50 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 
                          'bg-zinc-500'}`} 
                      style={{ width: `${repo.projectScore.finalScore}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-[10px] text-muted-foreground pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Atividade: {repo.projectScore.activityScore.toFixed(0)}%</span>
                    <span>Consistência: {repo.projectScore.consistencyScore.toFixed(0)}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

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