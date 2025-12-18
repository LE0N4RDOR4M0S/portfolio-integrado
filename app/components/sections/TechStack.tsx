import { Cpu } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { SkillBadge } from '../ui/SkillBadge';

export function TechStack() {
  return (
    <section id="skills" className="scroll-mt-24">
      <SectionTitle title="Arsenal Técnico" icon={Cpu} />
      
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-3">
            Backend & Engenharia de Dados
          </span>
          <div className="flex flex-wrap gap-2">
            <SkillBadge name="Java Spring Boot" />
            <SkillBadge name="Python FastAPI" />
            <SkillBadge name="Node.js (Express)" />
            <SkillBadge name="PySpark (ETL)" />
            <SkillBadge name="Oracle SQL" />
            <SkillBadge name="Trino / Presto" />
            <SkillBadge name="PostgreSQL" />
            <SkillBadge name="Docker & CI/CD" />
          </div>
        </div>

        <div>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-3">
            Frontend & Inteligência Artificial
          </span>
          <div className="flex flex-wrap gap-2">
            <SkillBadge name="Vue.js" />
            <SkillBadge name="Next.js" />
            <SkillBadge name="React" />
            <SkillBadge name="Tailwind CSS" />
            <SkillBadge name="LLM Fine-tuning" />
            <SkillBadge name="Hugging Face" />
            <SkillBadge name="PyTorch" />
            <SkillBadge name="LoRA / PEFT" />
          </div>
        </div>
      </div>
    </section>
  );
}