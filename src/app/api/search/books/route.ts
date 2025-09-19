import { NextRequest, NextResponse } from 'next/server';
import { formatCategories } from '@/server/helpers/helpers';
import { prisma } from '@/server/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query')?.trim();

  if (!query) return NextResponse.json([], { status: 200 });

  const books = await prisma.book.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { author: { contains: query, mode: 'insensitive' } },
      ],
    },
    include: {
      categories: { include: { category: true } },
    },
    take: 10,
  });

  if (books.length > 0) {
    return NextResponse.json(books.map(formatCategories));
  }

  return NextResponse.json(books);
}
