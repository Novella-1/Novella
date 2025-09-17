import {
  BookType,
  BookWithDetails,
  PageSize,
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
  pageSize?: PageSize;
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
  pageSize = 16,
}: GetBooksOptions): Promise<BookWithDetails[]> {
  const include = getInclude(type);
  const order = getOrder(sortBy, sortOrder);
  const skip = (page - 1) * pageSize;

  const books = await prisma.book.findMany({
    where: { type },
    include,
    ...(order ? { orderBy: order } : {}),
    skip,
    take: pageSize,
  });

  const formattedBooks = books.map(formatCategories);

  return formattedBooks as BookWithDetails[];
}

export async function getBooksQuantityByType(type: BookType): Promise<number> {
  const count = await prisma.book.count({
    where: { type },
  });
  return count;
}

export async function getBookBySlug(
  slug: string,
): Promise<BookWithDetails | null> {
  const book = await prisma.book.findUnique({
    where: { slug },
    include: {
      categories: { include: { category: true } },
      paperDetails: true,
      kindleDetails: true,
      audiobookDetails: true,
    },
  });

  if (!book) return null;

  return formatCategories(book) as BookWithDetails;
}
