import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const repos = await prisma.repository.findMany({
    include: {
      commitStats: true,
    },
  });

  for (const repo of repos) {
    const stats = repo.commitStats;
    const now = new Date();
    

    let daysSincePush = 999;
    let recencyScore = 0;

    if (repo.pushedAt) {
      daysSincePush = Math.floor((now.getTime() - repo.pushedAt.getTime()) / (1000 * 3600 * 24));
      recencyScore = Math.max(0, 100 - daysSincePush); 
    }

    const totalCommits = stats.reduce((acc, curr) => acc + curr.commitsCount, 0);
    const activityScore = Math.min(100, (totalCommits / 50) * 100);

    const uniqueDays = stats.length;
    const consistencyScore = Math.min(100, (uniqueDays / 15) * 100);

    const finalScore = (recencyScore * 0.5) + (activityScore * 0.3) + (consistencyScore * 0.2);

    let status = 'Experimental';

    if (repo.isArchived) {
      status = 'Arquivado';
    } else if (finalScore >= 60) {
      status = 'Em Fogo';
    } else if (finalScore >= 30) {
      status = 'Consistente';
    } else if (finalScore >= 15) {
      status = 'Experimental';
    } else {
      status = 'Hibernando';
    }

    await prisma.projectScore.upsert({
      where: { repositoryId: repo.id },
      update: {
        activityScore,
        consistencyScore,
        popularityScore: (repo.stars * 5) + (repo.forks * 10),
        finalScore,
        status,
        lastCalculated: new Date(),
      },
      create: {
        repositoryId: repo.id,
        activityScore,
        consistencyScore,
        popularityScore: (repo.stars * 5) + (repo.forks * 10),
        finalScore,
        status,
      },
    });
  }

}

main()
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });