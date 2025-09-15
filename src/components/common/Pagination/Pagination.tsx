import React from 'react';
import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

const AppPagination = () => {
  return (
    <UIPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className={cn(
              'border border-custom-border-color hover:border-1 hover:border-custom-border-color hover:bg-custom-border-color',
            )}
          />
        </PaginationItem>
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <PaginationItem key={index}>
              <PaginationLink
                href={`#page=${index + 1}`}
                isActive={index === 3}
                className={cn(
                  'border border-custom-border-color hover:border-1 hover:border-custom-border-color hover:bg-custom-border-color',
                  {
                    'bg-custom-primary text-white': index === 3,
                  },
                )}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            className={cn(
              'border border-custom-border-color hover:border-1 hover:border-custom-border-color hover:bg-custom-border-color',
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
};

export default AppPagination;
