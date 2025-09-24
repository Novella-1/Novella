import { NextResponse } from 'next/server';
import { prisma } from '@/server/prisma';

export async function GET(req: Request) {
  try {
    const result = await prisma.book.groupBy({
      by: ['type'],
      _count: {
        type: true,
      },
    });

    const counts = result.map((r) => ({
      type: r.type,
      count: r._count.type,
    }));

    return NextResponse.json({ counts });
  } catch (error) {
    console.error('Error fetching books count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch book count' },
      { status: 500 },
    );
  }
}
