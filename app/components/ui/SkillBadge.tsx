export function SkillBadge({ name }: { name: string }) {
  return (
    <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-md font-mono hover:bg-primary/5 hover:text-primary hover:border-primary/20 border border-transparent transition-all cursor-default">
      {name}
    </span>
  );
}