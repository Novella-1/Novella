import { NextRequest, NextResponse } from 'next/server';
import { formatCategories, getOrder } from '@/server/helpers/helpers';
import { prisma } from '@/server/prisma';
import {
  BookWithDetails,
  PageSize,
  SortOrder,
  SortType,
} from '@/types/BookType';

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  try {
    const { userId } = params;
    const { searchParams } = new URL(req.url);

    const sortBy = (searchParams.get('sortBy') as SortType) ?? 'createdAt';
    const sortOrder = (searchParams.get('sortOrder') as SortOrder) ?? 'desc';
    const page = parseInt(searchParams.get('page') ?? '1', 10);
    const pageSize = parseInt(
      searchParams.get('pageSize') ?? '16',
      10,
    ) as PageSize;

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const order = getOrder(sortBy, sortOrder);

    const favourites = await prisma.favourite.findMany({
      where: { userId },
      include: {
        book: {
          include: {
            categories: {
              include: { category: true },
            },
          },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: order ? { book: order } : { createdAt: 'desc' },
    });

    const total = await prisma.favourite.count({
      where: { userId },
    });

    const books = favourites.map((fav) => {
      const book = fav.book;
      return formatCategories(book);
    });

    return NextResponse.json({
      data: books,
      totalCount: total,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
