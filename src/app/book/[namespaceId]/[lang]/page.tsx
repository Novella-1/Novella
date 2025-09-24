import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { PageWrapper } from '@/components/common/PageWrapper';
import { BookDetailsTemplate } from '@/components/templates/BookDetailsTemplate';
import { fetchBook } from '@/services/fetchBooks';
import { BookWithDetails } from '@/types/BookType';

type Props = {
  params: {
    namespaceId: string;
    lang: string;
  };

  searchParams?: { [key: string]: string | string[] | undefined };
};

async function BookDetailPage({ params, searchParams }: Props) {
  const { namespaceId, lang } = await params;

  const type = (await searchParams?.type) as string;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['BOOK', namespaceId, lang, type],
    queryFn: () => fetchBook(namespaceId, lang, type),
  });

  const initialBook = queryClient.getQueryData<BookWithDetails>([
    'BOOK',
    namespaceId,
    lang,
    type,
  ]);

  if (!initialBook) {
    return <div>Book not found</div>;
  }

  return (
    <PageWrapper>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BookDetailsTemplate initialBook={initialBook} />
      </HydrationBoundary>
    </PageWrapper>
  );
}

export default BookDetailPage;
