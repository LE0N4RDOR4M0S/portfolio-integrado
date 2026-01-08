// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const portfolio = await prisma.repository.findFirst({ where: { name: "seu-portfolio-repo" } })

  if (portfolio) {
    await prisma.technicalFact.createMany({
      data: [
        {
          repositoryId: portfolio.id,
          factType: "ARCHITECTURE",
          value: "Server Actions",
          description: "Utiliza Server Actions para mutações de dados seguras sem API routes."
        },
        {
          repositoryId: portfolio.id,
          factType: "AI_INTEGRATION",
          value: "RAG Pipeline",
          description: "Implementa Retrieval-Augmented Generation com contexto vetorial."
        },
        {
          repositoryId: portfolio.id,
          factType: "DEVOPS",
          value: "Docker Multi-stage",
          description: "Build otimizado para produção com imagem Alpine."
        }
      ]
    })
    console.log("Fatos técnicos adicionados!")
  }
}

main()