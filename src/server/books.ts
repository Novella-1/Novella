import { BookType, BookWithDetails } from '@/types/BookType';
import { prisma } from './prisma';

export async function getBooks(type: BookType) {
  const books = await prisma.book.findMany({
    where: { type },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
      paperDetails: true,
    },
    orderBy: { name: 'asc' },
    take: 10,
  });

  const formattedBooks = books.map((book) => ({
    ...book,
    categories: book.categories.map((bc) => bc.category.name),
  }));

  return formattedBooks as BookWithDetails[];
}
