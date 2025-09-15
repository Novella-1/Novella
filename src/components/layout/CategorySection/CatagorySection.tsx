import { CategoryList } from '@/components/common/Catagory/CategoryList';
import { SectionTitle } from '../../ui/typography';

export function CategorySection() {
  return (
    <>
      <SectionTitle>Shop by category</SectionTitle>
      <CategoryList />;
    </>
  );
}
