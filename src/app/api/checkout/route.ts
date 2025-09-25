import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/server/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (
      (!body.userId && !body.items) ||
      (body.items && body.items.length === 0)
    ) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    let userId = body.userId;

    if (!userId) {
      userId = uuidv4();
      const guestEmail = `guest_${uuidv4()}@guest.local`;

      await prisma.user.create({
        data: {
          id: userId,
          email: guestEmail,
          hashedPassword: '',
        },
      });
    }

    let itemsToCreate: { bookId: string; quantity: number; price: number }[] =
      [];
    let total = 0;

    if (body.userId) {
      const cartItems = await prisma.cartItem.findMany({
        where: { userId: body.userId },
        include: { book: true },
      });

      if (cartItems.length === 0) {
        return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
      }

      itemsToCreate = cartItems.map((item) => ({
        bookId: item.bookId,
        quantity: item.quantity,
        price: item.book.priceDiscount ?? item.book.priceRegular,
      }));
    } else {
      itemsToCreate = body.items.map(
        (item: { bookId: string; quantity: number; price: number }) => ({
          bookId: item.bookId,
          quantity: item.quantity,
          price: item.price,
        }),
      );
    }

    total = itemsToCreate.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status: 'PENDING',
        items: {
          create: itemsToCreate.map((item) => ({
            bookId: item.bookId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });

    if (body.userId) {
      await prisma.cartItem.deleteMany({ where: { userId: body.userId } });
    }

    return NextResponse.json(order, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
