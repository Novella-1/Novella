import React from 'react';
import { Skeleton } from '../ui/skeleton';

const BookListSkeletonItem = () => {
  return (
    <div className="flex flex-col items-start gap-4 w-[214px] h-[400px] p-5 rounded-2xl border border-custom-border-color bg-custom-primary/10 sm:w-[272px] sm:h-[506px] sm:p-8 animate-pulse">
      <div className="relative w-full flex justify-center">
        <Skeleton className="w-full h-[180px] sm:h-[250px] rounded-lg" />
        <div className="absolute top-1 right-1 w-10 h-10">
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full overflow-hidden">
        <Skeleton className="h-5 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md" />
      </div>

      <div className="flex flex-col gap-0.5 w-full">
        <div className="flex flex-row gap-2">
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="h-5 w-12 rounded-md" />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>
      </div>

      <div className="flex flex-row gap-2 justify-between w-full">
        <Skeleton className="flex-1 h-10 rounded-md" />
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>
    </div>
  );
};

export default BookListSkeletonItem;
