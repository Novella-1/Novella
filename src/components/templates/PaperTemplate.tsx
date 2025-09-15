import React from 'react';
import BooksList from '@/components/common/BooksList/BooksList';
import Pagination from '@/components/common/Pagination/Pagination';
import { TypographyH1, TypographyP } from '@/components/ui/typography';
import { getBooks } from '@/server/books';

const PaperTemplate = async () => {
  const books = await getBooks('PAPERBACK');
  console.log(books);

  return (
    <div className="py-16">
      <div>
        <TypographyH1 className="text-custom-text-primary mb-2">
          Paper books
        </TypographyH1>
        <TypographyP className="text-custom-text-secondary">
          10,305 books
        </TypographyP>
      </div>

      {/*<Filtration/>*/}

      {books.map((item) => {
        return <div key={item.slug}>{item.slug}</div>;
      })}

      <BooksList className="mb-10" />

      <Pagination />
    </div>
  );
};

export default PaperTemplate;
