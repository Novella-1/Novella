import { NextRequest, NextResponse } from 'next/server';
import { formatCategories } from '@/server/helpers/helpers';
import { prisma } from '@/server/prisma';
import { BookWithDetails } from '@/types/BookType';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const genreQuery = searchParams.get('genres');
  const authorQuery = searchParams.get('author');

  if (!genreQuery && !authorQuery) {
    return NextResponse.json([], { status: 200 });
  }

  const genreNames =
    genreQuery ?
      genreQuery.split(',').map((g) => decodeURIComponent(g.trim()))
    : [];

  try {
    const author = authorQuery ?? undefined;

    const booksByAuthor = await prisma.book.findMany({
      where: { author: author },
      include: {
        categories: { include: { category: true } },
        paperDetails: true,
        kindleDetails: true,
        audiobookDetails: true,
      },
      take: 2,
    });

    const booksByGenre = await prisma.book.findMany({
      where: {
        categories: {
          some: {
            category: { name: { in: genreNames } },
          },
        },

        NOT:
          authorQuery ?
            { id: { in: booksByAuthor.map((b) => b.id) } }
          : undefined,
      },
      include: {
        categories: { include: { category: true } },
        paperDetails: true,
        kindleDetails: true,
        audiobookDetails: true,
      },
    });

    const shuffledGenreBooks = booksByGenre
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);

    const finalBooks = [...booksByAuthor, ...shuffledGenreBooks].map(
      formatCategories,
    ) as BookWithDetails[];

    return NextResponse.json(finalBooks);
  } catch (err) {
    console.error('Error fetching similar books:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
