import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/server/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await params;
    if (!userId)
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { book: true },
    });

    return NextResponse.json(cartItems);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
