import { PrismaClient } from '@prisma/client';
import { STATIC_PROFILE } from '../lib/profile-data';
import { cleanReadme } from './utils';
const prisma = new PrismaClient();

export async function buildPortfolioContext() {
  const stats = await prisma.commitStats.aggregate({ _sum: { commitsCount: true } });

  const topProjects = await prisma.repository.findMany({
    where: { isPrivate: false, isArchived: false },
    orderBy: { projectScore: { finalScore: 'desc' } },
    take: 10,
    select: {
      name: true,
      language: true,
      readme: true,
      topics: true,
      projectScore: { select: { finalScore: true } }
    }
  });

  const otherProjects = await prisma.repository.findMany({
    where: { isPrivate: false, isArchived: false },
    orderBy: { projectScore: { finalScore: 'desc' } },
    skip: 5,
    take: 10,
    select: { name: true, description: true, topics: true, language: true }
  });

  const deepDiveContext = topProjects.map(p => {
    const cleanedReadme = cleanReadme(p.readme);
    const techs = [...(p.topics || []), p.language].join(', ');

    return `
=== PROJETO DESTAQUE: ${p.name} ===
Score de Engenharia: ${p.projectScore?.finalScore.toFixed(0)}
Stack/Tags: ${techs}
RESUMO TÉCNICO (Baseado no README):
${cleanedReadme}
=====================================
`;
  }).join('\n');

  const surfaceContext = otherProjects.map(p => {
    return `- ${p.name} (${p.language}): ${p.description} [Tags: ${p.topics.join(', ')}]`;
  }).join('\n');

  const educationList = STATIC_PROFILE.education.map(e =>
    `- ${e.degree} em ${e.institution}. Status: ${e.status}.`
  ).join('\n');

  return `
Você é o assistente técnico do portfólio de Leonardo Ramos.
Use o contexto abaixo para responder perguntas sobre a carreira, habilidades e projetos dele.

--- DADOS PESSOAIS ---
${STATIC_PROFILE.professional_summary}
Formação:
${educationList}

--- PROJETOS PRINCIPAIS (Análise Detalhada) ---
Use o texto abaixo para explicar COMO os projetos funcionam, OBJETIVOS e STACK utilizada.
${deepDiveContext}

--- OUTROS PROJETOS (Lista Rápida) ---
${surfaceContext}

--- ESTATÍSTICAS ---
Commits (90d): ${stats._sum.commitsCount || 0} (Demonstra alta consistência).

--- DIRETRIZES ---
1. Se perguntarem "Como funciona o projeto X?", baseie a respostas no README.
2. Se perguntarem "Quais tecnologias?", analise as Tags e o conteúdo do README.
3. Se perguntarem "Qual o objetivo do projeto Y?", baseie-se na no README.
4. Responda de forma técnica e direta.
5. Use linguagem natural e organizada em tópicos bem estruturados.
`;
}