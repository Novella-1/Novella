import React from 'react';
import { FilterBooksParams } from '@/app/paper/page';
import BooksList from '@/components/common/BooksList/BooksList';
import Pagination from '@/components/common/Pagination/Pagination';
import { TypographyH1, TypographyP } from '@/components/ui/custom/typography';
import { getBookBySlug, getBooks } from '@/server/books';
import { PageSize, SortOrder, SortType } from '@/types/BookType';
import { FilteringSection } from '../layout/FilteringSection/FilteringSection';

type Props = {
  searchParams: Promise<FilterBooksParams>;
};

const PaperTemplate = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const sortBy = (params.sortBy as SortType) || 'name';
  const sortOrder = (params.sortOrder as SortOrder) || 'asc';
  const page = params.page ? Number(params.page) : 1;
  const pageSize = (params.pageSize ? Number(params.pageSize) : 16) as PageSize;

  const [books, totalCount] = await getBooks({
    type: 'PAPERBACK',
    page: page,
    pageSize: pageSize,
    sortBy: sortBy,
    sortOrder: sortOrder,
  });
  console.log(books);

  const bookWithDetails = await getBookBySlug(
    'codependent-no-more-en-audiobook',
  );

  console.log('BOOK WITH DETAILS!!!!', bookWithDetails);

  return (
    <div className="py-16">
      <div className="mb-10">
        <TypographyH1 className="text-custom-text-primary mb-2">
          Paper books
        </TypographyH1>
        <TypographyP className="text-custom-text-secondary">
          {totalCount} books
        </TypographyP>
      </div>

      <FilteringSection className="mb-6" />
      <BooksList className="mb-10" />

      <Pagination
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
      />
    </div>
  );
};

export default PaperTemplate;
