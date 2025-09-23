import { NextResponse } from 'next/server';
import { formatCategories } from '@/server/helpers/helpers';
import { prisma } from '@/server/prisma';

export async function GET() {
  try {
    const totalCount = await prisma.book.count();

    if (totalCount === 0) {
      return NextResponse.json({ error: 'No books found' }, { status: 404 });
    }

    const randomIndex = Math.floor(Math.random() * totalCount);

    const randomBook = await prisma.book.findMany({
      skip: randomIndex,
      take: 1,
      include: {
        audiobookDetails: true,
        kindleDetails: true,
        paperDetails: true,
        categories: {
          include: { category: true },
        },
      },
    });

    if (!randomBook) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json(formatCategories(randomBook[0]));
  } catch (error) {
    console.error('Random book fetch error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
