import {
  BookWithDetails,
  PageSize,
  SortOrder,
  SortType,
} from '@/types/BookType';

type Props = {
  userId: string;
  page: number;
  pageSize: PageSize;
  sortBy: SortType;
  sortOrder: SortOrder;
};

type FavouritesResponse = {
  data: BookWithDetails[];
  totalCount: number;
};

export async function fetchFavourites({
  userId,
  page,
  pageSize,
  sortBy,
  sortOrder,
}: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/favourites/${userId}?` +
      new URLSearchParams({
        sortBy: sortBy.toString(),
        sortOrder: sortOrder.toString(),
        page: page.toString(),
        pageSize: pageSize.toString(),
      }),
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json() as Promise<FavouritesResponse>;
}

export const addToFavourites = async (userId: string, bookId: string) => {
  const res = await fetch('/api/favourites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, bookId }),
  });

  if (!res.ok) throw new Error('Failed to add favourite');
  return res.json();
};

export const removeFromFavourites = async (userId: string, bookId: string) => {
  const res = await fetch('/api/favourites', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, bookId }),
  });

  if (!res.ok) throw new Error('Failed to remove favourite');
  return res.json();
};
