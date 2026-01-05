import { LucideIcon } from 'lucide-react';

interface SectionTitleProps {
  title: string;
  icon: LucideIcon;
  id?: string;
}

export function SectionTitle({ title, icon: Icon, id }: SectionTitleProps) {
  return (
    <div id={id} className="scroll-mt-24">
      <div className="relative mt-20 mb-8">
        <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/20 rounded-full"></div>
        <h2 className="flex items-center gap-3 text-2xl font-bold text-foreground pb-3 border-b-2 border-border/50">
          <span className="p-2 bg-primary/10 rounded-lg border border-primary/20">
            <Icon size={22} className="text-primary" />
          </span>
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">{title}</span>
        </h2>
      </div>
    </div>
  );
}