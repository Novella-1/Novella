'use client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Pagination from '@/components/common/Pagination/Pagination';
import { getLocalFavourites } from '@/lib/localStorage';
import { cn } from '@/lib/utils';
import { fetchFavourites } from '@/services/fetchFavourites';
import {
  BookWithDetails,
  PageSize,
  SortOrder,
  SortType,
} from '@/types/BookType';
import BookListSkeleton from '../BooksList/BookListSkeleton';
import { CardItem } from '../CardItem/CardItem';

type Props = {
  userId?: string;
  page: number;
  pageSize: PageSize;
  sortBy: SortType;
  sortOrder: SortOrder;
  className?: string;
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

const FavouritesList = ({
  page,
  pageSize,
  userId,
  className,
  sortBy,
  sortOrder,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(page);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['FAVOURITES', userId, currentPage, pageSize, sortBy, sortOrder],
    queryFn: async () => {
      if (!userId) {
        const localFavs = getLocalFavourites();
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        return {
          data: localFavs.slice(start, end),
          totalCount: localFavs.length,
        };
      }

      return await fetchFavourites({
        userId,
        page: currentPage,
        pageSize,
        sortBy,
        sortOrder,
      });
    },
  });

  if (isLoading || isFetching) {
    return <BookListSkeleton pageSize={pageSize} />;
  }

  if (error) {
    throw new Error('Favourites loading error');
  }

  console.log(data);

  return (
    <>
      <motion.div
        className={cn(
          'flex flex-row flex-wrap gap-y-10 sm:items-center justify-evenly mb-10',
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
        {data?.data?.map((book: BookWithDetails) => (
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
      <Pagination
        page={page}
        pageSize={pageSize}
        totalCount={data?.totalCount ?? 0}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </>
  );
};

export default FavouritesList;
