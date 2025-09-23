import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/server/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  try {
    const favourites = await prisma.favourite.findMany({
      where: { userId },
      select: { bookId: true },
    });

    const totalCount = await prisma.favourite.count({
      where: { userId },
    });

    const ids = favourites.map((f) => f.bookId);
    return NextResponse.json({ data: ids, totalCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch favourites' },
      { status: 500 },
    );
  }
}
