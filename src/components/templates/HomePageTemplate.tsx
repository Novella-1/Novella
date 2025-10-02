import { Suspense } from 'react';
import { CardsCarouselSection } from '../layout/CardsCarouselSection/CardsCarouselSection';
import CardsCarouselSkeleton from '../layout/CardsCarouselSection/CardsCarouselSkeleton';
import { CategorySection } from '../layout/CategorySection/CategorySection';
import { TwainQuote } from '../layout/QuoteSection/QuoteSection';

export const HomePageTemplate = () => {
  return (
    <div className="relative">
      <TwainQuote />
      <Suspense fallback={<CardsCarouselSkeleton />}>
        <CardsCarouselSection
          title="New books"
          type="new-books"
        />
      </Suspense>
      <CategorySection className="mt-[50px]" />
      <Suspense fallback={<CardsCarouselSkeleton />}>
        <CardsCarouselSection
          className="my-[50px]"
          type="discount"
          title="Sale"
        />
      </Suspense>
    </div>
  );
};
