import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BookWithDetails } from '@/types/BookType';
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
import { AddToCart } from './CartButton';

export function CardItem({
  book,
  className,
}: {
  book: BookWithDetails;
  className?: string;
}) {
  const {
    author,
    name,
    priceRegular,
    priceDiscount,
    images,
    type,
    namespaceId,
    lang,
  } = book;

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
          namespaceId={namespaceId}
          lang={lang}
          type={type}
        />
        {type === 'AUDIOBOOK' && (
          <div className="absolute flex items-center justify-center top-1 right-1 w-10 h-10 bg-custom-icons-accent rounded-full p-1">
            <HeadphonesIcon className="w-6 h-6 text-white " />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div>
          <CardItemTitle
            namespaceId={namespaceId}
            lang={lang}
            type={type}
          >
            {name}
          </CardItemTitle>
          <TypographyP className="text-custom-icons truncate w-full">
            {author}
          </TypographyP>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-row items-center gap-2">
            {priceDiscount !== null ?
              <>
                <TypographyH3>${priceDiscount.toFixed(2)}</TypographyH3>
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
        <AddToCart
          name={name}
          book={book}
        />
        <AddToFavorite
          name={name}
          className="cursor-pointer"
          book={book}
        />
      </div>
    </Card>
  );
}
