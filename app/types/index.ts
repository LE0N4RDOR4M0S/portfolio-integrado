export type ProjectScore = {
  finalScore: number;
  status: string;
  activityScore: number;
  consistencyScore: number;
};

export type Project = {
  id: string;
  name: string;
  description: string | null;
  url: string;
  language: string;
  stars: number;
  updatedAt: string;
  projectScore: ProjectScore | null;
  readme: string | null;
};

// Adicione isso ao final de types/index.ts

export type ChartData = {
  languages: { name: string; value: number }[];
  activity: { date: string; commits: number }[];
  radar: { subject: string; A: number; fullMark: number }[];
};

// Atualize o tipo Stats existente
export type Stats = {
  totalProjects: number;
  totalCommits: number;
  totalStars: number;
  mainLanguage: string;
  charts?: ChartData; // <--- Novo campo opcional
};