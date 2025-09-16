import React from 'react';
import { CardItem } from '../common/CardItem';
import { TypographyH1, TypographyP } from '../ui/custom/typography';

const FavoritesTemplate = () => {
  return (
    //pt-[64px]
    <section className="pt-[64px]  py-16">
      <TypographyH1>Favourites</TypographyH1>
      <TypographyP className="text-custom-text-secondary">8 books</TypographyP>
      <div className="mx-auto max-w-7xl">
        {/* // justify-items-center */}
        <div
          className="grid gap-6 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-4

                "
        >
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
        </div>
      </div>
    </section>
  );
};

export default FavoritesTemplate;
