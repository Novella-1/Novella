import { NextResponse } from 'next/server';
import { prisma } from '@/server/prisma';

export async function GET() {
  try {
    const totalCount = await prisma.quote.count();

    if (totalCount === 0) {
      return NextResponse.json({ error: 'No quotes found' }, { status: 404 });
    }

    const randomIndex = Math.floor(Math.random() * totalCount);

    const randomQuote = await prisma.quote.findFirst({
      skip: randomIndex,
      select: {
        quote: true,
        author: true,
        work: true,
      },
    });

    return NextResponse.json(randomQuote);
  } catch (error) {
    console.error('Random quote fetch error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
