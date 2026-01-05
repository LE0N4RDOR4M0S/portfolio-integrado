import { PrismaClient } from '@prisma/client';
import { Octokit } from '@octokit/rest';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const octokit = new Octokit({ 
  auth: process.env.GITHUB_TOKEN,
  log: {
    debug: () => {},
    info: () => {},
    warn: console.warn,
    error: console.error
  }
});

async function main() {
  console.log("🚀 [Sync-Commits] Iniciando busca de commits...");

  const { data: user } = await octokit.rest.users.getAuthenticated();
  console.log(`👤 Usuário: ${user.login}`);

  const repos = await prisma.repository.findMany({
    where: { isPrivate: false }
  });

  console.log(`📦 Processando commits de ${repos.length} repositórios...`);

  let totalCommitsSynced = 0;

  for (const repo of repos) {
    try {
      const { data: commits } = await octokit.rest.repos.listCommits({
        owner: user.login,
        repo: repo.name,
        per_page: 100,
      });

      if (commits.length === 0) {
        continue;
      }

      const commitsByDate: Record<string, number> = {};

      for (const commit of commits) {
        const dateStr = commit.commit.author?.date?.split('T')[0]; 
        if (dateStr) {
          commitsByDate[dateStr] = (commitsByDate[dateStr] || 0) + 1;
        }
      }

      const promises = Object.entries(commitsByDate).map(async ([date, count]) => {
        return prisma.commitStats.upsert({
          where: {
            repositoryId_date: {
              repositoryId: repo.id,
              date: new Date(date),
            },
          },
          update: { commitsCount: count },
          create: {
            repositoryId: repo.id,
            date: new Date(date),
            commitsCount: count,
          },
        });
      });

      await Promise.all(promises);
      totalCommitsSynced += commits.length;

    } catch (error) {
      console.error(`Erro ao processar repo ${repo.name}:`, error);
    }
  }

  console.log(`✅ [Sync-Commits] Total de commits processados: ${totalCommitsSynced}`);
}

main()
  .catch((e) => {
    console.error("[Sync-Commits] Erro Fatal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });