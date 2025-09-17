import React, { FC } from 'react';
import { CardItem } from '@/components/common/CardItem';
import { cn } from '@/lib/utils';
import { getBooks } from '@/server/books';
import {
  BookType,
  PageSize,
  SortType,
  SortOrder,
  BookWithDetails,
} from '@/types/BookType';

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
        'flex flex-row flex-wrap gap-y-10 gap-x-4 sm:items-center justify-evenly',
        className,
      )}
    >
      {books.map((book: BookWithDetails) => (
        <CardItem
          key={book.id}
          book={book}
        />
      ))}
    </div>
  );
};

export default BooksList;
