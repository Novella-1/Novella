import { CategoryList } from '@/components/common/Category/CategoryList';
import { SectionTitle } from '../../ui/custom/typography';

export function CategorySection() {
  return (
    <>
      <SectionTitle>Shop by category</SectionTitle>
      <CategoryList />
    </>
  );
}
