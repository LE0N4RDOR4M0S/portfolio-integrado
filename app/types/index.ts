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
  topics: string[];
};


export type ChartData = {
  languages: { name: string; value: number }[];
  activity: { date: string; commits: number }[];
  radar: { subject: string; A: number; fullMark: number }[];
};

export type Stats = {
  totalProjects: number;
  totalCommits: number;
  commitsLast90Days: number;
  totalStars: number;
  mainLanguage: string;
  charts?: ChartData;
};