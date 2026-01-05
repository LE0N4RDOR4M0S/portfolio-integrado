import { Stats } from '../../types';

interface StatsCardsProps {
  stats: Stats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-16 p-5 bg-card border border-border rounded-xl shadow-sm">
      <div className="text-center">
        <div className="text-3xl font-bold text-foreground tracking-tight">
          {stats.totalProjects}
        </div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-1">
          Projetos
        </div>
      </div>

      <div className="text-center border-l border-border">
        <div className="text-3xl font-bold text-foreground tracking-tight">
          {stats.totalCommits}
        </div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-1">
          Commits (90d)
        </div>
      </div>

      <div className="text-center border-l border-border">
        <div className="text-3xl font-bold text-foreground tracking-tight text-blue-600 dark:text-blue-400">
          {stats.mainLanguage}
        </div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-1">
          Especialidade
        </div>
      </div>
    </div>
  );
}