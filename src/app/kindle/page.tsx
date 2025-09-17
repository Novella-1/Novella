import { PageWrapper } from '@/components/common/PageWrapper';
import KindleTemplate from '@/components/templates/KindleTemplate';
import { SortOrder, SortType } from '@/types/BookType';

export type FilterBooksParams = {
  sortBy?: SortType;
  sortOrder?: SortOrder;
  page?: string;
  pageSize?: string;
};

const KindlePage = ({
  searchParams,
}: {
  searchParams: Promise<FilterBooksParams>;
}) => {
  return (
    <PageWrapper>
      <KindleTemplate searchParams={searchParams} />
    </PageWrapper>
  );
};

export default KindlePage;
