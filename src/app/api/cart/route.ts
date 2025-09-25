import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/server/prisma';

export async function POST(req: NextRequest) {
  try {
    const { userId, bookId, quantity = 1 } = await req.json();

    if (!userId || !bookId) {
      return NextResponse.json(
        { error: 'Missing userId or bookId' },
        { status: 400 },
      );
    }

    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    const cartItem = await prisma.cartItem.upsert({
      where: {
        userId_bookId: {
          userId: userId,
          bookId: bookId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        userId: userId,
        bookId: bookId,
        quantity: quantity,
      },
      include: {
        book: true,
      },
    });

    return NextResponse.json(cartItem, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId, bookId } = await req.json();

    if (!userId || !bookId) {
      return NextResponse.json(
        { error: 'Missing userId or bookId' },
        { status: 400 },
      );
    }

    await prisma.cartItem.delete({
      where: {
        userId_bookId: {
          userId: userId,
          bookId: bookId,
        },
      },
    });
    return NextResponse.json({ message: 'Removed from cart' });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
