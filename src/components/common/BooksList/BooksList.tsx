import React, { FC } from 'react';
import { CardItem } from '@/components/common/CardItem';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

const BooksList: FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex flex-row flex-wrap gap-y-10 gap-x-4', className)}>
      {Array.from({ length: 16 }).map((_, index) => {
        return <CardItem key={index} />;
      })}
    </div>
  );
};

export default BooksList;
