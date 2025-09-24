import { NextResponse } from 'next/server';
import { formatCategories } from '@/server/helpers/helpers';
import { prisma } from '@/server/prisma';
import { BookWithDetails } from '@/types/BookType';

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      where: {
        priceDiscount: { not: null },
      },
      include: {
        categories: { include: { category: true } },
        paperDetails: true,
        kindleDetails: true,
        audiobookDetails: true,
      },
      take: 20,
    });

    const discountedBooks = books
      .filter((book) => book.priceDiscount! < book.priceRegular)
      .slice(0, 10)
      .sort(() => Math.random() - 0.5);

    const formattedBooks = discountedBooks.map(
      formatCategories,
    ) as BookWithDetails[];

    return NextResponse.json(formattedBooks);
  } catch (err) {
    console.error('Error fetching discount books:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
