import React from 'react';
import { PageWrapper } from '@/components/common/PageWrapper';
import PaperTemplate from '@/components/templates/PaperTemplate';
import { SortOrder, SortType } from '@/types/BookType';

export type FilterBooksParams = {
  sortBy?: SortType;
  sortOrder?: SortOrder;
  page?: string;
  pageSize?: string;
};

const PaperPage = ({
  searchParams,
}: {
  searchParams: Promise<FilterBooksParams>;
}) => {
  return (
    <PageWrapper>
      <PaperTemplate searchParams={searchParams} />
    </PageWrapper>
  );
};

export default PaperPage;
