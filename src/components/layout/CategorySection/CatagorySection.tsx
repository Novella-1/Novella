import { CategoryList } from '@/components/common/Category/CategoryList';
import { cn } from '@/lib/utils';
import { SectionTitle } from '../../ui/custom/typography';

interface CategorySectionProps {
  className?: string;
}

export function CategorySection({ className }: CategorySectionProps) {
  return (
    <section className={cn('', className)}>
      <SectionTitle>Shop by category</SectionTitle>
      <CategoryList />
    </section>
  );
}
