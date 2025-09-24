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
      include: {
        book: {
          include: {
            categories: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => {
      const price = item.book.priceDiscount || item.book.priceRegular;
      return sum + price * item.quantity;
    }, 0);

    return NextResponse.json({
      data: cartItems,
      totalCount,
      totalPrice,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
