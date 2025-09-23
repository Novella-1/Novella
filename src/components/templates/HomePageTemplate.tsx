import BookmarkButton from '../common/BookmarkButton/BookmarkButton';
import { CardsCarouselSection } from '../layout/CardsCarouselSection/CardsCarouselSection';
import { CartModalSection } from '../layout/CartModalSection/CartModalSection';
import { CategorySection } from '../layout/CategorySection/CategorySection';
import { TwainQuote } from '../layout/QuoteSection/QuoteSection';

export const HomePageTemplate = () => {
  return (
    <div className="relative">
      <CartModalSection />
      <TwainQuote />
      <CardsCarouselSection
        title="New books"
        type="new-books"
      />
      <BookmarkButton />
      <CategorySection className="mt-[50px]" />
      <CardsCarouselSection
        className="my-[50px]"
        type="discount"
        title="Sale"
      />
    </div>
  );
};
