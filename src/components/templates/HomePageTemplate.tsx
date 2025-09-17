import { CardsCarouselSection } from '../layout/CardsCarouselSection/CardsCarouselSection';
import { CategorySection } from '../layout/CategorySection/CategorySection';

import { HomePageImage } from '../ui/custom/image';

export const HomePageTemplate = () => {
  return (
    <div>
      <HomePageImage className="my-[80px]" />
      <CardsCarouselSection title="New books" />
      <CategorySection className="mt-[50px]" />
      <CardsCarouselSection className="my-[50px]" />
    </div>
  );
};
