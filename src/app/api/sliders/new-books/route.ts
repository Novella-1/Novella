import { NextResponse } from 'next/server';
import { formatCategories } from '@/server/helpers/helpers';
import { prisma } from '@/server/prisma';
import { BookWithDetails } from '@/types/BookType';

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { publicationYear: 'desc' },
      take: 10,
      include: {
        categories: { include: { category: true } },
        paperDetails: true,
        kindleDetails: true,
        audiobookDetails: true,
      },
    });

    const formattedBooks = books.map(formatCategories) as BookWithDetails[];

    return NextResponse.json(formattedBooks);
  } catch (err) {
    console.error('Error fetching new books:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
