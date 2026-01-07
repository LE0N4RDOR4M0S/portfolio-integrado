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
        <h2 className="flex items-center gap-3 text-3xl font-bold text-foreground pb-3 border-b border-border">
          <span className="p-2 bg-muted rounded-lg border border-border">
            <Icon size={24} className="text-primary" />
          </span>
          <span>{title}</span>
        </h2>
      </div>
    </div>
  );
}