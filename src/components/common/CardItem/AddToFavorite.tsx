'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
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
  const [localFav, setLocalFav] = useState(false);
  const [pending, setPending] = useState(false);

  const { data: favouritesIds = [] } = useQuery({
    queryKey: ['FAVOURITES_IDS', data?.user?.id],
    queryFn: () => {
      if (!data?.user?.id) return Promise.resolve([] as string[]);
      return fetchFavouritesIds(data.user.id).then((res) => res.data);
    },
    enabled: status === 'authenticated',
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    setLocalFav(isInLocalFavourites(book.slug));
  }, [book.slug]);

  const isFav =
    status === 'authenticated' ?
      favouritesIds.includes(String(book.id))
    : localFav;

  const notifyCountChange = () => {
    window.dispatchEvent(new CustomEvent('favouritesUpdated'));

    queryClient.invalidateQueries({
      queryKey: ['FAVOURITES_COUNT'],
    });
    queryClient.invalidateQueries({
      queryKey: ['LOCAL_FAVOURITES_COUNT'],
    });
  };

  const handleClick = async () => {
    if (pending) return;

    setPending(true);
    const newFavState = !isFav;
    const authKey = data?.user?.id ? ['FAVOURITES_IDS', data.user.id] : null;

    try {
      if (status === 'authenticated' && authKey) {
        queryClient.setQueryData<string[]>(authKey, (old = []) => {
          if (newFavState) {
            return old.includes(String(book.id)) ? old : (
                [...old, String(book.id)]
              );
          } else {
            return old.filter((id) => id !== String(book.id));
          }
        });
      } else {
        setLocalFav(newFavState);
        if (newFavState) {
          addToLocalFavourites(book);
        } else {
          removeFromLocalFavourites(book.slug);
        }
      }

      notifyCountChange();

      showToast(newFavState ? 'addToFav' : 'removeFromFav', name ?? book.name);

      if (status === 'authenticated' && data?.user?.id) {
        if (newFavState) {
          await addToFavourites(data.user.id, book.id);
        } else {
          await removeFromFavourites(data.user.id, book.id);
        }
      }

      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: ['FAVOURITES_IDS', data?.user?.id],
        }),
      ]);

      notifyCountChange();
    } catch (err) {
      console.error('Favourites error:', err);

      if (status === 'authenticated' && authKey) {
        queryClient.invalidateQueries({ queryKey: authKey });
      } else {
        setLocalFav(!newFavState);
        if (newFavState) {
          removeFromLocalFavourites(book.slug);
        } else {
          addToLocalFavourites(book);
        }
      }

      notifyCountChange();
    } finally {
      setPending(false);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        'flex items-center justify-center rounded-[8px] border border-custom-border w-10 h-10 hover:bg-custom-primary-bg cursor-pointer',
        pending && 'opacity-50 cursor-not-allowed',
        className,
      )}
      {...props}
    >
      <HeartButton
        isFav={isFav}
        onClick={handleClick}
        pending={pending}
      />
    </div>
  );
}
