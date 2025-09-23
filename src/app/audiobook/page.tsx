import { PageWrapper } from '@/components/common/PageWrapper';
import AudiobookTemplate from '@/components/templates/AudiobookTemplate';
import { SortOrder, SortType } from '@/types/BookType';

export type FilterBooksParams = {
  sortBy?: SortType;
  sortOrder?: SortOrder;
  page?: string;
  pageSize?: string;
};

const AudioBookPage = ({
  searchParams,
}: {
  searchParams: Promise<FilterBooksParams>;
}) => {
  return (
    <PageWrapper>
      <AudiobookTemplate searchParams={searchParams} />
    </PageWrapper>
  );
};

export default AudioBookPage;
