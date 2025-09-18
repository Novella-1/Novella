import React, { FC } from 'react';

import { cn } from '@/lib/utils';
import { getBooks } from '@/server/books';
import {
  BookType,
  PageSize,
  SortType,
  SortOrder,
  BookWithDetails,
} from '@/types/BookType';
import { CardItem } from '../CardItem/CardItem';

type Props = {
  className?: string;
  type: BookType;
  page: number;
  pageSize: PageSize;
  sortBy: SortType;
  sortOrder: SortOrder;
};

const BooksList = async ({
  className,
  type,
  page,
  pageSize,
  sortBy,
  sortOrder,
}: Props) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const res = await fetch(
    `${baseUrl}/api/books?type=${type}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`,
    { cache: 'no-store' },
  );
  const books = await res.json();

  return (
    <div
      className={cn(
        'flex flex-row flex-wrap gap-y-10  sm:items-center justify-evenly',
        {
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-x-0 justify-center justify-items-center':
            pageSize === 9,
          'flex flex-row flex-wrap gap-y-10 gap-x-4 sm:items-center justify-evenly':
            pageSize === 16,
        },
        className,
      )}
    >
      {books.map((book: BookWithDetails) => (
        <CardItem
          key={book.id}
          book={book}
          className={pageSize === 9 ? 'md:w-[300px] sm:w-[272px]' : ''}
        />
      ))}
    </div>
  );
};

export default BooksList;
