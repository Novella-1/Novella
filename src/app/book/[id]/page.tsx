import { PageWrapper } from '@/components/common/PageWrapper';
import { BookDetailsTemplate } from '@/components/templates/BookDetailsTemplate';

function BookDetailPage({ params }: { params: { id: string } }) {
  return (
    <PageWrapper>
      <BookDetailsTemplate />
    </PageWrapper>
  );
}

export default BookDetailPage;
