'use client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Pagination from '@/components/common/Pagination/Pagination';
import { HeartIcon } from '@/components/ui/custom/icons';
import { TypographyP } from '@/components/ui/custom/typography';
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

        await new Promise((resolve) => setTimeout(resolve, 500));
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
    staleTime: 0,
    refetchOnMount: 'always',
  });

  useEffect(() => {
    if (
      !isLoading &&
      !isFetching &&
      data &&
      data.data.length === 0 &&
      currentPage > 1
    ) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [data, isLoading, isFetching, currentPage]);

  if (isLoading || isFetching) {
    return (
      <BookListSkeleton
        pageSize={
          data?.totalCount !== undefined && data.totalCount < pageSize ?
            data.totalCount
          : pageSize
        }
      />
    );
  }

  if (error) {
    throw new Error('Favourites loading error');
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-8 text-custom-icons mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center justify-center w-[300px]">
          <HeartIcon className="mx-auto h-24 w-24 md:h-30 md:w-30 mb-4 opacity-50 stroke-1" />
          <TypographyP className="text-md">
            Your favourites list is empty
          </TypographyP>
          <TypographyP className="text-md text-center mt-2">
            Add some books to your favourites to see them here!
          </TypographyP>
        </div>
      </motion.div>
    );
  }

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
      {(data?.totalCount ?? 0) > 0 && (
        <Pagination
          page={page}
          pageSize={pageSize}
          totalCount={data?.totalCount ?? 0}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      )}
    </>
  );
};

export default FavouritesList;
