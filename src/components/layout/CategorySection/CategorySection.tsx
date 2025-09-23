import { CategoryList } from '@/components/common/Category/CategoryList';
import { cn } from '@/lib/utils';
import { TypographyH2 } from '../../ui/custom/typography';

interface CategorySectionProps {
  className?: string;
}

export function CategorySection({ className }: CategorySectionProps) {
  return (
    <section className={cn('', className)}>
      <TypographyH2 className="mb-[34px]">Shop by category</TypographyH2>
      <CategoryList />
    </section>
  );
}
