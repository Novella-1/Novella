import { CardCarousel } from '@/components/common/BooksScrollArea/ScrollArea';
import { SectionTitle } from '../../ui/custom/typography';

export function CardsCarouselSection({
  title = 'You might like',
  books = Array.from({ length: 7 }, () => ({})),
}: {
  title?: string;
  books?: object[];
}) {
  return (
    <>
      <SectionTitle className="mb-[-40px]">{title}</SectionTitle>
      <CardCarousel books={books} />
    </>
  );
}
