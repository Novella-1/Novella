import React, { FC } from 'react';
import { cn } from '@/lib/utils';
import BookListSkeletonItem from '../CardItem/BookListSkeletonItem';

type Props = {
  pageSize: number;
};

const BookListSkeleton: FC<Props> = ({ pageSize }) => {
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
      )}
    >
      {Array.from({ length: pageSize })
        .fill('')
        .map((_, index) => {
          return <BookListSkeletonItem key={index} />;
        })}
    </div>
  );
};

export default BookListSkeleton;
