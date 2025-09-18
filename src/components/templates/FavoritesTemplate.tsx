import React from 'react';
import { getBooks } from '@/server/books';
import { CardItem } from '../common/CardItem';
import { TypographyH1, TypographyP } from '../ui/custom/typography';

const FavoritesTemplate = async () => {
  const booksData = await getBooks({
    type: 'KINDLE',
  });
  return (
    <section className="pt-[64px]  py-16">
      <TypographyH1 className="mb-2">Favourites</TypographyH1>
      <TypographyP className="text-custom-icons pb-16">8 books</TypographyP>
      <div className="mx-auto max-w-7xl">
        <div
          className="grid gap-6 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-4"
        >
          {booksData.map((book) => (
            <CardItem
              key={book.id}
              book={book}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FavoritesTemplate;
