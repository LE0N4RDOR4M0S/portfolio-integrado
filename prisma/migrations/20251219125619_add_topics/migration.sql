-- AlterTable
ALTER TABLE "Repository" ADD COLUMN     "topics" TEXT[] DEFAULT ARRAY[]::TEXT[];
