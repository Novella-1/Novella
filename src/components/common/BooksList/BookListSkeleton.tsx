import React, { FC } from 'react';
import { cn } from '@/lib/utils';
import BookListSkeletonItem from '../BookListSkeletonItem';

type Props = {
  pageSize: number;
};

const BookListSkeleton: FC<Props> = ({ pageSize }) => {
  return (
    <div
      className={cn(
        'flex flex-row flex-wrap gap-y-10 gap-x-4 sm:items-center justify-evenly',
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
