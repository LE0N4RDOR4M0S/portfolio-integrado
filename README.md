# Intelligent Portfolio

### Showcase orientado a dados, engenharia de software **de verdade** e IA aplicada

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge\&logo=next.js\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge\&logo=typescript\&logoColor=white)
![Llama 3](https://img.shields.io/badge/Llama_3-Groq_LPU-orange?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-PostgreSQL-2d3748?style=for-the-badge\&logo=prisma\&logoColor=white)

Este repositório contém a implementação de um **Portfólio Inteligente**, feito pra fugir completamente do “site bonito com print de projeto velho”.

Aqui a ideia é simples (e honesta):

* **usar dados reais**,
* **métricas de engenharia**,
* **e uma IA que não inventa**, porque só responde com base no que realmente existe no banco.

Nada de engajamento vazio. Se o projeto é bom, os dados mostram. Se não é, a IA também não passa pano.

## O que esse projeto resolve

* Portfólios tradicionais são estáticos e fáceis de inflar
* Recrutadores fazem sempre as mesmas perguntas
* Ninguém tem tempo de ler dezenas de README's

**Solução:**
Um sistema que:

* sincroniza automaticamente seus repositórios do GitHub
* calcula métricas objetivas de “saúde” dos projetos
* e permite que um **chat com IA explique seu perfil técnico usando fatos**

## Arquitetura do Sistema

O projeto funciona em um ciclo contínuo de **ingestão → análise → inferência**.

```mermaid
graph LR
    GitHub[(GitHub API)] -->|Sync Script| Ingest[Ingestion Engine]

    subgraph "Backend / Data Layer"
        Ingest -->|Upsert & Scoring| DB[(PostgreSQL)]
        DB -->|Context Builder| RAG[RAG Logic]
    end

    subgraph "Frontend / AI"
        RAG -->|System Prompt| LLM((Llama 3-70B))
        LLM -->|Stream| Chat[AI Widget]
        DB -->|Analytics| Dashboard[Recharts UI]
    end

    style LLM fill:#f97316,stroke:#333,color:#fff
    style DB fill:#2d3748,stroke:#333,color:#fff
```

## Mecanismos Aplicados

### Algorithmic Scoring

Classificação automática dos projetos considerando:

* atividade recente (últimos 90 dias)
* consistência de commits
* presença e qualidade de README
* sinais mínimos de maturidade do projeto

Nada subjetivo. Nada manual.

### Live RAG

A IA **não “acha” nada**.

Ela:

* busca dados reais
* injeta contexto técnico (stack, scores, resumos)
* constrói o prompt dinamicamente

Se não tem no banco, **não sai na resposta**.

### Smart Sync

Script de sincronização que:

* consome a GitHub API
* extrai repositórios, tópicos e READMEs
* sanitiza Markdown (remove badges inúteis)
* calcula métricas antes de persistir

### Performance UI

* Dashboard analítico com Recharts
* Server Components (Next.js App Router)
* Renderização rápida, sem gambiarra de SPA inchada

## Estrutura do Projeto

```bash
├── .env.example              # Configuração (Database, GitHub Token, Groq Key)
├── prisma/
│   └── schema.prisma         # Modelagem de Dados
├── scripts/
│   ├── calculate-scores.ts   # Algoritmo de scoring detalhado
│   ├── run-all.ts            # Script maestro para chamada dos scripts de ingestão de calculo de score
│   ├── sync-commits.ts       # Ingestão de dados dos commits de cada repositório
│   └── sync-github.t         # Ingestão de dados dos repositorios publicos não arquivados
└── app/
    ├── api/
    │   ├── chat/             # Endpoint de IA
    │   ├── auth/             # Endpoint de autenticação pelo Github
    |   ├── projects/         # Endpoint de projetos
    |   └── stats/            # Endpoint de status
    ├── components/
```

## Destaques de Código


| Recurso          | Arquivo                  | O que faz                                                  |
| ---------------- | ------------------------ | ---------------------------------------------------------- |
| Context Builder  | `lib/ai-context.ts`      | Cruza bio + dados do banco pra formar a “memória” da IA |
| Streaming AI     | `api/chat/route.ts`      | Inferência via Groq com latência mínima                 |
| Markdown Cleaner | `lib/utils.ts`           | Remove lixo visual dos READMEs pra economizar tokens       |
| GitHub Sync      | `scripts/sync-github.ts` | Coleta dados dos repositorios diretamente do github        |

## Como Rodar Localmente

### Pré-requisitos

* Node.js 22+
* PostgreSQL (local ou Docker)
* GitHub Personal Access Token
* Groq API Key

### Passo 1: Configuração

```bash
git clone https://github.com/seu-usuario/intelligent-portfolio.git
cd intelligent-portfolio
npm install
```

Crie o `.env` na raiz:

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/portfolio"
GITHUB_TOKEN="ghp_sua_chave_github"
GROQ_API_KEY="gsk_sua_chave_groq"
GITHUB_ID="sua_github_client_id"
GITHUB_SECRET="sua_github_client_secret"
NEXTAUTH_SECRET="gerar_um_segredo"
NEXTAUTH_URL="http://localhost:3001"
```

### Passo 2: Banco e Ingestão

```bash
# Cria as tabelas
npx prisma migrate dev --name init

# Sincroniza GitHub e calcula os scores
npx tsx scripts/sync-github.ts
```

### Passo 3: Executar

```bash
npm run dev
# http://localhost:3000
```

## Stack Tecnológica

* **Framework:** Next.js 14
* **ORM:** Prisma
* **Banco:** PostgreSQL
* **IA:** Llama 3.1 8B
* **AI SDK:** Vercel AI SDK
* **Visualização:** Recharts
* **UI:** Tailwind CSS + Shadcn/UI
