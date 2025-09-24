import { BookType } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { formatCategories } from '@/server/helpers/helpers';
import { prisma } from '@/server/prisma';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ namespaceId: string; lang: string }> },
) {
  const { namespaceId, lang } = await context.params;

  try {
    const { searchParams } = new URL(request.url);
    const typeParam = searchParams.get('type');

    let type: BookType | undefined;
    if (typeParam && ['PAPERBACK', 'KINDLE', 'AUDIOBOOK'].includes(typeParam)) {
      type = typeParam as BookType;
    }

    const book = await prisma.book.findFirst({
      where: { namespaceId, lang, ...(type ? { type } : {}) },
      include: {
        categories: { include: { category: true } },
        paperDetails: true,
        kindleDetails: true,
        audiobookDetails: true,
      },
    });

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json(formatCategories(book));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
