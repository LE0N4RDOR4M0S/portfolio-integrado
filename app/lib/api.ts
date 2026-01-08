import { Project, Stats, ChartData } from "../types";
import { prisma } from "../lib/prisma";

export async function getPortfolioData() {
  try {
    const projectsRaw = await prisma.repository.findMany({
      where: { isPrivate: false, isArchived: false },
      include: { projectScore: true },
      orderBy: { stars: 'desc' },
    });

    const projects: Project[] = projectsRaw.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      url: p.url,
      language: p.language || 'Outros',
      stars: p.stars || 0,
      updatedAt: p.updatedAt?.toISOString() || new Date().toISOString(),
      readme: p.readme,
      topics: p.topics || [],
      projectScore: p.projectScore ? {
        finalScore: p.projectScore.finalScore,
        status: p.projectScore.status,
        activityScore: p.projectScore.activityScore,
        consistencyScore: p.projectScore.consistencyScore
      } : null,
    }));

    const totalProjects = await prisma.repository.count({
      where: { isPrivate: false, isArchived: false }
    });

    const totalStars = await prisma.repository.aggregate({
      _sum: { stars: true },
      where: { isPrivate: false, isArchived: false }
    });

    const commitsAggregation = await prisma.commitStats.aggregate({
      _sum: { commitsCount: true }
    });
    const totalCommits = commitsAggregation._sum.commitsCount || 0;

    const languagesGroup = await prisma.repository.groupBy({
      by: ['language'],
      _count: { language: true },
      where: { language: { not: null }, isPrivate: false, isArchived: false },
      orderBy: { _count: { language: 'desc' } },
      take: 5,
    });

    const chartLanguages = languagesGroup.map(item => ({
      name: item.language || 'Outros',
      value: item._count.language
    }));
    
    const mainLanguage = chartLanguages[0]?.name || 'N/A';

    const daysToLookBack = 90;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToLookBack);

    const activityRaw = await prisma.commitStats.findMany({
      where: { date: { gte: cutoffDate } },
      orderBy: { date: 'asc' }
    });

    const activityMap = new Map<string, number>();
    activityRaw.forEach(item => {
      const dateKey = item.date.toISOString().split('T')[0];
      activityMap.set(dateKey, item.commitsCount);
    });

    const chartActivity = [];
    for (let i = daysToLookBack - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      
      const dateKey = d.toISOString().split('T')[0];
      const displayDate = dateKey.slice(5);
      
      chartActivity.push({
        date: displayDate,
        commits: activityMap.get(dateKey) || 0
      });
    }

    const scores = projectsRaw.filter(p => p.projectScore).map(p => p.projectScore!);

    const cutoff30Days = new Date();
    cutoff30Days.setDate(cutoff30Days.getDate() - 30);

    const recentCommits = activityRaw
      .filter(item => item.date >= cutoff30Days)
      .reduce((acc, curr) => acc + curr.commitsCount, 0);

    const avgActivity = scores.length ? Math.round(scores.reduce((a, c) => a + c.activityScore, 0) / scores.length) : 0;
    const avgConsistency = scores.length ? Math.round(scores.reduce((a, c) => a + c.consistencyScore, 0) / scores.length) : 0;
    const velocityScore = Math.min(recentCommits * 2, 100);

    const chartRadar = [
        { subject: 'Atividade', A: avgActivity, fullMark: 100 },
        { subject: 'Consistência', A: avgConsistency, fullMark: 100 },
        { subject: 'Qualidade', A: avgActivity > 0 ? 80 : 0, fullMark: 100 },
        { subject: 'Volume', A: Math.min(totalCommits / 20, 100), fullMark: 100 },
        { subject: 'Velocidade', A: velocityScore, fullMark: 100 },
    ];

    const charts: ChartData = {
      languages: chartLanguages,
      activity: chartActivity,
      radar: chartRadar
    };

    const last90DaysCommitsAgg = await prisma.commitStats.aggregate({
      _sum: { commitsCount: true },
      where: {
        date: { gte: cutoffDate }
      }
    });

    const commitsLast90Days = last90DaysCommitsAgg._sum.commitsCount || 0;

    const stats: Stats = {
      totalProjects,
      totalCommits,
      commitsLast90Days,
      totalStars: totalStars._sum.stars || 0,
      mainLanguage,
      charts,
    };

    return { stats, projects };

  } catch (e) {
    return {
      stats: {
        totalProjects: 0,
        totalCommits: 0,
        commitsLast90Days: 0,
        totalStars: 0,
        mainLanguage: 'Offline',
        charts: { languages: [], activity: [], radar: [] }
      },
      projects: []
    };
  }
}