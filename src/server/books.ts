import {
  BookType,
  BookWithDetails,
  SortOrder,
  SortType,
} from '@/types/BookType';
import { prisma } from './prisma';

type BookInclude = {
  categories: { include: { category: boolean } };
  paperDetails: boolean;
  kindleDetails: boolean;
  audiobookDetails: boolean;
};

type GetBooksOptions = {
  type: BookType;
  sortBy?: SortType;
  sortOrder?: SortOrder;
  page?: number;
  pageSize?: number;
};

type PrismaCategory = {
  bookId?: string;
  categoryId?: number;
  category: {
    name: string;
  };
};

function getInclude(type: BookType): BookInclude {
  return {
    categories: { include: { category: true } },
    paperDetails: type === 'PAPERBACK',
    kindleDetails: type === 'KINDLE',
    audiobookDetails: type === 'AUDIOBOOK',
  };
}

function getOrder(sortBy?: SortType, sortOrder: SortOrder = 'asc') {
  switch (sortBy) {
    case 'name':
      return { name: sortOrder };
    case 'author':
      return { author: sortOrder };
    case 'priceRegular':
      return { priceRegular: sortOrder };
    case 'publicationYear':
      return { publicationYear: sortOrder };
    default:
      return undefined;
  }
}

function sortByCategory<
  T extends { categories: { category?: { name: string } }[] },
>(books: T[], sortOrder: SortOrder) {
  return [...books].sort((a, b) => {
    const genreA =
      a.categories.map((c) => c.category?.name ?? '').sort()[0] ?? '';
    const genreB =
      b.categories.map((c) => c.category?.name ?? '').sort()[0] ?? '';
    return sortOrder === 'asc' ?
        genreA.localeCompare(genreB)
      : genreB.localeCompare(genreA);
  });
}

function formatCategories<T extends { categories: PrismaCategory[] }>(book: T) {
  return {
    ...book,
    categories: book.categories.map((c) => c.category.name),
  };
}

export async function getBooks({
  type,
  sortBy = 'name',
  sortOrder = 'asc',
  page = 1,
  pageSize = 8,
}: GetBooksOptions): Promise<[BookWithDetails[], number]> {
  const include = getInclude(type);
  const order = getOrder(sortBy, sortOrder);
  const skip = (page - 1) * pageSize;

  const totalCount = await prisma.book.count({
    where: { type },
  });

  let books = await prisma.book.findMany({
    where: { type },
    include,
    ...(order ? { orderBy: order } : {}),
    skip,
    take: pageSize,
  });

  if (sortBy === 'category') {
    books = sortByCategory(books, sortOrder);
  }

  const formattedBooks = books.map(formatCategories);

  return [formattedBooks as BookWithDetails[], totalCount];
}
