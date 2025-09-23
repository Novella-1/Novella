'use client';

import { useQuery } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { getLocalFavourites } from '@/lib/localStorage';
import { fetchFavouritesIds } from '@/services/fetchFavourites';

type Props = {
  userId?: string;
};

export const FavouritesHeaderIcon = ({ userId }: Props) => {
  const { data: count = 0 } = useQuery({
    queryKey:
      userId ? ['FAVOURITES_COUNT', userId] : ['LOCAL_FAVOURITES_COUNT'],
    queryFn: async () => {
      if (userId) {
        const { data } = await fetchFavouritesIds(userId);
        return data.length;
      }
      return getLocalFavourites().length;
    },
    staleTime: 60 * 1000,
  });

  return (
    <Link
      href="/favourites"
      aria-label="Favourites"
      className="relative flex items-center justify-center text-custom-icons"
    >
      <HeartIcon className="w-4 h-4 xl:w-6 xl:h-6" />
      {count > 0 && (
        <Badge
          className="absolute -top-1 -right-2 h-5 min-w-5 rounded-full px-0.5 font-mono tabular-nums"
          variant="destructive"
        >
          {count > 9 ? '9+' : count}
        </Badge>
      )}
    </Link>
  );
};
