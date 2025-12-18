import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const projects = await prisma.repository.findMany({
    where: {
      isPrivate: false,
    },
    include: {
      projectScore: true,
      technicalFacts: true,
    },
    orderBy: {
      projectScore: {
        finalScore: 'desc',
      },
    },
  });

  return NextResponse.json(projects, {
    status: 200,
    headers: {
      'Cache-Control': 's-maxage=60, stale-while-revalidate',
    },
  });
}