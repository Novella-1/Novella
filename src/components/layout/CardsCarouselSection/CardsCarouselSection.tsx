import { CardCarousel } from '@/components/common/BooksScrollArea/ScrollArea';
import { cn } from '@/lib/utils';

const sliderUrlBuilder = (
  type: string | undefined,
  query: string | undefined,
  author: string | undefined,
) => {
  if (type === 'new-books') {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/api/sliders/new-books/`;
  }

  if (type === 'discount') {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/api/sliders/discount/`;
  }

  return `${process.env.NEXT_PUBLIC_BASE_URL}/api/sliders/you-may-also-like?genres=${query}&author=${author}`;
};

type CarouselType = 'discount' | 'new-books' | undefined;

export async function CardsCarouselSection({
  className,
  title = 'You might like',
  author,
  query,
  type,
}: {
  className?: string;
  title?: string;
  type?: CarouselType;
  query?: string;
  author?: string;
}) {
  const url = sliderUrlBuilder(type, query, author);
  const res = await fetch(url, {
    cache: 'no-store',
  });

  const booksData = await res.json();

  return (
    <section className={cn('mb-16', className)}>
      <CardCarousel
        books={booksData}
        title={title}
      />
    </section>
  );
}
