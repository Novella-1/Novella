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

export async function fetchBooks(params: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/books?` +
      new URLSearchParams({
        type: params.type,
        page: params.page.toString(),
        pageSize: params.pageSize.toString(),
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
      }),
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json() as Promise<BookWithDetails[]>;
}

export async function getBooksQuantityByType(bookType: BookType) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/count?type=${bookType}`,
    {
      cache: 'no-store',
    },
  );
  if (!res.ok) throw new Error('Failed to fetch book');
  return res.json() as Promise<{ totalCount: number }>;
}

export async function fetchBook(namespaceId: string, lang: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${namespaceId}/${lang}`,
    {
      cache: 'no-store',
    },
  );
  if (!res.ok) throw new Error('Failed to fetch book');
  return res.json() as Promise<BookWithDetails>;
}
