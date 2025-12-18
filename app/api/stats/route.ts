import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const now = new Date();
  
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(now.getDate() - 90);

  const totalProjects = await prisma.repository.count({
    where: { isArchived: false, isPrivate: false },
  });

  const commitsAggregation = await prisma.commitStats.aggregate({
    _sum: { commitsCount: true },
    where: { date: { gte: ninetyDaysAgo } }
  });
  const totalCommits = commitsAggregation._sum.commitsCount || 0;

  const starsAggregation = await prisma.repository.aggregate({
    _sum: { stars: true },
  });
  const totalStars = starsAggregation._sum.stars || 0;

  const languagesGroup = await prisma.repository.groupBy({
    by: ['language'],
    _count: { language: true },
    where: { 
      language: { not: null },
      isArchived: false,
      isPrivate: false
    },
    orderBy: { _count: { language: 'desc' } },
    take: 5,
  });

  const languageChartData = languagesGroup.map(item => ({
    name: item.language,
    value: item._count.language,
    fill: '#8884d8', 
  }));

  const mainLanguage = languageChartData[0]?.name || 'N/A';

  const activityRaw = await prisma.commitStats.groupBy({
    by: ['date'],
    _sum: { commitsCount: true },
    where: { date: { gte: ninetyDaysAgo } },
    orderBy: { date: 'asc' },
  });

  const activityMap = new Map<string, number>();
  activityRaw.forEach(item => {
    const dateKey = item.date.toISOString().split('T')[0];
    activityMap.set(dateKey, item._sum.commitsCount || 0);
  });

  const activityChartData = [];
  for (let i = 89; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    
    const dateKey = d.toISOString().split('T')[0];
    const label = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    
    activityChartData.push({
      date: label,
      commits: activityMap.get(dateKey) || 0,
      fullDate: dateKey
    });
  }

  const scoresAggregation = await prisma.projectScore.aggregate({
    _avg: {
      activityScore: true,
      consistencyScore: true,
      finalScore: true,
    }
  });

  const radarData = [
    { subject: 'Atividade', A: Math.round(scoresAggregation._avg.activityScore || 0), fullMark: 100 },
    { subject: 'Consistência', A: Math.round(scoresAggregation._avg.consistencyScore || 0), fullMark: 100 },
    { subject: 'Qualidade', A: Math.round(scoresAggregation._avg.finalScore || 0), fullMark: 100 },
    { subject: 'Engajamento', A: Math.min(100, totalStars * 10), fullMark: 100 },
    { subject: 'Volume', A: Math.min(100, (totalProjects / 8) * 100), fullMark: 100 },
  ];

  return NextResponse.json({
    totalProjects,
    totalCommits,
    totalStars,
    mainLanguage,
    charts: {
      languages: languageChartData,
      activity: activityChartData,
      radar: radarData
    }
  }, {
    headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate' }
  });
}