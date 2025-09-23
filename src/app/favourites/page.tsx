import React from 'react';
import { PageWrapper } from '@/components/common/PageWrapper';
import FavoritesTemplate from '@/components/templates/FavoritesTemplate';
import { SortOrder, SortType } from '@/types/BookType';

export type FavouritesParams = {
  sortBy?: SortType;
  sortOrder?: SortOrder;
  page?: string;
  pageSize?: string;
};

const FavouritesPage = ({
  searchParams,
}: {
  searchParams: Promise<FavouritesParams>;
}) => {
  return (
    <PageWrapper>
      <FavoritesTemplate searchParams={searchParams} />
    </PageWrapper>
  );
};

export default FavouritesPage;
