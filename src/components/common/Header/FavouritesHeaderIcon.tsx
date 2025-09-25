'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { getLocalFavourites } from '@/lib/localStorage';
import { fetchFavouritesIds } from '@/services/fetchFavourites';

type Props = {
  userId?: string;
};

export const FavouritesHeaderIcon = ({ userId }: Props) => {
  const queryClient = useQueryClient();
  const [localFavsCount, setLocalFavsCount] = useState(0);

  useEffect(() => {
    if (userId) return;

    const updateCount = () => {
      setLocalFavsCount(getLocalFavourites().length);
    };

    updateCount();

    const handleStorageChange = () => {
      updateCount();
    };

    const handleCustomEvent = () => {
      updateCount();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('favouritesUpdated', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favouritesUpdated', handleCustomEvent);
    };
  }, [userId, queryClient]);

  const { data: serverCount = 0 } = useQuery({
    queryKey:
      userId ? ['FAVOURITES_COUNT', userId] : ['LOCAL_FAVOURITES_COUNT'],
    queryFn: async () => {
      if (userId) {
        const { data } = await fetchFavouritesIds(userId);
        return data.length;
      }
      return getLocalFavourites().length;
    },
    staleTime: 30 * 1000,
    gcTime: 2 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const displayCount = userId ? serverCount : localFavsCount;

  return (
    <Link
      href="/favourites"
      aria-label="Favourites"
      className="relative flex items-center justify-center text-custom-icons hover:text-custom-icons-hover transition-colors"
    >
      <HeartIcon className="w-4 h-4 xl:w-6 xl:h-6" />
      {displayCount > 0 && (
        <Badge
          className="absolute -top-1 -right-2  xl:-right-2 h-5 min-w-5 rounded-full px-0.5 font-mono tabular-nums flex items-center justify-center text-xs md:h-3 md:min-w-3 md:text-[8px] xl:h-5 xl:min-w-5 xl:text-xs md:-right-1"
          variant="destructive"
        >
          {displayCount > 9 ? '9+' : displayCount}
        </Badge>
      )}
    </Link>
  );
};
