import { PageWrapper } from '@/components/common/PageWrapper';
import { BookDetailsTemplate } from '@/components/templates/BookDetailsTemplate';
import { fetchBook } from '@/services/fetchBooks';

type Props = {
  params: {
    namespaceId: string;
    lang: string;
  };
};

async function BookDetailPage({ params }: Props) {
  const book = await fetchBook(params.namespaceId, params.lang);

  return (
    <PageWrapper>
      <BookDetailsTemplate initialBook={book} />
    </PageWrapper>
  );
}

export default BookDetailPage;
