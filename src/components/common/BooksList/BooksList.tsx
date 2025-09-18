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
  // const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const books = await getBooks({ type, page, pageSize, sortBy, sortOrder });
  const testBook = {
    id: 'kindle-harry-potter-5-en',
    type: 'KINDLE',
    namespaceId: 'harry-potter-5',
    name: 'Harry Potter and the Order of the Phoenix',
    slug: 'harry-potter-5-en-kindle',
    priceRegular: 9.99,
    priceDiscount: 5.99,
    images: ['img/kindle/harry-potter-5/en/00.webp'],
    langAvailable: ['en', 'uk'],
    lang: 'en',
    author: 'J.K. Rowling',
    publicationYear: 2014,
    publication: 'Bloomsbury Publishing',
    description: [
      'In his fifth year at Hogwarts, Harry faces his darkest challenges yet: after a chilling Dementor attack on his cousin Dudley, he conjures a Patronus and lands in hot water with the Ministry of Magic.',
      'Meanwhile, the secret Order of the Phoenix rallies to fight Voldemort’s rise, while Hogwarts is taken over by the tyrannical Professor Umbridge. Tensions escalate as prophecy, politics, and personal loyalties collide.',
    ],
    categories: ['Fantasy', "Children's literature", 'Young adult'],
    kindleDetails: {
      bookId: 'kindle-harry-potter-5-en',
      numberOfPages: 816,
      format: '2.5 MB',
      illustrations: false,
    },
  };

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
      {/* {books.map((book: BookWithDetails) => ( */}
      <CardItem
        book={testBook}
        className={pageSize === 9 ? 'md:w-[300px] sm:w-[272px]' : ''}
      />
      {/* ))} */}
    </div>
  );
};

export default BooksList;
