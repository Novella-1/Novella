import React, { Suspense } from 'react';
import { FilterBooksParams } from '@/app/paper/page';
import BookListSkeleton from '@/components/common/BooksList/BookListSkeleton';
import BooksList from '@/components/common/BooksList/BooksList';
import Pagination from '@/components/common/Pagination/Pagination';
import { FilteringSection } from '@/components/layout/FilteringSection/FilteringSection';
import { TypographyH1, TypographyP } from '@/components/ui/custom/typography';
import { getBooksQuantityByType } from '@/server/books';
import { PageSize, SortOrder, SortType } from '@/types/BookType';

type Props = {
  searchParams: Promise<FilterBooksParams>;
};

const KindleTemplate = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const sortBy = (params.sortBy as SortType) || 'name';
  const sortOrder = (params.sortOrder as SortOrder) || 'asc';
  const page = params.page ? Number(params.page) : 1;
  const pageSize = (params.pageSize ? Number(params.pageSize) : 16) as PageSize;

  const totalCount = await getBooksQuantityByType('KINDLE');

  return (
    <div className="pt-24 pb-10">
      <div className="mb-10">
        <TypographyH1 className="text-custom-primary-text mb-2">
          Kindle
        </TypographyH1>

        <TypographyP className="text-custom-primary-text">
          {totalCount} books
        </TypographyP>
      </div>

      <FilteringSection className="mb-6" />

      <Suspense fallback={<BookListSkeleton pageSize={pageSize} />}>
        <BooksList
          className="mb-10"
          type="KINDLE"
          page={page}
          pageSize={pageSize}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
      </Suspense>

      <Pagination
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
      />
    </div>
  );
};

export default KindleTemplate;
