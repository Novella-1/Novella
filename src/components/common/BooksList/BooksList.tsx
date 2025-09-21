'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import React from 'react';

import { cn } from '@/lib/utils';
import { fetchBooks } from '@/services/fetchBooks';
import {
  BookType,
  PageSize,
  SortType,
  SortOrder,
  BookWithDetails,
} from '@/types/BookType';
import { CardItem } from '../CardItem/CardItem';
import BookListSkeleton from './BookListSkeleton';

type Props = {
  className?: string;
  type: BookType;
  page: number;
  pageSize: PageSize;
  sortBy: SortType;
  sortOrder: SortOrder;
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const BooksList = ({
  className,
  type,
  page,
  pageSize,
  sortBy,
  sortOrder,
}: Props) => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: [type, page, pageSize, sortBy, sortOrder],
    queryFn: () => fetchBooks({ type, page, pageSize, sortBy, sortOrder }),
  });

  if (isLoading || isFetching) {
    return <BookListSkeleton pageSize={pageSize} />;
  }

  if (error) {
    throw new Error('Books loading error');
  }

  return (
    <motion.div
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
      variants={container}
      initial="hidden"
      animate="show"
    >
      {data?.map((book: BookWithDetails) => (
        <motion.div
          key={book.slug}
          variants={item}
        >
          <CardItem
            key={book.slug}
            book={book}
            className={pageSize === 9 ? 'md:w-[300px] sm:w-[272px]' : ''}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BooksList;
