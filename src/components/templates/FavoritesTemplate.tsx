import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';
import { FavouritesParams } from '@/app/favourites/page';
import Pagination from '@/components/common/Pagination/Pagination';
import { auth } from '@/lib/auth';
import { fetchFavourites } from '@/services/fetchFavourites';
import { PageSize } from '@/types/BookType';
import FavouritesList from '../common/FavouritesList/FavouritesList';
import { FilteringSection } from '../layout/FilteringSection/FilteringSection';
import { BackgroundText } from '../ui/backgroundText';
import { TypographyH1, TypographyP } from '../ui/custom/typography';

type Props = {
  searchParams: Promise<FavouritesParams>;
};

const FavoritesTemplate = async ({ searchParams }: Props) => {
  const queryClient = new QueryClient();
  const session = await auth();
  const userId = session?.user?.id;

  const params = await searchParams;

  const page = params.page ? Number(params.page) : 1;
  const pageSize = (params.pageSize ? Number(params.pageSize) : 16) as PageSize;
  const sortBy = params.sortBy || 'name';
  const sortOrder = params.sortOrder || 'desc';

  let totalCount = 2;

  if (userId) {
    await queryClient.prefetchQuery({
      queryKey: ['FAVOURITES', userId, page, pageSize, sortBy, sortOrder],
      queryFn: async () => {
        const result = await fetchFavourites({
          userId,
          page,
          pageSize,
          sortBy,
          sortOrder,
        });
        totalCount = result.totalCount;
        return result;
      },
    });
  }

  return (
    <div className="pt-24 pb-10">
      <BackgroundText />
      <div className="relative z-10">
        <div className="mb-10">
          <TypographyH1 className="text-custom-primary-text mb-2">
            Favourites
          </TypographyH1>

          <TypographyP className="text-custom-primary-text">
            {totalCount ?? 0} books
          </TypographyP>
        </div>
        <FilteringSection className="mb-6" />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FavouritesList
            userId={userId}
            page={page}
            pageSize={pageSize}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </HydrationBoundary>
        {/* 
        <Pagination
          page={page}
          pageSize={pageSize}
          totalCount={totalCount}
        /> */}
      </div>
    </div>
  );
};

export default FavoritesTemplate;
