import React from 'react';
import BooksList from '@/components/common/BooksList/BooksList';
import Pagination from '@/components/common/Pagination/Pagination';
import { TypographyH1, TypographyP } from '@/components/ui/custom/typography';
import { getBookBySlug, getBooks } from '@/server/books';

const PaperTemplate = async () => {
  const [books, totalCount] = await getBooks({
    type: 'PAPERBACK',
    page: 5,
    pageSize: 2,
    sortBy: 'name',
    sortOrder: 'asc',
  });
  console.log(books);

  const bookWithDetails = await getBookBySlug(
    'codependent-no-more-en-audiobook',
  );

  console.log('BOOK WITH DETAILS!!!!', bookWithDetails);

  return (
    <div className="py-16">
      <div>
        <TypographyH1 className="text-custom-text-primary mb-2">
          Paper books
        </TypographyH1>
        <TypographyP className="text-custom-text-secondary">
          {totalCount} books
        </TypographyP>
      </div>

      {/*<Filtration/>*/}

      {books.map((item) => {
        return (
          <div key={item.slug}>
            {/* <span>{item.author}</span>
            <span style={{ backgroundColor: 'red' }}>{item.categories}</span> */}
            {/* <span>{item.description}</span> */}
            {/* <span>{item.name}</span> */}
            {/* <span>{item.kindleDetails?.format}</span> */}
            <span>{item.name}</span>
          </div>
        );
      })}

      <BooksList className="mb-10" />

      <Pagination />
    </div>
  );
};

export default PaperTemplate;
