import React, { FC } from 'react';
import { CardItem } from '@/components/common/CardItem';
import { cn } from '@/lib/utils';
import { getBooks } from '@/server/books';
import { BookType, PageSize, SortType, SortOrder } from '@/types/BookType';

type Props = {
  className?: string;
  type: BookType;
  page: number;
  pageSize: PageSize;
  sortBy: SortType;
  sortOrder: SortOrder;
};

const BooksList: FC<Props> = async ({
  className,
  type,
  page,
  pageSize,
  sortBy,
  sortOrder,
}) => {
  const books = await getBooks({
    type,
    page,
    pageSize,
    sortBy,
    sortOrder,
  });
  return (
    <div
      className={cn(
        'flex flex-row flex-wrap gap-y-10 gap-x-4 sm:items-center justify-evenly',
        className,
      )}
    >
      {books.map((book, index) => {
        return (
          <CardItem
            key={index}
            book={book}
          />
        );
      })}
    </div>
  );
};

export default BooksList;
