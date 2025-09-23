'use client';

import { useQuery } from '@tanstack/react-query';
import { getLocalFavourites } from '@/lib/localStorage';
import { fetchFavouritesIds } from '@/services/fetchFavourites';

type Props = {
  initialCount: number;
  userId?: string;
};

export const FavouritesItemsCounter = ({ initialCount, userId }: Props) => {
  const { data: count } = useQuery({
    queryKey:
      userId ? ['FAVOURITES_COUNT', userId] : ['LOCAL_FAVOURITES_COUNT'],
    queryFn: async () => {
      if (userId) {
        const { data } = await fetchFavouritesIds(userId);
        return data.length;
      } else {
        return getLocalFavourites().length;
      }
    },
    initialData: initialCount,
    enabled: userId ? !!userId : true,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  return <span>{count} books</span>;
};
