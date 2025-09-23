'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  addToLocalFavourites,
  isInLocalFavourites,
  removeFromLocalFavourites,
} from '@/lib/localStorage';
import { cn } from '@/lib/utils';
import {
  addToFavourites,
  fetchFavouritesIds,
  removeFromFavourites,
} from '@/services/fetchFavourites';
import { BookWithDetails } from '@/types/BookType';
import { showToast } from '../ShowToast';
import { HeartButton } from './HeartButton';

interface AddToFavoriteProps {
  className?: string;
  name?: string;
  book: BookWithDetails;
}

export function AddToFavorite({
  className,
  name,
  book,
  ...props
}: AddToFavoriteProps) {
  const queryClient = useQueryClient();
  const { data, status } = useSession();
  const [localFav, setLocalFav] = useState(isInLocalFavourites(book.slug));
  const [pending, setPending] = useState(false);

  const { data: favouritesIds = [], isLoading } = useQuery({
    queryKey: ['FAVOURITES_IDS', data?.user?.id],
    queryFn: () => {
      if (!data?.user?.id) return Promise.resolve([] as string[]);
      return fetchFavouritesIds(data.user.id).then((res) => res.data);
    },
    enabled: status === 'authenticated',
    staleTime: 60 * 1000,
    networkMode: 'always',
  });

  const isFav =
    !isLoading && status === 'authenticated' ?
      favouritesIds.includes(String(book.id))
    : localFav;

  const handleClick = async () => {
    if (pending) return;
    setPending(true);

    const authKey = data?.user?.id ? ['FAVOURITES_IDS', data.user.id] : null;

    if (isFav) {
      if (status === 'authenticated' && data?.user?.id && authKey) {
        const previous = queryClient.getQueryData<string[]>(authKey);

        queryClient.setQueryData<string[] | undefined>(authKey, (old) =>
          old ? old.filter((id) => id !== String(book.id)) : [],
        );

        showToast('removeFromFav', name ?? 'Unknown book');

        try {
          await removeFromFavourites(data.user.id, book.id);
          queryClient.invalidateQueries({ queryKey: ['FAVOURITES'] });
          queryClient.invalidateQueries({ queryKey: ['FAVOURITES_COUNT'] });
        } catch (err) {
          if (previous !== undefined)
            queryClient.setQueryData(authKey, previous);
          else queryClient.invalidateQueries({ queryKey: authKey });
          console.error('removeFromFavourites error', err);
        }
      } else {
        removeFromLocalFavourites(book.slug);
        setLocalFav(false);
        showToast('removeFromFav', name ?? 'Unknown book');
        queryClient.invalidateQueries({ queryKey: ['FAVOURITES'] });
        queryClient.invalidateQueries({ queryKey: ['LOCAL_FAVOURITES_COUNT'] });
      }
    } else {
      if (status === 'authenticated' && data?.user?.id && authKey) {
        const previous = queryClient.getQueryData<string[]>(authKey);
        const idStr = String(book.id);

        queryClient.setQueryData<string[] | undefined>(authKey, (old) => {
          if (!old) return [idStr];
          if (old.includes(idStr)) return old;
          return [...old, idStr];
        });

        showToast('addToFav', name ?? 'Unknown book');

        try {
          await addToFavourites(data.user.id, book.id);
          queryClient.invalidateQueries({ queryKey: authKey });
          queryClient.invalidateQueries({ queryKey: ['FAVOURITES'] });
          queryClient.invalidateQueries({ queryKey: ['FAVOURITES_COUNT'] });
        } catch (err) {
          if (previous !== undefined)
            queryClient.setQueryData(authKey, previous);
          else queryClient.invalidateQueries({ queryKey: authKey });
          console.error('addToFavourites error', err);
        }
      } else {
        addToLocalFavourites(book);
        setLocalFav(true);
        showToast('addToFav', name ?? 'Unknown book');
        queryClient.invalidateQueries({ queryKey: ['FAVOURITES'] });
        queryClient.invalidateQueries({ queryKey: ['LOCAL_FAVOURITES_COUNT'] });
      }
    }

    setPending(false);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        'flex items-center justify-center rounded-[8px] border border-custom-border w-10 h-10 hover:bg-custom-primary-bg cursor-pointer',
        className,
      )}
      {...props}
    >
      <HeartButton
        isFav={isFav}
        onClick={handleClick}
        disabled={pending}
      />
    </div>
  );
}
