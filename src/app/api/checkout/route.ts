import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/server/prisma';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId)
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { book: true },
    });

    if (cartItems.length === 0)
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });

    const total = cartItems.reduce((acc, item) => {
      const price = item.book.priceDiscount ?? item.book.priceRegular;
      return acc + price * item.quantity;
    }, 0);

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status: 'PENDING',
        items: {
          create: cartItems.map((item) => ({
            bookId: item.bookId,
            quantity: item.quantity,
            price: item.book.priceDiscount ?? item.book.priceRegular,
          })),
        },
      },
      include: { items: true },
    });

    await prisma.cartItem.deleteMany({ where: { userId } });

    return NextResponse.json(order, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
