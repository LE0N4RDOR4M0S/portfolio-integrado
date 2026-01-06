import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("[Score-Calc] Iniciando cálculo de pontuação...");

  const repos = await prisma.repository.findMany({
    include: {
      commitStats: true,
    },
  });

  console.log(`Analisando ${repos.length} projetos.`);

  let updatedCount = 0;

  for (const repo of repos) {
    try {
      const stats = repo.commitStats;
      const now = new Date();

      let daysSincePush = 999;
      let recencyScore = 0;

      if (repo.pushedAt) {
        const diffTime = Math.abs(now.getTime() - repo.pushedAt.getTime());
        daysSincePush = Math.floor(diffTime / (1000 * 3600 * 24));
        recencyScore = Math.max(0, 100 - daysSincePush); 
      }

      const totalCommits = stats.reduce((acc, curr) => acc + curr.commitsCount, 0);
      const activityScore = Math.min(100, (totalCommits / 50) * 100);

      const uniqueDays = stats.length;
      const consistencyScore = Math.min(100, (uniqueDays / 15) * 100);

      const finalScore = Math.round(
        (recencyScore * 0.5) + (activityScore * 0.3) + (consistencyScore * 0.2)
      );

      let status = 'Experimental';

      if (repo.isArchived) {
        status = 'Arquivado';
      } else if (finalScore >= 80) {
        status = 'Em Fogo';
      } else if (finalScore >= 50) {
        status = 'Consistente';
      } else if (finalScore >= 20) {
        status = 'Em Desenvolvimento';
      } else {
        status = 'Hibernando';
      }

      await prisma.projectScore.upsert({
        where: { repositoryId: repo.id },
        update: {
          activityScore: Math.round(activityScore),
          consistencyScore: Math.round(consistencyScore),
          popularityScore: (repo.stars * 5) + (repo.forks * 10),
          finalScore,
          status,
          lastCalculated: new Date(),
        },
        create: {
          repositoryId: repo.id,
          activityScore: Math.round(activityScore),
          consistencyScore: Math.round(consistencyScore),
          popularityScore: (repo.stars * 5) + (repo.forks * 10),
          finalScore,
          status,
        },
      });
      updatedCount++;

    } catch (error) {
      console.error(`Erro ao calcular score do repo ${repo.name}:`, error);
    }
  }

  console.log(`[Score-Calc] Scores atualizados para ${updatedCount} projetos.`);
}

main()
  .catch((e) => {
    console.error("[Score-Calc] Erro Fatal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });