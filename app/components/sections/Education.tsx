import { BookOpen } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';

export function Education() {
  return (
    <section id="education">
      <SectionTitle title="Formação Acadêmica" icon={BookOpen} />
      
      <div className="grid gap-4">
        <div className="group p-5 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-foreground">Bacharelado em Ciência da Computação</h3>
              <p className="text-sm text-muted-foreground mt-1">Universidade Federal de Mato Grosso (UFMT)</p>
            </div>
            <span className="text-xs font-mono bg-secondary text-secondary-foreground px-2 py-1 rounded border border-border">
              6º Semestre
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Foco em Engenharia de Software, Estruturas de Dados Avançadas e Inteligência Artificial.
            Membro ativo da Infocorp Jr.
          </p>
        </div>
        
        <div className="p-5 bg-card border border-border rounded-xl opacity-80 hover:opacity-100 transition-opacity">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-foreground">Programador de Sistemas Java</h3>
              <p className="text-sm text-muted-foreground mt-1">Fic-Dev / Seciteci MT</p>
            </div>
            <span className="text-xs font-mono text-muted-foreground">Concluído 2023</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Curso intensivo de especialização. Classificação no ranking final garantiu ingresso direto no estágio da CGE-MT.
          </p>
        </div>
      </div>
    </section>
  );
}