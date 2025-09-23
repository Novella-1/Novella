import { cn } from '@/lib/utils';

import { BookWithDetails } from '@/types/BookType';
import BookDetailsSection from '../layout/BookDetailsSection/BookDetailsSection';
import { CardsCarouselSection } from '../layout/CardsCarouselSection/CardsCarouselSection';

interface BookDetailsTemplateProps {
  className?: string;
  initialBook: BookWithDetails;
}

export function BookDetailsTemplate({
  className,
  initialBook,
}: BookDetailsTemplateProps) {
  const { author, categories } = initialBook;

  console.log(initialBook);

  return (
    <div className={cn(className)}>
      <BookDetailsSection initialBook={initialBook} />
      <CardsCarouselSection
        title="You may also like"
        author={author}
        query={categories.join(',')}
      />
    </div>
  );
}
