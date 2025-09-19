import { NextRequest, NextResponse } from 'next/server';
import { formatCategories } from '@/server/helpers/helpers';
import { prisma } from '@/server/prisma';
import {
  BookType,
  BookWithDetails,
  PageSize,
  SortOrder,
  SortType,
} from '@/types/BookType';

function getInclude(type: BookType) {
  return {
    categories: { include: { category: true } },
    paperDetails: type === 'PAPERBACK' ? true : undefined,
    kindleDetails: type === 'KINDLE' ? true : undefined,
    audiobookDetails: type === 'AUDIOBOOK' ? true : undefined,
  };
}

function getOrder(sortBy?: SortType, sortOrder: SortOrder = 'asc') {
  switch (sortBy) {
    case 'name':
      return { name: sortOrder };
    case 'author':
      return { author: sortOrder };
    case 'priceRegular':
      return { priceRegular: sortOrder };
    case 'publicationYear':
      return { publicationYear: sortOrder };
    default:
      return undefined;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const type = searchParams.get('type') as BookType;
    const sortBy = (searchParams.get('sortBy') as SortType) ?? 'name';
    const sortOrder = (searchParams.get('sortOrder') as SortOrder) ?? 'asc';
    const page = parseInt(searchParams.get('page') ?? '1', 10);
    const pageSize = parseInt(
      searchParams.get('pageSize') ?? '16',
      10,
    ) as PageSize;

    if (!type) {
      return NextResponse.json({ error: 'Missing book type' }, { status: 400 });
    }

    const include = getInclude(type);
    const order = getOrder(sortBy, sortOrder);
    const skip = (page - 1) * pageSize;

    const books = await prisma.book.findMany({
      where: { type },
      include,
      ...(order ? { orderBy: order } : {}),
      skip,
      take: pageSize,
    });

    const formattedBooks = books.map(formatCategories) as BookWithDetails[];

    return NextResponse.json(formattedBooks);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
