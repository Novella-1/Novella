'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React, { FC } from 'react';
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

type Props = {
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange?: (newPage: number) => void;
};

const MAX_VISIBLE = 5;

const AppPagination: FC<Props> = ({
  page,
  pageSize,
  totalCount,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();

  function createHref(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    params.set('pageSize', pageSize.toString());
    return `?${params.toString()}`;
  }

  function goToPage(newPage: number) {
    if (onPageChange) {
      onPageChange(newPage);
      router.push(createHref(newPage));
    } else {
      router.push(createHref(newPage));
    }
    router.push(createHref(newPage));

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const pages: number[] = [];
  const start = Math.max(1, page - Math.floor(MAX_VISIBLE / 2));
  const end = Math.min(totalPages, start + MAX_VISIBLE - 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <UIPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createHref(page > 1 ? page - 1 : 1)}
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) goToPage(page - 1);
            }}
            className={cn(
              'border border-custom-border bg-custom-header-footer hover:border-1 hover:border-custom-border hover:bg-custom-border',
              { 'pointer-events-none opacity-50': page === 1 },
            )}
          />
        </PaginationItem>

        {start > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                href={createHref(1)}
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {start > 2 && <PaginationEllipsis />}
          </>
        )}

        {pages.map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              href={createHref(pageNum)}
              onClick={(e) => {
                e.preventDefault();
                goToPage(pageNum);
              }}
              isActive={pageNum === page}
              className={cn(
                'border border-custom-border bg-custom-header-footer hover:border-1 hover:border-custom-border hover:bg-custom-border',
                {
                  'bg-custom-button text-white': pageNum === page,
                },
              )}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationLink
                href={createHref(totalPages)}
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(totalPages);
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            href={createHref(page < totalPages ? page + 1 : totalPages)}
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) goToPage(page + 1);
            }}
            className={cn(
              'border border-custom-border bg-custom-header-footer hover:border-1 hover:border-custom-border hover:bg-custom-border',
              { 'pointer-events-none opacity-50': page === totalPages },
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
};

export default AppPagination;
