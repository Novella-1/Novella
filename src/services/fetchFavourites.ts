import {
  BookType,
  BookWithDetails,
  PageSize,
  SortOrder,
  SortType,
} from '@/types/BookType';

type Props = {
  type: BookType;
  page: number;
  pageSize: PageSize;
  sortBy: SortType;
  sortOrder: SortOrder;
};

export async function fetchFavourites(params: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/books?` +
      new URLSearchParams({
        type: params.type,
        page: params.page.toString(),
        pageSize: params.pageSize.toString(),
      }),
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json() as Promise<BookWithDetails[]>;
}

export const addToFavourites = async (userId: string, bookId: string) => {
  const res = await fetch('/api/favourites', {
    method: 'POST',
    body: JSON.stringify({ userId, bookId }),
  });
};
