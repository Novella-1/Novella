import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';
import { FilterBooksParams } from '@/app/paper/page';
import BooksList from '@/components/common/BooksList/BooksList';
import Pagination from '@/components/common/Pagination/Pagination';
import { FilteringSection } from '@/components/layout/FilteringSection/FilteringSection';
import { TypographyH1, TypographyP } from '@/components/ui/custom/typography';
import { fetchBooks, getBooksQuantityByType } from '@/services/fetchBooks';
import { PageSize, SortOrder, SortType } from '@/types/BookType';
import { BackgroundText } from '../ui/backgroundText';

type Props = {
  searchParams: Promise<FilterBooksParams>;
};

const KindleTemplate = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const sortBy = (params.sortBy as SortType) || 'name';
  const sortOrder = (params.sortOrder as SortOrder) || 'asc';
  const page = params.page ? Number(params.page) : 1;
  const pageSize = (params.pageSize ? Number(params.pageSize) : 16) as PageSize;

  const { totalCount } = await getBooksQuantityByType('KINDLE');

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['books', 'KINDLE', page, pageSize, sortBy, sortOrder],
    queryFn: () =>
      fetchBooks({
        type: 'KINDLE',
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
            Kindle
          </TypographyH1>

          <TypographyP className="text-custom-primary-text">
            {totalCount} books
          </TypographyP>
        </div>

        <FilteringSection className="mb-6" />

        <HydrationBoundary state={dehydrate(queryClient)}>
          <BooksList
            className="flex flex-wrap justify-items-start gap-4 mb-10"
            type="KINDLE"
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

export default KindleTemplate;
