import { BookType, SortOrder, SortType } from '@/types/BookType';
import { PrismaCategory } from '@/types/HelpersType';

export function formatCategories<T extends { categories: PrismaCategory[] }>(
  book: T,
) {
  return {
    ...book,
    categories: book.categories.map((c) => c.category.name),
  };
}

export function getInclude(type: BookType) {
  return {
    categories: { include: { category: true } },
    paperDetails: type === 'PAPERBACK' ? true : undefined,
    kindleDetails: type === 'KINDLE' ? true : undefined,
    audiobookDetails: type === 'AUDIOBOOK' ? true : undefined,
  };
}

export function getOrder(sortBy?: SortType, sortOrder: SortOrder = 'asc') {
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
