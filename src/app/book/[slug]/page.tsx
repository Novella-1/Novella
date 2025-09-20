import { PageWrapper } from '@/components/common/PageWrapper';
import { BookDetailsTemplate } from '@/components/templates/BookDetailsTemplate';

type Props = {
  params: {
    slug: string;
  };
};

function BookDetailPage({ params }: Props) {
  return (
    <PageWrapper>
      <BookDetailsTemplate slug={params.slug} />
    </PageWrapper>
  );
}

export default BookDetailPage;
