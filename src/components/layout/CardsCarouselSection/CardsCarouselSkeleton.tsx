import React, { FC } from 'react';
import { cn } from '@/lib/utils';
import BookListSkeletonItem from '../../common/CardItem/BookListSkeletonItem';

const CardsCarouselSkeleton: FC = () => {
  return (
    <div
      className={cn('flex flex-row gap-4 overflow-x-auto scrollbar-hide mb-16')}
    >
      {Array.from({ length: 4 })
        .fill('')
        .map((_, index) => {
          return <BookListSkeletonItem key={index} />;
        })}
    </div>
  );
};

export default CardsCarouselSkeleton;
