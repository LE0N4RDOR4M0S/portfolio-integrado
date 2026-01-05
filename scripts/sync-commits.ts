import { PrismaClient } from '@prisma/client';
import { Octokit } from '@octokit/rest';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function main() {
  const repos = await prisma.repository.findMany();

  for (const repo of repos) {
    try {
      const { data: user } = await octokit.rest.users.getAuthenticated();
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

    } catch (error) {}
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });