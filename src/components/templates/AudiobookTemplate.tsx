import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';
import { FilterBooksParams } from '@/app/paper/page';
import { BackgroundText } from '@/components/common/BackgroundText';
import BooksList from '@/components/common/BooksList/BooksList';
import Pagination from '@/components/common/Pagination/Pagination';
import { FilteringSection } from '@/components/layout/FilteringSection/FilteringSection';
import { TypographyH1, TypographyP } from '@/components/ui/custom/typography';
import { fetchBooks } from '@/lib/fetchBooks';
import { getBooksQuantityByType } from '@/server/books';
import { PageSize, SortOrder, SortType } from '@/types/BookType';

type Props = {
  searchParams: Promise<FilterBooksParams>;
};

const AudiobookTemplate = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const sortBy = (params.sortBy as SortType) || 'name';
  const sortOrder = (params.sortOrder as SortOrder) || 'asc';
  const page = params.page ? Number(params.page) : 1;
  const pageSize = (params.pageSize ? Number(params.pageSize) : 16) as PageSize;

  const totalCount = await getBooksQuantityByType('AUDIOBOOK');

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['books', 'AUDIOBOOK', page, pageSize, sortBy, sortOrder],
    queryFn: () =>
      fetchBooks({
        type: 'AUDIOBOOK',
        page,
        pageSize,
        sortBy,
        sortOrder,
      }),
  });

  return (
    <div className="pt-24 pb-10">
      <BackgroundText />
      <div className="relative z-10">
        <div className="mb-10">
          <TypographyH1 className="text-custom-primary-text mb-2">
            Audiobooks
          </TypographyH1>

          <TypographyP className="text-custom-primary-text">
            {totalCount} books
          </TypographyP>
        </div>

        <FilteringSection className="mb-6" />

        <HydrationBoundary state={dehydrate(queryClient)}>
          <BooksList
            className="mb-10"
            type="AUDIOBOOK"
            page={page}
            pageSize={pageSize}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </HydrationBoundary>

        <Pagination
          page={page}
          pageSize={pageSize}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
};

export default AudiobookTemplate;
