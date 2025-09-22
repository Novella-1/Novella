import React from 'react';
import FavouritesList from '../common/FavouritesList/FavouritesList';
import { TypographyH1, TypographyP } from '../ui/custom/typography';

const FavoritesTemplate = async () => {
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ['books', 'AUDIOBOOK', page, pageSize, sortBy, sortOrder],
  //   queryFn: () =>
  //     fetchBooks({
  //       type: 'AUDIOBOOK',
  //       page,
  //       pageSize,
  //       sortBy,
  //       sortOrder,
  //     }),
  // });

  return (
    <section className="pt-32 pb-16">
      <TypographyH1 className="mb-2">Favourites</TypographyH1>
      <TypographyP className="text-custom-icons pb-16">8 books</TypographyP>
      <div className="mx-auto max-w-7xl">
        <div
          className="grid gap-6 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-4"
        >
          <FavouritesList />
        </div>
      </div>
    </section>
  );
};

export default FavoritesTemplate;
