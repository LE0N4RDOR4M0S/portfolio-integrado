-- CreateTable
CREATE TABLE "Repository" (
    "id" TEXT NOT NULL,
    "githubId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "language" TEXT,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "forks" INTEGER NOT NULL DEFAULT 0,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "url" TEXT NOT NULL,
    "pushedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommitStats" (
    "id" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "commitsCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CommitStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectScore" (
    "id" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "activityScore" DOUBLE PRECISION NOT NULL,
    "popularityScore" DOUBLE PRECISION NOT NULL,
    "consistencyScore" DOUBLE PRECISION NOT NULL,
    "finalScore" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "lastCalculated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnicalFact" (
    "id" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "factType" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "confidence" TEXT NOT NULL DEFAULT 'DETERMINISTIC',
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TechnicalFact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Repository_githubId_key" ON "Repository"("githubId");

-- CreateIndex
CREATE INDEX "CommitStats_repositoryId_idx" ON "CommitStats"("repositoryId");

-- CreateIndex
CREATE UNIQUE INDEX "CommitStats_repositoryId_date_key" ON "CommitStats"("repositoryId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectScore_repositoryId_key" ON "ProjectScore"("repositoryId");

-- CreateIndex
CREATE INDEX "TechnicalFact_repositoryId_factType_idx" ON "TechnicalFact"("repositoryId", "factType");

-- AddForeignKey
ALTER TABLE "CommitStats" ADD CONSTRAINT "CommitStats_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectScore" ADD CONSTRAINT "ProjectScore_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalFact" ADD CONSTRAINT "TechnicalFact_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
