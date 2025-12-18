'use client';

import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { SectionTitle } from '../ui/SectionTitle';
import { BarChart3 } from 'lucide-react';
import { Stats } from '@/types';

const COLORS = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#9333ea']; 
// (Blue, Green, Amber, Red, Purple)

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

export function AnalyticsDashboard({ stats }: { stats: Stats }) {
  if (!stats.charts) return null;

  return (
    <section id='analyticsdashboard' className="mb-16">
      <SectionTitle title="Análise de métricas" icon={BarChart3} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        
        {/* GRÁFICO 1: Timeline de Atividade (Largo) */}
        <div className="md:col-span-2 bg-card border border-border rounded-xl p-6 h-[300px]">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">Fluxo de Trabalho (90 Dias)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.charts.activity}>
              <defs>
                <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                tick={{fontSize: 10, fill: '#71717a'}} 
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

        {/* GRÁFICO 2: Distribuição de Linguagens (Pizza) */}
        <div className="bg-card border border-border rounded-xl p-6 h-[300px] flex flex-col">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Stacks Dominantes</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.charts.languages}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.charts.languages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legenda Customizada */}
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {stats.charts.languages.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        {/* GRÁFICO 3: Radar de Engenharia */}
        <div className="bg-card border border-border rounded-xl p-6 h-[300px]">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Perfil de Engenharia</h3>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={stats.charts.radar}>
              <PolarGrid stroke="#3f3f46" opacity={0.3} />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 10 }} />
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

      </div>
    </section>
  );
}