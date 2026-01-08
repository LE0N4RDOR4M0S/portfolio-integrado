'use client';

import { useEffect, useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { SectionTitle } from '../ui/SectionTitle';
import { BarChart3, Info, X, Activity, Code2, Radar as RadarIcon } from 'lucide-react';
import { Stats } from '../../types';
import { useTheme } from 'next-themes';

const COLORS = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#9333ea']; 

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-lg shadow-xl text-xs">
        <p className="font-bold mb-1">{label}</p>
        <p className="text-primary">{payload[0].name || 'Valor'}: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

function MetricsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border border-border w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-center p-4 border-b border-border bg-muted/20">
          <h3 className="font-semibold flex items-center gap-2">
            <Info size={18} className="text-blue-500" />
            Como as métricas são calculadas?
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-full transition-colors">
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>
        <div className="p-6 space-y-6 text-sm overflow-y-auto max-h-[70vh]">
          <div className="flex gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg h-fit shrink-0 border border-blue-500/20">
              <Activity size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1 text-sm">Fluxo de Trabalho</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cadência de commits nos <strong>últimos 90 dias</strong>. Dias sem atividade são preservados.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg h-fit shrink-0 border border-green-500/20">
              <Code2 size={16} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1 text-sm">Especialização Tecnológica</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Distribuição de linguagens em repositórios públicos não arquivados.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg h-fit shrink-0 border border-orange-500/20">
              <RadarIcon size={16} className="text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-2 text-sm">Perfil de Engenharia (Radar)</h4>
              
              <div className="grid grid-cols-1 gap-2">
                  <p className="text-muted-foreground text-xs leading-tight">
                    <strong className="text-foreground">Velocidade:</strong> Ritmo atual baseado nos últimos 30 dias.
                  </p>
                  <p className="text-muted-foreground text-xs leading-tight">
                    <strong className="text-foreground">Volume:</strong> Soma total de commits desde o início da carreira.
                  </p>
                  <p className="text-muted-foreground text-xs leading-tight">
                    <strong className="text-foreground">Atividade:</strong> Frequência média de commits.<br/>
                  </p>
                  <p className="text-muted-foreground text-xs leading-tight">
                    <strong className="text-foreground">Consistência:</strong> Regularidade sem intervalos longos.
                  </p>
                  <p className="text-muted-foreground text-xs leading-tight">
                    <strong className="text-foreground">Qualidade:</strong> Saúde dos projetos. Avalia READMEs, descrições claras e boas práticas de versionamento e documentação.
                  </p>
              </div>
            </div>
          </div>
      </div>
        <div className="p-4 bg-muted/20 border-t border-border flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-foreground text-background text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Entendi
          </button>
        </div>

      </div>
      
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}

export function AnalyticsDashboard({ stats }: { stats: Stats }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!stats?.charts) return null;

  const activityData = stats.charts.activity || [];
  const languagesData = stats.charts.languages || [];
  const radarData = stats.charts.radar || [];

  const isDark = mounted && theme === 'dark';
  const gridStroke = isDark ? '#3f3f46' : '#e2e8f0';
  const textColor = isDark ? '#a1a1aa' : '#64748b';

  if (activityData.length === 0 && languagesData.length === 0 && radarData.length === 0) {
    return null;
  }

  return (
    <section id='analyticsdashboard' className="mb-16 relative">
      
      <div>
        <SectionTitle title="Análise de métricas" icon={BarChart3} />
        <button
          onClick={() => setShowInfo(true)}
          className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors bg-muted/30 px-3 py-1.5 rounded-full border border-border hover:border-primary/30"
        >
          <Info size={14} />
          <span>Entenda os dados</span>
        </button>
      </div>

      {showInfo && <MetricsModal onClose={() => setShowInfo(false)} />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        
        {activityData.length > 0 && (
          <div className="md:col-span-2 bg-card border border-border rounded-xl p-6 h-[300px]">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">Fluxo de Trabalho (90 Dias)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} opacity={0.3} />
                <XAxis 
                  dataKey="date" 
                  tick={{fontSize: 10, fill: textColor}}
                  axisLine={false} 
                  tickLine={false} 
                  minTickGap={30}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="commits" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorCommits)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {languagesData.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-6 h-[300px] flex flex-col">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Stacks Dominantes</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={languagesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {languagesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {languagesData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {radarData.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-6 h-[300px] w-full">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Perfil de Engenharia</h3>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke={gridStroke} opacity={0.3} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: textColor, fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Performance"
                  dataKey="A"
                  stroke="#16a34a"
                  strokeWidth={2}
                  fill="#16a34a"
                  fillOpacity={0.3}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

      </div>
    </section>
  );
}