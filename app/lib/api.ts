import { Project, Stats } from "../types";

export async function getPortfolioData() {
  const baseUrl = process.env.URL || 'http://localhost:3000';

  try {
    const [statsRes, projectsRes] = await Promise.all([
      fetch(`${baseUrl}/api/stats`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/api/projects`, { next: { revalidate: 60 } }),
    ]);

    return {
      stats: (await statsRes.json()) as Stats,
      projects: (await projectsRes.json()) as Project[],
    };
  } catch (e) {
    return {
      stats: { totalProjects: 0, totalCommits: 0, totalStars: 0, mainLanguage: 'Offline' },
      projects: []
    };
  }
}