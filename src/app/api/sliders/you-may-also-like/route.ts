import { NextRequest, NextResponse } from 'next/server';
import { formatCategories } from '@/server/helpers/helpers';
import { prisma } from '@/server/prisma';
import { BookWithDetails } from '@/types/BookType';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const genreQuery = searchParams.get('genres');
    const authorQuery = searchParams.get('author');

    const genreNames =
      genreQuery ?
        genreQuery
          .split(',')
          .map((g) => g.trim())
          .filter(Boolean)
      : [];

    const author = authorQuery?.trim() || undefined;

    if (genreNames.length === 0 && !author) {
      return NextResponse.json([], { status: 200 });
    }

    const booksByAuthor =
      author ?
        await prisma.book.findMany({
          where: { author },
          include: {
            categories: { include: { category: true } },
            paperDetails: true,
            kindleDetails: true,
            audiobookDetails: true,
          },
          take: 2,
        })
      : [];

    const excludeIds = booksByAuthor.map((b) => b.id);

    const booksByGenre =
      genreNames.length > 0 ?
        await prisma.book.findMany({
          where: {
            categories: {
              some: {
                category: {
                  name: { in: genreNames },
                },
              },
            },
            ...(excludeIds.length > 0 ?
              { NOT: { id: { in: excludeIds } } }
            : {}),
          },
          include: {
            categories: { include: { category: true } },
            paperDetails: true,
            kindleDetails: true,
            audiobookDetails: true,
          },
        })
      : [];

    const shuffledGenreBooks = booksByGenre
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);

    const finalBooks = [...booksByAuthor, ...shuffledGenreBooks].map(
      formatCategories,
    ) as BookWithDetails[];

    return NextResponse.json(finalBooks, { status: 200 });
  } catch (error) {
    console.error('[GET /api/similar-books] Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: (error as Error).message },
      { status: 500 },
    );
  }
}
