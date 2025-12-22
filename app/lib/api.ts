import { Project, Stats } from "../types";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPortfolioData() {
  try {
    const projectsRaw = await prisma.repository.findMany({
      where: { isPrivate: false },
      include: { projectScore: true, technicalFacts: true },
      orderBy: { projectScore: { finalScore: 'desc' } },
    });

    const projects: Project[] = projectsRaw.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      url: p.url,
      language: p.language || 'N/A',
      stars: p.stars || 0,
      updatedAt: p.updatedAt?.toISOString() || p.createdAt.toISOString(),
      projectScore: p.projectScore
        ? {
            finalScore: p.projectScore.finalScore,
            status: p.projectScore.status,
            activityScore: p.projectScore.activityScore,
            consistencyScore: p.projectScore.consistencyScore,
          }
        : null,
      readme: p.readme || null,
      topics: p.topics || [],
    }));

    const now = new Date();
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(now.getDate() - 90);

    const totalProjects = await prisma.repository.count({
      where: { isArchived: false, isPrivate: false },
    });

    const commitsAggregation = await prisma.commitStats.aggregate({
      _sum: { commitsCount: true },
      where: { date: { gte: ninetyDaysAgo } },
    });
    const totalCommits = commitsAggregation._sum.commitsCount || 0;

    const starsAggregation = await prisma.repository.aggregate({
      _sum: { stars: true },
      where: { isArchived: false, isPrivate: false },
    });
    const totalStars = starsAggregation._sum.stars || 0;

    const languagesGroup = await prisma.repository.groupBy({
      by: ['language'],
      _count: { language: true },
      where: {
        language: { not: null },
        isArchived: false,
        isPrivate: false,
      },
      orderBy: { _count: { language: 'desc' } },
      take: 5,
    });

    const mainLanguage = languagesGroup[0]?.language || 'N/A';

    const stats: Stats = {
      totalProjects,
      totalCommits,
      totalStars,
      mainLanguage,
    };

    return { stats, projects };
  } catch (e) {
      console.error("❌ ERRO CRÍTICO AO BUSCAR DADOS DO PORTFÓLIO:");
      console.error(e);
    return {
      stats: { totalProjects: 0, totalCommits: 0, totalStars: 0, mainLanguage: 'Offline' },
      projects: [] as Project[],
    };
  }
}