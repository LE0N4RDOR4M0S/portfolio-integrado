import { PrismaClient } from '@prisma/client';
import { Octokit } from '@octokit/rest';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function main() {
  console.log("🚀 [Sync-GitHub] Iniciando sincronização...");

  const { data: user } = await octokit.rest.users.getAuthenticated();
  console.log(`👤 Usuário autenticado: ${user.login}`);

  const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
    sort: 'updated',
    direction: 'desc',
    per_page: 100,
    type: 'owner',
  });

  console.log(`📦 Encontrados ${repos.length} repositórios.`);

  let processedCount = 0;

  for (const repo of repos) {
    if (repo.private) {
        continue;
    }

    let readmeContent = null;
    try {
      const { data: readme } = await octokit.rest.repos.getReadme({
        owner: user.login,
        repo: repo.name,
        mediaType: {
          format: "raw",
        },
      });
      readmeContent = String(readme);
    } catch (e) {
    }

    await prisma.repository.upsert({
      where: { githubId: repo.id },
      update: {
        name: repo.name,
        description: repo.description,
        readme: readmeContent,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        isArchived: repo.archived,
        isPrivate: repo.private,
        pushedAt: repo.pushed_at ? new Date(repo.pushed_at) : null,
        updatedAt: new Date(),
      },
      create: {
        githubId: repo.id,
        name: repo.name,
        description: repo.description,
        readme: readmeContent,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        isArchived: repo.archived,
        isPrivate: repo.private,
        pushedAt: repo.pushed_at ? new Date(repo.pushed_at) : null,
      },
    });
    processedCount++;
  }
  
  console.log(`✅ [Sync-GitHub] Processados ${processedCount} repositórios com sucesso.`);
}

main()
  .catch((e) => {
    console.error("❌ [Sync-GitHub] Erro fatal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });