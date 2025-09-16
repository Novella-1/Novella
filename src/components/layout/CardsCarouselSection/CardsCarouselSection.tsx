import { CardCarousel } from '@/components/common/BooksScrollArea/ScrollArea';
import { cn } from '@/lib/utils';
import { SectionTitle } from '../../ui/custom/typography';

export function CardsCarouselSection({
  className,
  title = 'You might like',
  books = Array.from({ length: 7 }, () => ({})),
}: {
  className?: string;
  title?: string;
  books?: object[];
}) {
  return (
    <section className={cn('', className)}>
      <SectionTitle className="mb-[-42px] ">{title}</SectionTitle>
      <CardCarousel books={books} />
    </section>
  );
}
// ""
// flex flex-col items-center
