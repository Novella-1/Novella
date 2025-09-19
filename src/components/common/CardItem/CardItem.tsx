import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BookWithDetails } from '@/types/BookType';
import { Button } from '../../ui/button';
import { TruckIcon, HeadphonesIcon } from '../../ui/custom/icons';
import { BookImage } from '../../ui/custom/image';
import {
  TypographyB,
  TypographyH3,
  TypographyH4,
  TypographyP,
} from '../../ui/custom/typography';
import { AddToFavorite } from './AddToFavorite';
import CardItemTitle from './CardItemTitle';

export function CardItem({
  book,
  className,
}: {
  book: BookWithDetails;
  className?: string;
}) {
  const { author, name, priceRegular, priceDiscount, images, type, slug } =
    book;

  return (
    <Card
      className={cn(
        'flex flex-col items-start gap-4 w-[214px] h-[400px] p-5 rounded-2xl border border-custom-border bg-custom-header-footer sm:w-[272px] sm:h-[506px] sm:p-8 transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:shadow-[0_2px_16px_0_rgba(0,0,0,0.10)]',
        className,
      )}
    >
      <div className="relative w-full flex justify-center">
        <BookImage
          src={`/books/${images[0]}`}
          bookSlug={slug}
        />
        {type === 'AUDIOBOOK' && (
          <div className="absolute flex items-center justify-center top-1 right-1 w-10 h-10 bg-custom-icons-accent rounded-full p-1">
            <HeadphonesIcon className="w-6 h-6 text-white " />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full overflow-hidden">
        <div>
          <CardItemTitle bookSlug={slug}>{name}</CardItemTitle>
          <TypographyP className="text-custom-icons truncate w-full">
            {author}
          </TypographyP>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-row gap-2">
            {priceDiscount !== null ?
              <>
                <TypographyH3>
                  ${(priceRegular - (priceDiscount ?? 0)).toFixed(2)}
                </TypographyH3>
                <TypographyH4 className="line-through decoration-1 text-custom-icons">
                  ${priceRegular}
                </TypographyH4>
              </>
            : <TypographyH3>${priceRegular.toFixed(2)}</TypographyH3>}
          </div>
          <div className="flex flex-row gap-2">
            <TruckIcon className="w-5 h-5 text-custom-icons-accent" />
            <TypographyB className="text-custom-icons-accent">
              In stock
            </TypographyB>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-between w-full">
        <Button className="flex-1 h-10 cursor-pointer bg-custom-button hover:bg-custom-hover-button transition-shadow duration-200 hover:shadow-[0_1px_10px_0_rgba(23,32,49,0.40)]">
          <TypographyB className="text-custom-">Add to cart</TypographyB>
        </Button>
        <AddToFavorite className="w-10 h-10 hover:border-custom-button cursor-pointer" />
      </div>
    </Card>
  );
}
