import { Separator } from '@radix-ui/react-select';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ImageContainer } from '@/components/ui/custom/imageContainer';
import {
  TypographyB,
  TypographyH2,
  TypographyH3,
  TypographyH5,
  TypographyP,
} from '@/components/ui/custom/typography';
import { cn } from '@/lib/utils';
import { AddToFavorite } from '../CardItem/AddToFavorite';

interface BookInfoProps {
  className?: string;
  categories?: string[];
  author?: string;
  coverType?: string | null;
  numberOfPages?: number | null;
  publicationYear?: number | null;
  priceRegular?: number | null;
  priceDiscount?: number | null;
}

export function BookInfo({
  className,
  categories,
  author,
  coverType,
  numberOfPages,
  publicationYear,
  priceRegular,
  priceDiscount,
  ...props
}: BookInfoProps) {
  return (
    <div
      className={cn(className)}
      {...props}
    >
      <ImageContainer className="flex gap-4 flex-col w-full rounded-[14px] sm:w-full sm:rounded-[20px] xl:w-full xl:h-full py-4 px-3 sm:py-6 sm:px-12 xl:py-7 xl:px-8 bg-custom-header-footer border-1 border-custom-border">
        <div>
          <TypographyH5 className="mb-2">Category</TypographyH5>
          <div className="inline-flex py-[5px] px-[10px] bg-custom-button-bg border border-custom-border rounded-[8px] bg-custom-primary-bg">
            <div className="overflow-y-auto max-h-11">
              {categories?.length ?
                <TypographyP>
                  {categories.map((cat, index) => (
                    <React.Fragment key={cat}>
                      {cat}
                      {index < categories.length - 1 && ', '}
                    </React.Fragment>
                  ))}
                </TypographyP>
              : <TypographyP>-</TypographyP>}
            </div>
          </div>
        </div>
        <Separator className="border-1 border-custom-separator" />
        <div>
          <TypographyH5 className="mb-2">Select language</TypographyH5>
          <div className="flex gap-2">
            <Button className="bg-custom-button hover:bg-custom-hover-button">
              <TypographyB>UA</TypographyB>
            </Button>
            <Button className="bg-custom-primary-bg border border-custom-border">
              <TypographyB className="text-custom-button-text">ENG</TypographyB>
            </Button>
          </div>
        </div>
        <Separator className="border-1 border-custom-separator" />
        <div>
          <div className="flex gap-2 items-center mb-4">
            {priceDiscount ?
              <>
                <TypographyH2>${priceDiscount}</TypographyH2>
                <TypographyH3 className="line-through text-custom-border">
                  ${priceRegular}
                </TypographyH3>
              </>
            : <TypographyH2>${priceRegular ?? '-'}</TypographyH2>}
          </div>
          <div className="flex gap-2 mb-6">
            <Button className="flex-1 h-10 bg-custom-button hover:bg-custom-hover-button">
              <TypographyB>Add to cart</TypographyB>
            </Button>
            <AddToFavorite />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between w-full">
              <TypographyP className="text-custom-icons">Author</TypographyP>
              <TypographyP>{author}</TypographyP>
            </div>
            <Separator className="border-1 border-custom-separator" />
            <div className="flex justify-between w-full">
              <TypographyP className="text-custom-icons">
                Cover type
              </TypographyP>
              <TypographyP>{coverType || '-'}</TypographyP>
            </div>
            <Separator className="border-1 border-custom-separator" />
            <div className="flex justify-between w-full">
              <TypographyP className="text-custom-icons">
                Number of pages
              </TypographyP>
              <TypographyP>{numberOfPages || '-'}</TypographyP>
            </div>
            <Separator className="border-1 border-custom-separator" />
            <div className="flex justify-between w-full">
              <TypographyP className="text-custom-icons">
                Year of publication
              </TypographyP>
              <TypographyP>{publicationYear || '-'}</TypographyP>
            </div>
          </div>
        </div>
      </ImageContainer>
    </div>
  );
}
