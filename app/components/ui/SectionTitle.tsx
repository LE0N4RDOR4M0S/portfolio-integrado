import { LucideIcon } from 'lucide-react';

interface SectionTitleProps {
  title: string;
  icon: LucideIcon;
  id?: string;
}

export function SectionTitle({ title, icon: Icon, id }: SectionTitleProps) {
  return (
    <div id={id} className="scroll-mt-24">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground mb-6 mt-16 border-b border-border pb-2">
        <Icon size={20} className="text-primary" />
        {title}
      </h2>
    </div>
  );
}