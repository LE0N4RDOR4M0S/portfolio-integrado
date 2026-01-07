export function SkillBadge({ name }: { name: string }) {
  return (
    <span className="inline-block px-4 py-2 bg-muted text-foreground text-sm font-medium rounded-lg border border-border hover:bg-muted/60 transition-colors">
      {name}
    </span>
  );
}