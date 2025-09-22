'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { getBookBySlug } from '@/server/books';
import type { BookWithDetails } from '@/types/BookType';
import { BookAbout } from '../common/Details/BookAbout';
import { BookCharacteristics } from '../common/Details/BookCharacteristics';
import { BookDetailsSkeleton } from '../common/Details/BookDetailsSkeleton';
import { BookInfo } from '../common/Details/BookInfo';
import { BookPhotoContainer } from '../common/Details/BookPhotosContainers';
import { CardsCarouselSection } from '../layout/CardsCarouselSection/CardsCarouselSection';
import { TypographyH2, TypographyP } from '../ui/custom/typography';

interface BookDetailsTemplateProps {
  className?: string;
  slug: string;
}

export function BookDetailsTemplate({
  className,
  slug,
}: BookDetailsTemplateProps) {
  const [bookWithDetails, setBookWithDetails] =
    useState<BookWithDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 1500));
      const data = await getBookBySlug(slug);
      setBookWithDetails(data ?? null);
      setLoading(false);
    }
    fetchBook();
  }, [slug]);

  if (loading) {
    return <BookDetailsSkeleton className={className} />;
  }

  if (!bookWithDetails) return null;

  return (
    <div className={cn(className)}>
      <div className="pt-32 pb-16">
        <div className="mb-8">
          <div className="mb-8">
            <TypographyH2 className="mb-1.5">
              {bookWithDetails.name}
            </TypographyH2>
            <TypographyP>{bookWithDetails.author}</TypographyP>
          </div>

          <div className="flex flex-col gap-4 sm:flex-col sm:gap-[34px] xl:flex-row xl:gap-[88px] xl:h-[524px] xl:items-start">
            <BookPhotoContainer images={bookWithDetails.images} />
            <BookInfo
              className="xl:h-full"
              categories={bookWithDetails.categories}
              author={bookWithDetails.author}
              coverType={bookWithDetails.paperDetails?.coverType}
              numberOfPages={bookWithDetails.paperDetails?.numberOfPages}
              publicationYear={bookWithDetails.publicationYear}
              priceRegular={bookWithDetails.priceRegular}
              priceDiscount={bookWithDetails.priceDiscount}
            />
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-10 xl:gap-[88px] mb-20">
          <BookAbout
            className="xl:max-w-[560px]"
            description={bookWithDetails.description}
          />
          <BookCharacteristics
            className="xl:flex-1"
            author={bookWithDetails.author}
            coverType={bookWithDetails.paperDetails?.coverType}
            numberOfPages={bookWithDetails.paperDetails?.numberOfPages}
            publicationYear={bookWithDetails.publicationYear}
            publication={bookWithDetails.publication}
            format={bookWithDetails.paperDetails?.format}
            lang={bookWithDetails.lang}
            illustrations={bookWithDetails.paperDetails?.illustrations}
          />
        </div>
        <CardsCarouselSection />
      </div>
    </div>
  );
}
