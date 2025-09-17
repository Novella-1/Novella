import { Separator } from '@radix-ui/react-select';
import { TypographyH3, TypographyP } from '@/components/ui/custom/typography';
import { cn } from '@/lib/utils';

interface BookCharacteristicsProps {
  className?: string;
  author?: string | null;
  coverType?: string | null;
  numberOfPages?: number | null;
  publicationYear?: number | null;
  publication?: string | null;
  format?: string | null;
  lang?: string | null;
  illustrations?: boolean | null;
}

export function BookCharacteristics({
  className,
  author,
  coverType,
  numberOfPages,
  publicationYear,
  publication,
  format,
  lang,
  illustrations,
  ...props
}: BookCharacteristicsProps) {
  return (
    <div
      className={cn(className)}
      {...props}
    >
      <div className="flex flex-col gap-4">
        <TypographyH3>Characteristics</TypographyH3>
        <Separator className="border-1 border-custom-button" />
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between w-full">
            <TypographyP className="text-custom-icons">Author</TypographyP>
            <TypographyP>{author || '-'}</TypographyP>
          </div>
          <Separator className="border-1 border-custom-separator" />
          <div className="flex justify-between w-full">
            <TypographyP className="text-custom-icons">Cover type</TypographyP>
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
          <Separator className="border-1 border-custom-separator" />
          <div className="flex justify-between w-full">
            <TypographyP className="text-custom-icons">Publication</TypographyP>
            <TypographyP>{publication || '-'}</TypographyP>
          </div>
          <Separator className="border-1 border-custom-separator" />
          <div className="flex justify-between w-full">
            <TypographyP className="text-custom-icons">Format</TypographyP>
            <TypographyP>{format || '-'}</TypographyP>
          </div>
          <Separator className="border-1 border-custom-separator" />
          <div className="flex justify-between w-full">
            <TypographyP className="text-custom-icons">
              LangLanguage
            </TypographyP>
            <TypographyP>{lang}</TypographyP>
          </div>
          <Separator className="border-1 border-custom-separator" />
          <div className="flex justify-between w-full">
            <TypographyP className="text-custom-icons">
              Illustrations
            </TypographyP>
            <TypographyP>{illustrations ? 'Yes' : 'No'}</TypographyP>
          </div>
        </div>
      </div>
    </div>
  );
}
