import { NextResponse } from 'next/server';
import { prisma } from '@/server/prisma';
import { BookType } from '@/types/BookType';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') as BookType | null;

    if (!type) {
      return NextResponse.json(
        { error: 'Missing "type" query parameter' },
        { status: 400 },
      );
    }

    const count = await prisma.book.count({
      where: { type },
    });

    return NextResponse.json({ totalCount: count });
  } catch (error) {
    console.error('Error fetching books count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch book count' },
      { status: 500 },
    );
  }
}
