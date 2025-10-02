import { Suspense } from 'react';
import { cn } from '@/lib/utils';

import { BookWithDetails } from '@/types/BookType';
import BookDetailsSection from '../layout/BookDetailsSection/BookDetailsSection';
import { CardsCarouselSection } from '../layout/CardsCarouselSection/CardsCarouselSection';
import CardsCarouselSkeleton from '../layout/CardsCarouselSection/CardsCarouselSkeleton';

interface BookDetailsTemplateProps {
  className?: string;
  initialBook: BookWithDetails;
}

export function BookDetailsTemplate({
  className,
  initialBook,
}: BookDetailsTemplateProps) {
  const { author, categories } = initialBook;

  return (
    <div className={cn(className)}>
      <BookDetailsSection initialBook={initialBook} />
      <Suspense fallback={<CardsCarouselSkeleton />}>
        <CardsCarouselSection
          title="You may also like"
          author={author}
          query={categories.join(',')}
        />
      </Suspense>
    </div>
  );
}
