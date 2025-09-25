import { CategoryList } from '@/components/common/Category/CategoryList';
import { cn } from '@/lib/utils';
import { fetchCategoriesCount } from '@/services/fetchCategory';
import { BookType } from '@/types/BookType';
import { TypographyH2 } from '../../ui/custom/typography';

interface CategorySectionProps {
  className?: string;
}

export interface BookCount {
  type: BookType;
  count: number;
}

export interface BookCountsResponse {
  counts: BookCount[];
}

export async function CategorySection({ className }: CategorySectionProps) {
  const categoriesCount: BookCountsResponse = await fetchCategoriesCount();
  return (
    <section className={cn('', className)}>
      <TypographyH2 className="mb-[34px]">Shop by category</TypographyH2>
      <CategoryList categoriesCount={categoriesCount} />
    </section>
  );
}
