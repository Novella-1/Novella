import { PrismaCategory } from '@/types/HelpersType';

export function formatCategories<T extends { categories: PrismaCategory[] }>(
  book: T,
) {
  return {
    ...book,
    categories: book.categories.map((c) => c.category.name),
  };
}
