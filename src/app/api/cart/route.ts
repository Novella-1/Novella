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

    const existing = await prisma.cartItem.findUnique({
      where: { userId_bookId: { userId, bookId } },
    });

    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { userId_bookId: { userId, bookId } },
        data: { quantity: existing.quantity + quantity },
      });
      return NextResponse.json(updated, { status: 200 });
    }

    const cartItem = await prisma.cartItem.create({
      data: { userId, bookId, quantity },
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

    await prisma.cartItem.deleteMany({
      where: { userId, bookId },
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
