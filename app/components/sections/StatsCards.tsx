import { Stats } from '../../types';

interface StatsCardsProps {
  stats: Stats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      <StatCard 
        value={stats?.totalProjects ?? 0}
        label="Projetos"
      />

      <StatCard 
        value={stats?.commitsLast90Days ?? 0}
        label="Commits (90d)"
      />

      <StatCard 
        value={stats?.mainLanguage ?? 'N/A'}
        label="Especialidade"
        isText
      />
    </div>
  );
}

function StatCard({
  value,
  label,
  isText = false
}: {
  value: number | string;
  label: string;
  isText?: boolean;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:bg-muted/40 transition-colors">
      <div className="text-muted-foreground text-sm font-medium mb-3 uppercase tracking-wide">
        {label}
      </div>
      
      {isText ? (
        <div className="text-4xl font-bold text-primary">
          {value}
        </div>
      ) : (
        <div className="text-5xl font-bold text-foreground">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
      )}
    </div>
  );
}