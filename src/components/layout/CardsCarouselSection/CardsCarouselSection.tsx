import { CardCarousel } from '@/components/common/BooksScrollArea/ScrollArea';
import { cn } from '@/lib/utils';
import { getBooks } from '@/server/books';
import { TypographyH2 } from '../../ui/custom/typography';

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
    <section className={cn('mb-16', className)}>
      <TypographyH2 className="mb-[-42px] ">{title}</TypographyH2>
      <CardCarousel books={booksData} />
    </section>
  );
}
// ""
// flex flex-col items-center
