'use client';

import { QueryClient, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BookAbout } from '@/components/common/Details/BookAbout';
import { BookCharacteristics } from '@/components/common/Details/BookCharacteristics';
import { BookDetailsSkeleton } from '@/components/common/Details/BookDetailsSkeleton';
import { BookInfo } from '@/components/common/Details/BookInfo';
import { BookPhotoContainer } from '@/components/common/Details/BookPhotosContainers';
import { TypographyH2, TypographyP } from '@/components/ui/custom/typography';
import { fetchBook } from '@/services/fetchBooks';
import { BookWithDetails } from '@/types/BookType';

type Props = {
  initialBook: BookWithDetails;
};

const BookDetailsSection = ({ initialBook }: Props) => {
  const [lang, setLang] = React.useState(initialBook.lang);

  const {
    data: bookWithDetails,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['book', initialBook.namespaceId, lang],
    queryFn: () => fetchBook(initialBook.namespaceId, lang),
    initialData: lang === initialBook.lang ? initialBook : undefined,
  });

  const switchLang = (newLang: string) => {
    setLang(newLang);
    const newUrl = `/book/${initialBook.namespaceId}/${newLang}`;
    // for sharing
    window.history.replaceState(null, '', newUrl);
  };

  if (isLoading || isFetching) {
    return <BookDetailsSkeleton />;
  }

  return (
    <div className="pt-24 pb-16">
      <div className="mb-8">
        <div className="mb-8">
          <TypographyH2 className="mb-3">{bookWithDetails?.name}</TypographyH2>
          <TypographyP>{bookWithDetails?.author}</TypographyP>
        </div>

        <div className="flex flex-col gap-4 md:gap-[34px] xl:flex-row xl:gap-[88px] xl:h-[524px] xl:items-start">
          <BookPhotoContainer images={bookWithDetails?.images} />
          <BookInfo
            className="xl:h-full"
            categories={bookWithDetails?.categories}
            author={bookWithDetails?.author}
            coverType={bookWithDetails?.paperDetails?.coverType}
            numberOfPages={bookWithDetails?.paperDetails?.numberOfPages}
            publicationYear={bookWithDetails?.publicationYear}
            priceRegular={bookWithDetails?.priceRegular}
            priceDiscount={bookWithDetails?.priceDiscount}
            lang={bookWithDetails?.lang}
            langAvailable={bookWithDetails?.langAvailable}
            handleLangChange={switchLang}
          />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-10 xl:gap-[88px] mb-20">
        <BookAbout
          className="xl:max-w-[560px]"
          description={bookWithDetails?.description}
        />
        <BookCharacteristics
          className="xl:flex-1"
          author={bookWithDetails?.author}
          coverType={bookWithDetails?.paperDetails?.coverType}
          numberOfPages={bookWithDetails?.paperDetails?.numberOfPages}
          publicationYear={bookWithDetails?.publicationYear}
          publication={bookWithDetails?.publication}
          format={bookWithDetails?.paperDetails?.format}
          lang={bookWithDetails?.lang}
          illustrations={bookWithDetails?.paperDetails?.illustrations}
        />
      </div>
    </div>
  );
};

export default BookDetailsSection;
