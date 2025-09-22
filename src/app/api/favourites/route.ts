import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/server/prisma';

export async function POST(req: NextRequest) {
  try {
    const { userId, bookId } = await req.json();

    if (!userId || !bookId) {
      return NextResponse.json(
        { error: 'Missing userId or bookId' },
        { status: 400 },
      );
    }

    const existing = await prisma.favourite.findUnique({
      where: { userId_bookId: { userId, bookId } },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Already in favourites' },
        { status: 409 },
      );
    }

    const favourite = await prisma.favourite.create({
      data: { userId, bookId },
    });

    return NextResponse.json(favourite, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
