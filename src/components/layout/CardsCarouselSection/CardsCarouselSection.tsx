import { CardCarousel } from '@/components/common/BooksScrollArea/ScrollArea';
import { cn } from '@/lib/utils';
import { getBooks } from '@/server/books';
import { SectionTitle } from '../../ui/custom/typography';

export async function CardsCarouselSection({
  className,
  title = 'You might like',
}: {
  className?: string;
  title?: string;
}) {
  const booksData = await getBooks({
    type: 'KINDLE',
  });

  return (
    <section className={cn('', className)}>
      <SectionTitle className="mb-[-42px] ">{title}</SectionTitle>
      <CardCarousel books={booksData} />
    </section>
  );
}
