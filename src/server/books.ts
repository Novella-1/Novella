import {
  BookType,
  BookWithDetails,
  SortOrder,
  SortType,
} from '@/types/BookType';
import { prisma } from './prisma';

type GetBooksOptions = {
  type: BookType;
  sortBy?: SortType;
  sortOrder?: SortOrder;
  quantity?: number;
};

export async function getBooks({
  type,
  sortBy = 'name',
  sortOrder = 'asc',
  quantity = 10,
}: GetBooksOptions): Promise<BookWithDetails[]> {
  let order: Record<string, SortOrder> | undefined;

  if (sortBy === 'name') {
    order = { name: sortOrder };
  } else if (sortBy === 'author') {
    order = { author: sortOrder };
  } else if (sortBy === 'priceRegular') {
    order = { priceRegular: sortOrder };
  } else if (sortBy === 'publicationYear') {
    order = { publicationYear: sortOrder };
  }

  let books = await prisma.book.findMany({
    where: { type },
    include: {
      categories: { include: { category: true } },
      paperDetails: true,
    },
    ...(order ? { orderBy: order } : {}),
    take: quantity,
  });

  if (sortBy === 'category') {
    books = books.sort((a, b) => {
      const genreA = a.categories.map((c) => c.category.name).sort()[0] ?? '';
      const genreB = b.categories.map((c) => c.category.name).sort()[0] ?? '';

      return sortOrder === 'asc' ?
          genreA.localeCompare(genreB)
        : genreB.localeCompare(genreA);
    });
  }

  const formattedBooks = books.map((book) => ({
    ...book,
    categories: book.categories.map((bc) => bc.category.name),
  }));

  return formattedBooks as BookWithDetails[];
}
