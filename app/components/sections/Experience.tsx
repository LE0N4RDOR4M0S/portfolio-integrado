import { Briefcase } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24">
      <SectionTitle title="Jornada Profissional" icon={Briefcase} />
      <div className="mt-8 space-y-0">
        <TimelineItem
          year="Jun 2024 - Atual"
          title="Estágio em Desenvolvimento & DevOps"
          place="Controladoria Geral do Estado (CGE-MT)"
          description="Desenvolvimento Full Stack (Spring Boot, Vue.js) e Engenharia de Dados com PySpark"
        />
      </div>
      <div className="mt-8 space-y-0">
        <TimelineItem
          year="Mai 2024 - Atual"
          title="Desenvolvedor e Diretor de Projetos Voluntário"
          place="Infocorp Jr. (Empresa Júnior de TI - UFMT)"
          description="Liderança de projetos de desenvolvimento de software para clientes reais"
        />
      </div>
    </section>
  );
}

function TimelineItem({ year, title, place, description }: any) {
  return (
    <div className="relative pl-8 pb-10 border-l border-border last:pb-0 last:border-0 group">
      <div className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full bg-muted-foreground/30 border border-background group-hover:bg-primary transition-colors" />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1.5">
        <h3 className="font-semibold text-foreground text-lg">{title}</h3>
        <span className="text-xs font-mono text-primary bg-primary/5 px-2 py-1 rounded border border-primary/10">{year}</span>
      </div>
      <div className="text-sm text-foreground/80 font-medium mb-3">{place}</div>
      <p className="text-sm text-muted-foreground leading-relaxed text-balance">{description}</p>
    </div>
  );
}